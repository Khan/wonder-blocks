import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import type {Typography} from "@khanacademy/wonder-blocks-typography";

import {ContentStyle} from "../util/types";

type Props = {
    /**
     * The title for the tooltip content.
     * Optional.
     */
    title?: string | React.ReactElement<React.ComponentProps<Typography>>;
    /**
     * The main content for a tooltip.
     */
    children:
        | string
        | React.ReactElement<React.ComponentProps<Typography>>
        | Array<React.ReactElement<React.ComponentProps<Typography>>>;
    /**
     * Optional custom styles for the tooltip which are a subset of valid CSS styles
     */
    contentStyle?: ContentStyle;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * This component is used to provide the content that is to be rendered in the
 * tooltip bubble.
 *
 * ### Usage
 *
 * ```jsx
 * import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
 *
 * <TooltipContent title="Title text!">
 *  Some content in my tooltip.
 * </TooltipContent>
 * ```
 */
export default class TooltipContent extends React.Component<Props> {
    _renderTitle(): React.ReactNode {
        const {title} = this.props;
        if (title) {
            if (typeof title === "string") {
                return <Heading size="medium">{title}</Heading>;
            } else {
                return title;
            }
        }
        return null;
    }

    _renderChildren(): React.ReactNode {
        const {children} = this.props;
        if (typeof children === "string") {
            return <BodyText tag="span">{children}</BodyText>;
        } else {
            return children;
        }
    }

    render(): React.ReactNode {
        const title = this._renderTitle();
        const children = this._renderChildren();
        const containerStyle = title ? styles.withTitle : styles.withoutTitle;
        return (
            <View
                style={[containerStyle, this.props.contentStyle]}
                testId={this.props.testId}
            >
                {title}
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    withoutTitle: {
        padding: `${sizing.size_100} ${sizing.size_160}`,
    },

    withTitle: {
        padding: sizing.size_160,
        // gap between the title and its children when both are present.
        gap: sizing.size_040,
    },
});
