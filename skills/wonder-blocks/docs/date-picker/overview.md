# Date Picker

The `wonder-blocks-date-picker` package provides date picker components that
allow users to select dates using either a custom calendar overlay or native
browser date pickers. These components use the Temporal API for accurate,
timezone-safe date handling.

    <Banner
        kind="warning"
        text="CSS import required: You must import react-day-picker/style.css in your application for the date picker to display correctly. See the Setup section below."
    />

## Components

### DatePicker

A date picker with a custom calendar overlay that opens when the input is clicked.
Best for desktop experiences where you need full control over styling and behavior.

```tsx
<DatePickerWrapper disabled={false} minDate={Temporal.Now.plainDateISO().subtract({days: 2})} selectedDate={Temporal.Now.plainDateISO()} />
```

## Setup

### CSS Import Required

The date picker uses `react-day-picker` which requires its CSS to be imported.
Choose one of these options:

#### Option 1: Global CSS File

```css
@import "react-day-picker/style.css";
```

#### Option 2: JavaScript Entry Point

```javascript
import "react-day-picker/style.css";
```

#### Option 3: Component-Level Import

```javascript
import { DatePicker } from "@khanacademy/wonder-blocks-date-picker";
import "react-day-picker/style.css";
```

### Peer Dependencies

Make sure you have these installed:
- `react` and `react-dom`
- `aphrodite`
- `react-day-picker`
- `react-popper` and `@popperjs/core`
- `@phosphor-icons/core`
- `temporal-polyfill`

## Basic Usage

```typescript
import { DatePicker } from "@khanacademy/wonder-blocks-date-picker";
import { Temporal } from "temporal-polyfill";
import { useState } from "react";

function MyComponent() {
    const [selectedDate, setSelectedDate] = useState<Temporal.PlainDate | null>(null);

    return (
        <DatePicker
            selectedDate={selectedDate}
            updateDate={setSelectedDate}
            placeholder="Select a date"
        />
    );
}
```

## Date Formats

The date picker supports both locale-aware and fixed date formats:

### Locale-Aware Formats (Recommended)

- **`"L"`** (default) - Short date in user's locale
  - `en-US`: "1/15/2024"
  - `de-DE`: "15.1.2024"
  - `fr-FR`: "15/01/2024"
- **`"LL"`** - Long date in user's locale
  - `en-US`: "January 15, 2024"
  - `es-ES`: "15 de enero de 2024"
  - `fr-FR`: "15 janvier 2024"

### Fixed Formats

- **`"YYYY-MM-DD"`** - ISO format: "2024-01-15"
- **`"MM/DD/YYYY"`** - US format: "01/15/2024"
- **`"MMMM D, YYYY"`** - Text format: "January 15, 2024" (month name localized, but US date order)

### Example

```typescript
<DatePicker
    dateFormat="L"  // Locale-aware short date (default)
    selectedDate={selectedDate}
    updateDate={setSelectedDate}
/>
```

**💡 Tip**: Use `"L"` or `"LL"` for international applications to respect users' locale preferences. Note, the displayed date will also localize the input.value.

## Date Range Constraints

Limit selectable dates using `minDate` and `maxDate`:

```typescript
const today = Temporal.Now.plainDateISO();

<DatePicker
    selectedDate={selectedDate}
    updateDate={setSelectedDate}
    minDate={today.subtract({ days: 7 })}
    maxDate={today.add({ days: 14 })}
/>
```

## Custom Footer

Add custom actions in the calendar footer (like Cancel/Confirm buttons):

```tsx
<ControlledDatePicker closeOnSelect={false} disabled={false} dateFormat="MMM D, YYYY" minDate={Temporal.Now.plainDateISO().subtract({days: 2})} selectedDate={Temporal.Now.plainDateISO()} />
```

## Temporal API

This component uses the [Temporal API](https://tc39.es/proposal-temporal/docs/)
via the `temporal-polyfill` package. All dates are handled as
`Temporal.PlainDate` objects instead of JavaScript's legacy `Date` object.

**📚 For detailed examples and patterns, see the [Temporal API Guide](?path=/docs/packages-date-picker-temporal-api-guide--docs)**

## Accessibility

The date picker components are built with accessibility in mind:

- **Keyboard navigation**: Tab to focus, Enter/Space to open, Esc to close
- **ARIA labels**: Configurable via `inputAriaLabel` prop
- **Screen reader support**: Calendar uses proper ARIA grid role
- **Focus management**: Focus returns to input after closing calendar

## For More Information

- **[Temporal API Guide](?path=/docs/packages-date-picker-temporal-api-guide--docs)** - Complete guide to working with Temporal dates
- See individual component stories for interactive examples
- Check the component prop tables for detailed API documentation
- Review the Storybook examples for common use cases


---

## Components & Guides

- [Temporal Api Guide](temporal-api-guide.md)
