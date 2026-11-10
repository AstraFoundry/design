package sunbeam

import "github.com/egoist/mygo/ui"

// Material is how a layer's surfaces look: Flat or Raised.
type Material int

const (
	// Flat is the window and its chrome: fills, no borders, no shadows.
	Flat Material = iota
	// Raised is a layer floating above the window and every control in it.
	Raised
)

func (m Material) String() string {
	if m == Raised {
		return "raised"
	}
	return "flat"
}

// layers are the layers being built, the innermost last. Views build on
// the main thread, one at a time, so one stack serves every window.
var layers []Material

// Current returns the material of the layer being built: Flat outside any
// layer.
func Current() Material {
	if len(layers) == 0 {
		return Flat
	}
	return layers[len(layers)-1]
}

// Layer builds its children as a layer of material m: the controls among
// them take m. Panel opens a raised one; open a flat one inside a panel for
// a part that sits back down.
func Layer(m Material, build func()) {
	layers = append(layers, m)
	defer func() { layers = layers[:len(layers)-1] }()
	build()
}

// Face gives e the face of a control in the current layer's material, as
// it is now: hovered, pressed or neither. Every face has a 1-DIP border,
// transparent when flat, so a control is the same size in both materials.
func Face(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	hovered, pressed := e.Hovered(), e.Pressed()
	if Current() == Flat {
		bg := p.FlatFace
		switch {
		case pressed:
			bg = p.FlatFacePressed
		case hovered:
			bg = p.FlatFaceHover
		}
		return e.Border(1, ui.Transparent).Background(bg)
	}
	e.Border(1, p.RaisedEdge)
	if pressed {
		e.Background(p.RaisedFacePressed)
		return apply(e, p.RaisedShadowPressed)
	}
	to := p.RaisedFaceTo
	if hovered {
		to = to.Mix(p.RaisedFaceFrom, 0.5)
	}
	e.Gradient(p.RaisedFaceFrom, to, 180).InsetShadow(0, 1, 0, 0, p.RaisedHighlight)
	return apply(e, p.RaisedShadow)
}

// PrimaryFace gives e the face of the one primary action, in yellow: flat,
// or raised in the current layer's material.
func PrimaryFace(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	hovered, pressed := e.Hovered(), e.Pressed()
	if Current() == Flat {
		bg := p.Primary
		switch {
		case pressed:
			bg = p.Primary.Mix(p.Foreground, 0.18)
		case hovered:
			bg = p.Primary.Mix(p.Foreground, 0.12)
		}
		return e.Border(1, ui.Transparent).Background(bg)
	}
	e.Border(1, p.RaisedPrimaryEdge)
	if pressed {
		e.Background(p.RaisedPrimaryTo)
		return apply(e, p.RaisedShadowPressed)
	}
	e.Gradient(p.RaisedPrimaryFrom, p.RaisedPrimaryTo, 180).InsetShadow(0, 1, 0, 0, p.RaisedPrimaryHighlight)
	return apply(e, p.RaisedShadow)
}

// Thumb gives e the look of the choice made in a well, as a segmented
// control's chosen segment: the raised face, or a flat solid fill.
func Thumb(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	if Current() == Flat {
		return e.Border(1, ui.Transparent).Background(p.FlatThumb)
	}
	e.Border(1, p.RaisedEdge).Gradient(p.RaisedFaceFrom, p.RaisedFaceTo, 180).InsetShadow(0, 1, 0, 0, p.RaisedHighlight)
	return apply(e, p.RaisedShadow)
}

// Well gives e the look of a track that holds choices: recessed in a raised
// layer, a flat fill in a flat one.
func Well(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	if Current() == Flat {
		return e.Background(p.FlatFace)
	}
	e.Background(p.WellFace)
	return apply(e, p.WellShadow)
}

// PanelSurface gives e the surface of a floating raised layer: a faint
// gradient, a translucent edge, a highlight inside its top edge and a soft
// shadow in three layers.
func PanelSurface(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	e.Radius(RadiusTile).Border(1, p.PanelEdge).
		Gradient(p.PanelFaceFrom, p.PanelFaceTo, 180).
		InsetShadow(0, 1, 0, 0, p.PanelHighlight).
		TextColor(p.Foreground)
	return apply(e, p.PanelShadow)
}
