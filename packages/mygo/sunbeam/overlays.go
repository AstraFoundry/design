package sunbeam

import (
	"strconv"
	"strings"
	"time"

	"github.com/egoist/mygo/ui"
)

// Sizes of the floating layers, in DIPs: a list's 14-DIP corners less its
// 4-DIP inset are its rows' 10, and a dialog's tile corners less its
// 24-DIP inset keep its controls inside them.
const (
	popupRadius  float32 = RadiusXL
	popupInset   float32 = 4
	rowHeight    float32 = 32
	rowRadius    float32 = RadiusLG
	dialogInset  float32 = 24
	dialogWidth  float32 = 440
	toastWidth   float32 = 352
	toastRadius  float32 = 22
	tooltipInset float32 = 6
)

// lastPopupMaterial is the material the last floating layer was built in,
// for the tests.
var lastPopupMaterial Material

// popupLayer gives panel the surface of a floating list or popover and
// builds its content in a raised layer.
func popupLayer(c *ui.Context, panel ui.Element, radius, inset float32, build func()) {
	PanelSurface(c, panel)
	panel.Radius(radius).Padding(inset).Gap(2).MinWidth(176)
	panel.Children(func() {
		Layer(Raised, func() {
			lastPopupMaterial = Current()
			build()
		})
	})
}

// row styles an item of a list or menu: 32 DIPs, 10-DIP corners, a flat
// hover fill while highlighted.
func row(c *ui.Context, e ui.Element) ui.Element {
	p := Colors(c)
	e.Height(rowHeight).PaddingX(10).Radius(rowRadius).Row().Gap(8).AlignItems(ui.Center).
		Cursor(ui.CursorDefault).TextColor(p.Foreground)
	if e.Highlighted() {
		e.Background(p.FlatFaceHover)
	}
	return e
}

/* ------------------------------------------------------------- choices */

// RadioGroup is a column of radio buttons choosing one of options into
// *selected. A chosen radio fills with ink around a light dot. Name the
// group with Label.
func RadioGroup(c *ui.Context, selected *string, options ...string) ui.Element {
	p := Colors(c)
	return ui.RadioGroup(c, func() {
		for _, option := range options {
			r := ui.RadioBase(c, selected, option).Row().Gap(8).AlignItems(ui.Center).Cursor(ui.CursorPointer)
			r.Children(func() {
				dot := ui.Box(c).Size(checkSize, checkSize).Radius(checkSize / 2).Center()
				if *selected == option {
					dot.Background(checkedFill(p)).Border(1, checkedFill(p))
				} else {
					Field(c, dot)
					dot.Radius(checkSize / 2)
				}
				dot.Children(func() {
					if *selected == option {
						ui.Box(c).Size(6, 6).Radius(3).Background(p.Background)
					}
				})
				ui.Text(c, option).FontSize(TypeBodySM.Size)
			})
		}
	}).Gap(10)
}

// NumberInputState is what a NumberInput keeps between frames: the text
// being typed. Keep one in the app's state for each NumberInput.
type NumberInputState struct {
	Text    string
	editing bool
}

// NumberInput is one field face holding *value between lo and hi, with a
// flat "fewer" button before it and a "more" button after, named by
// decrease and increase. Up and Down step while the field has the focus.
// Name it with Label.
func NumberInput(c *ui.Context, state *NumberInputState, value *float64, lo, hi, step float64, decrease, increase string) ui.Element {
	p := Colors(c)
	clamp := func(v float64) float64 { return min(max(v, lo), hi) }
	format := func(v float64) string { return strconv.FormatFloat(v, 'f', decimals(step), 64) }
	if !state.editing {
		state.Text = format(*value)
	}
	group := ui.Row(c).Height(fieldHeight).Padding(4).Gap(2).AlignItems(ui.Center).Role(ui.RoleGroup)
	Field(c, group)
	stepButton := func(icon *ui.SVG, name string, delta float64) {
		b := ui.ButtonBase(c).Size(fieldHeight-8, fieldHeight-8).Radius(6).Center().Label(name).
			Cursor(ui.CursorPointer).TextColor(p.MutedForeground)
		disabled := (delta < 0 && *value <= lo) || (delta > 0 && *value >= hi)
		switch {
		case disabled:
			b.Opacity(0.4)
		case b.Pressed():
			b.Background(p.FlatFacePressed).TextColor(p.Foreground)
		case b.Hovered():
			b.Background(p.FlatFaceHover).TextColor(p.Foreground)
		}
		b.Children(func() { ui.Icon(c, icon).Size(14, 14) })
		if b.Clicked() && !disabled {
			*value = clamp(*value + delta)
			state.editing = false
			state.Text = format(*value)
		}
	}
	return group.Children(func() {
		stepButton(minus, decrease, -step)
		input := ui.TextInputBase(c, &state.Text).Grow(1).MinWidth(32).TextAlign(ui.Center).
			FontSize(TypeBodySM.Size).TextColor(p.Foreground)
		if input.Focused() {
			state.editing = true
			if v, err := strconv.ParseFloat(strings.TrimSpace(state.Text), 64); err == nil {
				*value = clamp(v)
			}
		} else {
			state.editing = false
		}
		stepButton(plus, increase, step)
	})
}

// decimals is how many decimals step has, to write values in.
func decimals(step float64) int {
	s := strconv.FormatFloat(step, 'f', -1, 64)
	if i := strings.IndexByte(s, '.'); i >= 0 {
		return len(s) - i - 1
	}
	return 0
}

// SelectState is what a Select keeps between frames: whether its list
// shows. Keep one in the app's state for each Select.
type SelectState struct{ Open bool }

// Select is a field showing *selected that opens the options in a raised
// list below it, the choice marked with an ink check. Name it with Label.
func Select(c *ui.Context, state *SelectState, selected *string, options []string) ui.Element {
	p := Colors(c)
	m := ui.MenuBase(c, &state.Open)
	trigger := m.Trigger.Height(fieldHeight).MinWidth(160).PaddingX(12).Row().Gap(8).
		AlignItems(ui.Center).Cursor(ui.CursorPointer).TextColor(p.Foreground)
	Field(c, trigger)
	trigger.Children(func() {
		ui.Text(c, *selected).SingleLine().FontSize(TypeBodySM.Size).Grow(1)
		ui.Icon(c, chevronsUpDown).Size(14, 14).TextColor(p.MutedForeground)
	})
	m.Popup(func(panel ui.Element) {
		popupLayer(c, panel, popupRadius, popupInset, func() {
			for _, option := range options {
				item := row(c, m.RadioItem(option == *selected))
				item.Children(func() {
					ui.Text(c, option).SingleLine().FontSize(TypeBodySM.Size).Grow(1)
					if option == *selected {
						ui.Icon(c, check).Size(14, 14).TextColor(p.Foreground)
					}
				})
				if item.Clicked() {
					*selected = option
				}
			}
		})
	})
	return trigger
}

// ComboboxState is what a Combobox keeps between frames: the text in its
// field. Keep one in the app's state for each Combobox.
type ComboboxState struct{ Text string }

// Combobox is a field that filters options as the user types, choosing
// one into *selected, its options in a raised list. Name it with Label.
func Combobox(c *ui.Context, state *ComboboxState, selected *string, options []string) ui.Element {
	p := Colors(c)
	if state.Text == "" && !strings.EqualFold(state.Text, *selected) {
		state.Text = *selected
	}
	text := &state.Text
	cb := ui.ComboboxBase(c, text)
	input := cb.Input.Height(fieldHeight).PaddingX(12).FontSize(TypeBodySM.Size).TextColor(p.Foreground)
	Field(c, input)
	cb.Popup(func(panel ui.Element) {
		popupLayer(c, panel, popupRadius, popupInset, func() {
			query := strings.ToLower(*text)
			for _, option := range options {
				if cb.Filtering() && !strings.Contains(strings.ToLower(option), query) {
					continue
				}
				item := row(c, cb.Item(option))
				item.Children(func() {
					ui.Text(c, option).SingleLine().FontSize(TypeBodySM.Size).Grow(1)
					if option == *selected {
						ui.Icon(c, check).Size(14, 14).TextColor(p.Foreground)
					}
				})
			}
		})
	})
	if v, ok := cb.Chosen(); ok {
		*selected = v
		*text = v
	}
	return input
}

/* ------------------------------------------------------------ overlays */

// MenuBuilder adds the rows of a Menu.
type MenuBuilder struct {
	c   *ui.Context
	m   ui.MenuParts
	aim *menuAim
}

// aimed lets the pointer pass over row on its way to an open submenu: the
// row ignores the pointer while it is inside the safe triangle.
func (b MenuBuilder) aimed(row ui.Element) ui.Element {
	if b.aim != nil {
		b.aim.see(row)
	}
	return row
}

// Item adds an action; its Clicked reports a choice, which closes the menu.
func (b MenuBuilder) Item(text string) ui.Element {
	item := row(b.c, b.aimed(b.m.Item()))
	return item.Children(func() { ui.Text(b.c, text).SingleLine().FontSize(TypeBodySM.Size) })
}

// Check adds an item that turns a setting on and off, with an ink check
// while on.
func (b MenuBuilder) Check(text string, on *bool) ui.Element {
	p := Colors(b.c)
	item := row(b.c, b.aimed(b.m.CheckItem(*on)))
	item.Children(func() {
		ui.Box(b.c).Size(14, 14).Children(func() {
			if *on {
				ui.Icon(b.c, check).Size(14, 14).TextColor(p.Foreground)
			}
		})
		ui.Text(b.c, text).SingleLine().FontSize(TypeBodySM.Size)
	})
	if item.Clicked() {
		*on = !*on
	}
	return item
}

// aimRest is how long the pointer may rest over another item, while a
// submenu is open, before that item takes over: a pause means the user
// wants it, a passing pointer is on its way to the submenu.
const aimRest = 300 * time.Millisecond

// Submenu adds an item labelled text that opens build's items in a raised
// list beside it, as the pointer moves onto it or Right is pressed.
func (b MenuBuilder) Submenu(text string, build func(m MenuBuilder)) ui.Element {
	p := Colors(b.c)
	item := b.m.SubmenuItem()
	if b.aim != nil {
		b.aim.see(item)
	}
	b.m.Submenu(item, func(panel ui.Element) {
		popupLayer(b.c, panel, popupRadius, popupInset, func() {
			build(MenuBuilder{c: b.c, m: b.m})
		})
		if b.aim != nil {
			b.aim.track(item, panel)
		}
	})
	row(b.c, item)
	item.Children(func() {
		ui.Text(b.c, text).SingleLine().FontSize(TypeBodySM.Size).Grow(1)
		ui.Icon(b.c, chevronRight).Size(14, 14).TextColor(p.MutedForeground)
	})
	return item
}

// menuAim is the safe triangle of a menu with an open submenu: from where
// the pointer left the submenu's item to the submenu's two near corners.
// While the pointer moves inside it, it is on its way to the submenu, and
// the rows it crosses do not take over; resting for aimRest, or leaving
// the triangle, gives them the pointer back. It keeps plain values only:
// elements live one frame.
type menuAim struct {
	item    ui.Rect    // the submenu's item, in window DIPs
	sub     ui.Rect    // the submenu
	from    [2]float32 // where the pointer was as it left the item
	last    [2]float32 // where it was when it last moved
	moved   time.Time  // when it last moved
	shown   bool       // a submenu showed in the last frame
	showing bool       // one shows in the frame being built
	// pointer is where the pointer is in this frame, nil until a row of the
	// menu reports it.
	pointer *[2]float32
}

// begin starts a frame of the menu.
func (a *menuAim) begin() {
	a.shown, a.showing, a.pointer = a.showing, false, nil
}

// track records the open submenu, from its item and panel.
func (a *menuAim) track(item, panel ui.Element) {
	a.item, a.sub, a.showing = item.Bounds(), panel.Bounds(), true
}

// see records where the pointer is, read through a row of the menu.
func (a *menuAim) see(row ui.Element) {
	if a.pointer != nil {
		return
	}
	px, py, _ := row.PointerPosition()
	r := row.Bounds()
	if r.W == 0 {
		return
	}
	a.pointer = &[2]float32{r.X + px, r.Y + py}
}

// takes reports whether the pointer at (x, y), at frame time now, is on
// its way to the submenu: outside the item and the submenu, inside the
// triangle, and moving, or still for less than aimRest.
func (a *menuAim) takes(x, y float32, now time.Time) bool {
	if !a.shown || a.sub.W == 0 || inRect(x, y, a.item) || inRect(x, y, a.sub) {
		return false
	}
	if !inTriangle(x, y, a.from, a.sub) {
		return false
	}
	if p := [2]float32{x, y}; p != a.last {
		a.last, a.moved = p, now
	}
	return now.Sub(a.moved) < aimRest
}

// shield lays a transparent element over the rows of the menu that takes
// the pointer while it is on its way to the open submenu, so the rows it
// crosses are not hovered and do not take over. Its hit test runs with the
// pointer as it is, so a row never sees the pointer first.
func (a *menuAim) shield(c *ui.Context) {
	if a.pointer != nil && inRect(a.pointer[0], a.pointer[1], a.item) {
		// Still on the item: the triangle starts from here.
		a.from, a.last, a.moved = *a.pointer, *a.pointer, c.Now()
	}
	if !a.shown {
		return
	}
	now := c.Now()
	if a.pointer != nil && a.takes(a.pointer[0], a.pointer[1], now) {
		// Look again once a rest would be over, in case the pointer stops.
		c.After(aimRest - now.Sub(a.moved))
	}
	ui.Box(c).Absolute().Top(0).Left(0).Right(0).Bottom(0).ZIndex(10).AccessHidden(true).
		HitTest(func(x, y float32, _ ui.Rect) bool { return a.takes(x, y, now) })
}

func inRect(x, y float32, r ui.Rect) bool {
	return x >= r.X && x < r.X+r.W && y >= r.Y && y < r.Y+r.H
}

// inTriangle reports whether (x, y) lies in the triangle from from to the
// near side of sub: its left side, or its right one when sub opens to the
// left (as it does right to left).
func inTriangle(x, y float32, from [2]float32, sub ui.Rect) bool {
	near := sub.X
	if sub.X+sub.W/2 < from[0] {
		near = sub.X + sub.W
	}
	// A few DIPs of slack, so a pointer starting at the item's edge counts.
	const slack = 6
	a := [2]float32{from[0], from[1]}
	b := [2]float32{near, sub.Y - slack}
	c := [2]float32{near, sub.Y + sub.H + slack}
	side := func(p, q, r [2]float32) float32 {
		return (p[0]-r[0])*(q[1]-r[1]) - (q[0]-r[0])*(p[1]-r[1])
	}
	pt := [2]float32{x, y}
	d1, d2, d3 := side(pt, a, b), side(pt, b, c), side(pt, c, a)
	neg := d1 < 0 || d2 < 0 || d3 < 0
	pos := d1 > 0 || d2 > 0 || d3 > 0
	return !(neg && pos)
}

// Separator adds a hairline between groups of items.
func (b MenuBuilder) Separator() {
	ui.Box(b.c).Height(1).FillWidth().Margin(4, -popupInset).Background(Colors(b.c).Border)
}

// Menu is a button labelled text that opens build's items in a raised
// list below it. *open is whether the list shows.
func Menu(c *ui.Context, open *bool, text string, build func(m MenuBuilder)) ui.Element {
	m := ui.MenuBase(c, open)
	trigger := m.Trigger.Height(controlHeight).Padding(0, 16).Radius(controlHeight / 2).
		Center().Cursor(ui.CursorPointer).TextColor(Colors(c).Foreground)
	Face(c, trigger)
	trigger.Children(func() { label(c, text) })
	aim := aims.of(open)
	aim.begin()
	m.Popup(func(panel ui.Element) {
		popupLayer(c, panel, popupRadius, popupInset, func() {
			build(MenuBuilder{c: c, m: m, aim: aim})
			aim.shield(c)
		})
	})
	if !*open {
		*aim = menuAim{}
	}
	return trigger
}

// aimStore keeps each menu's safe triangle between frames, keyed by the
// menu's open flag, which the app keeps.
type aimStore map[*bool]*menuAim

var aims = aimStore{}

func (s aimStore) of(open *bool) *menuAim {
	if a, ok := s[open]; ok {
		return a
	}
	a := &menuAim{}
	s[open] = a
	return a
}

// Popover shows build's content in a raised layer below anchor while
// *open: 22-DIP corners less a 16-DIP inset. A press outside it or Escape
// closes it.
func Popover(c *ui.Context, anchor ui.Element, open *bool, build func()) ui.Element {
	return ui.PopoverBase(c, anchor, open, func(panel ui.Element) {
		panel.MarginStart(0).Margin(8, 0)
		popupLayer(c, panel, 22, 16, build)
		panel.Gap(8).MinWidth(240)
	})
}

// Dialog shows a raised layer titled title over an ink scrim while *open,
// building its content below the title. Clicking the scrim or Escape
// closes it. Assistive technology sees a dialog named by the title.
func Dialog(c *ui.Context, open *bool, title string, build func()) ui.Element {
	p := Colors(c)
	return ui.DialogBase(c, open, func(backdrop, panel ui.Element) {
		backdrop.Background(p.Scrim.Alpha(0.28))
		PanelSurface(c, panel)
		panel.Width(dialogWidth).Padding(dialogInset).Gap(12).Label(title)
		panel.Children(func() {
			Layer(Raised, func() {
				lastPopupMaterial = Current()
				ui.Text(c, title).FontSize(TypeHeadlineMD.Size - 6).FontWeight(500)
				build()
			})
		})
	})
}

// Toasts shows the window's toasts (Context.AddToast) as raised notes at
// the bottom end of the window, each with a close button named closeLabel
// and, for a "success", "error" or "info" Type, a status dot.
func Toasts(c *ui.Context, closeLabel string) ui.Element {
	p := Colors(c)
	return ui.ToastViewportBase(c, func(viewport ui.Element, toasts []ui.Toast) {
		viewport.Absolute().Right(24).Bottom(24).Gap(10).Width(toastWidth)
		for _, t := range toasts {
			toast := ui.ToastBase(c, t)
			root := toast.Root.Row().Gap(12).Padding(14, 14).AlignItems(ui.Start)
			PanelSurface(c, root)
			root.Radius(toastRadius)
			root.Children(func() {
				Layer(Raised, func() {
					lastPopupMaterial = Current()
					if dot := statusColor(p, t.Type); dot != nil {
						ui.Box(c).Size(8, 8).Radius(4).Background(*dot).Margin(6, 0, 0, 0)
					}
					ui.Column(c).Grow(1).Gap(2).Children(func() {
						ui.Text(c, t.Title).FontSize(TypeBodySM.Size).FontWeight(500)
						if t.Description != "" {
							ui.Text(c, t.Description).FontSize(TypeBodySM.Size).TextColor(p.MutedForeground)
						}
					})
					close := toast.CloseButton().Size(28, 28).Radius(14).Center().Label(closeLabel).
						TextColor(p.MutedForeground).Cursor(ui.CursorPointer)
					if close.Hovered() {
						close.Background(p.FlatFaceHover)
					}
					close.Children(func() { ui.Icon(c, xMark).Size(14, 14) })
				})
			})
		}
	})
}

// statusColor is the dot of a status: success, danger (or "error") and
// info; nil for none.
func statusColor(p *Palette, kind string) *ui.Color {
	switch kind {
	case "success":
		return &p.Success
	case "error", "danger":
		return &p.Danger
	case "info":
		return &p.Info
	}
	return nil
}

// Tooltip names e with text, shown as MyGo's own tooltip. It is a short
// label for a control that shows only an icon.
func Tooltip(e ui.Element, text string) ui.Element {
	return e.Tooltip(text)
}

/* -------------------------------------------------------------- icons */

func lucide(paths string) *ui.SVG {
	return ui.MustParseSVG([]byte(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` + paths + `</svg>`))
}

var (
	check          = lucide(`<path d="M20 6 9 17l-5-5"/>`)
	chevronsUpDown = lucide(`<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>`)
	chevronDown    = lucide(`<path d="m6 9 6 6 6-6"/>`)
	xMark          = lucide(`<path d="M18 6 6 18M6 6l12 12"/>`)
	minus          = lucide(`<path d="M5 12h14"/>`)
	chevronRight   = lucide(`<path d="m9 18 6-6-6-6"/>`)
	plus           = lucide(`<path d="M5 12h14M12 5v14"/>`)
)
