import * as React from "react";
import {StyleSheet} from "aphrodite";
import WarningCircle from "@phosphor-icons/core/bold/warning-circle-bold.svg";

import {
    View,
    addStyle,
    StyleType,
    useUniqueIdWithMock,
} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

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
     */
    errorMessage?: React.ReactNode;
    /**
     * Custom styles for the labeled field container.
     */
    style?: StyleType;
    /**
     * A unique id to use as the base of the ids for the elements within the component.
     * Here is how the id is used for the different elements in the component:
     * - The label will have an id formatted as `${id}-label`
     * - The description will have an id formatted as `${id}-description`
     * - The field will have an id formatted as `${id}-field`
     * - The error will have an id formatted as `${id}-error`
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
     */
    testId?: string;
    /**
     * Change the field’s sub-components to fit a dark background.
     */
    light?: boolean;
    /**
     * The object containing the custom labels used inside this component.
     *
     * This is useful for internationalization. Defaults to English.
     */
    labels?: LabeledFieldLabels;
};

export type LabeledFieldLabels = {
    errorIconAriaLabel: string;
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
        style,
        label,
        id,
        required,
        testId,
        light,
        description,
        errorMessage,
        labels = defaultLabeledFieldLabels,
    } = props;

    const ids = useUniqueIdWithMock("labeled-field");
    const uniqueId = id ?? ids.get("id");
    const labelId = `${uniqueId}-label`;
    const descriptionId = `${uniqueId}-description`;
    const fieldId = `${uniqueId}-field`;
    const errorId = `${uniqueId}-error`;

    function renderLabel(): React.ReactNode {
        const requiredIcon = (
            <StyledSpan
                style={[
                    styles.textWordBreak,
                    light ? styles.lightRequired : styles.required,
                ]}
                aria-hidden={true}
            >
                {" "}
                *
            </StyledSpan>
        );

        return (
            <React.Fragment>
                <LabelMedium
                    style={[
                        styles.textWordBreak,
                        light ? styles.lightLabel : styles.label,
                    ]}
                    tag="label"
                    htmlFor={fieldId}
                    testId={testId && `${testId}-label`}
                    id={labelId}
                >
                    {label}
                    {required && requiredIcon}
                </LabelMedium>
                <Strut size={spacing.xxxSmall_4} />
            </React.Fragment>
        );
    }

    function maybeRenderDescription(): React.ReactNode | null | undefined {
        if (!description) {
            return null;
        }

        return (
            <React.Fragment>
                <LabelSmall
                    style={[
                        styles.textWordBreak,
                        light ? styles.lightDescription : styles.description,
                    ]}
                    testId={testId && `${testId}-description`}
                    id={descriptionId}
                >
                    {description}
                </LabelSmall>
                <Strut size={spacing.xxxSmall_4} />
            </React.Fragment>
        );
    }

    function maybeRenderError(): React.ReactNode | null | undefined {
        return (
            <React.Fragment>
                <View
                    style={[
                        styles.errorSection,
                        errorMessage
                            ? styles.errorSectionWithContent
                            : undefined,
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
                                style={[
                                    styles.errorIcon,
                                    light ? styles.lightError : styles.error,
                                ]}
                                role="img"
                                aria-label={labels.errorIconAriaLabel}
                            />
                            <LabelSmall
                                style={[
                                    styles.textWordBreak,
                                    styles.errorMessage,
                                    light ? styles.lightError : styles.error,
                                ]}
                            >
                                {errorMessage}
                            </LabelSmall>
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
                errorMessage && errorId,
                description && descriptionId,
            ]
                .filter(Boolean)
                .join(" "),
            required,
            error: !!errorMessage,
            testId: testId && `${testId}-field`,
        });
    }

    return (
        <View style={[styles.container, style]}>
            {renderLabel()}
            {maybeRenderDescription()}
            <Strut size={spacing.xSmall_8} />
            {renderField()}
            {maybeRenderError()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Prevent flex items from stretching. This prevents the label from
        // being the full width so that only clicking on the label text will
        // focus on the field
        alignItems: "flex-start",
    },
    label: {
        color: semanticColor.text.primary,
    },
    lightLabel: {
        color: semanticColor.text.inverse,
    },
    description: {
        color: semanticColor.text.secondary,
    },
    lightDescription: {
        color: color.white64,
    },
    errorSection: {
        flexDirection: "row",
        gap: spacing.xSmall_8,
    },
    errorSectionWithContent: {
        paddingTop: spacing.small_12,
    },
    error: {
        color: semanticColor.status.critical.foreground,
    },
    lightError: {
        color: color.fadedRed,
    },
    errorIcon: {
        marginTop: "1px", // This vertically aligns the icon with the text
    },
    errorMessage: {
        minWidth: "0", // This enables the wrapping behaviour on the error message
    },
    required: {
        color: semanticColor.status.critical.foreground,
    },
    lightRequired: {
        color: color.fadedRed,
    },
    textWordBreak: {
        overflowWrap: "break-word",
    },
});
