import * as React from "react";
import {__RouterContext} from "react-router";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import type {IconAsset, IconSize} from "@khanacademy/wonder-blocks-icon";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {Link} from "react-router-dom";
import IconButtonCore from "./icon-button-core";

export type SharedProps = Partial<Omit<AriaProps, "aria-disabled">> & {
    /**
     * A Wonder Blocks icon asset, an object specifing paths for one or more of
     * the following sizes: small, medium, large, xlarge.
     */
    icon: IconAsset;
    /**
     * The color of the icon button, either blue or red.
     */
    color?: "default" | "destructive";
    /**
     * The kind of the icon button, either primary, secondary, or tertiary.
     *
     * In default state:
     * - Primary icon buttons are color: props.color
     * - Secondary buttons are offBlack
     * - Tertiary buttons are offBlack64
     *
     * In the hover/focus/press states, all variants have a border.
     */
    kind?: "primary" | "secondary" | "tertiary";
    /**
     * Whether the icon button is on a dark/colored background.
     */
    light?: boolean;
    /**
     * Whether the icon button is disabled.
     */
    disabled?: boolean;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Optional custom styles.
     */
    style?: StyleType;
    // TODO(yejia): use this if ADR #47 has been implemented
    /*
    style?: Style<Exact<{
        width?: number | string
        position: Position,
        ...MarginStyles,
        ...FlexItemStyles,
    }>>,
    */

    /**
     * Adds CSS classes to the IconButton.
     */
    className?: string;
    // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
    // support ... inside of an exact object type. Thus we had to move the
    // following propers into this SharedProps, even though they should be
    // external. Once that's fixed we can split them back apart.

    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string;
    // TODO(WB-1262): only allow this prop when `href` is also set.
    /**
     * A target destination window for a link to open in.
     */
    target?: "_blank";
    /**
     * Specifies the type of relationship between the current document and the
     * linked document. Should only be used when `href` is specified. This
     * defaults to "noopener noreferrer" when `target="_blank"`, but can be
     * overridden by setting this prop to something else.
     */
    rel?: string;
    /**
     * Set the tabindex attribute on the rendered element.
     */
    tabIndex?: number;
    /**
     * Whether to avoid using client-side navigation.
     *
     * If the URL passed to href is local to the client-side, e.g.
     * /math/algebra/eval-exprs, then it tries to use react-router-dom's Link
     * component which handles the client-side navigation. You can set
     * `skipClientNav` to true avoid using client-side nav entirely.
     *
     * NOTE: All URLs containing a protocol are considered external, e.g.
     * https://khanacademy.org/math/algebra/eval-exprs will trigger a full
     * page reload.
     */
    skipClientNav?: boolean;
    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: (e: React.SyntheticEvent) => unknown;
    /**
     * One of `xsmall` (24px, 16px icon), `small` (32px, 16px icon), `medium` (40px, 24px icon),
     * `large` (60px, 48px icon), or `xlarge` (108px, 96px icon).
     */
    size?: IconSize;
};

/**
 * An IconButton is a button whose contents are an SVG image.
 *
 * To use, supply an onClick function, a wonder-blocks icon asset (see
 * the Icon section) and an aria-label to describe the button functionality.
 * Optionally specify href (URL), clientSideNav, color
 * (Wonder Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"),
 * light (whether the IconButton will be rendered on a dark background),
 * disabled , test ID, and custom styling.
 *
 * The size of an IconButton matches the size of icon it wraps which is 24x24
 * pixels.  The focus ring which is displayed on hover and focus is much
 * larger but does not affect its size.  This matches the behavior of Button.
 *
 * IconButtons require a certain amount of space between them to ensure the
 * focus rings don't overlap.  The minimum amount of spacing is 16px, but
 * you should refer to the mocks provided by design.  Using a Strut in between
 * IconButtons is the preferred way to for adding this spacing.
 *
 * Many layouts require alignment of visual left (or right) side of an
 * IconButton.  This requires a little bit of pixel nudging since each icon
 * as a different amount of internal padding.
 *
 * See the Toolbar documentation for examples of IconButton use that follow
 * the best practices described above.
 *
 * ```js
 * import {icons} from "@khanacademy/wonder-blocks-icon";
 * import IconButton from "@khanacademy/wonder-blocks-icon-button";
 *
 * <IconButton
 *     icon={icons.anIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
const IconButton: React.ForwardRefExoticComponent<
    SharedProps &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    SharedProps
>((props: SharedProps, ref) => {
    const {
        onClick,
        href,
        skipClientNav,
        tabIndex,
        target,
        color = "default",
        kind = "primary",
        light = false,
        disabled = false,
        size = "medium",
        ...sharedProps
    } = props;
    const renderClickableBehavior = (router: any): React.ReactNode => {
        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            router,
        );

        return (
            <ClickableBehavior
                disabled={disabled}
                href={href}
                onClick={onClick}
                role="button"
                target={target}
            >
                {(state, {...childrenProps}) => {
                    return (
                        <IconButtonCore
                            {...sharedProps}
                            {...state}
                            {...childrenProps}
                            color={color}
                            disabled={disabled}
                            kind={kind}
                            href={href}
                            light={light}
                            size={size}
                            skipClientNav={skipClientNav}
                            target={target}
                            tabIndex={tabIndex}
                            ref={ref}
                        />
                    );
                }}
            </ClickableBehavior>
        );
    };

    return (
        <__RouterContext.Consumer>
            {(router) => renderClickableBehavior(router)}
        </__RouterContext.Consumer>
    );
});

export default IconButton;
