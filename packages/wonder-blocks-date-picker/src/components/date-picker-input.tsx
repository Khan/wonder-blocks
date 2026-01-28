import {StyleSheet} from "aphrodite";
import * as React from "react";

import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import calendarIcon from "@phosphor-icons/core/bold/calendar-blank-bold.svg";
import {enUSLocaleCode} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

interface Props {
    /**
     * The value passed to the input element.
     */
    value: string | null | undefined;
    /**
     * Whether the input element is disabled.
     */
    disabled?: boolean;
    /**
     * This id is used to tie the input field to the label that describes it.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */
    id?: string;
    /**
     * Called when the input element loses focus.
     */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the input element is clicked.
     */
    onClick?: (arg1: React.MouseEvent<Element>) => unknown;
    /**
     * Called when the input element gains focus.
     */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => unknown;
    /**
     * Called if the user press a key inside the input element.
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the selected date changes, this callback is a passed a Date
     * and the modifiers object containing information about the selected date.
     *
     * NOTE: `value` will be null if an invalid date has been entered.
     */
    onChange?: (
        value: Date | null | undefined,
        modifiers: Partial<CustomModifiers>,
    ) => unknown;
    /**
     * Used to format the value as a valid Date.
     */
    dateFormat?: Array<string> | string;
    /**
     * The locale associated to the current Date.
     */
    locale?: string;
    /**
     * An object of day modifiers (exposed by react-day-picker).
     * @see https://react-day-picker.js.org/docs/matching-days
     */
    modifiers?: Partial<CustomModifiers>;
    /**
     * Return the modifiers matching day for the given modifiers  (exposed by
     * react-day-picker).
     * @see https://react-day-picker.js.org/api/ModifiersUtils
     */
    getModifiersForDay?: (
        day: Date,
        modifiers: Partial<CustomModifiers>,
    ) => Array<string>;
    /**
     * Function to parse user-entered date strings into Date objects.
     *
     * This is called as the user types to validate and convert their input
     * into a Date. If the input matches one of the provided formats, it
     * returns a Date object. If the input is invalid or doesn't match any
     * format, it returns null or undefined.
     *
     * @param value - The date string to parse (or an existing Date to pass through)
     * @param format - A single format string or array of format strings to try
     * @param locale - Optional locale for locale-aware parsing
     * @returns A Date object if parsing succeeds, null/undefined otherwise
     *
     * @example
     * parseDate("2024-12-25", "YYYY-MM-DD", "en-US") // => Date object
     * parseDate("invalid", "YYYY-MM-DD", "en-US") // => null
     */
    parseDate?: (
        value: string | Date,
        format: Array<string> | null | undefined | string | null | undefined,
        locale?: string | null | undefined,
    ) => Date | null | undefined;
    /**
     * The placeholder assigned to the date field
     */
    placeholder?: string;
    /**
     * Test ID used for testing.
     */
    testId?: string;
    /**
     * Whether to keep invalid (unparseable) text in the input field on blur.
     *
     * - If `true`: Invalid text stays in the field and onChange is called with null
     * - If `false` (default): Invalid text reverts to the last valid value
     *
     * Note: Dates outside the min/max range always revert, regardless of this prop.
     */
    keepInvalidText?: boolean;
    /**
     * Used to define a string that labels the current element.
     */
    ["aria-label"]?: string;
}

/**
 * Provides the user with a text field which they can manually input a date.
 *
 * There's also an internal mechanism to verify and parse the current value as a
 * date. In both cases, we provide the necessary information (via onChange) to
 * notify the parent component the result of the operation.
 */
const DatePickerInput = React.forwardRef<HTMLInputElement, Props>(
    (props, ref) => {
        const {
            value: propValue,
            onBlur,
            onClick,
            onFocus,
            onKeyDown,
            onChange,
            dateFormat,
            locale = enUSLocaleCode,
            modifiers,
            getModifiersForDay,
            parseDate,
            placeholder,
            testId,
            keepInvalidText = false,
            ["aria-label"]: ariaLabel,
            ...restProps
        } = props;

        const [value, setValue] = React.useState<string | null | undefined>(
            propValue,
        );
        const lastPropValueRef = React.useRef<string | null | undefined>(
            propValue,
        );
        const keepInvalidTextRef = React.useRef(false);

        // Helper to process modifiers
        const processModifiers = React.useCallback(
            (date: Date, value?: string | null): Partial<CustomModifiers> => {
                if (!getModifiersForDay || !modifiers) {
                    return {};
                }
                return getModifiersForDay(date, modifiers).reduce<
                    Partial<CustomModifiers>
                >(
                    (obj, modifier) => ({
                        ...obj,
                        [modifier]: true,
                    }),
                    {},
                );
            },
            [getModifiersForDay, modifiers],
        );

        // Helper to notify valid date
        const updateDate = React.useCallback(
            (date: Date, value?: string | null) => {
                if (onChange) {
                    onChange(date, processModifiers(date, value));
                }
            },
            [onChange, processModifiers],
        );

        // Helper to notify invalid date
        const updateDateAsInvalid = React.useCallback(() => {
            if (onChange) {
                onChange(null, {});
            }
        }, [onChange]);

        // Helper to process date
        const processDate = React.useCallback(
            (inputValue?: string | null): Date | null | undefined => {
                if (!inputValue || inputValue.trim() === "") {
                    return;
                }
                if (!parseDate) {
                    return;
                }
                const date = parseDate(inputValue, dateFormat, locale);
                if (!date) {
                    return;
                }
                return date;
            },
            [parseDate, dateFormat, locale],
        );

        // Helper to check if value is valid
        const isValid = React.useCallback((): boolean => {
            const date = processDate(value);
            if (!date) {
                return false;
            }
            const modifiersResult = processModifiers(date, value);
            if (modifiersResult.disabled) {
                return false;
            }
            return true;
        }, [value, processDate, processModifiers]);

        // Sync with propValue when it changes from an external source
        // Allow prop updates to override local state (e.g., calendar selection, programmatic updates)
        // Skip sync if we're intentionally keeping invalid text for validation
        React.useEffect(() => {
            const propValueChanged = lastPropValueRef.current !== propValue;
            lastPropValueRef.current = propValue;

            if (propValueChanged) {
                if (!keepInvalidTextRef.current) {
                    setValue(propValue);
                } else {
                    // Reset the flag only after we skip a prop sync
                    keepInvalidTextRef.current = false;
                }
            }
        }, [propValue]);

        // On mount, notify parent if initial value is invalid
        // Skip validation for LL format (text-based dates that can't be reliably parsed back)
        useOnMountEffect(() => {
            const skipValidation = dateFormat === "LL" && propValue;
            if (!skipValidation && !isValid()) {
                updateDateAsInvalid();
            }
        });

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            // Don't reset typing flag on focus - user might refocus to continue editing
            if (onFocus) {
                onFocus(e);
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            // If focus is moving to the calendar overlay, skip blur handling
            // to prevent re-renders that would destroy click handlers
            const movingToCalendar =
                e.relatedTarget instanceof HTMLElement &&
                e.relatedTarget.closest(
                    '[data-testid="date-picker-overlay"]',
                ) !== null;

            if (movingToCalendar) {
                if (onBlur) {
                    onBlur(e);
                }
                return;
            }

            // On blur, validate the current value
            const date = processDate(value);

            if (date) {
                // Date parsed successfully - check if it's within bounds
                const modifiersResult = processModifiers(date, value);
                if (!modifiersResult.disabled) {
                    // Valid and within bounds - update parent
                    updateDate(date, value);
                } else {
                    // Parsed but out of bounds (disabled) - just revert locally
                    // (Parent was already notified during typing via handleChange)
                    setValue(propValue);
                }
            } else if (value && value.trim() !== "") {
                // Could not parse date - check if we should keep invalid text
                if (keepInvalidText) {
                    // Keep text for validation and notify parent
                    keepInvalidTextRef.current = true;
                    updateDateAsInvalid();
                } else {
                    // Revert to last valid value (default safer behavior)
                    setValue(propValue);
                }
            } else {
                // Empty value - just revert to last valid value
                setValue(propValue);
            }
            if (onBlur) {
                onBlur(e);
            }
        };

        const handleChange = (newValue: string) => {
            setValue(newValue);

            // For all formats: try to parse and update if valid, but preserve
            // partial input during typing. Only validate on blur, not on every keystroke.
            const date = processDate(newValue);
            if (date) {
                updateDate(date, newValue);
            }
            // Don't call updateDateAsInvalid() during typing - let user edit freely
        };

        return (
            <View
                style={styles.container}
                onClick={(e) => {
                    if (!restProps.disabled && onClick) {
                        onClick(e);
                    }
                }}
            >
                <TextField
                    ref={ref}
                    {...restProps}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    disabled={restProps.disabled}
                    placeholder={placeholder}
                    value={value ?? ""}
                    testId={testId}
                    aria-label={ariaLabel}
                    autoComplete="off"
                    type="text"
                    style={styles.textField}
                />
                <PhosphorIcon
                    icon={calendarIcon}
                    color={
                        restProps.disabled
                            ? semanticColor.core.foreground.disabled.default
                            : semanticColor.core.foreground.instructive.default
                    }
                    size="small"
                    style={styles.icon}
                />
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "stretch",
    },
    icon: {
        pointerEvents: "none",
        position: "absolute",
        insetInlineEnd: sizing.size_080,
    },
    textField: {
        width: "100%",
    },
});

export default DatePickerInput;
