import * as React from "react";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {StyleSheet} from "aphrodite";
import {ButtonProps} from "../util/button.types";

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

type Props = Omit<ButtonProps, "children"> & {
    /**
     * The button content.
     */
    children: React.ReactNode;
    /**
     * Respond to a raw "mousedown" event.
     */
    onMouseDown?: (e: React.MouseEvent) => unknown;
    /**
     * Respond to a raw "mouseup" event.
     */
    onMouseUp?: (e: React.MouseEvent) => unknown;
    /**
     * Respond to a raw "mouseenter" event.
     */
    onMouseEnter?: (e: React.MouseEvent) => unknown;
    /**
     * Respond to a raw "mouseleave" event.
     */
    onMouseLeave?: (e: React.MouseEvent) => unknown;
};

const ButtonUnstyled: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonUnstyled(props: Props, ref) {
    const {
        children,
        disabled,
        href,
        id,
        skipClientNav,
        style,
        testId,
        type,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        ...restProps
    } = props;

    // Only call mouse event handlers when not disabled
    const conditionalMouseEvents = disabled
        ? {}
        : {
              onMouseDown,
              onMouseUp,
              onMouseEnter,
              onMouseLeave,
          };

    const commonProps = {
        "data-testid": testId,
        id: id,
        role: "button",
        style: [styles.reset, style],
        ...conditionalMouseEvents,
        ...restProps,
    } as const;

    const inRouterContext = useInRouterContext();

    if (href && !disabled) {
        return inRouterContext && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink
                {...commonProps}
                to={href}
                ref={ref as React.Ref<typeof Link>}
            >
                {children}
            </StyledLink>
        ) : (
            <StyledA
                {...commonProps}
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
            >
                {children}
            </StyledA>
        );
    } else {
        return (
            <StyledButton
                type={type || "button"}
                {...commonProps}
                aria-disabled={disabled}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {children}
            </StyledButton>
        );
    }
});

const styles = StyleSheet.create({
    reset: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        border: "none",
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
});

export {ButtonUnstyled};
