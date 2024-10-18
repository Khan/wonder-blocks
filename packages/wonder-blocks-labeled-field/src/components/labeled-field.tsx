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
     * Whether this field is required to continue.
     */
    required?: boolean;
    /**
     * The message for the error element.
     *
     * Note: Since the error icon has an aria-label, screen readers will
     * prefix the error message with "Error:" (or the value provided to the
     * errorIconAriaLabel in the `labels` prop)
     */
    error?: React.ReactNode;
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

type LabeledFieldLabels = {
    errorIconAriaLabel: string;
};

const defaultLabeledFieldLabels: LabeledFieldLabels = {
    errorIconAriaLabel: "Error:",
};

const StyledSpan = addStyle("span");

/**
 * A LabeledField is an element that provides a label, description, and error element
 * to present better context and hints to any type of form field component.
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
        error,
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
                <Strut size={spacing.small_12} />
                <View
                    style={styles.errorSection}
                    id={errorId}
                    testId={testId && `${testId}-error`}
                    // We use aria-live="assertive" for the error so that it is
                    // immediately announced and the user can address the issue
                    // before submitting the form. We use aria-live=assertive
                    // instead of role=alert because Safari + VoiceOver would
                    // not read out the error when focused on if the element
                    // referenced by the aria-describedby had role="alert".
                    aria-live="assertive"
                >
                    {error && (
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
                                {error}
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
            "aria-describedby": [error && errorId, description && descriptionId]
                .filter(Boolean)
                .join(" "),
            required,
            testId: testId && `${testId}-field`,
        });
    }

    return (
        <View style={style}>
            {renderLabel()}
            {maybeRenderDescription()}
            <Strut size={spacing.xSmall_8} />
            {renderField()}
            {maybeRenderError()}
        </View>
    );
}

const styles = StyleSheet.create({
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
