import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, addStyle, StyleType} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

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
    /**
     * Change the field’s sub-components to fit a dark background.
     */
    light?: boolean;
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
            <React.Fragment>
                <LabelMedium
                    style={styles.label}
                    tag="label"
                    htmlFor={id && `${id}-field`}
                    testId={testId && `${testId}-label`}
                >
                    {label}
                    {required && requiredIcon}
                </LabelMedium>
                <Strut size={spacing.xxxSmall_4} />
            </React.Fragment>
        );
    }

    maybeRenderDescription(): React.ReactNode | null | undefined {
        const {description, testId, light} = this.props;

        if (!description) {
            return null;
        }

        return (
            <React.Fragment>
                <LabelSmall
                    style={light ? styles.lightDescription : styles.description}
                    testId={testId && `${testId}-description`}
                >
                    {description}
                </LabelSmall>
                <Strut size={spacing.xxxSmall_4} />
            </React.Fragment>
        );
    }

    maybeRenderError(): React.ReactNode | null | undefined {
        const {error, id, testId, light} = this.props;

        if (!error) {
            return null;
        }

        return (
            <React.Fragment>
                <Strut size={spacing.small_12} />
                <LabelSmall
                    style={light ? styles.lightError : styles.error}
                    role="alert"
                    id={id && `${id}-error`}
                    testId={testId && `${testId}-error`}
                >
                    {error}
                </LabelSmall>
            </React.Fragment>
        );
    }

    render(): React.ReactNode {
        const {field, style} = this.props;

        return (
            <View style={style}>
                {this.renderLabel()}
                {this.maybeRenderDescription()}
                <Strut size={spacing.xSmall_8} />
                {field}
                {this.maybeRenderError()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: color.offBlack,
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
});
