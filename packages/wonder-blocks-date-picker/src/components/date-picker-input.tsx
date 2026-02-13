import {StyleSheet} from "aphrodite";
import * as React from "react";

import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import calendarIcon from "@phosphor-icons/core/bold/calendar-blank-bold.svg";
import {
    enUSLocaleCode,
    TemporalLocaleUtils,
} from "../util/temporal-locale-utils";
import type {CustomModifiers} from "../util/types";

interface Props {
    /**
     * The value passed to the input element.
     */
    value: string | null | undefined;
    /**
     * Whether the input element is disabled.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
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
        inputValue?: string,
    ) => unknown;
    /**
     * Used to format the value as a valid Date.
     */
    dateFormat?: string;
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
        format: string | null | undefined,
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
     * Whether to reset invalid text to the last valid value on blur.
     *
     * - If `true` (default): Invalid text and out-of-range dates reset to the last valid value
     * - If `false`: Invalid/unparseable text and out-of-range dates stay in the field,
     *   and onChange is called to notify the parent
     */
    resetInvalidValueOnBlur?: boolean;
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
            resetInvalidValueOnBlur = true,
            ["aria-label"]: ariaLabel,
            ...restProps
        } = props;

        const [value, setValue] = React.useState<string | null | undefined>(
            propValue,
        );
        const lastPropValueRef = React.useRef<string | null | undefined>(
            propValue,
        );
        const keepInvalidTextRef = React.useRef(false); // true when invalid text is kept for validation
        // When we send partial text (e.g. "January") to parent, don't let next prop overwrite it
        // so the overlay can update and the user can keep typing (LL / MMMM D, YYYY).
        const lastTypedTextFormatValueRef = React.useRef<string | null>(null);

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
            (date: Date, inputValue?: string | null) => {
                if (onChange) {
                    onChange(
                        date,
                        processModifiers(date, inputValue),
                        inputValue || undefined,
                    );
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

        const isTextFormat = TemporalLocaleUtils.isTextFormatDate(dateFormat);

        // This sync logic decides when to update the input’s state from a parent
        // value prop and when to leave the user’s text alone (e.g. while they’re typing).
        // Allows prop updates to override local state (e.g., calendar selection, programmatic updates)
        // Skips sync when we're keeping partial text-format input so overlay can update and user can keep typing.
        // Skips sync when prop matches current value to avoid re-render that resets cursor (e.g. after typing "2026").
        React.useEffect(() => {
            const propValueChanged = lastPropValueRef.current !== propValue;
            lastPropValueRef.current = propValue;

            if (propValueChanged) {
                // propValue: the value prop from the parent DatePicker component (formatted date string or null/undefined)
                const safeProp = propValue ?? "";
                // value: the current value in the input field (can be partial/invalid when user is typing)
                const safeValue = value ?? "";
                const isLastTypedValue =
                    lastTypedTextFormatValueRef.current !== null &&
                    value === lastTypedTextFormatValueRef.current;
                const bothHaveContent = safeValue !== "" && safeProp !== "";
                // oneIsPrefixOfOther: when both have content, check if one is a prefix of the other (e.g. user typed "202" and prop is "2026", or user typed "January" and prop is "January 1, 2024")
                const oneIsPrefixOfOther =
                    safeProp.startsWith(safeValue) ||
                    safeValue.startsWith(safeProp);
                // Don't overwrite the input while the user is typing (we just saw this value, or one string is a prefix of the other).
                const skipSyncUserTyping =
                    isTextFormat &&
                    propValue !== value &&
                    (isLastTypedValue ||
                        (bothHaveContent && oneIsPrefixOfOther));

                if (
                    keepInvalidTextRef.current &&
                    (!propValue || propValue.trim() === "")
                ) {
                    keepInvalidTextRef.current = false;
                } else if (skipSyncUserTyping) {
                    return;
                } else if (
                    propValue === value ||
                    (propValue ?? "") === (value ?? "")
                ) {
                    // Already showing this value; skip setState to avoid re-render that moves cursor to end
                    keepInvalidTextRef.current = false;
                    lastTypedTextFormatValueRef.current = null;
                    return;
                } else {
                    setValue(propValue);
                    keepInvalidTextRef.current = false;
                    lastTypedTextFormatValueRef.current = null;
                }
            }
        }, [propValue, isTextFormat, value]);

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

        const pendingValidationRef = React.useRef(false);

        const validateInput = React.useCallback(() => {
            lastTypedTextFormatValueRef.current = null;
            const date = processDate(value);

            if (date) {
                // Date parsed successfully - check if it's within bounds
                const modifiersResult = processModifiers(date, value);
                if (!modifiersResult.disabled) {
                    // Valid and within bounds - update parent
                    updateDate(date, value);
                } else {
                    // Parsed but out of bounds (disabled)
                    if (!resetInvalidValueOnBlur) {
                        // Keep out-of-range date for validation and notify parent
                        keepInvalidTextRef.current = true;
                        updateDate(date, value);
                    } else {
                        // Reset to last valid value (default behavior)
                        setValue(propValue);
                    }
                }
            } else if (value && value.trim() !== "") {
                // Could not parse date - check if we should keep invalid text
                if (!resetInvalidValueOnBlur) {
                    // Keep text for validation and notify parent
                    keepInvalidTextRef.current = true;
                    updateDateAsInvalid();
                } else {
                    // Reset to last valid value (default behavior)
                    setValue(propValue);
                }
            } else {
                // Empty value - just reset to last valid value
                setValue(propValue);
            }
        }, [
            value,
            processDate,
            processModifiers,
            resetInvalidValueOnBlur,
            propValue,
            updateDate,
            updateDateAsInvalid,
        ]);

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            // If focus is moving to the calendar overlay, defer validation
            // It will be triggered when the overlay closes
            const movingToCalendar =
                e.relatedTarget instanceof HTMLElement &&
                e.relatedTarget.closest(
                    '[data-testid="date-picker-overlay"]',
                ) !== null;

            if (movingToCalendar) {
                pendingValidationRef.current = true;
                if (onBlur) {
                    onBlur(e);
                }
                return;
            }

            // Validate immediately if not moving to calendar
            validateInput();
            if (onBlur) {
                onBlur(e);
            }
        };

        const innerRef = React.useRef<HTMLInputElement>(null);

        const handleChange = (newValue: string) => {
            setValue(newValue);

            // Try to parse and notify parent for real-time validation
            const date = processDate(newValue);
            if (date) {
                const modifiersResult = processModifiers(date, newValue);
                if (isTextFormat) {
                    lastTypedTextFormatValueRef.current = newValue;
                }
                if (!modifiersResult.disabled) {
                    updateDate(date, newValue);
                } else if (!resetInvalidValueOnBlur) {
                    // Out-of-range date without auto-reset - notify for real-time validation
                    keepInvalidTextRef.current = true;
                    updateDate(date, newValue);
                } else {
                    // Out-of-range with resetInvalidValueOnBlur: still notify parent so overlay month can update
                    updateDate(date, newValue);
                }
                // For default case (resetInvalidValueOnBlur=true), out-of-range dates validated on blur
            } else if (
                !resetInvalidValueOnBlur &&
                newValue &&
                newValue.trim() !== ""
            ) {
                // If resetInvalidValueOnBlur is disabled, notify parent immediately for invalid text
                keepInvalidTextRef.current = true;
                updateDateAsInvalid();
            }
            // For default case (resetInvalidValueOnBlur=true), invalid text is validated on blur
            // to avoid resetting parent state during partial input
        };

        // Expose both HTMLInputElement methods and validation method via ref
        React.useImperativeHandle(ref, () => {
            const inputElement = innerRef.current;
            if (!inputElement) {
                return null as any;
            }
            // Add validation method to the input element.
            // Always run when called (e.g. when overlay closes via Escape or outside click)
            // so invalid input is reset even if blur was deferred (moving to calendar).
            (inputElement as any).validateInput = () => {
                pendingValidationRef.current = false;
                validateInput();
            };
            return inputElement;
        });

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
                    ref={innerRef}
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

// Match form field left padding; right side uses the same edge spacing so
// the icon sits 16px from the right edge (symmetric with 16px left padding).
const fieldPaddingInline = sizing.size_160; // match TextField theme
const iconSize = sizing.size_160; // PhosphorIcon size="small"
const fieldPaddingInlineEnd =
    fieldPaddingInline + iconSize + fieldPaddingInline; // gap + icon + gap

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "stretch",
    },
    icon: {
        pointerEvents: "none",
        position: "absolute",
        insetInlineEnd: fieldPaddingInline,
    },
    textField: {
        width: "100%",
        paddingInlineStart: fieldPaddingInline,
        paddingInlineEnd: fieldPaddingInlineEnd,
    },
});

export default DatePickerInput;
