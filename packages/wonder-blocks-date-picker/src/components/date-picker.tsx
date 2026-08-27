import {css, StyleSheet} from "aphrodite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {DayPicker, getDefaultClassNames, UI} from "react-day-picker";
import {enUS, type Locale} from "react-day-picker/locale";

import {
    findFocusableNodes,
    View,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {useCloseOnOutsideClick} from "../hooks/use-close-on-outside-click";
import {useDatePickerModifiers} from "../hooks/use-date-picker-modifiers";
import {useDisplayMonth} from "../hooks/use-display-month";
import {useEscapeKeyupCapture} from "../hooks/use-escape-keyup-capture";
import {useFormatDateForInput} from "../hooks/use-format-date-for-input";
import {useOverlayMonthFromInput} from "../hooks/use-overlay-month-from-input";
import {useSelectedDateSync} from "../hooks/use-selected-date-sync";
import {TemporalLocaleUtils} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

import DatePickerInput from "./date-picker-input";
import DatePickerOverlay from "./date-picker-overlay";

// eslint-disable-next-line import/no-unassigned-import
import "react-day-picker/style.css";

interface Props {
    /**
     * The locale to use for the dates: a string name matching a Locale object
     * imported from react-day-picker.
     * If not provided, it will fall back to enUS.
     */
    locale?: Locale;
    /**
     * When the selected date changes, this callback is passed a Temporal object
     * for midnight on the selected date, set to the user's local time zone.
     *
     * Note: This callback is called as the user types based on resetInvalidValueOnBlur:
     *
     * With resetInvalidValueOnBlur={false}:
     * - Called immediately for all parsed dates (valid or out-of-range)
     * - Called immediately with null for invalid/unparseable text
     * - Enables real-time validation feedback
     *
     * With resetInvalidValueOnBlur={true} (default):
     * - Called immediately only for valid in-range dates
     * - Out-of-range dates and invalid text only notify on blur (will auto-reset)
     *
     * For validation feedback, use resetInvalidValueOnBlur={false} and always update selectedDate
     * in your callback to display invalid values with error messages.
     */
    updateDate: (arg1?: Temporal.PlainDate | null | undefined) => any;
    /**
     * Used to format the value as a valid Date.
     * When nullish (undefined or omitted), defaults to locale-aware short date (same as "L").
     *
     * Supported formats:
     * - **undefined** (omit or pass undefined): Locale-aware short date (same as "L")
     * - **"L"**: Locale-aware short date (e.g., "1/20/2026" in en-US, "20.01.2026" in de-DE, "20/01/2026" in bg)
     * - **"LL"**: Locale-aware long date (e.g., "January 20, 2026" in en-US, "20 de enero de 2026" in es)
     *   - Supports manual text editing using locale-specific month names
     * - **"MM/DD/YYYY"**: Fixed US format (e.g., "01/20/2026") - always US order regardless of locale
     * - **"MMMM D, YYYY"**: Text format (e.g., "January 20, 2026") - month name localized but US order
     * - **"dateStyle:short|medium|long|full"**: Explicit Intl.DateTimeFormat dateStyle values
     */
    dateFormat?: string;
    /**
     * Whether the DatePicker component is disabled.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
     */
    disabled?: boolean;
    /**
     * Unique identifier attached to the input field. see DatePickerInput.id for
     * more details.
     */
    id?: string;
    /**
     * The maximum date to be allowed to select in the picker container.
     */
    maxDate?: Temporal.PlainDate | null | undefined;
    /**
     * The minimum date to be allowed to select in the picker container.
     */
    minDate?: Temporal.PlainDate | null | undefined;
    /**
     * The aria-label to be used for the date picker. This is only needed if there
     * is no visible label associated with the date picker, such as with LabeledField.
     */
    inputAriaLabel?: string;
    /**
     * The aria-label for the calendar toggle button that opens/closes the
     * calendar overlay. Defaults to "Show calendar".
     */
    calendarButtonAriaLabel?: string;
    /**
     * The placeholder assigned to the date field
     */
    placeholder?: string;
    /**
     * The current valid date associated to the DatePicker component.
     */
    selectedDate?: Temporal.PlainDate | null | undefined;
    /**
     * Styles for the date picker container.
     */
    style?: StyleType;
    /**
     * Whether the date picker overlay should close when a date is selected
     * or when Enter key is pressed in the input.
     * Defaults to true.
     */
    closeOnSelect?: boolean;
    /**
     * Whether to reset invalid/unparseable text to the last valid value on blur.
     *
     * When true (default):
     * - Invalid values (out-of-range dates and unparseable text) auto-reset to last valid value on blur
     * - updateDate only called on blur for invalid values (not during typing)
     * - Cleaner UX when not using external validation
     *
     * When false:
     * - Invalid values stay in field and updateDate is called immediately as user types
     * - Enables real-time validation feedback with LabeledField error messages
     * - Parent should always update selectedDate to show errors
     */
    resetInvalidValueOnBlur?: boolean;
    /**
     * Allows including elements below the date selection area that can close
     * the date picker.
     */
    footer?: (arg1: {close: () => unknown}) => React.ReactNode;
}

type RootWithEscProps = React.HTMLAttributes<Element> & {
    rootRef?: unknown;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

// Override the React Day Picker accent color.
const customRootStyle = {
    "--rdp-accent-color": semanticColor.core.border.instructive.default,
} as React.CSSProperties & Record<string, string>;

// React Day Picker's own day buttons don't use the Wonder Blocks focus
// style, so we add it as an extra class alongside the default one (classNames
// entries replace, rather than merge with, the default per UI element).
const dayButtonFocusStyles = StyleSheet.create({
    focus: focusStyles.focus,
});
const dayPickerClassNames = {
    [UI.DayButton]: `${getDefaultClassNames()[UI.DayButton]} ${css(
        dayButtonFocusStyles.focus,
    )}`,
};

/**
 * A UI component that allows the user to pick a date by using an input element
 * or the calendar popup exposed by `react-day-picker`.
 */
const DatePicker = (props: Props) => {
    const {
        locale,
        updateDate,
        dateFormat,
        disabled,
        id,
        maxDate,
        minDate,
        inputAriaLabel,
        calendarButtonAriaLabel,
        placeholder,
        selectedDate,
        style,
        closeOnSelect = true,
        resetInvalidValueOnBlur = true,
        footer,
    } = props;

    const [showOverlay, setShowOverlay] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(selectedDate);

    const datePickerInputRef = React.useRef<HTMLInputElement | null>(null);
    const datePickerRef = React.useRef<HTMLElement | null>(null);
    const refWrapper = React.useRef<HTMLDivElement>(null);
    const skipNextOpenRef = React.useRef(false);
    // True right before we programmatically move focus into the overlay
    // (ArrowDown). A blur fired by that focus move may not reliably report
    // `relatedTarget` (the destination), so isLeavingDropdown can't always
    // detect that focus stayed within the widget; this flag lets
    // handleInputBlur skip the close in that one case.
    const movingFocusIntoOverlayRef = React.useRef(false);

    const {handleEscapeKeyDown} = useEscapeKeyupCapture();
    const {
        displayMonth,
        setDisplayMonth,
        displayMonthRef,
        inputDrivenMonthRef,
        setDisplayMonthAndRefs,
    } = useDisplayMonth({selectedDate});

    const open = React.useCallback(() => {
        // if user pressed Escape and focus moved to input, don't open the overlay again.
        if (skipNextOpenRef.current) {
            skipNextOpenRef.current = false;
            return;
        }
        if (!disabled) {
            if (selectedDate != null) {
                const jsDate =
                    TemporalLocaleUtils.temporalDateToJsDate(selectedDate);
                setDisplayMonthAndRefs(jsDate);
            } else {
                displayMonthRef.current =
                    displayMonthRef.current ?? displayMonth;
            }
            setShowOverlay(true);
        }
    }, [
        disabled,
        displayMonth,
        displayMonthRef,
        selectedDate,
        setDisplayMonthAndRefs,
        skipNextOpenRef,
    ]);

    const {handleInputChange, clearInputDrivenMonth} = useOverlayMonthFromInput(
        {
            inputDrivenMonthRef,
            setDisplayMonth,
            setDisplayMonthAndRefs,
            setCurrentDate,
            updateDate,
            dateFormat,
            localeCode: locale?.code,
        },
    );

    const close = React.useCallback(() => {
        clearInputDrivenMonth();
        if (selectedDate != null) {
            const jsDate =
                TemporalLocaleUtils.temporalDateToJsDate(selectedDate);
            setDisplayMonthAndRefs(jsDate);
        } else {
            setDisplayMonthAndRefs(null);
        }
        setShowOverlay(false);
        // when the overlay closes, if the input has a validateInput method, call it
        // The ref is typed as a plain HTMLInputElement, but the DatePickerInput exposes a validateInput method that might get called
        (
            datePickerInputRef.current as HTMLInputElement & {
                validateInput?: () => void;
            }
        )?.validateInput?.();
    }, [
        selectedDate,
        setDisplayMonthAndRefs,
        clearInputDrivenMonth,
        datePickerInputRef,
    ]);

    // Toggle handler for the calendar button: opens/closes the overlay on
    // explicit activation (click, or Enter/Space via keyboard), matching
    // native date/time inputs which never open their picker on plain focus.
    const handleToggleOverlay = React.useCallback(() => {
        if (disabled) {
            return;
        }
        if (showOverlay) {
            close();
        } else {
            skipNextOpenRef.current = false; // user explicitly opening
            open();
        }
    }, [disabled, showOverlay, close, open, skipNextOpenRef]);

    // Moves focus back to the calendar toggle button, e.g. after Escape
    // closes the overlay.
    const focusCalendarButton = React.useCallback(() => {
        (
            datePickerInputRef.current as HTMLInputElement & {
                focusCalendarButton?: () => void;
            }
        )?.focusCalendarButton?.();
    }, [datePickerInputRef]);

    // Moves focus into the calendar grid (to the selected/today day cell,
    // via DayPicker's roving tabindex) when the overlay is already open.
    // Prefers the grid itself over nav buttons so ArrowDown always lands on
    // a day, not the prev/next month controls.
    const focusIntoOverlay = React.useCallback(() => {
        const overlayRoot = datePickerRef.current;
        if (!overlayRoot) {
            return;
        }
        const grid = overlayRoot.querySelector<HTMLElement>('[role="grid"]');
        // DayPicker uses a roving tabindex: exactly one day (the
        // selected/today cell) has tabindex="0" and is guaranteed enabled.
        // findFocusableNodes would otherwise return every day button
        // (including tabindex="-1" and disabled out-of-range ones) in DOM
        // order, which could be a disabled day at the start of the grid.
        const rovingTarget = grid?.querySelector<HTMLElement>('[tabindex="0"]');
        const target =
            rovingTarget ?? findFocusableNodes(grid ?? overlayRoot)[0];
        if (target) {
            movingFocusIntoOverlayRef.current = true;
            target.focus();
        }
    }, [datePickerRef]);

    useCloseOnOutsideClick({
        refWrapper,
        datePickerRef,
        showOverlay,
        closeOnSelect,
        close,
    });

    // Sync user-editable display month to selectedDate on mount and when selectedDate changes
    useSelectedDateSync({
        selectedDate,
        setCurrentDate,
        setDisplayMonthAndRefs,
    });

    const computedLocale = locale ?? enUS;
    const selectedDateValue = currentDate
        ? TemporalLocaleUtils.temporalDateToJsDate(currentDate)
        : undefined;
    // modifiers for the input (e.g. disabled) and calendar (e.g. selected/disabled days)
    const modifiers = useDatePickerModifiers({
        selectedDateValue,
        minDate,
        maxDate,
    });
    // stable callback that formats the current date for the input field
    const formatDateForInput = useFormatDateForInput({
        dateFormat,
        locale: computedLocale,
    });

    const dir =
        refWrapper.current?.closest("[dir]")?.getAttribute("dir") || "ltr";

    const handleMonthChange = React.useCallback(
        (newMonth: Date) => {
            clearInputDrivenMonth();
            setDisplayMonthAndRefs(newMonth);
        },
        [clearInputDrivenMonth, setDisplayMonthAndRefs],
    );

    // True when focus is leaving the calendar overlay (e.g. tabbing out or clicking outside). Used to close on blur when focus leaves the dropdown.
    const isLeavingDropdown = (e: React.FocusEvent): boolean => {
        const dayPickerCalendar = datePickerRef.current;
        if (!dayPickerCalendar) {
            return true;
        }
        if (e.relatedTarget instanceof Node) {
            return !dayPickerCalendar.contains(e.relatedTarget);
        }
        return true;
    };

    const handleInputBlur = (e: React.FocusEvent) => {
        if (movingFocusIntoOverlayRef.current) {
            movingFocusIntoOverlayRef.current = false;
            return;
        }
        if (isLeavingDropdown(e)) {
            close();
        }
    };

    // What to do when Escape closes the overlay: prevent reopen on focus, close, return focus to the calendar button.
    const onEscapeCloseOverlay = React.useCallback(() => {
        skipNextOpenRef.current = true; // focus restored to the button; don't reopen on focus
        close();
        focusCalendarButton();
    }, [close, skipNextOpenRef, focusCalendarButton]);

    // Input keyboard: Escape closes overlay (via hook's handleEscapeKeyDown); ArrowDown opens overlay (or moves focus into it if already open); Enter toggles overlay.
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            if (showOverlay) {
                handleEscapeKeyDown(e, onEscapeCloseOverlay);
            }
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (showOverlay) {
                focusIntoOverlay();
            } else {
                skipNextOpenRef.current = false; // user explicitly opening
                open();
            }
        }
        if (e.key === "Enter") {
            e.preventDefault();
            // Toggle overlay: open if closed, close if open (respecting closeOnSelect)
            if (showOverlay) {
                if (closeOnSelect) {
                    close();
                }
            } else {
                skipNextOpenRef.current = false; // user explicitly opening
                open();
            }
        }
    };

    // Calendar button keyboard: only a click toggles the overlay open; from
    // the button, ArrowDown never opens it. ArrowDown only moves focus into
    // the overlay once it's already open (via a click); Escape closes it
    // (focus already on the button).
    const handleCalendarButtonKeyDown = React.useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" && showOverlay) {
                e.preventDefault();
                focusIntoOverlay();
            } else if (e.key === "Escape" && showOverlay) {
                handleEscapeKeyDown(e, onEscapeCloseOverlay);
            }
        },
        [
            showOverlay,
            focusIntoOverlay,
            handleEscapeKeyDown,
            onEscapeCloseOverlay,
        ],
    );

    // Wrapper for DayPicker's root so we can handle Escape when focus is inside the calendar (e.g. on nav buttons). Same Escape handler as the input.
    const RootWithEsc = React.useCallback(
        (props: RootWithEscProps) => {
            const {onKeyDown, rootRef: _, ...rest} = props;
            return (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                    {...rest}
                    tabIndex={-1}
                    onKeyDown={(e) => {
                        onKeyDown?.(e);
                        if (e.key === "Escape") {
                            handleEscapeKeyDown(e, onEscapeCloseOverlay);
                        }
                    }}
                />
            );
        },
        [handleEscapeKeyDown, onEscapeCloseOverlay],
    );

    // stable prop for React Day Picker
    const dayPickerComponents = React.useMemo(
        () => ({Root: RootWithEsc}),
        [RootWithEsc],
    );

    /** Day cell click: update selection, move focus to input, clear input-driven month and sync displayMonth. If closeOnSelect, overlay closes; otherwise it stays open. */
    const handleDayClick = React.useCallback(
        (date: Date | null | undefined, {disabled}: CustomModifiers) => {
            if (disabled || !date) {
                return;
            }
            datePickerInputRef.current?.focus();
            const wrappedDate = TemporalLocaleUtils.jsDateToTemporalDate(date);
            setCurrentDate(wrappedDate);
            const monthDate = new Date(date);
            clearInputDrivenMonth();
            setDisplayMonthAndRefs(monthDate);
            updateDate(wrappedDate);
            setShowOverlay(!closeOnSelect);
        },
        [
            updateDate,
            closeOnSelect,
            setDisplayMonthAndRefs,
            datePickerInputRef,
            clearInputDrivenMonth,
        ],
    );

    const renderInput = (
        inputModifiers: Partial<CustomModifiers>,
    ): React.ReactNode => {
        const selectedDateAsValue = formatDateForInput(currentDate);

        return (
            <DatePickerInput
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                aria-label={inputAriaLabel}
                disabled={disabled}
                id={id}
                placeholder={placeholder}
                value={selectedDateAsValue}
                ref={datePickerInputRef}
                dateFormat={dateFormat}
                locale={computedLocale.code} // e.g. "en-US"
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
                getModifiersForDay={TemporalLocaleUtils.getModifiersForDay}
                modifiers={inputModifiers}
                resetInvalidValueOnBlur={resetInvalidValueOnBlur}
                testId={id && `${id}-input`}
                expanded={showOverlay}
                onToggleOverlay={handleToggleOverlay}
                onCalendarButtonKeyDown={handleCalendarButtonKeyDown}
                calendarButtonAriaLabel={calendarButtonAriaLabel}
            />
        );
    };

    const maybeRenderFooter = (): React.ReactNode => {
        if (!footer) {
            return null;
        }
        return (
            <View testId="date-picker-footer" style={styles.footer}>
                {footer({close})}
            </View>
        );
    };

    const minDateToShow =
        minDate && selectedDateValue
            ? Temporal.PlainDate.compare(minDate, currentDate!) < 0
                ? TemporalLocaleUtils.temporalDateToJsDate(minDate)
                : selectedDateValue
            : minDate
              ? TemporalLocaleUtils.temporalDateToJsDate(minDate)
              : undefined;

    const dayPickerEndMonth = React.useMemo(
        () =>
            maxDate
                ? TemporalLocaleUtils.temporalDateToJsDate(maxDate)
                : undefined,
        [maxDate],
    );

    // Override the React Day Picker accent color with customRootStyle.
    // This requires some trickery to override a CSS variable key.
    const dayPickerStyles = React.useMemo(
        () => ({
            root: {...customRootStyle},
            // Override frontend repo style that causes the nav buttons
            // to overlap the month name.
            nav: {width: "auto" as const},
        }),
        [],
    );

    // inputDriven: the displayed month in what the user is typing
    const inputDrivenMonth = inputDrivenMonthRef.current;
    const isInputDriven = inputDrivenMonth != null;
    const selectedDateAsJs =
        selectedDate != null
            ? TemporalLocaleUtils.temporalDateToJsDate(selectedDate)
            : undefined;
    // baseMonth: the month to show when the overlay is open (ref first so first render after open() is correct)
    const baseMonth =
        displayMonthRef.current ??
        (showOverlay && selectedDateAsJs ? selectedDateAsJs : undefined) ??
        displayMonth ??
        selectedDateValue ??
        new Date();
    // firstOfBaseMonth: first day of baseMonth, used for uncontrolled defaultMonth so DayPicker shows the full month consistently
    const firstOfBaseMonth = new Date(
        baseMonth.getFullYear(),
        baseMonth.getMonth(),
        1,
    );
    // Key controls when DayPicker remounts: react-day-picker's defaultMonth is
    // only used on initial mount, so we must remount when the month we want to
    // show changes. We use the month's timestamp so the key changes whenever the
    // displayed month changes (input-driven or after reopen/nav).
    const pickerKey = isInputDriven
        ? `input-${inputDrivenMonth.getTime()}`
        : `picker-${baseMonth.getTime()}`;

    // inputDrivenMonthMs: timestamp used for stable references in useMemo instead of new Date objects; changes DatePicker to controlled when non-null
    const inputDrivenMonthMs = inputDrivenMonth?.getTime();
    // firstOfBaseMonthMs: used in useMemo dependency and to set defaultMonth when not user-driven, so calendar shows correct month on first render
    const firstOfBaseMonthMs = firstOfBaseMonth.getTime();
    const dayPickerMonthProps = React.useMemo(() => {
        // controlled: make input editing UX work
        if (isInputDriven && inputDrivenMonthMs != null) {
            const d = new Date(inputDrivenMonthMs);
            return {
                month: new Date(d.getFullYear(), d.getMonth(), 1),
                onMonthChange: handleMonthChange,
            };
        }
        // uncontrolled: make next/previous button focus work properly by not changing the month unless selectedDate or displayMonth changes
        return {defaultMonth: new Date(firstOfBaseMonthMs)};
    }, [
        isInputDriven,
        inputDrivenMonthMs,
        firstOfBaseMonthMs,
        handleMonthChange,
    ]);

    return (
        <View style={style} ref={refWrapper}>
            {renderInput(modifiers)}
            {showOverlay && (
                <DatePickerOverlay
                    referenceElement={datePickerInputRef.current}
                    onClose={close}
                    dir={dir === "rtl" ? "rtl" : "ltr"}
                >
                    <View ref={datePickerRef}>
                        <DayPicker
                            key={pickerKey}
                            mode="single"
                            selected={selectedDateValue}
                            {...dayPickerMonthProps}
                            startMonth={minDateToShow ?? undefined}
                            endMonth={dayPickerEndMonth}
                            modifiers={modifiers}
                            onDayClick={handleDayClick}
                            components={dayPickerComponents}
                            locale={computedLocale}
                            dir={dir}
                            styles={dayPickerStyles}
                            classNames={dayPickerClassNames}
                        />
                        {maybeRenderFooter()}
                    </View>
                </DatePickerOverlay>
            )}
        </View>
    );
};

DatePicker.defaultProps = {
    closeOnSelect: true,
};

export default DatePicker;

const styles = StyleSheet.create({
    footer: {
        margin: sizing.size_120,
        marginBlockStart: 0,
    },
});
