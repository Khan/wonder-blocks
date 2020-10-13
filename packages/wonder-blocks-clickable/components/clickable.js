// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import type {
    StyleType,
    ClickableRole,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {addStyle, getClickableBehavior} from "@khanacademy/wonder-blocks-core";

type CommonProps = {|
    /**
     * The child of Clickable must be a function which returns the component
     * which should be made Clickable.  The function is passed an object with
     * three boolean properties: hovered, focused, and pressed.
     */
    children: (ClickableState) => React.Node,

    /**
     * An onClick function which Clickable can execute when clicked
     */
    onClick?: (e: SyntheticEvent<>) => mixed,

    /**
     * Optinal href which Clickable should direct to, uses client-side routing
     * by default if react-router is present
     */
    href?: string,

    /**
     * Styles to apply to the Clickable compoenent
     */
    style?: StyleType,

    /**
     * Disables or enables the child; defaults to false
     */
    disabled: boolean,

    /**
     * The role of the component, can be a role of type ClickableRole
     */
    role?: ClickableRole,

    /**
     * Avoids client-side routing in the presence of the href prop
     */
    skipClientNav?: boolean,

    /**
     * Use to label the component
     */
    "aria-label": string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type Props =
    | {|
          ...CommonProps,
      |}
    | {|
          ...CommonProps,

          href: string,

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<mixed>,
      |}
    | {|
          ...CommonProps,

          href: string,

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<mixed>,
      |}
    | {|
          ...CommonProps,

          href: string,

          /**
           * Run async code before navigating. If the promise returned rejects then
           * navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           */
          beforeNav: () => Promise<mixed>,

          /**
           * Run async code in the background while client-side navigating. If the
           * browser does a full page load navigation, the callback promise must be
           * settled before the navigation will occur. Errors are ignored so that
           * navigation is guaranteed to succeed.
           */
          safeWithNav: () => Promise<mixed>,
      |};

const StyledAnchor = addStyle<"a">("a");
const StyledButton = addStyle<"button">("button");
const StyledLink = addStyle<typeof Link>(Link);

/**
 * A component to turn any custom component into a clickable one.
 *
 * Works by wrapping ClickableBehavior around the child element and styling the
 * child appropriately and encapsulates routing logic which can be customized.
 * Expects a function which returns an element as it's child.
 *
 * Example usage:
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
export default class Clickable extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    static defaultProps = {
        disabled: false,
        "aria-label": "",
    };

    getCorrectTag = (
        clickableState: ClickableState,
        commonProps: {[string]: any, ...},
    ) => {
        const activeHref = this.props.href && !this.props.disabled;
        const useClient = this.context.router && !this.props.skipClientNav;

        // NOTE: checking this.props.href here is redundant, but flow
        // needs it to refine this.props.href to a string.
        if (activeHref && useClient && this.props.href) {
            return (
                <StyledLink
                    {...commonProps}
                    to={this.props.href}
                    role={this.props.role}
                    aria-disabled={this.props.disabled ? "true" : undefined}
                >
                    {this.props.children(clickableState)}
                </StyledLink>
            );
        } else if (activeHref && !useClient) {
            return (
                <StyledAnchor
                    {...commonProps}
                    href={this.props.href}
                    role={this.props.role}
                    aria-disabled={this.props.disabled ? "true" : undefined}
                >
                    {this.props.children(clickableState)}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    {...commonProps}
                    type="button"
                    disabled={this.props.disabled}
                >
                    {this.props.children(clickableState)}
                </StyledButton>
            );
        }
    };

    render() {
        const {
            href,
            onClick,
            skipClientNav,
            beforeNav = undefined,
            safeWithNav = undefined,
        } = this.props;
        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior
                href={href}
                onClick={onClick}
                beforeNav={beforeNav}
                safeWithNav={safeWithNav}
            >
                {(state, handlers) =>
                    this.getCorrectTag(state, {
                        // eslint-disable-next-line react/prop-types
                        "aria-label": this.props["aria-label"],
                        "data-test-id": this.props.testId,
                        style: [styles.reset, this.props.style],
                        ...handlers,
                    })
                }
            </ClickableBehavior>
        );
    }
}

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
});
