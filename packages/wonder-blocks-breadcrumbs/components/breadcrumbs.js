// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import typeof BreadcrumbsItem from "./breadcrumbs-item.js";

type Props = {|
    ...AriaProps,

    /**
     * This is the content for the collection of Breadcrumbs
     */
    children: React.ChildrenArray<React.Element<BreadcrumbsItem>>,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

const StyledList = addStyle("ol");

/**
 * A breadcrumb trail consists of a list of links to the parent pages
 * of the current page in hierarchical order. It helps users find their
 * place within a website or web application.
 * Breadcrumbs are often placed horizontally before a page's main content.
 *
 * The Breadcrumbs component will have the following structure:
 *
 * 1. Breadcrumbs Item: Represents a section within the page.
 * 2. Separator: Adds a separator between each item.
 */
export default class Breadcrumbs extends React.Component<Props> {
    // Moved it here, in case we need to override the label for a different
    // language
    static defaultProps = {
        "aria-label": "Breadcrumbs",
    };

    render() {
        const {children, testId, ...otherProps} = this.props;
        // using React.Children allows to deal with opaque data structures
        // e.g. children = 'string' vs children = []
        const lastChildIndex = React.Children.count(children) - 1;

        return (
            <nav {...otherProps} data-test-id={testId}>
                <StyledList style={styles.container}>
                    {React.Children.map(children, (item, index) => {
                        const isLastChild = index === lastChildIndex;

                        return React.cloneElement(item, {
                            ...item.props,
                            showSeparator: !isLastChild,
                            ["aria-current"]: isLastChild ? "page" : undefined,
                        });
                    })}
                </StyledList>
            </nav>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
    },
});
