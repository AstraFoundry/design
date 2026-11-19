package sunbeam

import "github.com/egoist/mygo/ui"

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
