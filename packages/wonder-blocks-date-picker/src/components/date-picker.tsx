import {StyleSheet} from "aphrodite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";
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
     * When the selected date changes, this callback is passsed a Temporal object
     * for midnight on the selected date, set to the user's local time zone.
     */
    updateDate: (arg1?: Temporal.PlainDate | null | undefined) => any;
    /**
     * Used to format the value as a valid Date.
     */
    dateFormat?: Array<string> | string;
    /**
     * Whether the DatePicker component is disabled.
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
        footer,
    } = props;

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

    const open = React.useCallback(() => {
        if (!disabled) {
            setShowOverlay(true);
        }
    }, [disabled]);
    const close = React.useCallback(() => setShowOverlay(false), []);

    const computedLocale = locale ?? enUS;
    const dir =
        refWrapper.current?.closest("[dir]")?.getAttribute("dir") || "ltr";

    // Keep currentDate in sync with selectedDate prop
    React.useEffect(() => {
        setCurrentDate(selectedDate);
        if (selectedDate) {
            setDisplayMonth(
                TemporalLocaleUtils.temporalDateToJsDate(selectedDate),
            );
        }
    }, [selectedDate]);

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
                setShowOverlay(false);
            }
        };

        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [showOverlay, closeOnSelect]);

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

    const handleInputChange = (
        selectedDate: Date | null | undefined,
        modifiers: Partial<CustomModifiers>,
    ) => {
        if (!selectedDate) {
            return;
        }
        // Check if date is disabled (modifiers.disabled can be a function)
        const isDisabled =
            typeof modifiers.disabled === "function"
                ? modifiers.disabled(selectedDate)
                : modifiers.disabled;
        if (isDisabled) {
            return;
        }
        const wrappedDate =
            TemporalLocaleUtils.jsDateToTemporalDate(selectedDate);
        setCurrentDate(wrappedDate);
        setDisplayMonth(selectedDate);
        updateDate(wrappedDate);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            close();
            datePickerInputRef.current?.focus();
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
                        close();
                        datePickerInputRef.current?.focus();
                    }
                    // Don't handle Enter in the calendar overlay - let buttons handle it naturally
                }}
            />
        );
    };

    const handleDayClick = (
        date: Date | null | undefined,
        {disabled, selected}: CustomModifiers,
    ) => {
        if (disabled || !date) {
            return;
        }
        datePickerInputRef.current?.focus();
        const wrappedDate = TemporalLocaleUtils.jsDateToTemporalDate(date);
        setCurrentDate(selected ? undefined : wrappedDate);
        setDisplayMonth(date);
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

    const modifiers: Partial<CustomModifiers> = {
        selected: selectedDateValue,
        disabled: (date: Date) => {
            const temporalDate = TemporalLocaleUtils.jsDateToTemporalDate(date);
            return (
                (minDate &&
                    Temporal.PlainDate.compare(temporalDate, minDate) < 0) ||
                (maxDate &&
                    Temporal.PlainDate.compare(temporalDate, maxDate) > 0) ||
                false
            );
        },
    } as const;

    return (
        <View style={[styles.wrapper, style]} ref={refWrapper}>
            {renderInput(modifiers)}
            {showOverlay && (
                <DatePickerOverlay
                    referenceElement={datePickerInputRef.current}
                    onClose={close}
                >
                    <View ref={datePickerRef}>
                        <DayPicker
                            month={displayMonth}
                            onMonthChange={setDisplayMonth}
                            startMonth={minDateToShow ?? undefined}
                            endMonth={
                                maxDate
                                    ? TemporalLocaleUtils.temporalDateToJsDate(
                                          maxDate,
                                      )
                                    : undefined
                            }
                            modifiers={modifiers}
                            onDayClick={handleDayClick}
                            components={{Root: RootWithEsc}}
                            locale={computedLocale}
                            dir={dir}
                            styles={{
                                // Override the React Day Picker accent color.
                                // This requires some trickery to override a CSS variable key
                                root: {...customRootStyle},
                                // Override frontend repo style that causes the nav buttons
                                // to overlap the month name.
                                nav: {width: "auto"},
                            }}
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
    wrapper: {
        width: 225,
        height: 40,
    },
    footer: {
        margin: sizing.size_120,
        marginBlockStart: 0,
    },
});
