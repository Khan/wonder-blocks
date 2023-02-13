// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, addStyle, type StyleType} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    /**
     * The form field component.
     */
    field: React.Node,

    /**
     * The title for the label element.
     */
    label: React.Node,

    /**
     * The text for the description element.
     */
    description?: React.Node,

    /**
     * Whether this field is required to continue.
     */
    required?: boolean,

    /**
     * The message for the error element.
     */
    error?: React.Node,

    /**
     * Custom styles for the field heading container.
     */
    style?: StyleType,

    /**
     * A unique id to link the label (and optional error) to the field.
     *
     * The label will assume that the field will have its id formatted as `${id}-field`.
     * The field can assume that the error will have its id formatted as `${id}-error`.
     */
    id?: string,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,

    /**
     * Whether the label should be visually hidden.
     */
    isLabelHidden?: boolean,

    /**
     * The layout of the field heading.
     * - "stacked": The label, description, and error are stacked vertically.
     * - "horizontal": The label and description are stacked vertically, but the
     *  error is displayed horizontally.
     * - "inline": The label, description, and error are displayed horizontally.
     *
     * The default is "stacked".
     */
    layout?: "stacked" | "horizontal" | "inline",
|};

const StyledSpan = addStyle("span");

/**
 * A FieldHeading is an element that provides a label, description, and error element
 * to present better context and hints to any type of form field component.
 */
export default class FieldHeading extends React.Component<Props> {
    renderLabel(): React.Node {
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
                    style={[
                        styles.label,
                        this.props.layout === "inline" && styles.inline,
                        this.props.isLabelHidden && styles.srOnly,
                    ]}
                    tag="label"
                    htmlFor={id && `${id}-field`}
                    testId={testId && `${testId}-label`}
                >
                    {label}
                    {required && requiredIcon}
                </LabelMedium>
                {this.props.layout !== "inline" && (
                    <Strut size={Spacing.xxxSmall_4} />
                )}
            </React.Fragment>
        );
    }

    maybeRenderDescription(): ?React.Node {
        const {description, testId} = this.props;

        if (!description) {
            return null;
        }

        return (
            <React.Fragment>
                <LabelSmall
                    style={[
                        styles.description,
                        this.props.layout === "inline" && styles.inline,
                    ]}
                    testId={testId && `${testId}-description`}
                >
                    {description}
                </LabelSmall>
                {this.props.layout !== "inline" && (
                    <Strut size={Spacing.xxxSmall_4} />
                )}
            </React.Fragment>
        );
    }

    maybeRenderError(): ?React.Node {
        const {error, id, testId} = this.props;

        if (!error) {
            return null;
        }

        return (
            <React.Fragment>
                {this.props.layout !== "inline" && (
                    <Strut size={Spacing.small_12} />
                )}
                <LabelSmall
                    style={[
                        styles.error,
                        this.props.layout === "inline" && styles.inline,
                    ]}
                    role="alert"
                    id={id && `${id}-error`}
                    testId={testId && `${testId}-error`}
                >
                    {error}
                </LabelSmall>
            </React.Fragment>
        );
    }

    render(): React.Node {
        const {field, layout, style} = this.props;

        return (
            <View style={[style, layout === "inline" && {display: "inline"}]}>
                {this.renderLabel()}
                {this.maybeRenderDescription()}
                {this.props.layout !== "inline" && (
                    <Strut size={Spacing.xSmall_8} />
                )}
                {field}
                {this.maybeRenderError()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inline: {
        display: "inline-flex",
    },
    label: {
        color: Color.offBlack,
    },
    description: {
        color: Color.offBlack64,
    },
    error: {
        color: Color.red,
    },
    required: {
        color: Color.red,
    },
    srOnly: {
        border: 0,
        clip: "rect(0,0,0,0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
    },
});
