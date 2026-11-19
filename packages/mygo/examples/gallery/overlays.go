package main

import (
	"github.com/AstraFoundry/design/packages/mygo/sunbeam"
	"github.com/egoist/mygo/ui"
)

// overlays is the state of the gallery's third window: lists, menus,
// dialogs and the parts that float.
type overlays struct {
	region      string
	regionState sunbeam.SelectState
	font        string
	fontState   sunbeam.ComboboxState
	size        string
	seats       float64
	seatsState  sunbeam.NumberInputState
	menu        bool
	grid        bool
	popover     bool
	dialog      bool
	faq         bool
}

func newOverlays() *overlays {
	return &overlays{region: "Frankfurt", font: "IBM Plex Sans", size: "Team", seats: 5, grid: true}
}

func (app *overlays) view(c *ui.Context) {
	sunbeam.Use(c)
	p := sunbeam.Colors(c)
	ui.Column(c).Fill().Padding(24).Gap(20).Children(func() {
		ui.Row(c).Gap(12).AlignItems(ui.Center).Children(func() {
			sunbeam.Select(c, &app.regionState, &app.region, []string{"Frankfurt", "Singapore", "Tokyo"}).Label("Region")
			sunbeam.Combobox(c, &app.fontState, &app.font, []string{"IBM Plex Sans", "Fraunces", "JetBrains Mono"}).Label("Font").Width(200)
			sunbeam.NumberInput(c, &app.seatsState, &app.seats, 1, 50, 1, "Fewer seats", "More seats").Label("Seats").Width(140)
			sunbeam.Menu(c, &app.menu, "Actions", func(m sunbeam.MenuBuilder) {
				m.Item("Rename")
				m.Submenu("Share", func(s sunbeam.MenuBuilder) {
					s.Item("Copy link")
					s.Item("Invite people")
				})
				m.Item("Duplicate")
				m.Separator()
				m.Check("Show grid", &app.grid)
			})
			share := sunbeam.Button(c, "Share")
			if share.Clicked() {
				app.popover = true
			}
			sunbeam.Popover(c, share, &app.popover, func() {
				ui.Text(c, "Share this board").FontWeight(500)
				ui.Text(c, "Anyone with the link can view it.").TextColor(p.MutedForeground)
			})
			if sunbeam.PrimaryButton(c, "Invite").Clicked() {
				app.dialog = true
			}
			sunbeam.Dialog(c, &app.dialog, "Invite people", func() {
				ui.Text(c, "They get an email with a link to join.").TextColor(p.MutedForeground)
				ui.Row(c).Gap(8).Children(func() {
					ui.Box(c).Grow(1)
					if sunbeam.Button(c, "Cancel").Clicked() {
						app.dialog = false
					}
					sunbeam.PrimaryButton(c, "Send invite")
				})
			})
		})
		ui.Row(c).Gap(24).AlignItems(ui.Start).Children(func() {
			sunbeam.Card(c, func() {
				ui.Row(c).Gap(10).AlignItems(ui.Center).Children(func() {
					for _, n := range []string{"Ada Lovelace", "Grace Hopper", "Alan Turing"} {
						sunbeam.Avatar(c, n)
					}
					sunbeam.Spinner(c).Label("Syncing")
				})
				sunbeam.Meter(c, 0.72, 0, 1).Label("Storage")
				sunbeam.RadioGroup(c, &app.size, "Solo", "Team", "Enterprise").Label("Plan")
			}).Width(300)
			sunbeam.Card(c, func() {
				sunbeam.Accordion(c, &app.faq, "Does it work without Tailwind?", func() {
					ui.Text(c, "The MyGo package draws the same components natively.")
				})
			}).Width(360)
		})
		sunbeam.Toasts(c, "Dismiss")
	})
}
