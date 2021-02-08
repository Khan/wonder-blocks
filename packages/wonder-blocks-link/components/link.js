// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import LinkCore from "./link-core.js";

type CommonProps = {|
    ...AriaProps,

    /**
     * Text to appear on the link. It can be a plain text or a Typography element.
     */
    children: string | React.Element<Typography>,

    /**
     * URL to navigate to.
     */
    href: string,

    /**
     * An optional id attribute.
     */
    id?: string,

    /**
     * Kind of Link. Note: Secondary light Links are not supported.
     */
    kind: "primary" | "secondary",

    /**
     * Whether the button is on a dark/colored background.
     */
    light: boolean,

    /**
     * Whether the link should change color once it's visited.
     * secondary or primary (light) links are not allowed to be visitable.
     */
    visitable: boolean,

    /**
     * Specifies the type of relationship between the current document and the
     * linked document. Should only be used when `href` is specified. This
     * defaults to "noopener noreferrer" when `target="_blank"`, but can be
     * overridden by setting this prop to something else.
     */
    rel?: string,

    /**
     * Set the tabindex attribute on the rendered element.
     */
    tabIndex?: number,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

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
    skipClientNav?: boolean,

    /**
     * Custom styles.
     */
    style?: StyleType,
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
     * Adds CSS classes to the Link.
     */
    className?: string,

    // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
    // support ... inside of an exact object type. Thus we had to move the
    // following propers into this SharedProps, even though they should be
    // external. Once that's fixed we can split them back apart.

    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     */
    onClick?: (e: SyntheticEvent<>) => mixed,

    /**
     * Run async code in the background while client-side navigating. If the
     * browser does a full page load navigation, the callback promise must be
     * settled before the navigation will occur. Errors are ignored so that
     * navigation is guaranteed to succeed.
     */
    safeWithNav?: () => Promise<mixed>,

    /**
     * Respond to raw "keydown" event.
     */
    onKeyDown?: (e: SyntheticKeyboardEvent<>) => mixed,

    /**
     * Respond to raw "keyup" event.
     */
    onKeyUp?: (e: SyntheticKeyboardEvent<>) => mixed,
|};

export type SharedProps =
    | {|
          ...CommonProps,

          /**
           * A target destination window for a link to open in.  We only support
           * "_blank" which opens the URL in a new tab.
           */
          target?: "_blank",
      |}
    | {|
          ...CommonProps,

          /**
           * Run async code before navigating to the URL passed to `href`. If the
           * promise returned rejects then navigation will not occur.
           *
           * If both safeWithNav and beforeNav are provided, beforeNav will be run
           * first and safeWithNav will only be run if beforeNav does not reject.
           *
           * WARNING: Using this with `target="_blank"` will trigger built-in popup
           * blockers in Firefox and Safari.  This is because we do navigation
           * programmatically and `beforeNav` causes a delay which means that the
           * browser can't make a directly link between a user action and the
           * navigation.
           */
          beforeNav?: () => Promise<mixed>,
      |};

/**
 * Reusable link component.
 *
 * Consisting of a [`ClickableBehavior`](#clickablebehavior) surrounding a
 * `LinkCore`. `ClickableBehavior` handles interactions and state changes.
 * `LinkCore` is a stateless component which displays the different states
 * the `Link` can take.
 *
 * Example usage:
 * ```jsx
 * <Link
 *     href="https://khanacademy.org/"
 * >
 *     Label
 * </Link>
 * ```
 */
export default class Link extends React.Component<SharedProps> {
    static contextTypes = {router: PropTypes.any};
    static defaultProps = {
        kind: "primary",
        light: false,
        visitable: false,
    };

    render() {
        const {
            onClick,
            beforeNav = undefined,
            safeWithNav,
            href,
            skipClientNav,
            children,
            tabIndex,
            onKeyDown,
            onKeyUp,
            target = undefined,
            ...sharedProps
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        if (beforeNav) {
            return (
                <ClickableBehavior
                    disabled={false}
                    href={href}
                    role="link"
                    onClick={onClick}
                    beforeNav={beforeNav}
                    safeWithNav={safeWithNav}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                >
                    {(
                        state,
                        {tabIndex: clickableTabIndex, ...childrenProps},
                    ) => {
                        return (
                            <LinkCore
                                {...sharedProps}
                                {...state}
                                {...childrenProps}
                                skipClientNav={skipClientNav}
                                href={href}
                                target={target}
                                // If tabIndex is provide to the component we allow
                                // it to override the tabIndex provide to use by
                                // ClickableBehavior.
                                tabIndex={tabIndex || clickableTabIndex}
                            >
                                {children}
                            </LinkCore>
                        );
                    }}
                </ClickableBehavior>
            );
        } else {
            return (
                <ClickableBehavior
                    disabled={false}
                    href={href}
                    role="link"
                    onClick={onClick}
                    safeWithNav={safeWithNav}
                    target={target}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                >
                    {(
                        state,
                        {tabIndex: clickableTabIndex, ...childrenProps},
                    ) => {
                        return (
                            <LinkCore
                                {...sharedProps}
                                {...state}
                                {...childrenProps}
                                skipClientNav={skipClientNav}
                                href={href}
                                target={target}
                                // If tabIndex is provide to the component we allow
                                // it to override the tabIndex provide to use by
                                // ClickableBehavior.
                                tabIndex={tabIndex || clickableTabIndex}
                            >
                                {children}
                            </LinkCore>
                        );
                    }}
                </ClickableBehavior>
            );
        }
    }
}
