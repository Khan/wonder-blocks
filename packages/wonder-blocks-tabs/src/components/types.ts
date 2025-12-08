import * as React from "react";
import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

export type NavigationTabsProps = AriaProps & {
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
     * Accessible label for the navigation element.
     *
     * It is important to provide a unique aria-label if there are multiple
     * navigation elements on the page.
     *
     * If there is a visual label for the navigation tabs already, use
     * `aria-labelledby` instead.
     */
    "aria-label"?: string;
    /**
     * If there is a visual label for the navigation tabs already, set
     * `aria-labelledby` to the `id` of the element that labels the navigation
     * tabs.
     */
    "aria-labelledby"?: string;
    /**
     * Custom styles for the elements in NavigationTabs.
     * - `root`: Styles the root `nav` element.
     * - `list`: Styles the underlying `ul` element that wraps the
     * `NavigationTabItem` components
     */
    styles?: {
        root?: StyleType;
        list?: StyleType;
    };

    /**
     * Whether to include animation in the `NavigationTabs`. This should be false
     * if the user has `prefers-reduced-motion` opted in. Defaults to `false`.
     */
    animated?: boolean;

    /**
     * The HTML tag to render. Defaults to `nav`.
     */
    tag?: keyof JSX.IntrinsicElements;
};

export type NavigationTabItemLinkProps = {
    style: StyleType;
    "aria-current"?: "page";
};

export type NavigationTabItemProps = AriaProps & {
    /**
     * The `Link` to render for the navigation tab item.
     *
     * When a `Link` component is passed in for the `children` prop,
     * `NavigationTabItem` will inject props for the `Link`. For specific use
     * cases where the `Link` component is wrapped by another component (like a
     * `Tooltip` or `Popover`), a render function can be used instead. The
     * render function provides the Link props that should be applied to the
     * Link component.
     */
    children:
        | React.ReactElement
        | ((linkProps: NavigationTabItemLinkProps) => React.ReactElement);
    /**
     * An id for the root element.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * If the `NavigationTabItem` is the current page. If `true`, current
     * styling and aria-current=page will be applied to the Link.
     *
     * Note: NavigationTabs provides the styling for the current tab item.
     */
    current?: boolean;
    /**
     * Custom styles for overriding default styles. For custom link styling,
     * prefer applying the styles to the `Link` component. Note: The
     * `NavigationTabItem` will also set styles to the `Link` child component.
     */
    style?: StyleType;
};
