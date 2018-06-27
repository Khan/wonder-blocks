// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import type {Typography} from "@khanacademy/wonder-blocks-typography";

type Props = {|
    title?: string | React.Element<Typography>,
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
        return (
            <View>
                {this._renderTitle()}
                <Strut size={Spacing.xxxSmall} />
                {this._renderChildren()}
            </View>
        );
    }
}
