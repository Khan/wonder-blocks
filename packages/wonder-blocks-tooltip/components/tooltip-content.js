// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall, LabelMedium} from "@khanacademy/wonder-blocks-typography";

import type {Typography} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    /**
     * The title for the tooltip content.
     * Optional.
     */
    title?: string | React.Element<Typography>,

    /**
     * The main content for a tooltip.
     */
    children:
        | string
        | React.Element<Typography>
        | Array<React.Element<Typography>>,
|};

/**
 * This component is used to provide the content that is to be rendered in the
 * tooltip bubble.
 */
export default class TooltipContent extends React.Component<Props> {
    _renderTitle() {
        const {title} = this.props;
        if (title) {
            if (typeof title === "string") {
                return <HeadingSmall>{title}</HeadingSmall>;
            } else {
                return title;
            }
        }
        return null;
    }

    _renderChildren() {
        const {children} = this.props;
        if (typeof children === "string") {
            return <LabelMedium>{children}</LabelMedium>;
        } else {
            return children;
        }
    }

    render() {
        const title = this._renderTitle();
        const children = this._renderChildren();
        const containerStyle = title ? styles.withTitle : styles.withoutTitle;
        return (
            <View style={containerStyle}>
                {title}
                {title && children && <Strut size={Spacing.xxxSmall} />}
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    withoutTitle: {
        margin: "10px 16px",
    },

    withTitle: {
        margin: 16,
    },
});
