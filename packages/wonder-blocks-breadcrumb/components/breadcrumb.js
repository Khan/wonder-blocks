// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import BreadcrumbItem from "./breadcrumb-item.js";

type Props = {|
    ...AriaProps,

    /**
     * This is the content for the collection of Breadcrumbs
     */
    children: React.ChildrenArray<React.Element<typeof BreadcrumbItem>>,
|};

const StyledList = addStyle("ol");

/**
 * The Breadcrumb component will have the following structure:
 *
 * 1. Breadcrumb Item: Represents a section within the page.
 * 2. Separator: Adds a separator between each item.
 */
export default class Breadcrumb extends React.Component<Props> {
    render() {
        return (
            <nav aria-label="Breadcrumb">
                <StyledList style={styles.container}>
                    {this.props.children}
                </StyledList>
            </nav>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
    },
});
