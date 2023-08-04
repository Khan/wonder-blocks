import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import getClickableBehavior from "../util/get-clickable-behavior";
import type {ClickableRole, ClickableState} from "./clickable-behavior";
import {isClientSideUrl} from "../util/is-client-side-url";

type CommonProps =
    /**
     * aria-label should be used when `spinner={true}` to let people using screen
     * readers that the action taken by clicking the button will take some
     * time to complete.
     */
    Partial<Omit<AriaProps, "aria-disabled">> & {
        /**
         * The child of Clickable must be a function which returns the component
         * which should be made Clickable.  The function is passed an object with
         * three boolean properties: hovered, focused, and pressed.
         */
        children: (clickableState: ClickableState) => React.ReactNode;
        /**
         * An onClick function which Clickable can execute when clicked
         */
        onClick?: (e: React.SyntheticEvent) => unknown;
        /**
         * Optional href which Clickable should direct to, uses client-side routing
         * by default if react-router is present
         */
        href?: string;
        /**
         * Styles to apply to the Clickable component
         */
        style?: StyleType;
        /**
         * Adds CSS classes to the Clickable.
         */
        className?: string;
        /**
         * Whether the Clickable is on a dark colored background.
         * Sets the default focus ring color to white, instead of blue.
         * Defaults to false.
         */
        light?: boolean;
        /**
         * Disables or enables the child; defaults to false
         */
        disabled?: boolean;
        /**
         * An optional id attribute.
         */
        id?: string;
        /**
         * Specifies the type of relationship between the current document and the
         * linked document. Should only be used when `href` is specified. This
         * defaults to "noopener noreferrer" when `target="_blank"`, but can be
         * overridden by setting this prop to something else.
         */
        rel?: string;
        /**
         * The role of the component, can be a role of type ClickableRole
         */
        role?: ClickableRole;
        /**
         * Avoids client-side routing in the presence of the href prop
         */
        skipClientNav?: boolean;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * Respond to raw "keydown" event.
         */
        onKeyDown?: (e: React.KeyboardEvent) => unknown;
        /**
         * Respond to raw "keyup" event.
         */
        onKeyUp?: (e: React.KeyboardEvent) => unknown;
        /**
         * Don't show the default focus ring.  This should be used when implementing
         * a custom focus ring within your own component that uses Clickable.
         */
        hideDefaultFocusRing?: boolean;
        /**
         * Set the tabindex attribute on the rendered element.
         */
        tabIndex?: number;
        /**
         * Run async code before navigating. If the promise returned rejects then
         * navigation will not occur.
         *
         * If both safeWithNav and beforeNav are provided, beforeNav will be run
         * first and safeWithNav will only be run if beforeNav does not reject.
         *
         * WARNING: This prop must be used with `href` and should not be used with
         * `target="blank"`.
         */
        beforeNav?: () => Promise<unknown>;
        /**
         * Run async code in the background while client-side navigating. If the
         * browser does a full page load navigation, the callback promise must be
         * settled before the navigation will occur. Errors are ignored so that
         * navigation is guaranteed to succeed.
         */
        safeWithNav?: () => Promise<unknown>;
    };

type Props =
    | (CommonProps & {
          target?: never;
          beforeNav?: never;
          safeWithNav?: never;
      })
    | (CommonProps & {
          href: string;

          /**
           * A target destination window for a link to open in.
           */
          target?: "_blank";

          beforeNav?: never;
          safeWithNav?: never;
      })
    | (CommonProps & {
          href: string;

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<unknown>;

          safeWithNav?: never;
          target?: never;
      })
    | (CommonProps & {
          href: string;

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<unknown>;

          /**
           * A target destination window for a link to open in.
           */
          target?: "_blank";

          beforeNav?: never;
      })
    | (CommonProps & {
          href: string;

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<unknown>;

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<unknown>;

          target?: never;
      });

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

/**
 * A component to turn any custom component into a clickable one.
 *
 * Works by wrapping `ClickableBehavior` around the child element and styling
 * the child appropriately and encapsulates routing logic which can be
 * customized. Expects a function which returns an element as its child.
 *
 * Clickable allows your components to:
 *
 * - Handle mouse / touch / keyboard events
 * - Match the standard behavior of the given role
 * - Apply custom styles based on pressed / focused / hovered state
 * - Perform Client Side Navigation when href is passed and the component is a
 *   descendent of a react-router Router.
 *
 * ### Usage
 *
 * ```jsx
 * <Clickable onClick={() => alert("You clicked me!")}>
 *     {({hovered, focused, pressed}) =>
 *         <div
 *             style={[
 *                 hovered && styles.hovered,
 *                 focused && styles.focused,
 *                 pressed && styles.pressed,
 *             ]}
 *         >
 *             Click Me!
 *         </div>
 *     }
 * </Clickable>
 * ```
 */

const Clickable = React.forwardRef(function Clickable(
    props: Props,
    ref: React.ForwardedRef<
        typeof Link | HTMLAnchorElement | HTMLButtonElement
    >,
) {
    const getCorrectTag: (
        clickableState: ClickableState,
        router: any,
        commonProps: {
            [key: string]: any;
        },
    ) => React.ReactElement = (clickableState, router, commonProps) => {
        const activeHref = props.href && !props.disabled;
        const useClient =
            router && !props.skipClientNav && isClientSideUrl(props.href || "");

        // NOTE: checking this.props.href here is redundant, but TypeScript
        // needs it to refine this.props.href to a string.
        if (activeHref && useClient && props.href) {
            return (
                <StyledLink
                    {...commonProps}
                    to={props.href}
                    role={props.role}
                    target={props.target || undefined}
                    aria-disabled={props.disabled ? "true" : undefined}
                    ref={ref as React.Ref<typeof Link>}
                >
                    {props.children(clickableState)}
                </StyledLink>
            );
        } else if (activeHref && !useClient) {
            return (
                <StyledAnchor
                    {...commonProps}
                    href={props.href}
                    role={props.role}
                    target={props.target || undefined}
                    aria-disabled={props.disabled ? "true" : undefined}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {props.children(clickableState)}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    {...commonProps}
                    type="button"
                    aria-disabled={props.disabled}
                    ref={ref as React.Ref<HTMLButtonElement>}
                >
                    {props.children(clickableState)}
                </StyledButton>
            );
        }
    };

    const renderClickableBehavior: (router: any) => React.ReactNode = (
        router: any,
    ) => {
        const {
            href,
            onClick,
            skipClientNav,
            beforeNav = undefined,
            safeWithNav = undefined,
            style,
            target = undefined,
            testId,
            onKeyDown,
            onKeyUp,
            hideDefaultFocusRing,
            light,
            disabled,
            tabIndex,
            ...restProps
        } = props;
        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            router,
        );

        const getStyle = (state: ClickableState): StyleType => [
            styles.reset,
            styles.link,
            !hideDefaultFocusRing &&
                state.focused &&
                (light ? styles.focusedLight : styles.focused),
            disabled && styles.disabled,
            style,
        ];

        if (beforeNav) {
            return (
                <ClickableBehavior
                    href={href}
                    onClick={onClick}
                    beforeNav={beforeNav}
                    safeWithNav={safeWithNav}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    disabled={disabled}
                    tabIndex={tabIndex}
                >
                    {(state, childrenProps) =>
                        getCorrectTag(state, router, {
                            ...restProps,
                            "data-test-id": testId,
                            style: getStyle(state),
                            ...childrenProps,
                        })
                    }
                </ClickableBehavior>
            );
        } else {
            return (
                <ClickableBehavior
                    href={href}
                    onClick={onClick}
                    safeWithNav={safeWithNav}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    target={target}
                    disabled={disabled}
                    tabIndex={tabIndex}
                >
                    {(state, childrenProps) =>
                        getCorrectTag(state, router, {
                            ...restProps,
                            "data-test-id": testId,
                            style: getStyle(state),
                            ...childrenProps,
                        })
                    }
                </ClickableBehavior>
            );
        }
    };

    return (
        <__RouterContext.Consumer>
            {(router) => renderClickableBehavior(router)}
        </__RouterContext.Consumer>
    );
});

Clickable.defaultProps = {
    light: false,
    disabled: false,
};

export default Clickable;

// Source:  https://gist.github.com/MoOx/9137295
const styles = StyleSheet.create({
    reset: {
        border: "none",
        margin: 0,
        padding: 0,
        width: "auto",
        overflow: "visible",

        background: "transparent",
        textDecoration: "none",

        /* inherit font & color from ancestor */
        color: "inherit",
        font: "inherit",

        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",

        // This is usual frowned upon b/c of accessibility.  We expect users of Clickable
        // to define their own focus styles.
        outline: "none",

        /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
        lineHeight: "normal",

        /* Corrects font smoothing for webkit */
        WebkitFontSmoothing: "inherit",
        MozOsxFontSmoothing: "inherit",
    },
    link: {
        cursor: "pointer",
    },
    focused: {
        ":focus": {
            outline: `solid 2px ${Color.blue}`,
        },
    },
    focusedLight: {
        outline: `solid 2px ${Color.white}`,
    },
    disabled: {
        color: Color.offBlack32,
        cursor: "not-allowed",
        ":focus": {
            outline: "none",
        },
        ":focus-visible": {
            outline: `solid 2px ${Color.blue}`,
        },
    },
});
