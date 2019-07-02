// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import type {
    StyleType,
    ClickableRole,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {addStyle, getClickableBehavior} from "@khanacademy/wonder-blocks-core";

type Props = {|
    /**
     * The child of Clickable must be a funciton which returns the component
     * which should be made Clickable.
     */
    children: (eventState: ClickableState) => React.Node,

    /**
     * An onClick function which Clickable can execure
     */
    onClick?: (e: SyntheticEvent<>) => mixed,

    /**
     * Optinal href which Clickable should direct to, uses Client-side routing
     * by default if react-router is present
     */
    href?: string,

    /**
     * Styles to apply to the Clickable compoenent
     */
    style?: StyleType,

    /**
     * Disables or enables the child, defaults to false
     */
    disabled: boolean,

    /**
     * The role of the component
     */
    role?: ClickableRole,

    /**
     * If href is present skipClientNav will avoid client-side routing
     */
    skipClientNav?: boolean,

    "aria-label": string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledButton = addStyle<"button">("button");
const StyledLink = addStyle<typeof Link>(Link);

export default class Clickable extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
        "aria-label": "",
    };

    static contextTypes = {router: PropTypes.any};

    getCorrectTag = (clickableState: ClickableState, commonProps: mixed) => {
        const activeHref = this.props.href && !this.props.disabled;
        const useClient = this.context.router && !this.props.skipClientNav;

        if (activeHref && useClient) {
            return (
                <StyledLink
                    {...commonProps}
                    to={this.props.href}
                    aria-disabled={this.props.disabled ? "true" : undefined}
                >
                    {this.props.children(clickableState)}
                </StyledLink>
            );
        } else if (activeHref && !useClient) {
            return (
                <StyledAnchor
                    {...commonProps}
                    href={this.props.href}
                    aria-disabled={this.props.disabled ? "true" : undefined}
                >
                    {this.props.children(clickableState)}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    {...commonProps}
                    type="button"
                    disabled={this.props.disabled}
                >
                    {this.props.children(clickableState)}
                </StyledButton>
            );
        }
    };

    render() {
        const ClickableBehavior = getClickableBehavior(
            this.props.href,
            this.props.skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior>
                {(state, handlers) =>
                    this.getCorrectTag(state, {
                        // eslint-disable-next-line react/prop-types
                        "aria-label": this.props["aria-label"],
                        "data-test-id": this.props.testId,
                        role: this.props.role,
                        style: [styles.reset, this.props.style],
                        onClick: this.props.onClick,
                        ...handlers,
                    })
                }
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    reset: {
        border: "none",
        margin: 0,
        padding: 0,
        width: "auto",
        overflow: "visible",

        background: "transparent",
        textDecoration: "none",

        /* inherit font & color from ancestor */
        color: "inherit",
        font: "inherit",

        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",

        // This is usual frowned upon b/c of accessibility.  We expect users of Clickable
        // to define their own focus styles.
        outline: "none",

        /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
        lineHeight: "normal",

        /* Corrects font smoothing for webkit */
        WebkitFontSmoothing: "inherit",
        MozOsxFontSmoothing: "inherit",
    },
});
