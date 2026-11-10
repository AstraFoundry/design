package sunbeam

import "github.com/egoist/mygo/ui"

var (
	light = lightPalette()
	dark  = darkPalette()
)

// Light returns Sunbeam's light palette. Treat it as read-only.
func Light() *Palette { return light }

// Dark returns Sunbeam's dark palette. Treat it as read-only.
func Dark() *Palette { return dark }

// Colors returns the palette of the part of the view being built: the dark
// one while c's theme is dark, inside a dark Scheme or a dark window, and
// the light one otherwise.
func Colors(c *ui.Context) *Palette {
	if t := c.Theme(); t != nil && t.Dark {
		return dark
	}
	return light
}

// Theme returns a MyGo theme in Sunbeam's colors, light or dark, so that
// MyGo's own widgets (inputs, check boxes, menus) match Sunbeam's. It keeps
// the system's font: set Font to "IBM Plex Sans" where that family is
// installed.
func Theme(isDark bool) *ui.Theme {
	base, p := ui.LightTheme(), light
	if isDark {
		base, p = ui.DarkTheme(), dark
	}
	t := *base
	t.Background = p.Background
	t.Surface = p.Card
	t.SurfaceHover = p.Card.Mix(p.Foreground, 0.04)
	t.SurfacePressed = p.Card.Mix(p.Foreground, 0.08)
	t.Border = p.Border
	t.Text = p.Foreground
	t.TextMuted = p.MutedForeground
	t.Accent = p.Primary
	t.AccentHover = p.Primary.Mix(p.Foreground, 0.12)
	t.AccentPressed = p.Primary.Mix(p.Foreground, 0.2)
	t.AccentText = p.PrimaryForeground
	t.Danger = p.Danger
	t.Success = p.Success
	t.Selection = Yellow300
	t.Focus = p.Ring
	t.Radius = RadiusLG
	return &t
}

// Use themes the window with Sunbeam, light or dark as the system's
// appearance is. Call it first in the view, every frame.
func Use(c *ui.Context) {
	c.SetTheme(Theme(c.Theme().Dark))
}

// Scheme builds its children in Sunbeam's light or dark scheme, whatever the
// window's, as a dark panel over a light window. The column it returns is
// transparent, so what is behind it shows.
func Scheme(c *ui.Context, isDark bool, build func()) ui.Element {
	return ui.Themed(c, Theme(isDark)).Background(ui.Transparent).Children(build)
}
