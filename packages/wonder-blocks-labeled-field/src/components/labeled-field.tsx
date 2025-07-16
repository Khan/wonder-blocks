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
     * Use the `labels.readOnlyIconAriaLabel` prop to set the `aria-label` for
     * the read only icon.
     *
     * If both `errorMessage` and `readOnlyMessage` are provided, the `readOnlyMessage`
     * is displayed first.
     */
    readOnlyMessage?: React.ReactNode;
    /**
     * Additional helper text placed under the field.
     */
    additionalHelperMessage?: React.ReactNode;
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
        additionalHelperMessage?: StyleType;
    };
    /**
     * A unique id to use as the base of the ids for the elements within the component.
     * Here is how the id is used for the different elements in the component:
     * - The label will have an id formatted as `${id}-label`
     * - The description will have an id formatted as `${id}-description`
     * - The field will have an id formatted as `${id}-field`
     * - The error will have an id formatted as `${id}-error`
     * - The read only message will have an id formatted as `${id}-read-only-message`
     * - The additional helper message will have an id formatted as `${id}-additional-helper-message`
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
     * - The additional helper message will have a testId formatted as `${testId}-additional-helper-message`
     */
    testId?: string;
    /**
     * The object containing the custom labels used inside this component.
     *
     * This is useful for internationalization.
     */
    labels?: LabeledFieldLabels;
};

export type LabeledFieldLabels = {
    errorIconAriaLabel?: string;
    readOnlyIconAriaLabel?: string;
};

const defaultLabeledFieldLabels: LabeledFieldLabels = {
    errorIconAriaLabel: "Error:",
};

/**
 * A LabeledField is an element that provides a label, context label, and
 * helper text to present more information about any type of form field
 * component. Helper text includes a description, error message, read only
 * message, and any additional helper message.
 */
export default function LabeledField(props: Props) {
    const {
        field,
        styles: stylesProp,
        label,
        id,
        testId,
        description,
        errorMessage,
        readOnlyMessage,
        additionalHelperMessage,
        labels = defaultLabeledFieldLabels,
    } = props;

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? `${generatedUniqueId}-labeled-field`;
    const labelId = `${uniqueId}-label`;
    const descriptionId = `${uniqueId}-description`;
    const fieldId = `${uniqueId}-field`;
    const errorId = `${uniqueId}-error`;
    const readOnlyMessageId = `${uniqueId}-read-only-message`;
    const additionalHelperMessageId = `${uniqueId}-additional-helper-message`;
    const hasError = !!errorMessage || !!field.props.error;
    const isDisabled = !!field.props.disabled;

    function renderLabel(): React.ReactNode {
        return (
            <React.Fragment>
                <BodyText
                    style={[
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
                        styles.helperText,
                        styles.spacingBelowHelperText,
                        isDisabled && styles.disabledHelperText,
                        stylesProp?.description,
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
                                style={[styles.errorIcon, styles.error]}
                                role="img"
                                aria-label={labels.errorIconAriaLabel}
                            />
                            <BodyText
                                style={[
                                    styles.helperText,
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
                additionalHelperMessage && additionalHelperMessageId,
                readOnlyMessage && readOnlyMessageId,
                errorMessage && errorId,
            ]
                .filter(Boolean)
                .join(" "),
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
                    aria-label={labels.readOnlyIconAriaLabel}
                    color={semanticColor.core.foreground.neutral.subtle}
                />
                <BodyText style={styles.helperText}>{readOnlyMessage}</BodyText>
            </View>
        );
    }

    function maybeRenderAdditionalHelperMessage() {
        if (!additionalHelperMessage) {
            return null;
        }

        return (
            <BodyText
                id={additionalHelperMessageId}
                testId={testId && `${testId}-additional-helper-message`}
                style={[
                    styles.helperText,
                    styles.spacingAboveHelperText,
                    isDisabled && styles.disabledHelperText,
                    stylesProp?.additionalHelperMessage,
                ]}
                tag="div"
            >
                {additionalHelperMessage}
            </BodyText>
        );
    }

    return (
        <View style={stylesProp?.root}>
            {renderLabel()}
            {maybeRenderDescription()}
            {renderField()}
            {maybeRenderAdditionalHelperMessage()}
            {maybeRenderReadOnlyMessage()}
            {maybeRenderError()}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: semanticColor.core.foreground.neutral.strong,
        overflowWrap: "break-word",
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
    helperTextWithIcon: {
        flexDirection: "row",
        gap: theme.helperText.layout.gap,
    },
    spacingAboveHelperText: {
        paddingBlockStart: theme.root.layout.spacingBetweenHelperText,
    },
    spacingBelowHelperText: {
        paddingBlockEnd: theme.root.layout.spacingBetweenHelperText,
    },
    helperText: {
        color: theme.helperText.color.default.foreground,
        fontSize: theme.helperText.font.size,
        lineHeight: theme.helperText.font.lineHeight,
        marginBlockStart: theme.helperText.layout.marginBlockStart,
        minWidth: sizing.size_0, // This enables the wrapping behaviour on the helper message
        overflowWrap: "break-word",
    },
    disabledHelperText: {
        color: theme.helperText.color.disabled.foreground,
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
});
