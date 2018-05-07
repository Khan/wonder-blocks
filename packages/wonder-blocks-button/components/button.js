// @flow
import React from "react";

import {View} from "wonder-blocks-core";
import Color from "wonder-blocks-color";
import type {ValidTints} from "wonder-blocks-color";
import ClickableBehavior from "./clickable-behavior.js";
import ButtonCore from "./button-core.js";

export type SharedProps = {
    /**
     * Text to appear on the button.
     */
    children: string,

    /**
     * An icon, displayed to the left of the title.
     */
    icon?: string,

    /**
     * If true, replaces the contents with a spinner.
     */
    // TODO(yejia): Implement once spinner is implemented.
    // spinner: boolean,

    /**
     * The color of the button, either blue or red.
     */
    color: ValidTints,

    /**
     * The kind of the button, either primary, secondary, or tertiary.
     *
     * In default state:
     * - Primary buttons have background colors
     * - Secondary buttons have a border and no background color
     * - Tertiary buttons have no background or border
     */
    kind: "primary" | "secondary" | "tertiary",

    /**
     * Whether the button is on a dark/colored background.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light: boolean,

    /**
     * The size of the button. "default" = height: 40; "small" = height: 32
     */
    size: "default" | "small",

    /**
     * Whether the button is disabled.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * The content of the modal, appearing between the titlebar and footer.
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
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string,

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
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: (e: SyntheticEvent<>) => void,
};

export default class Button extends React.Component<Props> {
    static defaultProps = {
        color: Color.blue,
        kind: "primary",
        light: false,
        size: "default",
        disabled: false,
    };

    render() {
        const {onClick, href, children, ...sharedProps} = this.props;
        return (
            <ClickableBehavior
                disabled={sharedProps.disabled}
                onClick={onClick}
                href={href}
            >
                {(state, handlers) => {
                    return (
                        <ButtonCore
                            {...sharedProps}
                            {...state}
                            {...handlers}
                            href={href}
                        >
                            {children}
                        </ButtonCore>
                    );
                }}
            </ClickableBehavior>
        );
    }
}
