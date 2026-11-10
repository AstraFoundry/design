package sunbeam

import "github.com/egoist/mygo/ui"

// Shadow is one layer of a CSS box-shadow: an outer shadow, or an inner
// one (Inset) drawn inside the border, as `inset` does.
type Shadow struct {
	X, Y, Blur, Spread float32
	Color              ui.Color
	Inset              bool
}

// TextStyle is a Sunbeam text style. Families is the CSS font stack, first
// choice first; LineHeight is a multiple of Size; LetterSpacing is in em.
type TextStyle struct {
	Families      []string
	Size          float32
	Weight        int
	LineHeight    float32
	LetterSpacing float32
}

// apply casts every layer of shadows on e, the outer ones with Shadow and
// the inner ones with InsetShadow, in order.
func apply(e ui.Element, shadows []Shadow) ui.Element {
	for _, s := range shadows {
		if s.Inset {
			e.InsetShadow(s.X, s.Y, s.Blur, s.Spread, s.Color)
		} else {
			e.Shadow(s.X, s.Y, s.Blur, s.Spread, s.Color)
		}
	}
	return e
}
