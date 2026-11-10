package sunbeam

import (
	"image/color"
	"testing"

	"github.com/egoist/mygo/ui"
)

// luma is a color's relative lightness, 0 to 255, over an opaque base when
// it is translucent.
func luma(c, base ui.Color) float64 {
	a := float64(c.A) / 255
	mix := func(x, y uint8) float64 { return float64(x)*a + float64(y)*(1-a) }
	return 0.2126*mix(c.R, base.R) + 0.7152*mix(c.G, base.G) + 0.0722*mix(c.B, base.B)
}

func TestLayersNestAndUnwind(t *testing.T) {
	if Current() != Flat {
		t.Fatalf("outside any layer: %v, want flat", Current())
	}
	Layer(Raised, func() {
		if Current() != Raised {
			t.Errorf("in a raised layer: %v", Current())
		}
		Layer(Flat, func() {
			if Current() != Flat {
				t.Errorf("in a flat layer inside a raised one: %v", Current())
			}
		})
		if Current() != Raised {
			t.Errorf("back in the raised layer: %v", Current())
		}
	})
	func() {
		defer func() { _ = recover() }()
		Layer(Raised, func() { panic("view failed") })
	}()
	if Current() != Flat || len(layers) != 0 {
		t.Errorf("after a layer panicked: %v, %d layers left", Current(), len(layers))
	}
}

// The rules of the materials, as the tokens must keep them.
func TestMaterialRules(t *testing.T) {
	for _, mode := range []struct {
		name string
		p    *Palette
	}{{"light", Light()}, {"dark", Dark()}} {
		p := mode.p
		panel := p.PanelFaceFrom
		// A raised face is lighter than the panel under it, in the dark too:
		// light gray on gray, not a darker well.
		if luma(p.RaisedFaceFrom, panel) <= luma(panel, panel) {
			t.Errorf("%s: raised face %v is not lighter than its panel %v", mode.name, p.RaisedFaceFrom, panel)
		}
		// Its gradient runs from light at the top to darker at the bottom.
		if luma(p.RaisedFaceTo, panel) >= luma(p.RaisedFaceFrom, panel) {
			t.Errorf("%s: raised gradient does not darken downward", mode.name)
		}
		// Edges are translucent, so they take the color of what is behind.
		for name, c := range map[string]ui.Color{"raised edge": p.RaisedEdge, "panel edge": p.PanelEdge, "flat face": p.FlatFace} {
			if c.A == 0 || c.A == 255 {
				t.Errorf("%s: %s alpha %d, want translucent", mode.name, name, c.A)
			}
		}
		// The highlight inside the top edge is white.
		if h := p.RaisedHighlight; h.R != 255 || h.G != 255 || h.B != 255 {
			t.Errorf("%s: highlight %v is not white", mode.name, h)
		}
		// Raised controls and panels cast layered shadows; a pressed control
		// sits lower, with less.
		if len(p.RaisedShadow) < 2 || len(p.PanelShadow) < 3 || len(p.RaisedShadowPressed) >= len(p.RaisedShadow) {
			t.Errorf("%s: shadows %d raised, %d panel, %d pressed", mode.name, len(p.RaisedShadow), len(p.PanelShadow), len(p.RaisedShadowPressed))
		}
	}
	// Shadows are half black in the dark, warm ink in the light.
	if s := Dark().RaisedShadow[1].Color; s.R != 0 || s.A < 90 || s.A > 160 {
		t.Errorf("dark raised shadow %v, want black at about half", s)
	}
	if s := Light().RaisedShadow[1].Color; s.R == 0 && s.G == 0 && s.B == 0 {
		t.Errorf("light raised shadow %v is neutral black, want warm ink", s)
	}
	// Corners nest: a panel's radius less its inset is a pill's radius.
	if RadiusTile-SpaceTileInset != controlHeight/2 {
		t.Errorf("panel radius %v - inset %v != pill radius %v", RadiusTile, SpaceTileInset, controlHeight/2)
	}
}

func TestSchemeAndColors(t *testing.T) {
	var outside, inside *Palette
	view := func(c *ui.Context) {
		Use(c)
		outside = Colors(c)
		Scheme(c, true, func() { inside = Colors(c) })
	}
	ui.NewTester(view, 200, 100)
	if outside != Light() || inside != Dark() {
		t.Errorf("light window with a dark scheme: outside dark=%v, inside dark=%v", outside == Dark(), inside == Dark())
	}
	ui.NewTesterWith(view, 200, 100, ui.TesterOptions{Dark: true})
	if outside != Dark() {
		t.Error("a dark window does not get the dark palette")
	}
}

func TestComponents(t *testing.T) {
	var clicks, choice int
	var materials []Material
	view := func(c *ui.Context) {
		Use(c)
		ui.Column(c).Padding(16).Gap(16).Children(func() {
			materials = materials[:0]
			if Button(c, "Chat").Clicked() {
				clicks++
			}
			materials = append(materials, Current())
			Panel(c, func() {
				materials = append(materials, Current())
				Segmented(c, &choice, "Day", "Week").Label("Period")
				Layer(Flat, func() { materials = append(materials, Current()) })
			})
		})
	}
	tt := ui.NewTester(view, 400, 300)
	if err := tt.Click("Chat"); err != nil {
		t.Fatal(err)
	}
	if clicks != 1 {
		t.Errorf("clicks %d, want 1", clicks)
	}
	if err := tt.Click("Week"); err != nil {
		t.Fatal(err)
	}
	if choice != 1 {
		t.Errorf("choice %d after clicking Week, want 1", choice)
	}
	if want := []Material{Flat, Raised, Flat}; len(materials) != 3 || materials[0] != want[0] || materials[1] != want[1] || materials[2] != want[2] {
		t.Errorf("materials while building %v, want %v", materials, want)
	}
	if info, ok := tt.AccessByRole(ui.RoleRadioGroup, "Period"); !ok {
		t.Errorf("no radio group named Period: %+v", info)
	}
	day, okDay := tt.AccessByRole(ui.RoleRadio, "Day")
	week, okWeek := tt.AccessByRole(ui.RoleRadio, "Week")
	if !okDay || !okWeek {
		t.Fatal("no radio buttons named Day and Week")
	}
	// Segments are as wide as the widest, so the raised pill keeps its size.
	if day.Bounds.W != week.Bounds.W || day.Bounds.W == 0 {
		t.Errorf("segment widths Day %v, Week %v, want equal", day.Bounds.W, week.Bounds.W)
	}
}

func TestIconButtonIsNamed(t *testing.T) {
	icon := ui.MustParseSVG([]byte(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>`))
	pressed := false
	tt := ui.NewTester(func(c *ui.Context) {
		if IconButton(c, icon, "Download").Clicked() {
			pressed = true
		}
	}, 200, 100)
	if _, ok := tt.AccessByRole(ui.RoleButton, "Download"); !ok {
		t.Fatal("no button named Download")
	}
	if err := tt.Click("Download"); err != nil || !pressed {
		t.Errorf("click: %v, pressed %v", err, pressed)
	}
}

// A raised button casts a shadow below it and has an edge; a flat one is a
// fill and nothing else.
func TestRaisedCastsShadowFlatDoesNot(t *testing.T) {
	const pad, w, h = 20, 120, 40
	shot := func(m Material) func(x, y int) color.RGBA {
		img := ui.Render(func(c *ui.Context) {
			Use(c)
			ui.Column(c).Padding(pad).Children(func() {
				Layer(m, func() { Button(c, "Go").Width(w) })
			})
		}, 200, 120, 1)
		return func(x, y int) color.RGBA { return img.RGBAAt(x, y) }
	}
	bg := Light().Background
	below := func(px func(x, y int) color.RGBA) color.RGBA { return px(pad+w/2, pad+h+2) }
	if got := below(shot(Flat)); got.R != bg.R || got.G != bg.G || got.B != bg.B {
		t.Errorf("below a flat button: %v, want the background %v", got, bg)
	}
	if got := below(shot(Raised)); got.R >= bg.R || got.G >= bg.G {
		t.Errorf("below a raised button: %v, want a shadow darker than %v", got, bg)
	}
	// The raised face is lighter near its top than near its bottom.
	raised := shot(Raised)
	top, bottom := raised(pad+10, pad+4), raised(pad+10, pad+h-4)
	if top.G <= bottom.G {
		t.Errorf("raised face top %v not lighter than bottom %v", top, bottom)
	}
}
