package sunbeam

import (
	"testing"
	"time"

	"github.com/egoist/mygo/ui"
)

// menuApp has a menu whose middle item opens a submenu.
type menuApp struct{ open bool }

func (a *menuApp) view(c *ui.Context) {
	Use(c)
	ui.Column(c).Padding(20).Children(func() {
		Menu(c, &a.open, "Actions", func(m MenuBuilder) {
			m.Item("Rename")
			m.Submenu("Share", func(s MenuBuilder) {
				s.Item("Copy link")
				s.Item("Invite people")
				s.Item("Publish to web")
			})
			m.Item("Duplicate")
			m.Item("Archive")
		})
	})
}

func center(r ui.Rect) (float32, float32) { return r.X + r.W/2, r.Y + r.H/2 }

// openShare opens the menu and moves the pointer onto Share, opening its
// submenu, and returns where Share and the submenu's last item are.
func openShare(t *testing.T) (*ui.Tester, ui.Rect, ui.Rect) {
	t.Helper()
	a := &menuApp{}
	tt := ui.NewTester(a.view, 600, 400)
	if err := tt.Click("Actions"); err != nil {
		t.Fatal(err)
	}
	share, ok := tt.Find("Share")
	if !ok {
		t.Fatal("no Share item")
	}
	x, y := center(share)
	tt.Move(x, y)
	tt.Frame()
	publish, ok := tt.Find("Publish to web")
	if !ok {
		t.Fatal("moving onto Share did not open its submenu")
	}
	return tt, share, publish
}

// A diagonal move from Share toward the submenu's lower items passes over
// Duplicate; the submenu stays, as the pointer is on its way to it.
func TestSubmenuSurvivesADiagonalAim(t *testing.T) {
	tt, share, publish := openShare(t)
	sx, sy := center(share)
	px, py := publish.X+8, publish.Y+publish.H/2
	// Step across, through Duplicate's row, toward Publish to web.
	for i := 1; i <= 6; i++ {
		f := float32(i) / 7
		tt.Move(sx+(px-sx)*f, sy+(py-sy)*f)
		tt.Advance(16 * time.Millisecond)
		tt.Frame()
		if !tt.HasText("Publish to web") {
			t.Fatalf("step %d at (%.0f, %.0f): the submenu closed on the way to it", i, sx+(px-sx)*f, sy+(py-sy)*f)
		}
	}
	tt.Move(px, py)
	tt.Frame()
	if !tt.HasText("Publish to web") {
		t.Fatal("the submenu closed as the pointer reached it")
	}
}

// Resting on Duplicate rather than passing through it means the user
// wants Duplicate: the submenu closes after a short wait.
func TestSubmenuClosesWhenThePointerRestsElsewhere(t *testing.T) {
	tt, _, _ := openShare(t)
	dup, _ := tt.Find("Duplicate")
	x, y := center(dup)
	tt.Move(x, y)
	tt.Frame()
	tt.Advance(aimRest + 50*time.Millisecond)
	tt.Frame()
	tt.Frame()
	if tt.HasText("Publish to web") {
		t.Error("the submenu stayed open while the pointer rested on Duplicate")
	}
}

// Moving away from the submenu, not toward it, switches at once.
func TestSubmenuClosesWhenThePointerMovesAway(t *testing.T) {
	tt, share, _ := openShare(t)
	rename, _ := tt.Find("Rename")
	x, y := center(rename)
	_, sy := center(share)
	tt.Move(x-30, (sy+y)/2)
	tt.Frame()
	tt.Move(x-30, y)
	tt.Frame()
	tt.Move(x, y)
	tt.Frame()
	if tt.HasText("Publish to web") {
		t.Error("the submenu stayed open while the pointer moved away from it")
	}
}

// Once the pointer rests on an item the triangle crossed, the item is the
// pointer's again: it can be chosen.
func TestAnItemCanBeChosenAfterTheRest(t *testing.T) {
	a := &menuApp{}
	chosen := ""
	view := func(c *ui.Context) {
		Use(c)
		ui.Column(c).Padding(20).Children(func() {
			Menu(c, &a.open, "Actions", func(m MenuBuilder) {
				m.Submenu("Share", func(s MenuBuilder) { s.Item("Copy link") })
				if m.Item("Duplicate").Clicked() {
					chosen = "Duplicate"
				}
			})
		})
	}
	tt := ui.NewTester(view, 600, 400)
	if err := tt.Click("Actions"); err != nil {
		t.Fatal(err)
	}
	share, _ := tt.Find("Share")
	tt.Move(center(share))
	tt.Frame()
	dup, _ := tt.Find("Duplicate")
	tt.Move(dup.X+dup.W*0.8, dup.Y+dup.H/2)
	tt.Frame()
	tt.Advance(aimRest + 50*time.Millisecond)
	tt.Frame()
	if err := tt.Click("Duplicate"); err != nil {
		t.Fatal(err)
	}
	if chosen != "Duplicate" {
		t.Errorf("chose %q, want Duplicate", chosen)
	}
}
