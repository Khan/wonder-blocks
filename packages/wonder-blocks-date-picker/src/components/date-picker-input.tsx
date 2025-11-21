import {StyleSheet} from "aphrodite";
import * as React from "react";

import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import calendarIcon from "@phosphor-icons/core/bold/calendar-blank-bold.svg";
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
     * Parses an input string using a given format and returns the result as a
     * Date  (exposed by react-day-picker).
     * @see https://github.com/gpbl/react-day-picker/blob/750f6cd808b2ac29772c8df5c497a66e818080e8/src/addons/MomentLocaleUtils.js#L39
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
            locale = "en",
            modifiers,
            getModifiersForDay,
            parseDate,
            placeholder,
            testId,
            ["aria-label"]: ariaLabel,
            ...restProps
        } = props;

        const [value, setValue] = React.useState<string | null | undefined>(
            propValue,
        );

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

        // Helper to maybe update date
        const maybeUpdateDate = React.useCallback(
            (inputValue?: string | null) => {
                const date = processDate(inputValue);
                if (date) {
                    updateDate(date, inputValue);
                } else {
                    updateDateAsInvalid();
                }
            },
            [processDate, updateDate, updateDateAsInvalid],
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

        // Sync state with propValue
        React.useEffect(() => {
            setValue(propValue);
        }, [propValue]);

        // On mount, notify parent if initial value is invalid
        useOnMountEffect(() => {
            if (!isValid()) {
                updateDateAsInvalid();
            }
        });

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (!isValid()) {
                setValue(propValue);
            }
            if (onBlur) {
                onBlur(e);
            }
        };

        const handleChange = (newValue: string) => {
            maybeUpdateDate(newValue);
            setValue(newValue);
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
                    onFocus={onFocus}
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
