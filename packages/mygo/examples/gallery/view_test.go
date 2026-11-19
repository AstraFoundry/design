package main

import (
	"image/png"
	"os"
	"testing"
	"time"

	"github.com/egoist/mygo/ui"
)

// TestGallery clicks through the gallery. With SUNBEAM_SNAPSHOT set to a
// directory, it also writes the gallery there, light and dark, at 2x.
func TestGallery(t *testing.T) {
	app := &gallery{background: 1}
	tt := ui.NewTester(app.view, 900, 460)
	if err := tt.Click("Week"); err != nil {
		t.Fatal(err)
	}
	if app.period != 1 {
		t.Errorf("period %d after clicking Week, want 1", app.period)
	}
	if err := tt.Click("Capture in portrait mode"); err != nil {
		t.Fatal(err)
	}
	if app.captures != 1 {
		t.Errorf("captures %d, want 1", app.captures)
	}
	if dir := os.Getenv("SUNBEAM_SNAPSHOT"); dir != "" {
		for _, mode := range []struct {
			name string
			dark bool
		}{{"light", false}, {"dark", true}} {
			st := ui.NewTesterWith(app.view, 900, 460, ui.TesterOptions{Dark: mode.dark})
			st.SetScale(2)
			st.Frame()
			f, err := os.Create(dir + "/mygo-gallery-" + mode.name + ".png")
			if err != nil {
				t.Fatal(err)
			}
			if err := png.Encode(f, st.Image()); err != nil {
				t.Fatal(err)
			}
			f.Close()
		}
	}
}

// TestControls clicks through the second window, and with SUNBEAM_SNAPSHOT
// set writes it, light and dark, at 2x.
func TestControls(t *testing.T) {
	app := newControls()
	tt := ui.NewTester(app.view, 1000, 420)
	if err := tt.Click("Activity"); err != nil {
		t.Fatal(err)
	}
	if app.tab != 1 {
		t.Errorf("tab %d after clicking Activity, want 1", app.tab)
	}
	if err := tt.Click("Remember this device"); err != nil {
		t.Fatal(err)
	}
	if !app.remember {
		t.Error("the check box is not checked after a click")
	}
	if dir := os.Getenv("SUNBEAM_SNAPSHOT"); dir != "" {
		for _, mode := range []struct {
			name string
			dark bool
		}{{"light", false}, {"dark", true}} {
			st := ui.NewTesterWith(app.view, 1000, 420, ui.TesterOptions{Dark: mode.dark})
			st.SetScale(2)
			st.Frame()
			f, err := os.Create(dir + "/mygo-controls-" + mode.name + ".png")
			if err != nil {
				t.Fatal(err)
			}
			if err := png.Encode(f, st.Image()); err != nil {
				t.Fatal(err)
			}
			f.Close()
		}
	}
}

// TestOverlays opens the floating parts and, with SUNBEAM_SNAPSHOT set,
// writes them, light and dark, with the menu open.
func TestOverlays(t *testing.T) {
	app := newOverlays()
	tt := ui.NewTester(app.view, 1100, 460)
	if err := tt.Click("Actions"); err != nil {
		t.Fatal(err)
	}
	if !tt.HasText("Duplicate") {
		t.Fatal("the menu did not open")
	}
	if dir := os.Getenv("SUNBEAM_SNAPSHOT"); dir != "" {
		for _, mode := range []struct {
			name string
			dark bool
		}{{"light", false}, {"dark", true}} {
			shot := newOverlays()
			st := ui.NewTesterWith(shot.view, 1100, 460, ui.TesterOptions{Dark: mode.dark})
			st.SetScale(2)
			if err := st.Click("Actions"); err != nil {
				t.Fatal(err)
			}
			// Open Share's submenu: the row under Rename (the toolbar has a
			// Share button too, which Find would match first).
			if r, ok := st.Find("Rename"); ok {
				st.Move(r.X+r.W/2, r.Y+r.H/2+34)
				st.Frame()
			}
			st.Advance(DurationSettle)
			st.Frame()
			f, err := os.Create(dir + "/mygo-overlays-" + mode.name + ".png")
			if err != nil {
				t.Fatal(err)
			}
			if err := png.Encode(f, st.Image()); err != nil {
				t.Fatal(err)
			}
			f.Close()
		}
	}
}

// DurationSettle lets a popup finish its entrance before a snapshot.
const DurationSettle = 500 * time.Millisecond
