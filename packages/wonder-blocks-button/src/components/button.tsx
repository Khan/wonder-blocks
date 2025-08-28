import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import type {
    ClickableState,
    ChildrenProps,
} from "@khanacademy/wonder-blocks-clickable";
import {useInRouterContext} from "react-router-dom-v5-compat";
import ButtonCore from "./button-core";
import type {ButtonProps, ButtonRef} from "../util/button.types";

/**
 * The `Button` component is a reusable button that can be used in various
 * contexts. It can be used as a link or a button, and it supports various
 * props to customize its behavior and appearance.
 *
 * ### Usage
 *
 * ```tsx
 * import Button from "@khanacademy/wonder-blocks-button";
 *
 * <Button
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *     Hello, world!
 * </Button>
 * ```
 */
const Button = React.forwardRef(function Button(
    props: ButtonProps,
    ref: React.ForwardedRef<ButtonRef>,
) {
    const {
        href = undefined,
        type = undefined,
        children,
        skipClientNav,
        onClick,
        beforeNav = undefined,
        safeWithNav = undefined,
        tabIndex,
        target,
        rel,
        actionType = "progressive",
        kind = "primary",
        size = "medium",
        disabled = false,
        spinner = false,
        role,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        ...sharedButtonCoreProps
    } = props;

    const inRouterContext = useInRouterContext();

    const ClickableBehavior = getClickableBehavior(
        href,
        skipClientNav,
        inRouterContext,
    );

    const extraClickableProps = beforeNav ? {beforeNav} : {target};
    // Invoke link or button clickable behavior
    const roleForEvents = href ? "link" : "button";
    // prevent redundant roles for links and buttons, while allowing other roles like `tab` or `menuitem`
    const renderedRole =
        role === "link" || role === "button" ? undefined : role;

    return (
        <ClickableBehavior
            disabled={spinner || disabled}
            href={href}
            role={roleForEvents}
            type={type}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            safeWithNav={safeWithNav}
            rel={rel}
            {...extraClickableProps}
        >
            {(state: ClickableState, restChildProps: ChildrenProps) => {
                return (
                    <ButtonCore
                        {...sharedButtonCoreProps}
                        {...state}
                        {...restChildProps}
                        disabled={disabled}
                        spinner={spinner || state.waiting}
                        actionType={actionType}
                        kind={kind}
                        size={size}
                        skipClientNav={skipClientNav}
                        href={href}
                        role={renderedRole}
                        target={target}
                        type={type}
                        tabIndex={tabIndex}
                        ref={ref}
                    >
                        {children}
                    </ButtonCore>
                );
            }}
        </ClickableBehavior>
    );
});

export default Button;
