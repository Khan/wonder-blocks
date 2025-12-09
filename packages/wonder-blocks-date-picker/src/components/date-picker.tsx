import {StyleSheet} from "aphrodite";
import {Temporal} from "temporal-polyfill";
import * as React from "react";
import {DayPicker} from "react-day-picker";
import {enUS} from "react-day-picker/locale";

import {View, type StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {TemporalLocaleUtils} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

import DatePickerInput from "./date-picker-input";
import DatePickerOverlay from "./date-picker-overlay";

interface Props {
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
     * Whether the date picker should close when a date is selected.
     * Defaults to true.
     */
    closeOnSelect?: boolean;
    /**
     * Allows including elements below the date selection area that can close
     * the date picker.
     */
    footer?: (arg1: {close: () => unknown}) => React.ReactNode;
    /**
     * The aria-label to be used for the date picker.
     */
    inputAriaLabel?: string;
}

type RootWithEscProps = React.HTMLAttributes<Element> & {
    rootRef?: unknown;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

/**
 * A UI component that allows the user to pick a date by using an input element
 * or the calendar popup exposed by `react-day-picker`.
 */
const DatePicker = (props: Props) => {
    const {
        updateDate,
        dateFormat,
        disabled,
        id,
        maxDate,
        minDate,
        placeholder,
        selectedDate,
        style,
        closeOnSelect = true,
        footer,
        inputAriaLabel,
    } = props;

    const [showOverlay, setShowOverlay] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState<
        Temporal.PlainDate | null | undefined
    >(selectedDate);

    const datePickerInputRef = React.useRef<HTMLInputElement | null>(null);
    const datePickerRef = React.useRef<HTMLElement | null>(null);

    // Keep currentDate in sync with selectedDate prop
    React.useEffect(() => {
        setCurrentDate(selectedDate);
    }, [selectedDate]);

    // Add/remove mouseup event listener for outside click
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target: Node = e.target as any;
            const thisElement = refWrapper.current;
            const dayPickerCalendar = datePickerRef.current;

            if (
                showOverlay &&
                closeOnSelect &&
                thisElement &&
                !thisElement.contains(target) &&
                dayPickerCalendar &&
                !dayPickerCalendar.contains(target)
            ) {
                setShowOverlay(false);
            }
        };

        document.addEventListener("mouseup", handleClick);
        return () => {
            document.removeEventListener("mouseup", handleClick);
        };
    }, [showOverlay, closeOnSelect]);

    const refWrapper = React.useRef<HTMLDivElement>(null);

    const open = React.useCallback(() => setShowOverlay(true), []);
    const close = React.useCallback(() => setShowOverlay(false), []);

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
        if (!selectedDate || modifiers.disabled) {
            return;
        }
        const wrappedDate =
            TemporalLocaleUtils.jsDateToTemporalDate(selectedDate);
        setCurrentDate(wrappedDate);
        updateDate(wrappedDate);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            close();
            datePickerInputRef.current?.focus();
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
        setShowOverlay(!closeOnSelect);
        updateDate(wrappedDate);
    };

    const renderInput = (
        modifiers: Partial<CustomModifiers>,
    ): React.ReactNode => {
        const locale = navigator.language || "en";
        const selectedDateAsValue = currentDate
            ? TemporalLocaleUtils.formatDate(currentDate, dateFormat, locale)
            : "";

        return (
            <DatePickerInput
                onBlur={handleInputBlur}
                onFocus={open}
                onClick={open}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                aria-label={inputAriaLabel ?? "Choose or enter a date"} // TODO: add i18n
                disabled={disabled}
                id={id}
                placeholder={placeholder}
                value={selectedDateAsValue}
                ref={datePickerInputRef}
                dateFormat={dateFormat}
                locale={locale}
                parseDate={TemporalLocaleUtils.parseDateToJsDate}
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
                            month={selectedDateValue ?? undefined}
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
                            locale={enUS}
                            // localeUtils={TemporalLocaleUtils} TODO: determine if we still need formatters/labels for custom text
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
