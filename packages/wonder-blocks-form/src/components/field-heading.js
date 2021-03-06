// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    type Typography,
    LabelMedium,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    /**
     * The form field component.
     */
    field: React.Node,

    /**
     * The title for the label element.
     */
    label: string | React.Element<Typography>,

    /**
     * The text for the description element.
     */
    description?: string | React.Element<Typography>,

    /**
     * The message for the error element.
     */
    error?: string | React.Element<Typography>,

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
|};

/**
 * A FieldHeading is an element that provides a label, description, and error element
 * to present better context and hints to any type of form field component.
 */
export default class FieldHeading extends React.Component<Props> {
    renderLabel(): React.Node {
        const {label, id, testId} = this.props;

        return (
            <React.Fragment>
                {typeof label === "string" ? (
                    <LabelMedium
                        style={styles.label}
                        tag="label"
                        htmlFor={id && `${id}-field`}
                        testId={testId && `${testId}-label`}
                    >
                        {label}
                    </LabelMedium>
                ) : (
                    label
                )}
                <Strut size={Spacing.xxxSmall_4} />
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
                {typeof description === "string" ? (
                    <LabelSmall
                        style={styles.description}
                        testId={testId && `${testId}-description`}
                    >
                        {description}
                    </LabelSmall>
                ) : (
                    description
                )}
                <Strut size={Spacing.xxxSmall_4} />
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
                <Strut size={Spacing.small_12} />
                {typeof error === "string" ? (
                    <LabelSmall
                        style={styles.error}
                        role="alert"
                        id={id && `${id}-error`}
                        testId={testId && `${testId}-error`}
                    >
                        {error}
                    </LabelSmall>
                ) : (
                    error
                )}
            </React.Fragment>
        );
    }

    render(): React.Node {
        const {field} = this.props;

        return (
            <View>
                {this.renderLabel()}
                {this.maybeRenderDescription()}
                <Strut size={Spacing.xSmall_8} />
                {field}
                {this.maybeRenderError()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: Color.offBlack,
    },
    description: {
        color: Color.offBlack64,
    },
    error: {
        color: Color.red,
    },
});
