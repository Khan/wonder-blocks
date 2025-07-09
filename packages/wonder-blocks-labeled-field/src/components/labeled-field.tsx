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
    };
    /**
     * A unique id to use as the base of the ids for the elements within the component.
     * Here is how the id is used for the different elements in the component:
     * - The label will have an id formatted as `${id}-label`
     * - The description will have an id formatted as `${id}-description`
     * - The field will have an id formatted as `${id}-field`
     * - The error will have an id formatted as `${id}-error`
     * - The read only message will have an id formatted as `${id}-read-only-message`
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
     */
    testId?: string;
    /**
     * The object containing the custom labels used inside this component.
     *
     * This is useful for internationalization. Defaults to English.
     */
    labels?: LabeledFieldLabels;

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
        elementAfterFieldEnd,
    } = props;

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? `${generatedUniqueId}-labeled-field`;
    const labelId = `${uniqueId}-label`;
    const descriptionId = `${uniqueId}-description`;
    const fieldId = `${uniqueId}-field`;
    const errorId = `${uniqueId}-error`;
    const readOnlyMessageId = `${uniqueId}-read-only-message`;

    const isRequired = !!required || !!field.props.required;
    const hasError = !!errorMessage || !!field.props.error;
    const isDisabled = !!field.props.disabled;

    function renderLabel(): React.ReactNode {
        const requiredIcon = (
            <StyledSpan
                style={[
                    styles.textWordBreak,
                    styles.required,
                    isDisabled && styles.disabledLabel,
                ]}
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
                        styles.textWordBreak,
                        styles.label,
                        description
                            ? styles.labelWithDescription
                            : styles.labelWithNoDescription,
                        stylesProp?.label,
                        hasError ? styles.labelWithError : undefined,
                        isDisabled && styles.disabledLabel,
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
                        styles.textWordBreak,
                        styles.description,
                        stylesProp?.description,
                        isDisabled && styles.disabledDescription,
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
                        styles.helperTextSection,
                        errorMessage
                            ? styles.helperTextSectionWithContent
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
                                style={[styles.errorIcon, styles.error]}
                                role="img"
                                aria-label={labels.errorIconAriaLabel}
                            />
                            <BodyText
                                style={[
                                    styles.textWordBreak,
                                    styles.helperTextMessage,
                                    styles.errorMessage,
                                    styles.error,
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
                    styles.helperTextSection,
                    styles.helperTextSectionWithContent,
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
                <BodyText
                    style={[styles.textWordBreak, styles.helperTextMessage]}
                >
                    {readOnlyMessage}
                </BodyText>
            </View>
        );
    }

    return (
        <View style={stylesProp?.root}>
            {renderLabel()}
            {maybeRenderDescription()}
            {renderField()}
            <View style={styles.afterField}>
                <View>
                    {maybeRenderReadOnlyMessage()}
                    {maybeRenderError()}
                </View>
                {elementAfterFieldEnd && (
                    <BodyText
                        style={[
                            styles.helperTextSectionWithContent,
                            styles.helperTextMessage,
                            styles.textWordBreak,
                        ]}
                        tag="div"
                    >
                        {elementAfterFieldEnd}
                    </BodyText>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    labelWithError: {
        color: theme.label.color.error.foreground,
    },
    disabledLabel: {
        color: theme.label.color.disabled.foreground,
    },
    labelWithDescription: {
        paddingBlockEnd: theme.root.layout.paddingBlockEnd.labelWithDescription,
    },
    labelWithNoDescription: {
        paddingBlockEnd:
            theme.root.layout.paddingBlockEnd.labelWithNoDescription,
    },
    description: {
        color: theme.description.color.foreground,
        paddingBlockEnd: theme.root.layout.paddingBlockEnd.description,
        fontSize: theme.description.font.size,
        lineHeight: theme.description.font.lineHeight,
    },
    disabledDescription: {
        color: theme.description.color.disabled.foreground,
    },
    helperTextSection: {
        flexDirection: "row",
        gap: theme.helperText.layout.gap,
    },
    helperTextSectionWithContent: {
        paddingBlockStart:
            theme.root.layout.paddingBlockEnd.helperTextSectionWithContent,
    },
    helperTextMessage: {
        fontSize: theme.helperText.font.size,
        lineHeight: theme.helperText.font.lineHeight,
        marginBlockStart: theme.helperText.layout.marginBlockStart,
        minWidth: sizing.size_0, // This enables the wrapping behaviour on the helper message
    },
    error: {
        color: theme.error.color.foreground,
    },
    errorIcon: {
        marginTop: sizing.size_010, // This vertically aligns the icon with the text
    },
    errorMessage: {
        fontWeight: theme.error.font.weight,
    },
    required: {
        color: theme.requiredIndicator.color.foreground,
    },
    textWordBreak: {
        overflowWrap: "break-word",
    },
    afterField: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: sizing.size_040,
    },
});
