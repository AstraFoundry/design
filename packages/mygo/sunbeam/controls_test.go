package sunbeam

import (
	"testing"

	"github.com/egoist/mygo/ui"
)

func TestSwitchTogglesAndIsNamed(t *testing.T) {
	on := false
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Switch(c, &on).Label("Sync")
	}, 200, 80)
	info, ok := tt.AccessByRole(ui.RoleSwitch, "Sync")
	if !ok {
		t.Fatal("no switch named Sync")
	}
	if info.Bounds.W != switchWidth || info.Bounds.H != switchHeight {
		t.Errorf("switch is %vx%v, want %vx%v", info.Bounds.W, info.Bounds.H, switchWidth, switchHeight)
	}
	tt.ClickAt(info.Bounds.X+info.Bounds.W/2, info.Bounds.Y+info.Bounds.H/2)
	if !on {
		t.Error("clicking the switch did not turn it on")
	}
}

func TestCheckboxChecksInInk(t *testing.T) {
	checked := false
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Checkbox(c, &checked, "Remember me")
	}, 240, 80)
	if err := tt.Click("Remember me"); err != nil {
		t.Fatal(err)
	}
	if !checked {
		t.Fatal("clicking the label did not check the box")
	}
	if info, ok := tt.AccessByRole(ui.RoleCheckBox, "Remember me"); !ok || !info.Checked {
		t.Errorf("check box %+v, want checked", info)
	}
	// Checked is ink, never the primary yellow.
	if checkedFill(Light()) == Light().Primary {
		t.Error("a checked box is yellow")
	}
}

func TestTextInputTakesItsLayersField(t *testing.T) {
	var flatBg, raisedBg ui.Color
	text := ""
	ui.NewTester(func(c *ui.Context) {
		Use(c)
		flatBg = fieldBackground(c)
		TextInput(c, &text, "Search").Label("Search")
		Layer(Raised, func() { raisedBg = fieldBackground(c) })
	}, 300, 120)
	if flatBg != Light().Card {
		t.Errorf("flat field %v, want the card color", flatBg)
	}
	if raisedBg != Light().WellFace {
		t.Errorf("raised field %v, want the recessed well", raisedBg)
	}
}

func TestTabsChooseAndKeepEqualWidths(t *testing.T) {
	tab := 0
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Tabs(c, &tab, "Overview", "Activity", "Settings")
	}, 400, 80)
	if err := tt.Click("Activity"); err != nil {
		t.Fatal(err)
	}
	if tab != 1 {
		t.Errorf("tab %d after clicking Activity, want 1", tab)
	}
	a, okA := tt.AccessByRole(ui.RoleTab, "Overview")
	b, okB := tt.AccessByRole(ui.RoleTab, "Settings")
	if !okA || !okB || a.Bounds.W != b.Bounds.W {
		t.Errorf("tab widths %v and %v, want equal", a.Bounds.W, b.Bounds.W)
	}
}

func TestToggleStaysPressed(t *testing.T) {
	bold := false
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Toggle(c, &bold, "Bold")
	}, 200, 80)
	if err := tt.Click("Bold"); err != nil {
		t.Fatal(err)
	}
	if !bold {
		t.Error("toggle is not pressed after a click")
	}
}

func TestSliderMovesWithTheArrows(t *testing.T) {
	v := 40.0
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Slider(c, &v, 0, 100).Label("Volume").Width(200)
	}, 260, 80)
	info, ok := tt.AccessByRole(ui.RoleSlider, "Volume")
	if !ok {
		t.Fatal("no slider named Volume")
	}
	tt.ClickAt(info.Bounds.X+info.Bounds.W-2, info.Bounds.Y+info.Bounds.H/2)
	if v <= 40 {
		t.Errorf("value %v after clicking near the end, want more than 40", v)
	}
}

func TestDisplayParts(t *testing.T) {
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		ui.Column(c).Gap(8).Children(func() {
			Badge(c, "Beta")
			Progress(c, 0.4).Label("Upload")
			Divider(c)
			Card(c, func() { ui.Text(c, "Usage") })
		})
	}, 300, 300)
	for _, s := range []string{"Beta", "Usage"} {
		if !tt.HasText(s) {
			t.Errorf("no text %q", s)
		}
	}
	if _, ok := tt.AccessByRole(ui.RoleProgress, "Upload"); !ok {
		t.Error("no progress bar named Upload")
	}
}

func TestMotionTokensAreGenerated(t *testing.T) {
	if DurationPopup <= 0 || DurationPopupExit >= DurationPopup {
		t.Errorf("popup %v, exit %v: want an exit faster than the entrance", DurationPopup, DurationPopupExit)
	}
}

// A segmented control's raised face slides to the new choice rather than
// jumping there: a frame after the click it is between the two segments.
func TestSegmentedThumbSlides(t *testing.T) {
	choice := 0
	var thumbX float32
	view := func(c *ui.Context) {
		Use(c)
		Segmented(c, &choice, "Day", "Week", "Month").Label("Range")
		thumbX = lastThumbX
	}
	tt := ui.NewTester(view, 400, 80)
	start := thumbX
	if err := tt.Click("Month"); err != nil {
		t.Fatal(err)
	}
	tt.Advance(DurationIndicator / 4)
	tt.Frame()
	mid := thumbX
	tt.Advance(2 * DurationIndicator)
	tt.Frame()
	end := thumbX
	if !(mid > start && mid < end) {
		t.Errorf("thumb at %v, %v, %v: want it between the segments partway through", start, mid, end)
	}
	tt.SetPreferences(ui.Preferences{ReduceMotion: true})
	if err := tt.Click("Day"); err != nil {
		t.Fatal(err)
	}
	tt.Frame()
	if thumbX != start {
		t.Errorf("with less motion the thumb is at %v after one frame, want %v at once", thumbX, start)
	}
}

// The sliding thumb sits under the labels: the chosen label still shows.
func TestSegmentedLabelsShowOverTheThumb(t *testing.T) {
	choice := 1
	img := ui.Render(func(c *ui.Context) {
		Use(c)
		ui.Column(c).Padding(20).Children(func() {
			Segmented(c, &choice, "Day", "Week").Label("Range")
		})
	}, 300, 80, 1)
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		ui.Column(c).Padding(20).Children(func() {
			Segmented(c, &choice, "Day", "Week").Label("Range")
		})
	}, 300, 80)
	week, ok := tt.AccessByRole(ui.RoleRadio, "Week")
	if !ok {
		t.Fatal("no Week segment")
	}
	// Some pixel of the chosen segment is as dark as ink: its label.
	dark := false
	for y := int(week.Bounds.Y) + 4; y < int(week.Bounds.Y+week.Bounds.H)-4; y++ {
		for x := int(week.Bounds.X) + 4; x < int(week.Bounds.X+week.Bounds.W)-4; x++ {
			if px := img.RGBAAt(x, y); int(px.R)+int(px.G)+int(px.B) < 300 {
				dark = true
			}
		}
	}
	if !dark {
		t.Error("the chosen segment shows no label: the thumb covers it")
	}
}
