package sunbeam

import "github.com/egoist/mygo/ui"

// Control heights, in DIPs: 40 for buttons, 32 for the segments inside a
// well's 4-DIP inset.
const (
	controlHeight float32 = 40
	segmentHeight float32 = 32
	wellInset     float32 = 4
	// segmentPadding is the room beside a segment's label.
	segmentPadding float32 = 12
)

// button is the shared base of the buttons: a pill of the control height
// that takes the focus and reports Clicked.
func button(c *ui.Context) ui.Element {
	return ui.ButtonBase(c).Height(controlHeight).MinWidth(controlHeight).
		Radius(controlHeight / 2).Center().Gap(8).Cursor(ui.CursorPointer)
}

func label(c *ui.Context, s string) {
	ui.Text(c, s).SingleLine().FontSize(TypeLabelMD.Size).FontWeight(TypeLabelMD.Weight)
}

// Button is a push button showing label, in the face of its layer's
// material: flat on the window, raised inside a Panel. Clicked on the
// element it returns reports a click, Enter or Space.
func Button(c *ui.Context, text string) ui.Element {
	e := button(c).Padding(0, 16).TextColor(Colors(c).Foreground)
	Face(c, e)
	return e.Children(func() { label(c, text) })
}

// PrimaryButton is the button of the one primary action of a window or a
// layer, in yellow.
func PrimaryButton(c *ui.Context, text string) ui.Element {
	e := button(c).Padding(0, 16).TextColor(Colors(c).PrimaryForeground)
	PrimaryFace(c, e)
	return e.Children(func() { label(c, text) })
}

// GhostButton is a button with no face until the pointer is over it.
func GhostButton(c *ui.Context, text string) ui.Element {
	p := Colors(c)
	e := button(c).Padding(0, 16).Border(1, ui.Transparent)
	switch {
	case e.Pressed():
		e.Background(p.FlatFacePressed).TextColor(p.Foreground)
	case e.Hovered():
		e.Background(p.FlatFaceHover).TextColor(p.Foreground)
	default:
		e.TextColor(p.MutedForeground)
	}
	return e.Children(func() { label(c, text) })
}

// IconButton is a round button showing only icon, named by label for
// assistive technology and in its tooltip.
func IconButton(c *ui.Context, icon *ui.SVG, label string) ui.Element {
	e := button(c).Width(controlHeight).Label(label).Tooltip(label).TextColor(Colors(c).Foreground)
	Face(c, e)
	return e.Children(func() { ui.Icon(c, icon).Size(18, 18) })
}

// Panel is a floating raised layer: it builds its children as a column on
// the panel's surface, and every control among them is raised. Its 8-DIP
// inset keeps the 40-DIP pills inside it concentric with its corners.
func Panel(c *ui.Context, build func()) ui.Element {
	e := ui.Column(c).Padding(SpaceTileInset).Gap(SpaceTileInset)
	PanelSurface(c, e)
	return e.Children(func() { Layer(Raised, build) })
}

// Segmented is a segmented control showing labels, of which selected is
// the index of the one chosen: a well whose chosen segment is its one
// raised face. Assistive technology sees a radio group; name it with Label
// on the element returned.
func Segmented(c *ui.Context, selected *int, labels ...string) ui.Element {
	return segmented(c, selected, labels, nil)
}

// SegmentedIcons is a segmented control of icons, each named by the label
// at its index.
func SegmentedIcons(c *ui.Context, selected *int, icons []*ui.SVG, labels []string) ui.Element {
	if len(icons) != len(labels) {
		panic("sunbeam: SegmentedIcons needs one label for each icon")
	}
	return segmented(c, selected, labels, icons)
}

func segmented(c *ui.Context, selected *int, labels []string, icons []*ui.SVG) ui.Element {
	p := Colors(c)
	// Every segment is as wide as the widest, so the raised pill keeps its
	// size as the choice moves.
	width := controlHeight
	if icons == nil {
		width = 0
		for _, text := range labels {
			w, _ := c.MeasureText(0, ui.Span{Text: text, Size: TypeLabelMD.Size, Weight: TypeLabelMD.Weight})
			width = max(width, w+2*segmentPadding+2)
		}
	}
	parts := ui.SegmentedBase(c, selected, len(labels))
	track := parts.Track.Padding(wellInset).Gap(wellInset).Radius(segmentHeight/2 + wellInset)
	Well(c, track)
	return track.Children(func() {
		for i, text := range labels {
			s := parts.Segment(i).Height(segmentHeight).Radius(segmentHeight / 2).Center().Cursor(ui.CursorPointer)
			s.Width(width)
			if icons != nil {
				s.Label(text)
			}
			if i == *selected {
				Thumb(c, s).TextColor(p.Foreground)
			} else {
				s.Border(1, ui.Transparent).TextColor(p.MutedForeground)
			}
			s.Children(func() {
				if icons != nil {
					ui.Icon(c, icons[i]).Size(16, 16)
				} else {
					label(c, text)
				}
			})
		}
	})
}
