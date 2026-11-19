package sunbeam

import "github.com/egoist/mygo/ui"

// Sizes of the controls in this file, in DIPs.
const (
	switchWidth  float32 = 40
	switchHeight float32 = 24
	switchInset  float32 = 2
	checkSize    float32 = 18
	fieldHeight  float32 = 40
	tabHeight    float32 = 32
	sliderHeight float32 = 24
	sliderTrack  float32 = 6
	sliderThumb  float32 = 20
)

// popupSpring is the spring of small things moving into place: a switch's
// knob overshoots a hair and settles into its detent, as the web's
// --ease-spring does.
var popupSpring = ui.SpringOptions{Duration: DurationToggle, Bounce: 0.25}

// checkedFill is the face of a checked choice: ink, never yellow, which is
// kept for the one primary action.
func checkedFill(p *Palette) ui.Color { return p.Foreground }

// fieldBackground is the face of a text field in the current layer: solid
// content with a hairline on the window, a recessed well in a raised layer.
func fieldBackground(c *ui.Context) ui.Color {
	p := Colors(c)
	if Current() == Raised {
		return p.WellFace
	}
	return p.Card
}

// Field gives e the face of a text field in the current layer's material,
// and the focus ring while it has the focus.
func Field(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	e.Background(fieldBackground(c)).Radius(RadiusLG)
	if Current() == Raised {
		e.Border(1, ui.Transparent)
		apply(e, p.WellShadow)
	} else {
		e.Border(1, p.Input)
	}
	return e.FocusRingColor(p.Ring)
}

// Switch is a switch that turns *on over: a recessed track whose knob is a
// raised face, the track filled with ink while on. The knob runs on a
// spring and settles into its detent; with less motion it moves at once.
// Name it with Label on the element returned.
func Switch(c *ui.Context, on *bool) ui.Element {
	p := Colors(c)
	e := ui.SwitchBase(c, on).Width(switchWidth).Height(switchHeight).
		Radius(switchHeight / 2).Cursor(ui.CursorPointer).FocusRingColor(p.Ring)
	if *on {
		e.Background(checkedFill(p))
	} else {
		Well(c, e)
	}
	target := float32(0)
	if *on {
		target = switchWidth - switchHeight
	}
	x := e.AnimateTo("knob", target, ui.Animation{Spring: popupSpring})
	return e.Children(func() {
		knob := ui.Box(c).Size(switchHeight-2*switchInset, switchHeight-2*switchInset).
			Radius((switchHeight - 2*switchInset) / 2).Absolute().
			Left(switchInset + x).Top(switchInset)
		Layer(Raised, func() { Thumb(c, knob) })
	})
}

// Checkbox is a check box with label beside it, checking *checked. Checked,
// its box fills with ink and carries a light mark.
func Checkbox(c *ui.Context, checked *bool, label string) ui.Element {
	p := Colors(c)
	row := ui.CheckboxBase(c, checked).Row().Gap(8).AlignItems(ui.Center).Cursor(ui.CursorPointer)
	return row.Children(func() {
		box := ui.Box(c).Size(checkSize, checkSize).Center()
		if *checked {
			box.Background(checkedFill(p)).Border(1, checkedFill(p))
		} else {
			Field(c, box)
		}
		box.Radius(5)
		box.Children(func() {
			if *checked {
				box.Draw(func(pt *ui.Painter, r ui.Rect) {
					path := new(ui.Path)
					path.MoveTo(r.X+r.W*0.24, r.Y+r.H*0.52)
					path.LineTo(r.X+r.W*0.42, r.Y+r.H*0.7)
					path.LineTo(r.X+r.W*0.78, r.Y+r.H*0.3)
					pt.StrokePath(path, 2, p.Background)
				})
			}
		})
		ui.Text(c, label).FontSize(TypeBodySM.Size)
	})
}

// TextInput is a single-line text field editing *value, showing placeholder
// while empty, with its layer's field face. Name it with Label.
func TextInput(c *ui.Context, value *string, placeholder string) ui.Element {
	e := ui.TextInputBase(c, value).Height(fieldHeight).PaddingX(12).
		Placeholder(placeholder).FontSize(TypeBodySM.Size)
	return Field(c, e)
}

// Tabs is a segmented row of tabs, *selected the chosen one: a well whose
// chosen tab is its one raised face, every tab as wide as the widest.
func Tabs(c *ui.Context, selected *int, labels ...string) ui.Element {
	p := Colors(c)
	width := float32(0)
	for _, text := range labels {
		w, _ := c.MeasureText(0, ui.Span{Text: text, Size: TypeLabelMD.Size, Weight: TypeLabelMD.Weight})
		width = max(width, w+2*segmentPadding+2)
	}
	parts := ui.TabsBase(c, selected, len(labels))
	track := parts.List.Row().Padding(wellInset).Gap(wellInset).Radius(tabHeight/2 + wellInset)
	Well(c, track)
	return track.Children(func() {
		for i, text := range labels {
			tab := parts.Tab(i).Width(width).Height(tabHeight).Radius(tabHeight / 2).
				Center().Cursor(ui.CursorPointer)
			if i == *selected {
				Thumb(c, tab).TextColor(p.Foreground)
			} else {
				tab.Border(1, ui.Transparent).TextColor(p.MutedForeground)
			}
			tab.Children(func() { label(c, text) })
		}
	})
}

// Toggle is a button that stays pressed while *on: no face until hovered,
// and the thumb face of its layer while pressed.
func Toggle(c *ui.Context, on *bool, text string) ui.Element {
	p := Colors(c)
	e := ui.ToggleBase(c, on).Height(controlHeight).Padding(0, 14).Radius(controlHeight / 2).
		Center().Cursor(ui.CursorPointer)
	switch {
	case *on:
		Thumb(c, e).TextColor(p.Foreground)
	case e.Hovered():
		e.Border(1, ui.Transparent).Background(p.FlatFaceHover).TextColor(p.Foreground)
	default:
		e.Border(1, ui.Transparent).TextColor(p.MutedForeground)
	}
	return e.Children(func() { label(c, text) })
}

// Slider is a slider of *value between lo and hi: a recessed track filled
// with ink to the value, and a raised thumb. Name it with Label.
func Slider(c *ui.Context, value *float64, lo, hi float64) ui.Element {
	p := Colors(c)
	e := ui.SliderBase(c, value, lo, hi).Height(sliderHeight).MinWidth(120).Cursor(ui.CursorPointer)
	raised := Current() == Raised
	return e.Draw(func(pt *ui.Painter, r ui.Rect) {
		frac := float32(0)
		if hi > lo {
			frac = float32((*value - lo) / (hi - lo))
		}
		track := ui.Rect{X: r.X + sliderThumb/2, Y: r.Y + (r.H-sliderTrack)/2, W: r.W - sliderThumb, H: sliderTrack}
		well := p.FlatFace
		if raised {
			well = p.WellFace
		}
		pt.Fill(track, well, sliderTrack/2)
		pt.Fill(ui.Rect{X: track.X, Y: track.Y, W: track.W * frac, H: track.H}, checkedFill(p), sliderTrack/2)
		x := track.X + track.W*frac - sliderThumb/2
		thumb := ui.Rect{X: x, Y: r.Y + (r.H-sliderThumb)/2, W: sliderThumb, H: sliderThumb}
		pt.Fill(ui.Rect{X: thumb.X, Y: thumb.Y + 1, W: thumb.W, H: thumb.H}, p.RaisedEdge, sliderThumb/2)
		pt.Fill(thumb, p.RaisedFaceFrom, sliderThumb/2)
	})
}
