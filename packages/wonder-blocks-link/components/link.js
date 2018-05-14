// @flow
import React from "react";

import LinkCore from "./link-core.js";

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
    caret: boolean,

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
     * Whether to use client-side navigation.
     *
     * If the URL passed to href is local to the client-side, e.g.
     * /math/algebra/eval-exprs, then use ReactRouter to do a client side
     * navigation by doing history.push(this.props.href) using
     * ReactRouter's history object
     */
    clientSideNav?: boolean,

    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     */
    onClick?: (e: SyntheticEvent<MouseEvent | TouchEvent>) => void,
};

export default class Link extends React.Component<Props> {
    static defaultProps = {
        caret: false,
        kind: "primary",
        light: false,
    };

    render() {
        const {children} = this.props;
        return (
            <LinkCore
                {...this.props}
                hovered={false}
                focused={false}
                pressed={false}
            >
                {children}
            </LinkCore>
        );
    }
}
