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
|};

export default class FieldHeading extends React.Component<Props> {
    isString: (item: string | React.Element<Typography>) => boolean = (
        item,
    ) => {
        // Helps check if a prop is of type "string" to either render the default
        // label or a custom Typography label passed by the user.
        return typeof item === "string";
    };

    render(): React.Node {
        const {field, label, description, error} = this.props;
        return (
            <View>
                {label && this.isString(label) ? (
                    <LabelMedium style={[styles.label]}>{label}</LabelMedium>
                ) : (
                    label
                )}
                {<Strut size={Spacing.xxxSmall_4} />}

                {description && this.isString(description) ? (
                    <LabelSmall style={[styles.description]}>
                        {description}
                    </LabelSmall>
                ) : (
                    description
                )}
                {description && <Strut size={Spacing.xxxSmall_4} />}

                <Strut size={Spacing.xSmall_8} />
                {field}

                {error && <Strut size={Spacing.small_12} />}
                {error && this.isString(error) ? (
                    <LabelSmall style={[styles.error]}>{error}</LabelSmall>
                ) : (
                    error
                )}
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
