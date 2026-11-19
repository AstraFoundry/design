import type { ComponentType } from "react";
import accordionBasic from "./accordion/basic";
import alertDialogBasic from "./alert-dialog/basic";
import alertTones from "./alert/tones";
import autocompleteBasic from "./autocomplete/basic";
import avatarBasic from "./avatar/basic";
import badgeBasic from "./badge/basic";
import beuiAgent from "./beui/agent";
import breadcrumbBasic from "./breadcrumb/basic";
import buttonLoading from "./button/loading";
import buttonSizes from "./button/sizes";
import buttonVariants from "./button/variants";
import buttonWithIcon from "./button/with-icon";
import calendarBasic from "./calendar/basic";
import calendarRange from "./calendar/range";
import cardBasic from "./card/basic";
import checkboxBasic from "./checkbox/basic";
import checkboxIndeterminate from "./checkbox/indeterminate";
import collapsibleBasic from "./collapsible/basic";
import comboboxBasic from "./combobox/basic";
import commandBasic from "./command/basic";
import contextMenuBasic from "./context-menu/basic";
import datePickerBasic from "./date-picker/basic";
import dialogBasic from "./dialog/basic";
import drawerSides from "./drawer/sides";
import emptyBasic from "./empty/basic";
import fieldBasic from "./field/basic";
import fieldInvalid from "./field/invalid";
import formBasic from "./form/basic";
import foundationsBackdrop from "./foundations/backdrop";
import foundationsMaterials from "./foundations/materials";
import foundationsMotion from "./foundations/motion";
import inputGroupBasic from "./input-group/basic";
import inputBasic from "./input/basic";
import inputSizes from "./input/sizes";
import kbdBasic from "./kbd/basic";
import menuBasic from "./menu/basic";
import menubarBasic from "./menubar/basic";
import motionTextReveal from "./motion/text-reveal";
import motionTextShimmer from "./motion/text-shimmer";
import navigationMenuBasic from "./navigation-menu/basic";
import numberFieldBasic from "./number-field/basic";
import otpFieldBasic from "./otp-field/basic";
import paginationBasic from "./pagination/basic";
import panelBasic from "./panel/basic";
import popoverBasic from "./popover/basic";
import previewCardBasic from "./preview-card/basic";
import progressBasic from "./progress/basic";
import radioGroupBasic from "./radio-group/basic";
import scrollAreaBasic from "./scroll-area/basic";
import segmentedBasic from "./segmented/basic";
import selectBasic from "./select/basic";
import selectGroups from "./select/groups";
import separatorBasic from "./separator/basic";
import sidebarBasic from "./sidebar/basic";
import skeletonBasic from "./skeleton/basic";
import sliderBasic from "./slider/basic";
import spinnerBasic from "./spinner/basic";
import switchBasic from "./switch/basic";
import tableBasic from "./table/basic";
import tabsSegmented from "./tabs/segmented";
import tabsUnderline from "./tabs/underline";
import textareaBasic from "./textarea/basic";
import toastBasic from "./toast/basic";
import toggleGroupBasic from "./toggle-group/basic";
import toggleBasic from "./toggle/basic";
import toolbarBasic from "./toolbar/basic";
import tooltipBasic from "./tooltip/basic";

/** Every demo, by its path under demos/. Regenerate with scripts/demos-index.mjs. */
export const demos: Record<string, ComponentType> = {
  "accordion/basic": accordionBasic,
  "alert-dialog/basic": alertDialogBasic,
  "alert/tones": alertTones,
  "autocomplete/basic": autocompleteBasic,
  "avatar/basic": avatarBasic,
  "badge/basic": badgeBasic,
  "beui/agent": beuiAgent,
  "breadcrumb/basic": breadcrumbBasic,
  "button/loading": buttonLoading,
  "button/sizes": buttonSizes,
  "button/variants": buttonVariants,
  "button/with-icon": buttonWithIcon,
  "calendar/basic": calendarBasic,
  "calendar/range": calendarRange,
  "card/basic": cardBasic,
  "checkbox/basic": checkboxBasic,
  "checkbox/indeterminate": checkboxIndeterminate,
  "collapsible/basic": collapsibleBasic,
  "combobox/basic": comboboxBasic,
  "command/basic": commandBasic,
  "context-menu/basic": contextMenuBasic,
  "date-picker/basic": datePickerBasic,
  "dialog/basic": dialogBasic,
  "drawer/sides": drawerSides,
  "empty/basic": emptyBasic,
  "field/basic": fieldBasic,
  "field/invalid": fieldInvalid,
  "form/basic": formBasic,
  "foundations/backdrop": foundationsBackdrop,
  "foundations/materials": foundationsMaterials,
  "foundations/motion": foundationsMotion,
  "input-group/basic": inputGroupBasic,
  "input/basic": inputBasic,
  "input/sizes": inputSizes,
  "kbd/basic": kbdBasic,
  "menu/basic": menuBasic,
  "menubar/basic": menubarBasic,
  "motion/text-reveal": motionTextReveal,
  "motion/text-shimmer": motionTextShimmer,
  "navigation-menu/basic": navigationMenuBasic,
  "number-field/basic": numberFieldBasic,
  "otp-field/basic": otpFieldBasic,
  "pagination/basic": paginationBasic,
  "panel/basic": panelBasic,
  "popover/basic": popoverBasic,
  "preview-card/basic": previewCardBasic,
  "progress/basic": progressBasic,
  "radio-group/basic": radioGroupBasic,
  "scroll-area/basic": scrollAreaBasic,
  "segmented/basic": segmentedBasic,
  "select/basic": selectBasic,
  "select/groups": selectGroups,
  "separator/basic": separatorBasic,
  "sidebar/basic": sidebarBasic,
  "skeleton/basic": skeletonBasic,
  "slider/basic": sliderBasic,
  "spinner/basic": spinnerBasic,
  "switch/basic": switchBasic,
  "table/basic": tableBasic,
  "tabs/segmented": tabsSegmented,
  "tabs/underline": tabsUnderline,
  "textarea/basic": textareaBasic,
  "toast/basic": toastBasic,
  "toggle-group/basic": toggleGroupBasic,
  "toggle/basic": toggleBasic,
  "toolbar/basic": toolbarBasic,
  "tooltip/basic": tooltipBasic,
};
