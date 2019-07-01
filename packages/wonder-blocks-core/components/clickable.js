// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Link} from "react-router-dom";
import addStyle from "../util/add-style.js";
import getClickableBehavior from "../util/get-clickable-behavior.js";
import type {ClickableRole, ClickableState} from "./clickable-behavior.js";
import type {StyleType} from "../util/types.js";

type Props = {|
    "aria-label": string,
    children: (state: ClickableState) => React.Node,
    disabled: boolean,
    href?: string,
    onClick?: (e: SyntheticEvent<>) => mixed,
    role?: ClickableRole,
    skipClientNav?: boolean,
    style?: StyleType,
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

    render() {
        const {router} = this.context;
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

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior
                disabled={disabled}
                href={href}
                onClick={onClick}
                role={role}
            >
                {(state, handlers) => {
                    const commonProps = {
                        "aria-label": ariaLabel,
                        "data-test-id": testId,
                        role: role,
                        style: [styles.reset, style],
                        ...handlers,
                    };

                    const content = children(state);

                    if (href && !disabled) {
                        return router && !skipClientNav ? (
                            <StyledLink
                                {...commonProps}
                                to={href}
                                aria-disabled={disabled ? "true" : undefined}
                            >
                                {content}
                            </StyledLink>
                        ) : (
                            <StyledAnchor
                                {...commonProps}
                                href={href}
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
