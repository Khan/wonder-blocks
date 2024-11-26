import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    AriaProps,
    StyleType,
    useUniqueIdWithMock,
    addStyle,
    View,
} from "@khanacademy/wonder-blocks-core";
import {
    border,
    color,
    font,
    mix,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {useFieldValidation} from "../hooks/use-field-validation";

type TextAreaProps = AriaProps & {
    /**
     * The text area value.
     */
    value: string;
    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => unknown;
    /**
     * An optional unique identifier for the TextArea.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Custom styles for the textarea element.
     */
    style?: StyleType;
    /**
     * Custom styles for the root node of the component.
     * If possible, try to use this prop carefully and use the `style` prop
     * instead.
     */
    rootStyle?: StyleType;
    /**
     * Provide hints or examples of what to enter.
     */
    placeholder?: string;
    /**
     * Whether the text area should be disabled.
     */
    disabled?: boolean;
    /**
     * Specifies if the text area is read-only.
     */
    readOnly?: boolean;
    /**
     * Specifies if the text area allows autocomplete.
     */
    autoComplete?: "on" | "off";
    /**
     * The name for the text area control. This is submitted along with
     * the form data.
     */
    name?: string;
    /**
     * CSS classes for the textarea element. It is recommended that the style prop is used instead where possible
     */
    className?: string;
    /**
     * Whether this textarea should autofocus on page load.
     */
    autoFocus?: boolean;
    /**
     * The number of visible lines of text for the textarea.
     * By default, 2 rows are shown.
     * `rows` is ignored if a height is applied to the textarea using CSS.
     * The number of rows can change if the resize control is used by the user.
     */
    rows?: number;
    /**
     * Determines if the textarea should be checked for spelling by the browser/OS.
     * By default, it is enabled. It will be checked for spelling when you try
     * to edit it (ie. once the textarea is focused). For more details, see the
     * [spellcheck attribute MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#spellcheck).
     * **Note**: Consider disabling `spellCheck` for
     *  sensitive information (see [Security and Privacy concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns) for more details)
     */
    spellCheck?: boolean;
    /**
     * How the control should wrap the value for form submission. If not provided,
     * `soft` is the default behaviour. For more details, see the
     * [wrap attribute MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#wrap)
     */
    wrap?: "hard" | "soft" | "off";
    /**
     * The minimum number of characters allowed in the textarea.
     */
    minLength?: number;
    /**
     * The maximum number of characters allowed in the textarea.
     */
    maxLength?: number;
    /**
     * Called when the textarea is clicked.
     * @param event The event from the click
     */
    onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
    /**
     * Called when a key is pressed.
     * @param event The keyboard event
     */
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Called when a key is released.
     * @param event The keyboard event
     */
    onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Called when the element has been focused.
     * @param event The focus event
     */
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Called when the element has been focused.
     * @param event The blur event
     */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Provide a validation for the textarea value.
     * Return a string error message or null | void for a valid input.
     *
     * Use this for errors that are shown to the user while they are filling out
     * a form.
     */
    validate?: (value: string) => string | null | void;
    /**
     * Called right after the textarea is validated.
     */
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    /**
     * If true, textarea is validated as the user types (onChange). If false,
     * it is validated when the user's focus moves out of the field (onBlur).
     * It is preferred that instantValidation is set to `false`, however, it
     * defaults to `true` for backwards compatibility with existing implementations.
     */
    instantValidation?: boolean;
    /**
     * Whether the textarea is in an error state.
     *
     * Use this for errors that are triggered by something external to the
     * component (example: an error after form submission).
     */
    error?: boolean;
    /**
     * Whether this textarea is required to continue, or the error message to
     * render if this textarea is left blank.
     *
     * This can be a boolean or a string.
     *
     * String:
     * Please pass in a translated string to use as the error message that will
     * render if the user leaves this textarea blank. If this textarea is required,
     * and a string is not passed in, a default untranslated string will render
     * upon error.
     * Note: The string will not be used if a `validate` prop is passed in.
     *
     * Example message: i18n._("A password is required to log in.")
     *
     * Boolean:
     * True/false indicating whether this textarea is required. Please do not pass
     * in `true` if possible - pass in the error string instead.
     * If `true` is passed, and a `validate` prop is not passed, that means
     * there is no corresponding message and the default untranlsated message
     * will be used.
     */
    required?: boolean | string;
    /**
     * Specifies the resizing behaviour for the textarea. Defaults to both
     * behaviour. For more details, see the [CSS resize property values MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/resize#values)
     */
    resizeType?: "horizontal" | "vertical" | "both" | "none";
    /**
     * Change the default focus ring color to fit a dark background.
     */
    light?: boolean;
};

const StyledTextArea = addStyle("textarea");

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    function TextArea(
        props: TextAreaProps,
        ref: React.ForwardedRef<HTMLTextAreaElement>,
    ) {
        const {
            onChange,
            value,
            placeholder,
            disabled,
            id,
            testId,
            style,
            readOnly,
            autoComplete,
            name,
            className,
            autoFocus,
            rows,
            spellCheck,
            wrap,
            minLength,
            maxLength,
            onClick,
            onKeyDown,
            onKeyUp,
            onFocus,
            onBlur,
            validate,
            onValidate,
            required,
            resizeType,
            light,
            rootStyle,
            error,
            instantValidation = true,
            // Should only include aria related props
            ...otherProps
        } = props;

        const {errorMessage, onBlurValidation, onChangeValidation} =
            useFieldValidation({
                value,
                disabled,
                validate,
                onValidate,
                required,
                instantValidation,
            });

        const hasError = error || !!errorMessage;

        const ids = useUniqueIdWithMock("text-area");
        const uniqueId = id ?? ids.get("id");

        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
            const newValue = event.target.value;
            onChangeValidation(newValue);
            onChange(newValue);
        };

        const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            onBlurValidation(event.target.value);

            if (onBlur) {
                onBlur(event);
            }
        };

        const getStyles = (): StyleType => {
            // Base styles are the styles that apply regardless of light mode
            const baseStyles = [
                styles.textarea,
                typographyStyles.LabelMedium,
                resizeType && resizeStyles[resizeType],
            ];
            const defaultStyles = [
                styles.default,
                !disabled && styles.defaultFocus,
                disabled && styles.disabled,
                hasError && styles.error,
            ];
            const lightStyles = [
                styles.light,
                !disabled && styles.lightFocus,
                disabled && styles.lightDisabled,
                hasError && styles.lightError,
            ];
            return [...baseStyles, ...(light ? lightStyles : defaultStyles)];
        };
        return (
            <View style={[{width: "100%"}, rootStyle]}>
                <StyledTextArea
                    id={uniqueId}
                    data-testid={testId}
                    ref={ref}
                    className={className}
                    style={[getStyles(), style]}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-disabled={disabled}
                    readOnly={readOnly || disabled} // Set readOnly also if it is disabled, otherwise users can type in the field
                    autoComplete={autoComplete}
                    name={name}
                    autoFocus={autoFocus}
                    rows={rows}
                    spellCheck={spellCheck}
                    wrap={wrap}
                    minLength={minLength}
                    maxLength={maxLength}
                    onClick={disabled ? undefined : onClick}
                    onKeyDown={disabled ? undefined : onKeyDown}
                    onKeyUp={disabled ? undefined : onKeyUp}
                    onFocus={onFocus} // TextArea can be focused on if it is disabled
                    onBlur={handleBlur} // TextArea can be blurred if it is disabled
                    required={!!required}
                    {...otherProps}
                    aria-invalid={hasError}
                />
            </View>
        );
    },
);

const VERTICAL_SPACING_PX = 10;

const styles = StyleSheet.create({
    textarea: {
        borderRadius: border.radius.medium_4,
        boxSizing: "border-box",
        padding: `${VERTICAL_SPACING_PX}px ${spacing.medium_16}px`,
        // This minHeight is equivalent to when the textarea has one row
        minHeight: `${
            VERTICAL_SPACING_PX * 2 +
            font.lineHeight.medium +
            2 * border.width.hairline
        }px`,
    },
    default: {
        background: color.white,
        border: `1px solid ${color.offBlack50}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
    defaultFocus: {
        ":focus-visible": {
            borderColor: color.blue,
            outline: `1px solid ${color.blue}`,
            // Negative outline offset so it focus outline is not cropped off if
            // an ancestor element has overflow: hidden
            outlineOffset: "-2px",
        },
    },
    disabled: {
        background: color.offWhite,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack64,
        "::placeholder": {
            color: color.offBlack64,
        },
        cursor: "not-allowed",
        ":focus-visible": {
            outline: `2px solid ${color.offBlack32}`,
            outlineOffset: "-3px",
        },
    },
    error: {
        background: color.fadedRed8,
        border: `1px solid ${color.red}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
        ":focus-visible": {
            outlineColor: color.red,
            borderColor: color.red,
        },
    },
    light: {
        background: color.white,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
    lightFocus: {
        ":focus-visible": {
            outline: `3px solid ${color.blue}`,
            outlineOffset: "-4px",
            borderColor: color.white,
        },
    },
    lightDisabled: {
        backgroundColor: "transparent",
        border: `1px solid ${color.white32}`,
        color: color.white64,
        "::placeholder": {
            color: color.white64,
        },
        cursor: "not-allowed",
        ":focus-visible": {
            borderColor: mix(color.white32, color.blue),
            outline: `3px solid ${color.fadedBlue}`,
            outlineOffset: "-4px",
        },
    },
    lightError: {
        background: color.fadedRed8,
        border: `1px solid ${color.white}`,
        outline: `2px solid ${color.red}`,
        outlineOffset: "-3px",
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
        ":focus-visible": {
            outline: `3px solid ${color.red}`,
            outlineOffset: "-4px",
        },
    },
});

const resizeStyles = StyleSheet.create({
    both: {
        resize: "both",
    },
    none: {
        resize: "none",
    },
    horizontal: {
        resize: "horizontal",
    },
    vertical: {
        resize: "vertical",
    },
});

export default TextArea;
