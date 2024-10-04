import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    View,
    addStyle,
    StyleType,
    useUniqueIdWithMock,
} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

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
     */
    error?: React.ReactNode;
    /**
     * Custom styles for the labeled field container.
     */
    style?: StyleType;
    /**
     * A unique id to link the label (and optional error) to the field.
     *
     * The label will assume that the field will have its id formatted as `${id}-field`.
     * The field can assume that the error will have its id formatted as `${id}-error`.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Change the field’s sub-components to fit a dark background.
     */
    light?: boolean;
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
                style={light ? styles.lightRequired : styles.required}
                aria-hidden={true}
            >
                {" "}
                *
            </StyledSpan>
        );

        return (
            <React.Fragment>
                <LabelMedium
                    style={light ? styles.lightLabel : styles.label}
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
                    style={light ? styles.lightDescription : styles.description}
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
        if (!error) {
            return null;
        }

        return (
            <React.Fragment>
                <Strut size={spacing.small_12} />
                <LabelSmall
                    style={light ? styles.lightError : styles.error}
                    role="alert"
                    id={errorId}
                    testId={testId && `${testId}-error`}
                >
                    {error}
                </LabelSmall>
            </React.Fragment>
        );
    }

    const fieldWithAttributes = React.cloneElement(field, {
        id: fieldId,
        "aria-describedby": [description && descriptionId, error && errorId]
            .filter(Boolean)
            .join(" "),
        "aria-required": required,
        testId: testId && `${testId}-field`,
    });

    return (
        <View style={style}>
            {renderLabel()}
            {maybeRenderDescription()}
            <Strut size={spacing.xSmall_8} />
            {fieldWithAttributes}
            {maybeRenderError()}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: color.offBlack,
    },
    lightLabel: {
        color: color.white,
    },
    description: {
        color: color.offBlack64,
    },
    lightDescription: {
        color: color.white64,
    },
    error: {
        color: color.red,
    },
    lightError: {
        color: color.fadedRed,
    },
    required: {
        color: color.red,
    },
    lightRequired: {
        color: color.fadedRed,
    },
});
