package main

import (
	"github.com/AstraFoundry/design/packages/mygo/sunbeam"
	"github.com/egoist/mygo/ui"
)

// Icons in the style of Lucide, drawn in the color of the text.
var (
	expand   = icon(`<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>`)
	download = icon(`<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>`)
	contrast = icon(`<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>`)
	picture  = icon(`<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>`)
)

func icon(paths string) *ui.SVG {
	return ui.MustParseSVG([]byte(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` + paths + `</svg>`))
}

// gallery is the app's state.
type gallery struct {
	period     int // the flat segmented control's choice
	background int // the panels' segmented control's choice
	captures   int
}

func (app *gallery) view(c *ui.Context) {
	sunbeam.Use(c)
	p := sunbeam.Colors(c)
	ui.Column(c).Fill().Padding(24).Gap(24).Children(func() {
		// The window's chrome is flat: fills, no edges, no shadows.
		ui.Row(c).Gap(8).AlignItems(ui.Center).Children(func() {
			ui.Text(c, "Flat: the window's chrome").TextColor(p.MutedForeground).Grow(1)
			sunbeam.GhostButton(c, "Ghost")
			sunbeam.IconButton(c, expand, "Expand")
			sunbeam.Button(c, "Chat")
			sunbeam.PrimaryButton(c, "Share")
			sunbeam.Segmented(c, &app.period, "Day", "Week").Label("Period")
		})
		// Panels float, raised, with every control in them.
		ui.Row(c).Gap(24).AlignItems(ui.Start).Children(func() {
			app.panel(c)
			sunbeam.Scheme(c, true, func() { app.panel(c) })
		})
	})
}

func (app *gallery) panel(c *ui.Context) {
	sunbeam.Panel(c, func() {
		ui.Row(c).Gap(8).Children(func() {
			sunbeam.IconButton(c, expand, "Full screen")
			if sunbeam.Button(c, "Capture in portrait mode").Grow(1).Clicked() {
				app.captures++
			}
			sunbeam.IconButton(c, download, "Download")
		})
		ui.Box(c).Height(160).Radius(sunbeam.RadiusTile-sunbeam.SpaceTileInset).
			Gradient(ui.Hex("#c9d48a"), ui.Hex("#8fb08a"), 135)
		ui.Row(c).Gap(8).AlignItems(ui.Center).Children(func() {
			sunbeam.SegmentedIcons(c, &app.background, []*ui.SVG{contrast, picture}, []string{"Theme", "Image"}).Label("Background")
			ui.Box(c).Grow(1)
			sunbeam.PrimaryButton(c, "Save")
		})
	}).Width(380)
}
