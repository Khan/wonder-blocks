// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import type {
    ClickableRole,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {addStyle, getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "../util/types.js";

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

    render() {
        const {
            "aria-label": ariaLabel, // eslint-disable-line react/prop-types
            children,
            disabled,
            href,
            onClick,
            role,
            skipClientNav,
            style,
            testId,
        } = this.props;
        const {router} = this.context;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            router,
        );

        return (
            <ClickableBehavior>
                {(state, handlers) => {
                    const commonProps = {
                        "aria-label": ariaLabel,
                        "data-test-id": testId,
                        role: role,
                        style: [styles.reset, style],
                        ...handlers,
                    };

                    const content = children(state);
                    const activeHref = href && !disabled;
                    const useClientRouter = router && !skipClientNav;

                    if (activeHref && useClientRouter) {
                        return (
                            <StyledLink
                                {...commonProps}
                                to={href}
                                onClick={onClick}
                                aria-disabled={disabled ? "true" : undefined}
                            >
                                {content}
                            </StyledLink>
                        );
                    } else if (activeHref && !useClientRouter) {
                        return (
                            <StyledAnchor
                                {...commonProps}
                                href={href}
                                onClick={onClick}
                                aria-disabled={disabled ? "true" : undefined}
                            >
                                {content}
                            </StyledAnchor>
                        );
                    } else {
                        return (
                            <StyledButton
                                type="button"
                                {...commonProps}
                                onClick={onClick}
                                disabled={disabled}
                            >
                                {content}
                            </StyledButton>
                        );
                    }
                }}
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

        /* Corrects inability to style clickable `input` types in iOS */
        WebkitAppearance: "none",
    },
});
