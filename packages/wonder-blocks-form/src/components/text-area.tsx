import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    AriaProps,
    StyleType,
    addStyle,
    useOnMountEffect,
    useUniqueIdWithMock,
} from "@khanacademy/wonder-blocks-core";
import {border, color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

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
     * Custom styles for the text area.
     */
    style?: StyleType;
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
    autoComplete?: string;
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
     */
    validate?: (value: string) => string | null | void;
    /**
     * Called right after the textarea is validated.
     */
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
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
};

const defaultErrorMessage = "This field is required.";

const StyledTextArea = addStyle("textarea");

export default function TextArea(props: TextAreaProps) {
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
        // Should only include aria related props
        ...otherProps
    } = props;

    const [error, setError] = React.useState<string | null>(null);

    const ids = useUniqueIdWithMock("text-area");
    const uniqueId = id ?? ids.get("id");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
        handleValidation(newValue);
    };

    const handleValidation = (newValue: string) => {
        if (validate) {
            const error = validate(newValue) || null;
            setError(error);
            if (onValidate) {
                onValidate(error);
            }
        } else if (required) {
            const requiredString =
                typeof required === "string" ? required : defaultErrorMessage;
            const error = newValue ? null : requiredString;
            setError(error);
            if (onValidate) {
                onValidate(error);
            }
        }
    };

    useOnMountEffect(() => {
        // Only validate on mount if the value is not empty. This is so that fields
        // don't render an error when they are initially empty
        if (value !== "") {
            handleValidation(value);
        }
    });

    return (
        <div>
            <StyledTextArea
                id={uniqueId}
                data-testid={testId}
                className={className}
                style={[
                    styles.textarea,
                    styles.default,
                    typographyStyles.LabelMedium,
                    disabled && styles.disabled,
                    !!error && styles.error,
                    resizeType && resizeStyles[resizeType],
                    style,
                ]}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                name={name}
                autoFocus={autoFocus}
                rows={rows}
                spellCheck={spellCheck}
                wrap={wrap}
                minLength={minLength}
                maxLength={maxLength}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onBlur={onBlur}
                required={!!required}
                {...otherProps}
                aria-invalid={!!error}
            />
        </div>
    );
}

const styles = StyleSheet.create({
    textarea: {
        borderRadius: border.radius.medium_4,
        boxSizing: "border-box",
        padding: `10px ${spacing.medium_16}px`, // TODO(bea): token for 10px?
        minHeight: "1em",
    },
    default: {
        background: color.white,
        border: `1px solid ${color.offBlack50}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
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
    },
    error: {
        background: color.fadedRed8,
        border: `1px solid ${color.red}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
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
