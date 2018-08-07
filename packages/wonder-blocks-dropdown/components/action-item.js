// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const {blue, white, offBlack, offBlack32} = Color;

type ActionProps = {|
    /**
     * Display text of the action item.
     */
    label: string,

    /**
     * Whether this action item is disabled.
     */
    disabled: boolean,

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
    onClick?: () => void,

    /**
     * Whether this item should be indented to have menu items left-align in
     * text when an ActionItem is used in the same menu as items that have
     * checks or checkboxes. Auto-populated by menu.
     * @ignore
     */
    indent: boolean,
|};

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

/**
 * The action item trigger actions, such as navigating to a different page or
 * opening a modal. Supply the href and/or onClick props.
 */
export default class ActionItem extends React.Component<ActionProps> {
    static defaultProps = {
        disabled: false,
        indent: false,
    };

    static contextTypes = {router: PropTypes.any};

    handleClick = (e: SyntheticEvent<>) => {
        if (this.props.disabled) {
            e.preventDefault();
        }
    };

    render() {
        const {
            skipClientNav,
            disabled,
            href,
            indent,
            label,
            onClick,
        } = this.props;
        const {router} = this.context;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            router,
        );

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={onClick}
                href={href}
            >
                {(state, handlers) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.shared,
                        disabled && styles.disabled,
                        !disabled &&
                            (pressed
                                ? styles.active
                                : (hovered || focused) && styles.focus),
                    ];

                    const props = {
                        disabled,
                        style: [defaultStyle],
                        role: "menuitem",
                        ...handlers,
                    };

                    const children = (
                        <React.Fragment>
                            {indent && <View style={{width: Spacing.medium}} />}
                            <LabelLarge style={styles.label}>
                                {label}
                            </LabelLarge>
                        </React.Fragment>
                    );

                    if (href) {
                        return router && !skipClientNav ? (
                            <StyledLink
                                {...props}
                                onClick={this.handleClick}
                                to={href}
                            >
                                {children}
                            </StyledLink>
                        ) : (
                            <StyledAnchor
                                {...props}
                                onClick={this.handleClick}
                                href={href}
                            >
                                {children}
                            </StyledAnchor>
                        );
                    } else {
                        return (
                            <StyledButton {...props} disabled={disabled}>
                                {children}
                            </StyledButton>
                        );
                    }
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        background: white,
        color: offBlack,
        textDecoration: "none",
        border: "none",
        outline: "none",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        height: 40,
        minHeight: 40,
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
    },

    label: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
    },

    // hover and focus states
    focus: {
        color: white,
        background: blue,
    },

    // active and pressed states
    active: {
        color: mix(fade(blue, 0.32), white),
        background: mix(offBlack32, blue),
    },

    // disabled state
    disabled: {
        color: offBlack32,
        cursor: "default",
    },
});
