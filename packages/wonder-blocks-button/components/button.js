// @flow
import * as React from "react";
import PropTypes from "prop-types";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import ButtonCore from "./button-core.js";

export type SharedProps = {|
    /**
     * Text to appear on the button.
     */
    children: React.Node,

    // TODO: incorporate
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
    color: "default" | "destructive",

    /**
     * The kind of the button, either primary, secondary, or tertiary.
     *
     * In default state:
     *
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
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string,

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
|};

type Props = {|
    ...SharedProps,
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
|};

/**
 * Reusable button component.
 *
 * Consisting of a [`ClickableBehavior`](#clickablebehavior) surrounding a
 * `ButtonCore`. `ClickableBehavior` handles interactions and state changes.
 * `ButtonCore` is a stateless component which displays the different states
 * the `Button` can take.
 *
 * Example usage:
 * ```jsx
 * <Button
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *     Label
 * </Button>
 * ```
 */
export default class Button extends React.Component<Props> {
    static defaultProps = {
        color: "default",
        kind: "primary",
        light: false,
        size: "default",
        disabled: false,
    };

    static contextTypes = {router: PropTypes.any};

    render() {
        const {onClick, href, children, clientNav, ...sharedProps} = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            clientNav,
            this.context.router,
        );

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
                            clientNav={clientNav}
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
