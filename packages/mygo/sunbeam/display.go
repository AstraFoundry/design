package sunbeam

import (
	"strings"

	"github.com/egoist/mygo/ui"
)

// Badge is a short label in a quiet pill: a state, a count, a category.
// Never yellow, which is kept for the one primary action.
func Badge(c *ui.Context, text string) ui.Element {
	p := Colors(c)
	e := ui.Row(c).Height(20).PaddingX(8).Radius(10).Center().
		Background(p.Secondary).TextColor(p.SecondaryForeground)
	return e.Children(func() {
		ui.Text(c, text).SingleLine().FontSize(TypeCaption.Size - 1).FontWeight(500)
	})
}

// Progress is a bar filled with ink to value, between 0 and 1, in a
// recessed track. Name it with Label.
func Progress(c *ui.Context, value float64) ui.Element {
	p := Colors(c)
	raised := Current() == Raised
	e := ui.Box(c).Role(ui.RoleProgress).Range(0, 1, value).Height(6).FillWidth().MinWidth(80)
	frac := e.AnimateTo("value", float32(min(max(value, 0), 1)), ui.Animation{Duration: DurationIndicator})
	return e.Draw(func(pt *ui.Painter, r ui.Rect) {
		well := p.FlatFace
		if raised {
			well = p.WellFace
		}
		pt.Fill(r, well, r.H/2)
		pt.Fill(ui.Rect{X: r.X, Y: r.Y, W: r.W * frac, H: r.H}, checkedFill(p), r.H/2)
	})
}

// Divider is a 1-DIP hairline across its row or column.
func Divider(c *ui.Context) ui.Element {
	return ui.Box(c).Height(1).FillWidth().Background(Colors(c).Border)
}

// Card builds its children on solid content with a hairline: a card on the
// window. Cards are content, so they never take the raised material.
func Card(c *ui.Context, build func()) ui.Element {
	p := Colors(c)
	e := ui.Column(c).Padding(24).Gap(8).Radius(Radius3XL).
		Background(p.Card).Border(1, p.Border).TextColor(p.CardForeground)
	return e.Children(build)
}

// Avatar is a round picture of a person named name: their initials on a
// flat fill. Avatars are content, so they take no material and draw no
// line around them.
func Avatar(c *ui.Context, name string) ui.Element {
	p := Colors(c)
	e := ui.Box(c).Size(32, 32).Radius(16).Center().Background(p.FlatFace).
		TextColor(p.MutedForeground).Role(ui.RoleImage).Label(name)
	return e.Children(func() {
		ui.Text(c, initials(name)).FontSize(12).FontWeight(500).AccessHidden(true)
	})
}

// initials are the first letters of the first and last words of name.
func initials(name string) string {
	words := strings.Fields(name)
	switch len(words) {
	case 0:
		return ""
	case 1:
		r := []rune(words[0])
		return strings.ToUpper(string(r[:min(2, len(r))]))
	}
	first, last := []rune(words[0]), []rune(words[len(words)-1])
	return strings.ToUpper(string(first[0]) + string(last[0]))
}

// Meter is a measurement of value between lo and hi, as storage used: a
// recessed track filled with ink. Name it with Label.
func Meter(c *ui.Context, value, lo, hi float64) ui.Element {
	p := Colors(c)
	raised := Current() == Raised
	e := ui.Box(c).Role(ui.RoleMeter).Range(lo, hi, value).Height(6).FillWidth().MinWidth(80)
	frac := float32(0)
	if hi > lo {
		frac = float32(min(max((value-lo)/(hi-lo), 0), 1))
	}
	frac = e.AnimateTo("value", frac, ui.Animation{Duration: DurationIndicator})
	return e.Draw(func(pt *ui.Painter, r ui.Rect) {
		well := p.FlatFace
		if raised {
			well = p.WellFace
		}
		pt.Fill(r, well, r.H/2)
		pt.Fill(ui.Rect{X: r.X, Y: r.Y, W: r.W * frac, H: r.H}, checkedFill(p), r.H/2)
	})
}

// Spinner turns while something real is in progress, in muted ink: the one
// loop Sunbeam allows. Name it with Label.
func Spinner(c *ui.Context) ui.Element {
	return ui.Spinner(c).TextColor(Colors(c).MutedForeground)
}

// Accordion is a section titled title that opens below it to show build's
// content, its chevron turning as it opens. *open is whether it shows.
func Accordion(c *ui.Context, open *bool, title string, build func()) ui.Element {
	p := Colors(c)
	acc := ui.AccordionBase(c)
	acc.Root.FillWidth()
	acc.Root.Children(func() {
		item := acc.Item(open)
		item.Trigger.Row().Gap(12).Padding(14, 0).AlignItems(ui.Center).Cursor(ui.CursorPointer).
			FocusRingColor(p.Ring).TextColor(p.Foreground)
		item.Trigger.Children(func() {
			ui.Text(c, title).FontSize(TypeBodyMD.Size - 1).FontWeight(500).Grow(1).Shrink(1).MinWidth(0)
			ui.Icon(c, chevronDown).Size(16, 16).TextColor(p.MutedForeground).Rotate(180 * item.Progress())
		})
		item.Panel(func() {
			ui.Column(c).Padding(0, 0, 14, 0).TextColor(p.MutedForeground).Children(build)
		})
		Divider(c)
	})
	return acc.Root
}
