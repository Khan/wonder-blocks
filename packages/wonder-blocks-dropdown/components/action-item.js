// @flow
// For menu items that trigger an action, such as going to a new page or
// opening a modal.

import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const {blue, white, offBlack, offBlack32} = Color;

type ActionProps = {
    /**
     * Display text of the menu item.
     */
    label: string,

    /**
     * Whether this menu item is disabled. A disabled item may not be selected.
     */
    disabled?: boolean,

    /**
     * Whether this item should be indented to have menu items left-align in
     * text when an ActionItem is used in the same menu as items that have
     * checks or checkboxes.
     */
    indent?: boolean,

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
};

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

export default class ActionItem extends React.Component<ActionProps> {
    static defaultProps = {
        disabled: false,
        indent: false,
    };

    getTag() {
        const {href, clientNav} = this.props;
        if (href) {
            if (clientNav) {
                return StyledLink;
            } else {
                return StyledAnchor;
            }
        } else {
            return StyledButton;
        }
    }

    render() {
        const {clientNav, disabled, href, indent, label, onClick} = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            clientNav,
            this.context.router,
        );

        const Tag = this.getTag();

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
                        style: [defaultStyle],
                        disabled,
                        ...handlers,
                    };

                    if (!disabled && href) {
                        if (clientNav) {
                            props.to = href;
                        } else {
                            props.href = href;
                        }
                    }

                    return (
                        <Tag {...props} role="menuitem">
                            {indent && <View style={{width: Spacing.medium}} />}
                            <LabelLarge style={[styles.label]}>
                                {label}
                            </LabelLarge>
                        </Tag>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        background: white,
        color: offBlack,
        cursor: "pointer",
        textDecoration: "none",
        border: "none",
        outline: "none",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        height: 40,
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
    },

    label: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
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
