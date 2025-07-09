import * as React from "react";
import {StyleSheet} from "aphrodite";
import WarningCircle from "@phosphor-icons/core/bold/warning-circle-bold.svg";
import LockIcon from "@phosphor-icons/core/bold/lock-bold.svg";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {View, addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import theme from "../theme";

type Props = {
    /**
     * The form field component.
     */
    field: React.ReactElement;
    /**
     * The title for the label element.
     */
    label: React.ReactNode;
    /**
     * The text for the description element.
     */
    description?: React.ReactNode;
    /**
     * Whether this field is required to to continue, or the error message to
     * render if this field is left blank. This is passed into the field
     * component.
     *
     * This can be a boolean or a string.
     *
     * String:
     * Please pass in a translated string to use as the error message that will
     * render if the user leaves this field blank. If this field is required,
     * and a string is not passed in, a default untranslated string will render
     * upon error.
     * Note: The string will not be used if a `validate` prop is passed in.
     *
     * Example message: i18n._("A password is required to log in.")
     *
     * Boolean:
     * True/false indicating whether this field is required. Please do not pass
     * in `true` if possible - pass in the error string instead.
     * If `true` is passed, and a `validate` prop is not passed, that means
     * there is no corresponding message and the default untranlsated message
     * will be used.
     */
    required?: boolean | string;
    /**
     * The message for the error element. If there is a message, it will also
     * set the `error` prop on the `field` component.
     *
     * Note: Since the error icon has an aria-label, screen readers will
     * prefix the error message with "Error:" (or the value provided to the
     * errorIconAriaLabel in the `labels` prop)
     *
     * If both `errorMessage` and `readOnlyMessage` are provided, the `readOnlyMessage`
     * is displayed first.
     */
    errorMessage?: React.ReactNode;
    /**
     * The helpful text message to display when the field is read only.
     *
     * Use the `labels.readOnlyAriaLabel` prop to set the `aria-label` for
     * the read only icon.
     *
     * If both `errorMessage` and `readOnlyMessage` are provided, the `readOnlyMessage`
     * is displayed first.
     */
    readOnlyMessage?: React.ReactNode;
    /**
     * Custom styles for the elements of LabeledField. Useful if there are
     * specific cases where spacing between elements needs to be customized.
     */
    styles?: {
        root?: StyleType;
        label?: StyleType;
        description?: StyleType;
        error?: StyleType;
        readOnlyMessage?: StyleType;
        elementBeforeFieldStart?: StyleType;
        elementBeforeFieldEnd?: StyleType;
        elementAfterFieldStart?: StyleType;
        elementAfterFieldEnd?: StyleType;
    };
    /**
     * A unique id to use as the base of the ids for the elements within the component.
     * Here is how the id is used for the different elements in the component:
     * - The label will have an id formatted as `${id}-label`
     * - The description will have an id formatted as `${id}-description`
     * - The field will have an id formatted as `${id}-field`
     * - The error will have an id formatted as `${id}-error`
     * - The read only message will have an id formatted as `${id}-read-only-message`
     * - The `elementBeforeFieldStart` will have an id formatted as `${id}-element-before-field-start`
     * - The `elementBeforeFieldEnd` will have an id formatted as `${id}-element-before-field-end`
     * - The `elementAfterFieldStart` will have an id formatted as `${id}-element-after-field-start`
     * - The `elementAfterFieldEnd` will have an id formatted as `${id}-element-after-field-end`
     *
     * If the `id` prop is not provided, a base unique id will be auto-generated.
     * This is important so that the different elements can be wired up together
     * for accessibility!
     *
     * Note: When using the `LabeledField` component, an `id` provided to the
     * field component (ex: a TextField component) will be overridden.
     */
    id?: string;
    /**
     * Optional test id for e2e testing. Here is how the test id is used for the
     * different elements in the component:
     * - The label will have a testId formatted as `${testId}-label`
     * - The description will have a testId formatted as `${testId}-description`
     * - The field will have a testId formatted as `${testId}-field`
     * - The error will have a testId formatted as `${testId}-error`
     * - The read only message will have a testId formatted as `${testId}-read-only-message`
     * - The `elementBeforeFieldStart` will have a testId formatted as `${testId}-element-before-field-start`
     * - The `elementBeforeFieldEnd` will have a testId formatted as `${testId}-element-before-field-end`
     * - The `elementAfterFieldStart` will have a testId formatted as `${testId}-element-after-field-start`
     * - The `elementAfterFieldEnd` will have a testId formatted as `${testId}-element-after-field-end`
     */
    testId?: string;
    /**
     * The object containing the custom labels used inside this component.
     *
     * This is useful for internationalization. Defaults to English.
     */
    labels?: LabeledFieldLabels;

    /**
     * The element to display before the field at the start of the row.
     *
     * This is commonly used for a description for the field. Prefer using this
     * prop to provide more information about a field instead of tooltips.
     */
    elementBeforeFieldStart?: React.ReactNode;
    /**
     * The element to display before the field at the end of the row.
     */
    elementBeforeFieldEnd?: React.ReactNode;
    /**
     * The element to display after the field at the start of the row.
     *
     * For error messages or messages related to the read only state, use the
     * `errorMessage` or `readOnlyMessage` props instead.
     */
    elementAfterFieldStart?: React.ReactNode;
    /**
     * The element to display after the field at the end of the row.
     */
    elementAfterFieldEnd?: React.ReactNode;
};

export type LabeledFieldLabels = {
    errorIconAriaLabel?: string;
    readOnlyAriaLabel?: string;
};

const defaultLabeledFieldLabels: LabeledFieldLabels = {
    errorIconAriaLabel: "Error:",
};

const StyledSpan = addStyle("span");

/**
 * A LabeledField is an element that provides a label, required indicator,
 * description, and error to present better context and hints to any type of
 * form field component.
 */
export default function LabeledField(props: Props) {
    const {
        field,
        styles: stylesProp,
        label,
        id,
        required,
        testId,
        description,
        errorMessage,
        readOnlyMessage,
        labels = defaultLabeledFieldLabels,
        elementBeforeFieldStart,
        elementBeforeFieldEnd,
        elementAfterFieldStart,
        elementAfterFieldEnd,
    } = props;

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? `${generatedUniqueId}-labeled-field`;
    const labelId = `${uniqueId}-label`;
    const descriptionId = `${uniqueId}-description`;
    const fieldId = `${uniqueId}-field`;
    const errorId = `${uniqueId}-error`;
    const readOnlyMessageId = `${uniqueId}-read-only-message`;
    const elementBeforeFieldStartId = `${uniqueId}-element-before-field-start`;
    const elementBeforeFieldEndId = `${uniqueId}-element-before-field-end`;
    const elementAfterFieldStartId = `${uniqueId}-element-after-field-start`;
    const elementAfterFieldEndId = `${uniqueId}-element-after-field-end`;

    const isRequired = !!required || !!field.props.required;
    const hasError = !!errorMessage || !!field.props.error;
    const isDisabled = !!field.props.disabled;

    function renderLabel(): React.ReactNode {
        const requiredIcon = (
            <StyledSpan
                style={[styles.required, isDisabled && styles.disabledStyling]}
                aria-hidden={true}
            >
                {" "}
                *
            </StyledSpan>
        );

        return (
            <React.Fragment>
                <BodyText
                    style={[
                        styles.label,
                        description
                            ? styles.labelWithDescription
                            : styles.labelWithNoDescription,
                        hasError ? styles.labelWithError : undefined,
                        isDisabled && styles.disabledStyling,
                        stylesProp?.label,
                    ]}
                    tag="label"
                    htmlFor={fieldId}
                    testId={testId && `${testId}-label`}
                    id={labelId}
                    weight="semi"
                >
                    {label}
                    {isRequired && requiredIcon}
                </BodyText>
            </React.Fragment>
        );
    }

    function maybeRenderDescription(): React.ReactNode | null | undefined {
        if (!description) {
            return null;
        }

        return (
            <React.Fragment>
                <BodyText
                    style={[
                        styles.spacingUnderHelperText,
                        styles.helperTextMessage,
                        stylesProp?.description,
                        isDisabled && styles.disabledStyling,
                    ]}
                    testId={testId && `${testId}-description`}
                    id={descriptionId}
                >
                    {description}
                </BodyText>
            </React.Fragment>
        );
    }

    function maybeRenderError(): React.ReactNode | null | undefined {
        return (
            <React.Fragment>
                <View
                    style={[
                        styles.helperTextWithIcon,
                        errorMessage
                            ? styles.spacingAboveHelperText
                            : undefined,
                        stylesProp?.error,
                    ]}
                    id={errorId}
                    testId={testId && `${testId}-error`}
                    // We use aria-live="assertive" for the error so that it is
                    // immediately announced and the user can address the issue
                    // before submitting the form. We use aria-live=assertive
                    // instead of role=alert because Safari + VoiceOver would
                    // not read out the error when focused on if the element
                    // referenced by the aria-describedby had role="alert".
                    aria-live="assertive"
                    // We add aria-atomic=true so that any updates to the error
                    // is announced
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <PhosphorIcon
                                icon={WarningCircle}
                                style={[styles.errorIcon]}
                                role="img"
                                aria-label={labels.errorIconAriaLabel}
                            />
                            <BodyText
                                style={[
                                    styles.helperTextMessage,
                                    styles.errorStyling,
                                ]}
                            >
                                {errorMessage}
                            </BodyText>
                        </>
                    )}
                </View>
            </React.Fragment>
        );
    }

    function renderField() {
        return React.cloneElement(field, {
            id: fieldId,
            "aria-describedby": [
                description && descriptionId,
                errorMessage && errorId,
                readOnlyMessage && readOnlyMessageId,
                elementBeforeFieldStart && elementBeforeFieldStartId,
                elementBeforeFieldEnd && elementBeforeFieldEndId,
                elementAfterFieldStart && elementAfterFieldStartId,
                elementAfterFieldEnd && elementAfterFieldEndId,
            ]
                .filter(Boolean)
                .join(" "),
            required: required || field.props.required,
            error: hasError,
            testId: testId ? `${testId}-field` : undefined,
            readOnly: readOnlyMessage || field.props.readOnly,
        });
    }

    function maybeRenderReadOnlyMessage() {
        if (!readOnlyMessage) {
            return null;
        }

        return (
            <View
                style={[
                    styles.helperTextWithIcon,
                    styles.spacingAboveHelperText,
                    stylesProp?.readOnlyMessage,
                ]}
                id={readOnlyMessageId}
                testId={testId && `${testId}-read-only-message`}
            >
                <PhosphorIcon
                    icon={LockIcon}
                    aria-label={labels.readOnlyAriaLabel}
                    color={semanticColor.core.foreground.neutral.subtle}
                />
                <BodyText style={styles.helperTextMessage}>
                    {readOnlyMessage}
                </BodyText>
            </View>
        );
    }

    function maybeRenderElementBeforeFieldStart() {
        if (!elementBeforeFieldStart) {
            return null;
        }
        return (
            <BodyText
                style={[
                    styles.spacingUnderHelperText,
                    styles.helperTextMessage,
                    isDisabled && styles.disabledStyling,
                    stylesProp?.elementBeforeFieldStart,
                ]}
                tag="div"
                id={elementBeforeFieldStartId}
                testId={testId && `${testId}-element-before-field-start`}
            >
                {elementBeforeFieldStart}
            </BodyText>
        );
    }

    function maybeRenderElementBeforeFieldEnd() {
        if (!elementBeforeFieldEnd) {
            return null;
        }
        return (
            <BodyText
                style={[
                    styles.spacingUnderHelperText,
                    styles.helperTextMessage,
                    isDisabled && styles.disabledStyling,
                    stylesProp?.elementBeforeFieldEnd,
                ]}
                tag="div"
                id={elementBeforeFieldEndId}
                testId={testId && `${testId}-element-before-field-end`}
            >
                {elementBeforeFieldEnd}
            </BodyText>
        );
    }

    function maybeRenderElementAfterFieldStart() {
        if (!elementAfterFieldStart) {
            return null;
        }
        return (
            <BodyText
                style={[
                    styles.spacingAboveHelperText,
                    styles.helperTextMessage,
                    isDisabled && styles.disabledStyling,
                    stylesProp?.elementAfterFieldStart,
                ]}
                tag="div"
                id={elementAfterFieldStartId}
                testId={testId && `${testId}-element-after-field-start`}
            >
                {elementAfterFieldStart}
            </BodyText>
        );
    }

    function maybeRenderElementAfterFieldEnd() {
        if (!elementAfterFieldEnd) {
            return null;
        }
        return (
            <BodyText
                style={[
                    styles.spacingAboveHelperText,
                    styles.helperTextMessage,
                    hasError && styles.errorStyling,
                    isDisabled && styles.disabledStyling,
                    stylesProp?.elementAfterFieldEnd,
                ]}
                tag="div"
                id={elementAfterFieldEndId}
                testId={testId && `${testId}-element-after-field-end`}
            >
                {elementAfterFieldEnd}
            </BodyText>
        );
    }

    return (
        <View style={stylesProp?.root}>
            {renderLabel()}
            <View
                style={[
                    styles.helperTextContainer,
                    styles.beforeHelperTextContainer,
                ]}
            >
                <View>
                    {maybeRenderDescription()}
                    {maybeRenderElementBeforeFieldStart()}
                </View>
                {maybeRenderElementBeforeFieldEnd()}
            </View>
            {renderField()}
            <View style={styles.helperTextContainer}>
                <View>
                    {maybeRenderReadOnlyMessage()}
                    {maybeRenderError()}
                    {maybeRenderElementAfterFieldStart()}
                </View>
                {maybeRenderElementAfterFieldEnd()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: semanticColor.core.foreground.neutral.strong,
        overflowWrap: "break-word",
    },
    labelWithDescription: {
        paddingBlockEnd: theme.root.layout.paddingBlockEnd.labelWithDescription,
    },
    labelWithNoDescription: {
        paddingBlockEnd:
            theme.root.layout.paddingBlockEnd.labelWithNoDescription,
    },
    labelWithError: {
        color: theme.label.color.error.foreground,
    },
    disabledStyling: {
        color: semanticColor.core.foreground.disabled.strong,
    },
    helperTextWithIcon: {
        flexDirection: "row",
        gap: theme.helperText.layout.gap,
    },
    helperTextMessage: {
        overflowWrap: "break-word",
        color: theme.helperText.color.foreground,
        fontSize: theme.helperText.font.size,
        lineHeight: theme.helperText.font.lineHeight,
        marginBlockStart: theme.helperText.layout.marginBlockStart,
        minWidth: sizing.size_0, // This enables the wrapping behaviour on the helper message
    },
    errorStyling: {
        color: theme.error.color.foreground,
        fontWeight: theme.error.font.weight,
    },
    errorIcon: {
        marginBlockStart: sizing.size_010, // This vertically aligns the icon with the text
        color: theme.error.color.foreground,
    },
    required: {
        color: theme.requiredIndicator.color.foreground,
    },
    helperTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: sizing.size_040,
    },
    beforeHelperTextContainer: {
        alignItems: "flex-end",
    },
    spacingUnderHelperText: {
        paddingBlockEnd: theme.root.layout.spacingBetweenHelperText,
    },
    spacingAboveHelperText: {
        paddingBlockStart: theme.root.layout.spacingBetweenHelperText,
    },
});
