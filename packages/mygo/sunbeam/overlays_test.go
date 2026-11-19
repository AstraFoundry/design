package sunbeam

import (
	"testing"

	"github.com/egoist/mygo/ui"
)

// layerOf records the material of the layer something is built in.
var layerOf = map[string]Material{}

func TestRadioGroupChoosesInInk(t *testing.T) {
	size := "Medium"
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		RadioGroup(c, &size, "Small", "Medium", "Large").Label("Size")
	}, 300, 160)
	if _, ok := tt.AccessByRole(ui.RoleRadioGroup, "Size"); !ok {
		t.Fatal("no radio group named Size")
	}
	if err := tt.Click("Large"); err != nil {
		t.Fatal(err)
	}
	if size != "Large" {
		t.Errorf("size %q after clicking Large", size)
	}
}

func TestNumberInputSteps(t *testing.T) {
	seats := 3.0
	var state NumberInputState
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		NumberInput(c, &state, &seats, 1, 50, 1, "Fewer seats", "More seats").Label("Seats").Width(160)
	}, 300, 80)
	group, ok := tt.AccessByRole(ui.RoleGroup, "Seats")
	if !ok {
		t.Fatal("no number field named Seats")
	}
	// Its face is the layer's field: as tall as the other fields.
	if group.Bounds.H != fieldHeight {
		t.Errorf("number field is %v tall, want %v", group.Bounds.H, fieldHeight)
	}
	if err := tt.Click("More seats"); err != nil {
		t.Fatal(err)
	}
	if seats != 4 {
		t.Errorf("seats %v after More seats, want 4", seats)
	}
	if field, ok := tt.AccessByRole(ui.RoleTextField, ""); !ok || field.Value != "4" {
		t.Errorf("the field shows %q, want 4", field.Value)
	}
}

func TestSelectOpensARaisedListAndChooses(t *testing.T) {
	region := "Frankfurt"
	var state SelectState
	view := func(c *ui.Context) {
		Use(c)
		Select(c, &state, &region, []string{"Frankfurt", "Singapore", "Tokyo"}).Label("Region")
	}
	tt := ui.NewTester(view, 400, 300)
	if err := tt.Click("Frankfurt"); err != nil {
		t.Fatal(err)
	}
	if !tt.HasText("Tokyo") {
		t.Fatal("the list did not open")
	}
	if lastPopupMaterial != Raised {
		t.Errorf("the list is %v, want raised", lastPopupMaterial)
	}
	if err := tt.Click("Tokyo"); err != nil {
		t.Fatal(err)
	}
	if region != "Tokyo" {
		t.Errorf("region %q after choosing Tokyo", region)
	}
}

func TestComboboxIsAField(t *testing.T) {
	font := "Plex"
	var state ComboboxState
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Combobox(c, &state, &font, []string{"Plex", "Fraunces", "Mono"}).Label("Font")
	}, 300, 200)
	if _, ok := tt.AccessByRole(ui.RoleComboBox, "Font"); !ok {
		t.Fatal("no combobox named Font")
	}
}

func TestMenuItemsRunInARaisedLayer(t *testing.T) {
	open := false
	renamed := 0
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		Menu(c, &open, "Actions", func(m MenuBuilder) {
			if m.Item("Rename").Clicked() {
				renamed++
			}
			m.Separator()
			m.Item("Delete")
		})
	}, 400, 300)
	if err := tt.Click("Actions"); err != nil {
		t.Fatal(err)
	}
	if lastPopupMaterial != Raised {
		t.Errorf("the menu is %v, want raised", lastPopupMaterial)
	}
	if err := tt.Click("Rename"); err != nil {
		t.Fatal(err)
	}
	if renamed != 1 || open {
		t.Errorf("renamed %d, open %v after choosing Rename", renamed, open)
	}
}

func TestPopoverAndDialogAreRaised(t *testing.T) {
	popover, dialog := false, false
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		ui.Row(c).Gap(8).Children(func() {
			anchor := Button(c, "Share")
			if anchor.Clicked() {
				popover = true
			}
			Popover(c, anchor, &popover, func() {
				layerOf["popover"] = Current()
				ui.Text(c, "Anyone with the link")
			})
			if Button(c, "Invite").Clicked() {
				dialog = true
			}
			Dialog(c, &dialog, "Invite people", func() {
				layerOf["dialog"] = Current()
				ui.Text(c, "They get an email")
			})
		})
	}, 600, 400)
	if err := tt.Click("Share"); err != nil {
		t.Fatal(err)
	}
	if !tt.HasText("Anyone with the link") || layerOf["popover"] != Raised {
		t.Errorf("popover shows %v, in a %v layer", tt.HasText("Anyone with the link"), layerOf["popover"])
	}
	tt.Key(0, ui.KeyEscape)
	if err := tt.Click("Invite"); err != nil {
		t.Fatal(err)
	}
	if !tt.HasText("Invite people") || layerOf["dialog"] != Raised {
		t.Errorf("dialog shows %v, in a %v layer", tt.HasText("Invite people"), layerOf["dialog"])
	}
	if _, ok := tt.AccessByRole(ui.RoleDialog, "Invite people"); !ok {
		t.Error("no dialog named by its title")
	}
}

func TestToastsShowRaised(t *testing.T) {
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		if Button(c, "Save").Clicked() {
			c.AddToast(ui.Toast{Title: "Saved", Type: "success"})
		}
		Toasts(c, "Dismiss")
	}, 500, 300)
	if err := tt.Click("Save"); err != nil {
		t.Fatal(err)
	}
	if !tt.HasText("Saved") {
		t.Fatal("no toast")
	}
	if lastPopupMaterial != Raised {
		t.Errorf("the toast is %v, want raised", lastPopupMaterial)
	}
}

func TestDisplayExtras(t *testing.T) {
	open := false
	tt := ui.NewTester(func(c *ui.Context) {
		Use(c)
		ui.Column(c).Gap(8).Children(func() {
			Avatar(c, "Ada Lovelace")
			Meter(c, 0.7, 0, 1).Label("Storage")
			Spinner(c).Label("Loading")
			Accordion(c, &open, "Details", func() { ui.Text(c, "More") })
		})
	}, 300, 300)
	if !tt.HasText("AL") {
		t.Error("the avatar shows no initials")
	}
	if err := tt.Click("Details"); err != nil {
		t.Fatal(err)
	}
	if !open {
		t.Error("the accordion did not open")
	}
}
