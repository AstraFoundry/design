// Command gallery shows Sunbeam's MyGo components in both materials: the
// window's flat chrome, and raised panels in light and dark.
//
//	go run ./examples/gallery
package main

import (
	"log"

	"github.com/egoist/mygo"
	"github.com/egoist/mygo/ui"
)

func main() {
	app := &gallery{background: 1}
	mygo.App.WhenReady(func() {
		mygo.NewWindow(mygo.WindowOptions{
			Title:   "Sunbeam",
			Width:   900,
			Height:  460,
			Content: ui.View(app.view),
		})
	})
	if err := mygo.App.Run(); err != nil {
		log.Fatal(err)
	}
}
