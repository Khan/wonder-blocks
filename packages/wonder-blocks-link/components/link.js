// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import LinkCore from "./link-core.js";

export type SharedProps = {|
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
     * Whether to display a caret after the text.
     */
    // TODO(yejia): Add once we have an Icon component
    caret: boolean,

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
     * A target destination window for a link to open in.
     */
    target?: string,

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
     * Run async code before navigating to the URL passed to `href`. If the
     * promise returned rejects then navigation will not occur.
     *
     * If both safeWithNav and beforeNav are provided, beforeNav will be run
     * first and safeWithNav will only be run if beforeNav does not reject.
     */
    beforeNav?: () => Promise<mixed>,

    /**
     * Run async code in the background while client-side navigating. If the
     * navigation is server-side, the callback must be settled before the
     * navigation will occur. Errors are ignored so that navigation is
     * guaranteed to succeed.
     */
    safeWithNav?: () => Promise<mixed>,
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
        caret: false,
        kind: "primary",
        light: false,
        visitable: false,
    };

    render() {
        const {
            onClick,
            beforeNav,
            safeWithNav,
            href,
            skipClientNav,
            children,
            ...sharedProps
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior
                disabled={false}
                href={href}
                role="link"
                onClick={onClick}
                beforeNav={beforeNav}
                safeWithNav={safeWithNav}
            >
                {(state, handlers) => {
                    return (
                        <LinkCore
                            {...sharedProps}
                            {...state}
                            {...handlers}
                            skipClientNav={skipClientNav}
                            href={href}
                        >
                            {children}
                        </LinkCore>
                    );
                }}
            </ClickableBehavior>
        );
    }
}
