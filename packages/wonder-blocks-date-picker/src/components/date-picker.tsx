import {StyleSheet} from "aphrodite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {flushSync} from "react-dom";
import {DayPicker} from "react-day-picker";
import {enUS, type Locale} from "react-day-picker/locale";

import {View, type StyleType} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
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

const customRootStyle = {
    "--rdp-accent-color": semanticColor.core.border.instructive.default,
} as React.CSSProperties & Record<string, string>;

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
        placeholder,
        selectedDate,
        style,
        closeOnSelect = true,
        resetInvalidValueOnBlur = true,
        footer,
    } = props;

    // Overlay visibility and which month the calendar shows (synced with selectedDate when prop changes).
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(selectedDate);
    const [displayMonth, setDisplayMonth] = React.useState<Date | undefined>(
        selectedDate
            ? TemporalLocaleUtils.temporalDateToJsDate(selectedDate)
            : undefined,
    );

    const datePickerInputRef = React.useRef<HTMLInputElement | null>(null);
    const datePickerRef = React.useRef<HTMLElement | null>(null);
    const refWrapper = React.useRef<HTMLDivElement>(null);
    const handledEscapeRef = React.useRef(false);
    const displayMonthRef = React.useRef<Date | undefined>(undefined);
    /** When set, overlay month is controlled by input (typing); when null, DayPicker is uncontrolled so nav buttons keep focus */
    const inputDrivenMonthRef = React.useRef<Date | null>(null);

    const open = React.useCallback(() => {
        if (!disabled) {
            // When opening, show selected date's month so reopening after nav shows selected month
            if (selectedDate != null) {
                const jsDate =
                    TemporalLocaleUtils.temporalDateToJsDate(selectedDate);
                displayMonthRef.current = jsDate;
                flushSync(() => setDisplayMonth(jsDate));
            } else {
                displayMonthRef.current =
                    displayMonthRef.current ?? displayMonth;
            }
            setShowOverlay(true);
        }
    }, [disabled, displayMonth, selectedDate]);

    const close = React.useCallback(() => {
        inputDrivenMonthRef.current = null;
        if (displayMonthRef.current != null) {
            flushSync(() => setDisplayMonth(displayMonthRef.current!));
        }
        setShowOverlay(false);
        (datePickerInputRef.current as any)?.validateInput?.();
    }, []);

    const computedLocale = locale ?? enUS;
    const dir =
        refWrapper.current?.closest("[dir]")?.getAttribute("dir") || "ltr";

    /** Only called when DayPicker is controlled (user has typed then clicked nav); sync ref/state and switch to uncontrolled so next render avoids further re-renders on nav */
    const handleMonthChange = React.useCallback((newMonth: Date) => {
        inputDrivenMonthRef.current = null;
        displayMonthRef.current = newMonth;
        setDisplayMonth(newMonth);
    }, []);

    // Keep currentDate in sync with selectedDate prop. Only sync displayMonth when
    // selectedDate actually changed (so we don't overwrite displayMonth set from typing).
    const prevSelectedDateRef = React.useRef<string | null>(null);
    React.useEffect(() => {
        setCurrentDate(selectedDate);
        const key = selectedDate?.toString() ?? null;
        const willUpdateDisplayMonth = key !== prevSelectedDateRef.current;
        if (willUpdateDisplayMonth) {
            prevSelectedDateRef.current = key;
            if (selectedDate) {
                const jsDate =
                    TemporalLocaleUtils.temporalDateToJsDate(selectedDate);
                setDisplayMonth(jsDate);
                displayMonthRef.current = jsDate;
            }
        }
    }, [selectedDate]);

    // Add keyup event listener to handle Escape key and prevent modal from
    // closing parent modals
    React.useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape" && handledEscapeRef.current) {
                // Stop propagation to prevent closing parent modals. This is the
                // important part: we only stop Escape keyup if we
                // previously handled the keydown, which means the overlay was
                // open and we closed it.
                e.stopPropagation();
                handledEscapeRef.current = false;
            }
        };

        // Use capture phase so we run before modal's listener
        window.addEventListener("keyup", handleKeyup, true);
        return () => {
            window.removeEventListener("keyup", handleKeyup, true);
        };
    }, []);

    // Add/remove mouseup event listener for outside click
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target: Node = e.target as any;
            const thisElement = refWrapper.current;
            const dayPickerCalendar = datePickerRef.current;

            // Check if target is a valid Element (not document)
            const isElement = target instanceof Element;
            const inThisElement = isElement && thisElement?.contains(target);
            const inCalendar = isElement && dayPickerCalendar?.contains(target);

            // Also check if target is in a portal (calendar overlay)
            const inPortal =
                isElement &&
                (target as HTMLElement).closest("[data-placement]") !== null;

            const shouldClose =
                showOverlay &&
                closeOnSelect &&
                thisElement &&
                !inThisElement &&
                !inCalendar &&
                !inPortal;

            if (shouldClose) {
                close();
            }
        };

        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [showOverlay, closeOnSelect, close]);

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
        if (isLeavingDropdown(e)) {
            close();
        }
    };

    /**
     * Handles input value changes from typing or programmatic updates.
     * While the user types, we control the overlay month so the calendar follows; once a date is
     * committed (full valid date), we clear inputDrivenMonthRef so the DayPicker is uncontrolled
     * and next/previous buttons keep working. For text formats (LL, MMMM D YYYY), we only treat
     * as "committed" when the normalized input matches the formatted date.
     */
    const handleInputChange = (
        selectedDate: Date | null | undefined,
        modifiers: Partial<CustomModifiers>,
        inputValue?: string,
    ) => {
        if (!selectedDate) {
            setCurrentDate(null);
            updateDate(null);
            return;
        }

        const wrappedDate =
            TemporalLocaleUtils.jsDateToTemporalDate(selectedDate);

        // When typing, control overlay month so calendar follows; when date is committed, switch back to uncontrolled so nav buttons keep working
        const monthDate = new Date(selectedDate);
        setDisplayMonth(monthDate);

        // Check if date is disabled (modifiers.disabled can be a function)
        const isDisabled =
            typeof modifiers.disabled === "function"
                ? modifiers.disabled(selectedDate)
                : modifiers.disabled;

        // Always notify parent via updateDate so they can show validation errors
        // When disabled, only notify; don't update currentDate; keep overlay controlled so it shows typed month
        if (isDisabled) {
            inputDrivenMonthRef.current = monthDate;
            updateDate(wrappedDate);
            return;
        }

        const isTextFormat = TemporalLocaleUtils.isTextFormatDate(dateFormat);

        // Text formats (LL, MMMM D YYYY, MMM D YYYY): only commit when input matches formatted date.
        if (isTextFormat && inputValue) {
            const reparsed = TemporalLocaleUtils.parseDate(
                inputValue,
                dateFormat,
                locale?.code,
            );
            const sameDate =
                reparsed != null &&
                Temporal.PlainDate.compare(reparsed, wrappedDate) === 0;
            const formatted = TemporalLocaleUtils.formatDate(
                wrappedDate,
                dateFormat,
                locale?.code,
            );
            const normalize = (s: string) =>
                s
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .replace(/[,.\u202f]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
            const inputMatchesDisplay =
                normalize(formatted) === normalize(inputValue);
            const isCompleteDate = sameDate && inputMatchesDisplay;

            if (isCompleteDate) {
                inputDrivenMonthRef.current = null;
                displayMonthRef.current = monthDate;
                setCurrentDate(wrappedDate);
                updateDate(wrappedDate);
            } else {
                inputDrivenMonthRef.current = monthDate;
            }
        } else {
            // Committed non–text-format date: switch to uncontrolled so nav buttons work
            inputDrivenMonthRef.current = null;
            displayMonthRef.current = monthDate;
            setCurrentDate(wrappedDate);
            updateDate(wrappedDate);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            // Only handle Escape if the overlay is open
            if (showOverlay) {
                // Stop propagation to prevent closing parent modals
                // The overlay is open, so we close it first
                e.stopPropagation();

                // Mark that we handled this Escape keypress
                handledEscapeRef.current = true;
                close();
                datePickerInputRef.current?.focus();
            }
            // If overlay is closed, don't stop propagation
            // This allows Escape to close parent modals
        }
        if (e.key === "ArrowDown" && !showOverlay) {
            e.preventDefault();
            open();
        }
        if (e.key === "Enter") {
            e.preventDefault();
            // Toggle overlay: open if closed, close if open (respecting closeOnSelect)
            if (showOverlay) {
                if (closeOnSelect) {
                    close();
                }
            } else {
                open();
            }
        }
    };

    const RootWithEsc = (props: RootWithEscProps) => {
        const {onKeyDown, rootRef: _, ...rest} = props;
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                {...rest}
                tabIndex={-1}
                onKeyDown={(e) => {
                    onKeyDown?.(e);
                    if (e.key === "Escape") {
                        // Stop propagation to prevent closing parent modals
                        e.stopPropagation();
                        // Mark that we handled this Escape keypress
                        handledEscapeRef.current = true;
                        close();
                        datePickerInputRef.current?.focus();
                    }
                    // Don't handle Enter in the calendar overlay - let buttons handle it naturally
                }}
            />
        );
    };

    /** On day cell click: update selection and clear inputDrivenMonthRef so nav buttons still work. */
    const handleDayClick = (
        date: Date | null | undefined,
        {disabled}: CustomModifiers,
    ) => {
        if (disabled || !date) {
            return;
        }
        datePickerInputRef.current?.focus();
        const wrappedDate = TemporalLocaleUtils.jsDateToTemporalDate(date);
        setCurrentDate(wrappedDate);
        const monthDate = new Date(date);
        inputDrivenMonthRef.current = null;
        displayMonthRef.current = monthDate;
        setDisplayMonth(monthDate);
        updateDate(wrappedDate);
        setShowOverlay(!closeOnSelect);
    };

    const renderInput = (
        modifiers: Partial<CustomModifiers>,
    ): React.ReactNode => {
        const selectedDateAsValue = currentDate
            ? TemporalLocaleUtils.formatDate(
                  currentDate,
                  dateFormat,
                  computedLocale,
              )
            : "";

        return (
            <DatePickerInput
                onBlur={handleInputBlur}
                onFocus={open}
                onClick={open}
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
                modifiers={modifiers}
                resetInvalidValueOnBlur={resetInvalidValueOnBlur}
                testId={id && `${id}-input`}
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

    // Calculate selectedDate and minDateToShow
    const selectedDateValue = currentDate
        ? TemporalLocaleUtils.temporalDateToJsDate(currentDate)
        : undefined;
    const minDateToShow =
        minDate && selectedDateValue
            ? Temporal.PlainDate.compare(minDate, currentDate!) < 0
                ? TemporalLocaleUtils.temporalDateToJsDate(minDate)
                : selectedDateValue
            : minDate
              ? TemporalLocaleUtils.temporalDateToJsDate(minDate)
              : undefined;

    // Memoize so when only displayMonth changes (nav click), DayPicker gets stable props and keeps focus (like RDP playground).
    const modifiers = React.useMemo<Partial<CustomModifiers>>(
        () => ({
            selected: selectedDateValue,
            disabled: (date: Date) => {
                const temporalDate =
                    TemporalLocaleUtils.jsDateToTemporalDate(date);
                return (
                    (minDate &&
                        Temporal.PlainDate.compare(temporalDate, minDate) <
                            0) ||
                    (maxDate &&
                        Temporal.PlainDate.compare(temporalDate, maxDate) >
                            0) ||
                    false
                );
            },
        }),
        [selectedDateValue, minDate, maxDate],
    );

    const dayPickerEndMonth = React.useMemo(
        () =>
            maxDate
                ? TemporalLocaleUtils.temporalDateToJsDate(maxDate)
                : undefined,
        [maxDate],
    );

    const dayPickerStyles = React.useMemo(
        () => ({
            root: {...customRootStyle},
            nav: {width: "auto" as const},
        }),
        [],
    );

    // Controlled (month + onMonthChange) when typing so overlay follows; uncontrolled (defaultMonth) otherwise so nav buttons keep focus.
    const isInputDriven = inputDrivenMonthRef.current != null;
    const baseMonth =
        displayMonthRef.current ??
        displayMonth ??
        selectedDateValue ??
        new Date();
    const normalizedMonth = new Date(
        baseMonth.getFullYear(),
        baseMonth.getMonth(),
        1,
    );

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
                            key={
                                isInputDriven
                                    ? `input-${inputDrivenMonthRef.current!.getTime()}`
                                    : `picker-${(displayMonth ?? selectedDateValue)?.getTime() ?? 0}`
                            }
                            mode="single"
                            selected={selectedDateValue}
                            {...(isInputDriven
                                ? {
                                      month: (() => {
                                          const base =
                                              inputDrivenMonthRef.current!;
                                          return new Date(
                                              base.getFullYear(),
                                              base.getMonth(),
                                              1,
                                          );
                                      })(),
                                      onMonthChange: handleMonthChange,
                                  }
                                : {
                                      defaultMonth: normalizedMonth,
                                  })}
                            startMonth={minDateToShow ?? undefined}
                            endMonth={dayPickerEndMonth}
                            modifiers={modifiers}
                            onDayClick={handleDayClick}
                            components={{Root: RootWithEsc}}
                            locale={computedLocale}
                            dir={dir}
                            styles={dayPickerStyles}
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
