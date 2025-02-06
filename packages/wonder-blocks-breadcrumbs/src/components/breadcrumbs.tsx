import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import BreadcrumbsItem from "./breadcrumbs-item";

type Props = AriaProps & {
    /**
     * This is the content for the collection of Breadcrumbs
     */
    children:
        | Array<
              React.ReactElement<React.ComponentProps<typeof BreadcrumbsItem>>
          >
        | React.ReactElement<React.ComponentProps<typeof BreadcrumbsItem>>;
    /**
     * Accessible label for the breadcrumbs.
     */
    "aria-label"?: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

const StyledOl = addStyle("ol");

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
 *
 * NOTE: `<BreadcrumbsItem />` only accepts two element types:
 *
 * 1. `string`
 * 2. `<Link />`
 *
 * ## Usage
 *
 * ```jsx
 * import {
 *     Breadcrumbs,
 *     BreadcrumbsItem
 * } from "@khanacademy/wonder-blocks-breadcrumbs";
 *
 * <Breadcrumbs>
 *     <BreadcrumbsItem>
 *         <Link href="">Course</Link>
 *     </BreadcrumbsItem>
 *     <BreadcrumbsItem>
 *         <Link href="">Unit</Link>
 *     </BreadcrumbsItem>
 *     <BreadcrumbsItem>
 *         Lesson
 *     </BreadcrumbsItem>
 * </Breadcrumbs>
 * ```
 */
const Breadcrumbs = React.forwardRef(function Breadcrumbs(
    props: Props,
    ref: React.ForwardedRef<HTMLElement>,
) {
    const {
        "aria-label": ariaLabel = "Breadcrumbs",
        children,
        testId,
        ...otherProps
    } = props;

    // using React.Children allows to deal with opaque data structures
    // e.g. children = 'string' vs children = []
    const lastChildIndex = React.Children.count(children) - 1;

    return (
        <nav
            {...otherProps}
            aria-label={ariaLabel}
            data-testid={testId}
            ref={ref}
        >
            <StyledOl style={styles.container}>
                {React.Children.map(children, (item, index) => {
                    const isLastChild = index === lastChildIndex;

                    return React.cloneElement(item, {
                        ...item.props,
                        showSeparator: !isLastChild,
                        ["aria-current"]: isLastChild ? "page" : undefined,
                    });
                })}
            </StyledOl>
        </nav>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
    },
});

export default Breadcrumbs;
