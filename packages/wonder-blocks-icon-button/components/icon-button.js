// @flow
import React from "react";
import PropTypes from "prop-types";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";
import IconButtonCore from "./icon-button-core.js";

export type SharedProps = {|
    /**
     * A Wonder Blocks icon asset, an object specifing paths for one or more of
     * the following sizes: small, medium, large, xlarge.
     */
    icon: IconAsset,

    /**
     * Text to display as the title of the svg element.
     */
    ariaLabel: string,

    /**
     * The color of the icon button, either blue or red.
     */
    color: "default" | "destructive",

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
    kind: "primary" | "secondary" | "tertiary",

    /**
     * Whether the icon button is on a dark/colored background.
     */
    light: boolean,

    /**
     * Whether the icon button is disabled.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Optional custom styles.
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

    // NOTE(jeresig): Currently React Docgen (used by Styleguidist) doesn't
    // support ... inside of an exact object type. Thus we had to move the
    // following propers into this SharedProps, even though they should be
    // external. Once that's fixed we can split them back apart.

    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string,

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
 * An IconButton is a button whose contents are an SVG image.
 *
 * To use, supply an onClick function, a wonder-blocks icon asset (see
 * the Icon section) and an ariaLabel to describe the button functionality.
 * Optionally specify href (URL), clientSideNav, color
 * (Wonder Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"),
 * light (whether the IconButton will be rendered on a dark background),
 * disabled , test ID, and custom styling.
 *
 * ```js
 * import {icons} from "@khanacademy/wonder-blocks-icon";
 *
 * <IconButton
 *     icon={icons.anIcon}
 *     ariaLabel="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export default class IconButton extends React.Component<SharedProps> {
    static defaultProps = {
        color: "default",
        kind: "primary",
        light: false,
        disabled: false,
    };

    static contextTypes = {router: PropTypes.any};

    render() {
        const {onClick, href, skipClientNav, ...sharedProps} = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior
                disabled={sharedProps.disabled}
                href={href}
                onClick={onClick}
            >
                {(state, handlers) => {
                    return (
                        <IconButtonCore
                            {...sharedProps}
                            {...state}
                            {...handlers}
                            skipClientNav={skipClientNav}
                            href={href}
                        />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
