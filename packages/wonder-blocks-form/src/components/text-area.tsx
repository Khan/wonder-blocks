import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    AriaProps,
    StyleType,
    addStyle,
    View,
    useOnMountEffect,
} from "@khanacademy/wonder-blocks-core";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {useId} from "react";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {useFieldValidation} from "../hooks/use-field-validation";
import theme from "../theme";

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
     * Called when text is pasted into the element.
     * @param event The paste event
     */
    onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
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
};

const StyledTextarea = addStyle("textarea");

/**
 * A TextArea is an element used to accept text from the user.
 *
 * Make sure to provide a label for the field. This can be done by either:
 * - (recommended) Using the **LabeledField** component to provide a label,
 * description, and/or error message for the field
 * - Using a `label` html tag with the `htmlFor` prop set to the unique id of
 * the field
 * - Using an `aria-label` attribute on the field
 * - Using an `aria-labelledby` attribute on the field
 */
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
            rows = 2,
            spellCheck,
            wrap,
            minLength,
            maxLength,
            onClick,
            onKeyDown,
            onKeyUp,
            onFocus,
            onBlur,
            onPaste,
            validate,
            onValidate,
            required,
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

        const textAreaContainerRef = React.useRef<HTMLDivElement>(null);
        // Keep track of the textarea height for browsers that don't support
        // field-sizing.
        const [height, setHeight] = React.useState(0);
        const [supportsFieldSizing] = React.useState(
            CSS.supports("field-sizing", "content"),
        );

        const hasError = error || !!errorMessage;

        const generatedUniqueId = useId();
        const uniqueId = id ?? generatedUniqueId;

        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
            const newValue = event.target.value;
            onChangeValidation(newValue);
            onChange(newValue);

            if (!supportsFieldSizing && event.target.scrollHeight !== height) {
                // When the value changes, update the height if field-sizing is
                // not supported
                setHeight(event.target.scrollHeight);
            }
        };

        const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            onBlurValidation(event.target.value);

            if (onBlur) {
                onBlur(event);
            }
        };

        useOnMountEffect(() => {
            // We use a ref to the container to get the child textarea element
            // so that consumers can pass in a ref to the textarea element
            // directly.
            const ref = textAreaContainerRef.current?.children[0];

            if (!supportsFieldSizing && ref && window?.ResizeObserver) {
                const observer = new window.ResizeObserver(([entry]) => {
                    if (entry) {
                        setHeight(entry.target.scrollHeight);
                    }
                });

                observer.observe(ref);

                return () => {
                    observer.disconnect();
                };
            }
        });

        return (
            <View
                style={[{width: "100%"}, rootStyle]}
                ref={textAreaContainerRef}
            >
                <StyledTextarea
                    id={uniqueId}
                    data-testid={testId}
                    ref={ref}
                    className={className}
                    style={[
                        styles.textarea,
                        typographyStyles.BodyTextMediumMediumWeight,
                        styles.default,
                        disabled && styles.disabled,
                        hasError && styles.error,
                        readOnly && styles.readOnly,
                        rows && {
                            // Calculate the size of x number of rows, including
                            // padding and border. We do this because the `row`
                            // attribute is not used when `field-sizing` is also
                            // used.
                            // Min height = (number of rows * line height) + (2 * vertical padding) + (2 * border width)
                            minHeight: `calc((${rows} * ${font.body.lineHeight.medium}) + (2 * ${theme.field.layout.paddingBlock}) + (2 * ${border.width.thin}))`,
                        },
                        supportsFieldSizing
                            ? styles.fieldSizing
                            : {
                                  // Dynamically set the height if field-sizing is
                                  // not supported
                                  height: `calc(${height}px + 2px)`,
                              },
                        style,
                    ]}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-disabled={disabled}
                    readOnly={readOnly || disabled} // Set readOnly also if it is disabled, otherwise users can type in the field
                    autoComplete={autoComplete}
                    name={name}
                    autoFocus={autoFocus}
                    spellCheck={spellCheck}
                    wrap={wrap}
                    minLength={minLength}
                    maxLength={maxLength}
                    aria-required={!!required}
                    onClick={disabled ? undefined : onClick}
                    onKeyDown={disabled ? undefined : onKeyDown}
                    onKeyUp={disabled ? undefined : onKeyUp}
                    onFocus={onFocus} // TextArea can be focused on if it is disabled
                    onBlur={handleBlur} // TextArea can be blurred if it is disabled
                    onPaste={disabled ? undefined : onPaste}
                    required={!!required}
                    {...otherProps}
                    aria-invalid={hasError}
                />
            </View>
        );
    },
);

const styles = StyleSheet.create({
    textarea: {
        borderRadius: theme.field.border.radius,
        boxSizing: "border-box",
        paddingInline: theme.field.layout.paddingInline,
        paddingBlock: theme.field.layout.paddingBlock,
        // Disable the resize control
        resize: "none",
        // Set max height to 6 rows of text + padding + border
        maxHeight: `calc((6 * ${font.body.lineHeight.medium}) + (2 * ${theme.field.layout.paddingBlock}) + (2 * ${border.width.thin}))`,
    },
    fieldSizing: {
        // For browsers that support field-sizing, set it to content so that
        // the textarea can grow to fit the content
        ["fieldSizing" as any]: "content",
    },
    readOnly: {
        background: semanticColor.input.readOnly.background,
        color: semanticColor.input.readOnly.text,
    },
    default: {
        background: semanticColor.input.default.background,
        border: `${border.width.thin} solid ${semanticColor.input.default.border}`,
        color: semanticColor.input.default.foreground,
        "::placeholder": {
            color: semanticColor.input.default.placeholder,
        },
        ...focusStyles.focus,
        // Don't show active styles if field is disabled or readonly
        [":active:not([aria-disabled='true']):not([readonly])" as any]: {
            // Use box shadow to make the border in the press state look thicker
            // without changing the border
            boxShadow: `0 0 0 ${theme.field.border.width.press} ${semanticColor.input.default.border}`,
        },
    },
    disabled: {
        background: semanticColor.input.disabled.background,
        border: `${border.width.thin} solid ${semanticColor.input.disabled.border}`,
        color: semanticColor.input.disabled.foreground,
        "::placeholder": {
            color: semanticColor.input.disabled.placeholder,
        },
        cursor: "not-allowed",
    },
    error: {
        background: semanticColor.input.error.background,
        border: `${theme.field.border.width.error} solid ${semanticColor.input.error.border}`,
        color: semanticColor.input.error.foreground,
        "::placeholder": {
            color: semanticColor.input.default.placeholder,
        },
    },
});

export default TextArea;
