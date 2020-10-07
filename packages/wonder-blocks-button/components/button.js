// @flow
import * as React from "react";
import PropTypes from "prop-types";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import ButtonCore from "./button-core.js";

export type SharedProps = {|
    /**
     * aria-label should be used when `spinner={true}` to let people using screen
     * readers that the action taken by clicking the button will take some
     * time to complete.
     */
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    /**
     * Text to appear on the button.
     */
    children: string,

    /**
     * An icon, displayed to the left of the title.
     */
    icon?: IconAsset,

    /**
     * If true, replaces the contents with a spinner.
     *
     * Note: setting this prop to `true` will disable the button.
     *
     * TODO(kevinb): support spinner + light once we have designs
     */
    spinner: boolean,

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
     * The size of the button. "medium" = height: 40; "small" = height: 32
     */
    size: "medium" | "small",

    /**
     * Whether the button is disabled.
     */
    disabled: boolean,

    /**
     * An optional id attribute.
     */
    id?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * URL to navigate to.
     */
    href?: string,

    /**
     * A target destination window for a link to open in.
     */
    target?: string,

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
     * Optional custom styles.
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
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: (e: SyntheticEvent<>) => mixed,

    /**
     * Run async code before navigating. If the promise returned rejects then
     * navigation will not occur.
     *
     * If both safeWithNav and beforeNav are provided, beforeNav will be run
     * first and safeWithNav will only be run if beforeNav doesn't not reject.
     */
    beforeNav?: (e: SyntheticEvent<>) => Promise<mixed>,

    /**
     * Run async code in the background while client-side navigating. If the
     * navigation is server-side, the callback must either be resolved or
     * rejected before the navigation will occur. Errors are ignored so that
     * navigation is guaranteed to succeed.
     */
    safeWithNav?: (e: SyntheticEvent<>) => Promise<mixed>,
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
export default class Button extends React.Component<SharedProps> {
    static contextTypes = {router: PropTypes.any};

    static defaultProps = {
        color: "default",
        kind: "primary",
        light: false,
        size: "medium",
        disabled: false,
        spinner: false,
    };

    render() {
        const {
            href,
            children,
            skipClientNav,
            spinner,
            disabled,
            onClick,
            beforeNav,
            safeWithNav,
            ...sharedButtonCoreProps
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        const renderProp = (state, handlers) => {
            return (
                <ButtonCore
                    {...sharedButtonCoreProps}
                    {...state}
                    {...handlers}
                    disabled={disabled}
                    spinner={spinner}
                    skipClientNav={skipClientNav}
                    href={href}
                >
                    {children}
                </ButtonCore>
            );
        };

        return (
            <ClickableBehavior
                disabled={spinner || disabled}
                href={href}
                role="button"
                onClick={onClick}
                beforeNav={beforeNav}
                safeWithNav={safeWithNav}
            >
                {renderProp}
            </ClickableBehavior>
        );
    }
}
