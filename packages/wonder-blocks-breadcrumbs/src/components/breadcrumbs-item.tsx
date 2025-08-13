import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {font, spacing} from "@khanacademy/wonder-blocks-tokens";

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

const StyledLi = addStyle("li");
const StyledSvg = addStyle("svg");

/**
 * The BreadcrumbsItem represents an individual item in the breadcrumbs list.
 */
const BreadcrumbsItem = React.forwardRef(function BreadcrumbsItem(
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
        <StyledLi
            {...otherProps}
            style={styles.item}
            data-testid={testId}
            ref={ref}
        >
            {children}
            {showSeparator && _renderSeparator()}
        </StyledLi>
    );
});

const styles = StyleSheet.create({
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.xxxSmall_4,
        lineHeight: "inherit",
        fontFamily: font.family.sans,
    },

    separator: {
        marginLeft: spacing.xxxSmall_4,
    },
});

export default BreadcrumbsItem;
