import * as React from "react";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle, keys} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {StyleSheet} from "aphrodite";
import type {IconButtonProps} from "../util/icon-button.types";

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

type Props = Omit<IconButtonProps, "icon"> & {
    /**
     * The button content.
     */
    children: React.ReactNode;
    /**
     * URL to navigate to.
     *
     * Used to determine whether to render an `<a>` or `<button>` tag. Also
     * passed in as the `<a>` tag's `href` if present.
     */
    href?: string;
    /**
     * Listens for keydown events on the button. This is useful for preventing
     * default behavior when the user presses the spacebar or enter key.
     */
    onKeyDown?: (e: React.KeyboardEvent) => unknown;
    /**
     * Listens for keyup events on the button. This is useful for triggering
     * actions when the user presses the spacebar or enter key.
     */
    onKeyUp?: (e: React.KeyboardEvent) => unknown;
    /**
     * When the button is in a pressing state. This is useful for keyboard
     * interactions, so we can provide visual feedback to the user.
     */
    onPress?: (isPressing: boolean) => unknown;
};

export const IconButtonUnstyled: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function IconButtonUnstyled(props: Props, ref) {
    const {
        children,
        disabled,
        href,
        onPress,
        skipClientNav,
        style,
        testId,
        type = "button",
        ...restProps
    } = props;
    const inRouterContext = useInRouterContext();

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            const key = e.key;
            // Prevent default behavior for space and enter keys on
            // buttons. We let the browser handle the default behavior
            // for links, which is to activate the link on `Enter`.
            if (!href && (key === keys.enter || key === keys.space)) {
                e.preventDefault();
                onPress?.(true);
            }
        },
        [href, onPress],
    );

    const handleKeyUp = React.useCallback((e: React.KeyboardEvent) => {
        const key = e.key;
        if (!href && (key === keys.enter || key === keys.space)) {
            if (restProps.onClick) {
                restProps.onClick(e);
                onPress?.(false);
            }
        }
    }, []);

    const commonProps = {
        "data-testid": testId,
        style: [styles.shared, style],
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        ...restProps,
    } as const;

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
                type={type}
                {...commonProps}
                onClick={disabled ? undefined : restProps.onClick}
                aria-disabled={disabled}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {children}
            </StyledButton>
        );
    }
});

const styles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: 0,
        cursor: "pointer",
        border: "none",
        outline: "none",
        textDecoration: "none",
        background: "none",
        margin: 0,
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },
});
