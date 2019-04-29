// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = {|
    ...AriaProps,

    /**
     * This is the content for the collection of Breadcrumbs
     */
    children: string | React.Element<typeof Link>,
|};

const StyledListItem = addStyle("li");

/**
 * The BreadcrumbItem represents an individual item in the breadcrumbs list.
 */
export default class BreadcrumbItem extends React.Component<Props> {
    render() {
        return (
            <StyledListItem style={styles.item}>
                {this.props.children}
            </StyledListItem>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        display: "inline-block",
        margin: `0 ${Spacing.xxSmall}`,
        "::after": {
            display: "inline-block",
            margin: `0 ${Spacing.xxSmall}`,
            content: "'\u2219'",
        },
        ":last-child": {
            "::after": {
                content: "''",
            },
        },
    },
});
