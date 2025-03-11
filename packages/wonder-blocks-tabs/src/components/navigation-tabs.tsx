import {addStyle, AriaProps} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = AriaProps & {
    /**
     * The NavigationTabItem components to render.
     */
    children: React.ReactElement | Array<React.ReactElement>;
    /**
     * An id for the navigation element.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Accessible label for the navigation tabs.
     */
    "aria-label"?: string;
};

const StyledUl = addStyle("ul");

/**
 * The `NavigationTabs` component is a tabbed interface for link navigation.
 * The tabs are links and keyboard users can change tabs using tab.
 * The `NavigationTabs` component is used with `NavigationTabItem` and `Link`
 * components. If the tabs should not be links, see the `Tabs` component,
 * which implements different semantics and keyboard interactions.
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
export const NavigationTabs = (props: Props) => {
    const {
        id,
        testId,
        children,
        "aria-label": ariaLabel,
        ...otherProps
    } = props;
    return (
        <nav
            id={id}
            data-testid={testId}
            aria-label={ariaLabel}
            {...otherProps}
        >
            <StyledUl style={styles.list}>{children}</StyledUl>
        </nav>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 0,
        margin: 0,
        display: "flex",
        gap: sizing.size_200,
    },
});
