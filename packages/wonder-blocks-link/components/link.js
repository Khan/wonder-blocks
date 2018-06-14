// @flow
import * as React from "react";

import LinkCore from "./link-core.js";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";

export type SharedProps = {
    /**
     * Text to appear on the link.
     */
    children: string,

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
     * Kind of Link. Note: Secondary light Links ar enot supported.
     */
    kind: "primary" | "secondary",

    /**
     * Whether the button is on a dark/colored background.
     */
    light: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Whether to use client-side navigation.
     *
     * If the URL passed to href is local to the client-side, e.g.
     * /math/algebra/eval-exprs, then it uses react-router-dom's Link
     * component which handles the client-side navigation.
     *
     * NOTE: All URLs containing a protocol are considered external, e.g.
     * https://khanacademy.org/math/algebra/eval-exprs will trigger a full
     * page reload.
     */
    clientNav?: boolean,

    /**
     * Custom styles.
     */
    style?: any,
    // TODO(yejia): use this if ADR #47 has been implemented
    /*
    style?: Style<Exact<{
        width?: number | string
        position: Position,
        ...MarginStyles,
        ...FlexItemStyles,
    }>>,
    */
};

type Props = SharedProps & {
    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     */
    onClick?: (e: SyntheticEvent<>) => void,
};

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
export default class Link extends React.Component<Props> {
    static defaultProps = {
        caret: false,
        kind: "primary",
        light: false,
    };

    render() {
        const {onClick, href, clientNav, children, ...sharedProps} = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            clientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior disabled={false} onClick={onClick} href={href}>
                {(state, handlers) => {
                    return (
                        <LinkCore
                            {...sharedProps}
                            {...state}
                            {...handlers}
                            clientNav={clientNav}
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
