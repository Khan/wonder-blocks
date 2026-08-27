---
"@khanacademy/wonder-blocks-date-picker": minor
---

DatePicker: the calendar overlay now only opens on explicit activation (clicking the calendar icon button, or ArrowDown/Enter on the text input), matching native browser date/time inputs. Focusing or clicking the text input alone no longer opens the overlay. The previously decorative calendar icon is now a focusable, keyboard-operable toggle button (default aria-label "Show calendar"), and a new `calendarButtonAriaLabel` prop lets consumers customize it.

DatePicker's focused day button in the calendar grid now also uses the standard Wonder Blocks focus style (`focusStyles` from `@khanacademy/wonder-blocks-styles`) instead of react-day-picker's default focus ring.