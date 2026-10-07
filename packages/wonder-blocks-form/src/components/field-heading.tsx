import * as React from "react";

import {View, addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import styles from "./field-heading.module.css";

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
            // The `root` class carries no styling of its own — every rule in
            // the module is qualified with it so this component's styles
            // outrank the single-class rules that `BodyText` and `View` ship
            // in the same `@layer shared`. See `field-heading.module.css`.
            <View style={[styles.root, style]}>
                {this.renderLabel()}
                {this.maybeRenderDescription()}
                <View style={styles.fieldSpacing}>{field}</View>
                {this.maybeRenderError()}
            </View>
        );
    }
}
