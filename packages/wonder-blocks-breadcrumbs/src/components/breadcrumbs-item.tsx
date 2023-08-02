import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = AriaProps & {
    /**
     * This is the content for the collection of Breadcrumbs
     */
    children: string | React.ReactElement<React.ComponentProps<typeof Link>>;
    /**
     * When true, the separator is shown; otherwise, the separator is not shown.
     * Note: This is only for use by the Breadcrumbs component!!
     * @ignore
     */
    showSeparator?: boolean;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

const StyledListItem = addStyle("li");
const StyledSvg = addStyle("svg");

/**
 * The BreadcrumbsItem represents an individual item in the breadcrumbs list.
 */
const BreadcrumbsItem = React.forwardRef(function BreadCrumbsItem(
    props: Props,
    ref: React.ForwardedRef<HTMLLIElement>,
) {
    const {children, showSeparator, testId, ...otherProps} = props;

    /**
     * Renders a separator after the content
     * It draws a circular bullet point using an SVG circle shape
     */
    const _renderSeparator = (): React.ReactNode => {
        return (
            <StyledSvg
                style={styles.separator}
                width={16}
                height={16}
                viewBox="0 0 16 16"
                aria-hidden={true}
            >
                <circle cx="8" cy="9" r="1.5" />
            </StyledSvg>
        );
    };

    return (
        <StyledListItem
            {...otherProps}
            style={styles.item}
            data-test-id={testId}
            ref={ref}
        >
            {children}
            {showSeparator && _renderSeparator()}
        </StyledListItem>
    );
});

const styles = StyleSheet.create({
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: Spacing.xxxSmall_4,
    },

    separator: {
        marginLeft: Spacing.xxxSmall_4,
    },
});

export default BreadcrumbsItem;
