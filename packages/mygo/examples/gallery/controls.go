package main

import (
	"github.com/AstraFoundry/design/packages/mygo/sunbeam"
	"github.com/egoist/mygo/ui"
)

// controls is the state of the gallery's second window: forms and display.
type controls struct {
	sync, beta bool
	remember   bool
	bold       bool
	tab        int
	volume     float64
	email      string
	search     string
	progress   float64
}

func newControls() *controls {
	return &controls{sync: true, remember: false, volume: 60, progress: 0.64, email: "ada@astra.so"}
}

func (app *controls) view(c *ui.Context) {
	sunbeam.Use(c)
	p := sunbeam.Colors(c)
	ui.Column(c).Fill().Padding(24).Gap(20).Children(func() {
		ui.Row(c).Gap(12).AlignItems(ui.Center).Children(func() {
			ui.Text(c, "Flat").TextColor(p.MutedForeground).Grow(1)
			sunbeam.Tabs(c, &app.tab, "Overview", "Activity", "Settings").Label("Section")
			sunbeam.Toggle(c, &app.bold, "Bold")
		})
		ui.Row(c).Gap(24).AlignItems(ui.Start).Children(func() {
			sunbeam.Card(c, func() {
				ui.Row(c).Gap(8).AlignItems(ui.Center).Children(func() {
					ui.Text(c, "Storage").FontWeight(500).Grow(1)
					sunbeam.Badge(c, "Healthy")
				})
				ui.Text(c, "7.2 GB of 10 GB used").TextColor(p.MutedForeground).FontSize(sunbeam.TypeBodySM.Size)
				sunbeam.Progress(c, 0.72).Label("Storage used")
				sunbeam.Divider(c)
				sunbeam.TextInput(c, &app.email, "ada@astra.so").Label("Work email")
				sunbeam.Checkbox(c, &app.remember, "Remember this device")
			}).Width(320)
			sunbeam.Panel(c, func() { app.panel(c) }).Width(300)
			sunbeam.Scheme(c, true, func() {
				sunbeam.Panel(c, func() { app.panel(c) }).Width(300)
			})
		})
	})
}

func (app *controls) panel(c *ui.Context) {
	ui.Column(c).Padding(8).Gap(14).Children(func() {
		ui.Row(c).Gap(10).AlignItems(ui.Center).Children(func() {
			sunbeam.Switch(c, &app.sync).Label("Sync")
			ui.Text(c, "Sync over cellular").Grow(1)
		})
		ui.Row(c).Gap(10).AlignItems(ui.Center).Children(func() {
			sunbeam.Switch(c, &app.beta).Label("Beta")
			ui.Text(c, "Beta features").Grow(1)
		})
		sunbeam.Slider(c, &app.volume, 0, 100).Label("Volume").FillWidth()
		sunbeam.Progress(c, app.progress).Label("Upload")
		sunbeam.TextInput(c, &app.search, "Search").Label("Search")
	})
}
