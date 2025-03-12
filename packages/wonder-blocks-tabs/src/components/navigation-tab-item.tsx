import {addStyle, AriaProps} from "@khanacademy/wonder-blocks-core";
import {CSSProperties, StyleSheet} from "aphrodite";
import * as React from "react";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = AriaProps & {
    /**
     * The contents of the NavigationTabItem (usually a Link component)
     */
    children: React.ReactElement;
    /**
     * An id for the root element.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
};

const StyledLi = addStyle("li");

/**
 * A component for a tab item in NavigationTabs. It is used with a Link
 * component.
 *
 * ## Usage
 *
 * ```jsx
 * import {NavigationTab, NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
 * import Link from "@khanacademy/wonder-blocks-link";
 *
 * <NavigationTabs>
 *  <NavigationTabItem>
 *    <Link href="/link-1">Link 1</Link>
 *  </NavigationTabItem>
 *  <NavigationTabItem>
 *    <Link href="/link-2">Link 2</Link>
 *  </NavigationTabItem>
 * </NavigationTabs>
 * ```
 */
export const NavigationTabItem = React.forwardRef(function NavigationTabItem(
    props: Props,
    ref: React.ForwardedRef<HTMLLIElement>,
) {
    const {children, id, testId, ...otherProps} = props;

    function renderChildren() {
        const linkProps = {
            style: [typographyStyles.Body, styles.link],
        };

        return React.cloneElement(children, linkProps);
    }

    return (
        <StyledLi
            id={id}
            data-testid={testId}
            style={styles.root}
            ref={ref}
            {...otherProps}
        >
            {renderChildren()}
        </StyledLi>
    );
});

const underlineStyles: CSSProperties = {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: sizing.size_050,
};

const styles = StyleSheet.create({
    root: {
        listStyle: "none",
        display: "inline-flex",
    },
    link: {
        color: semanticColor.text.primary,
        paddingBlock: sizing.size_150,
        paddingInline: 0,
        position: "relative",
        ":hover": {
            textDecoration: "none",
            [":after" as any]: {
                // We use :after to apply underline styles instead of textDecoration
                // so the underline is shown under icons in Link too
                ...underlineStyles,
                backgroundColor:
                    semanticColor.action.primary.progressive.hover.border,
            },
        },
    },
});
