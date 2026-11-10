// Package sunbeam is Sunbeam, the AstraFoundry design system, for native UI
// drawn by MyGo (package github.com/egoist/mygo/ui). It is the twin of the
// web package @astrafoundry/design: the same tokens, generated from the same
// sunbeam.json, and the same components with the same rules.
//
// # Theme and colors
//
// Use(c) at the top of a view themes the window with Sunbeam's colors, in
// light or dark as the system is, so MyGo's own widgets take them too.
// Colors(c) returns the palette of the part being built: dark inside a dark
// Scheme, light otherwise.
//
// # Materials
//
// A layer has one material, and everything in it takes that material:
//
//   - Flat: the window and its chrome. A control is a fill and nothing else,
//     with no border, no shadow and no gradient.
//   - Raised: a layer that floats above the window, as a Panel, a popover or
//     a dialog, and every control inside it. A control has a faint
//     top-to-bottom gradient, a translucent 1-DIP edge, a 1-DIP highlight
//     inside its top edge and layered shadows. In the dark, its face is a
//     lighter gray than the panel under it, and its shadows are half black.
//
// Inside a raised layer, what holds choices (a segmented control's track)
// is recessed, a well, and the choice made is the one raised face in it.
//
// Panel opens a raised layer; Layer opens one of either material, as a
// flat part inside a panel. Button, PrimaryButton, IconButton and Segmented
// take the material of the layer they are built in. Face, PrimaryFace,
// Thumb and Well give your own elements the same looks.
//
// Rounded corners curve continuously where MyGo draws them so, on macOS,
// and as quarter circles elsewhere. Corners nest concentrically: a Panel's
// RadiusTile less its SpaceTileInset is the 20-DIP radius of the 40-DIP
// pills inside it.
//
// Layers are tracked while a view builds, on the main thread, where MyGo
// builds every view.
package sunbeam
