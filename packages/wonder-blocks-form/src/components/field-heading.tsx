import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import theme from "../theme";

type Props = {
    /**
     * The form field component.
     */
    field: React.ReactNode;
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
     * Custom styles for the field heading container.
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
};

const StyledSpan = addStyle("span");

/**
 * A FieldHeading is an element that provides a label, description, and error element
 * to present better context and hints to any type of form field component.
 */
export default class FieldHeading extends React.Component<Props> {
    renderLabel(): React.ReactNode {
        const {label, id, required, testId} = this.props;

        const requiredIcon = (
            <StyledSpan style={styles.required} aria-hidden={true}>
                {" "}
                *
            </StyledSpan>
        );

        return (
            <BodyText
                style={[styles.label, styles.labelSpacing]}
                tag="label"
                htmlFor={id && `${id}-field`}
                testId={testId && `${testId}-label`}
            >
                {label}
                {required && requiredIcon}
            </BodyText>
        );
    }

    maybeRenderDescription(): React.ReactNode | null | undefined {
        const {description, testId} = this.props;

        if (!description) {
            return null;
        }

        return (
            <BodyText
                size="small"
                tag="span"
                style={[styles.description, styles.descriptionSpacing]}
                testId={testId && `${testId}-description`}
            >
                {description}
            </BodyText>
        );
    }

    maybeRenderError(): React.ReactNode | null | undefined {
        const {error, id, testId} = this.props;

        if (!error) {
            return null;
        }

        return (
            <BodyText
                size="small"
                tag="span"
                style={[styles.error, styles.errorSpacing]}
                role="alert"
                id={id && `${id}-error`}
                testId={testId && `${testId}-error`}
            >
                {error}
            </BodyText>
        );
    }

    render(): React.ReactNode {
        const {field, style} = this.props;

        return (
            <View style={style}>
                {this.renderLabel()}
                {this.maybeRenderDescription()}
                <View style={styles.fieldSpacing}>{field}</View>
                {this.maybeRenderError()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    labelSpacing: {
        marginBottom: sizing.size_040,
    },
    description: {
        color: theme.description.color.foreground,
    },
    descriptionSpacing: {
        marginBottom: sizing.size_040,
    },
    fieldSpacing: {
        marginTop: sizing.size_080,
    },
    error: {
        color: semanticColor.status.critical.foreground,
    },
    errorSpacing: {
        marginTop: sizing.size_120,
    },
    required: {
        color: semanticColor.status.critical.foreground,
    },
});
