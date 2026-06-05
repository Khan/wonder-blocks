import * as React from "react";
import {useInRouterContext} from "react-router-dom-v5-compat";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {
    ChildrenProps,
    ClickableState,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-clickable";
import type {ActivityButtonProps, ButtonRef} from "../util/button.types";

import {ButtonUnstyled} from "./button-unstyled";
import styles from "./activity-button.module.css";

type ButtonCoreProps = ActivityButtonProps & ChildrenProps & ClickableState;

const ActivityButtonCore: React.ForwardRefExoticComponent<
    ButtonCoreProps & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, ButtonCoreProps>(function ActivityButtonCore(
    props: ButtonCoreProps,
    ref,
) {
    const {
        actionType = "progressive",
        children,
        disabled = false,
        kind = "primary",
        focused,
        pressed,
        styles: stylesProp,
        type = undefined,
        startIcon,
        endIcon,
        hovered: _,
        waiting: __,
        ...restProps
    } = props;

    // `kind` and `actionType` select the colour matrix (via the `[data-kind]`
    // attribute set by `ButtonUnstyled` and the `actionType` class). The
    // disabled and chonky states are selected in CSS (via `[aria-disabled]` and
    // descendant selectors), so they don't need classes here. Class-name
    // strings are composed through the `style` prop — `processStyleList` routes
    // them to `className`.
    const rootStyles = [
        styles.root,
        actionType && styles[actionType],
        // Enable the press / focus states for programmatic (keyboard)
        // interaction tracked by `ClickableBehavior`.
        !disabled && pressed && styles.pressed,
        !disabled && !pressed && focused && styles.focused,
        stylesProp?.root,
    ];

    const chonkyStyles = [styles.chonky, stylesProp?.box];

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            kind={kind}
            ref={ref}
            style={rootStyles}
            type={type}
        >
            <>
                {/* The chonky box. State styling (hover/press/disabled) is
                    applied via descendant selectors from the root in the CSS
                    module. */}
                <View style={chonkyStyles}>
                    {/* If startIcon is a string, we use the `PhosphorIcon` component to render it. Otherwise, we render the element directly */}
                    {startIcon &&
                        (typeof startIcon === "string" ? (
                            // We use the `PhosphorIcon` component to render the icon.
                            // It is a wrapper around the Phosphor icons library.
                            <PhosphorIcon
                                size="medium"
                                color="currentColor"
                                icon={startIcon}
                                style={[styles.icon, stylesProp?.startIcon]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(startIcon, {
                                "aria-hidden": true,
                                style: [styles.icon, stylesProp?.startIcon],
                            })
                        ))}

                    <BodyText
                        tag="span"
                        size="medium"
                        weight="semi"
                        style={[styles.label, stylesProp?.label]}
                    >
                        {children}
                    </BodyText>
                    {/* If endIcon is a string, we use the `PhosphorIcon` component to render it. Otherwise, we render the element directly */}
                    {endIcon &&
                        (typeof endIcon === "string" ? (
                            // We use the `PhosphorIcon` component to render the icon.
                            // It is a wrapper around the Phosphor icons library.
                            <PhosphorIcon
                                size="medium"
                                color="currentColor"
                                icon={endIcon}
                                style={[styles.icon, stylesProp?.endIcon]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(endIcon, {
                                "aria-hidden": true,
                                style: [styles.icon, stylesProp?.endIcon],
                            })
                        ))}
                </View>
            </>
        </ButtonUnstyled>
    );
});

/**
 * `ActivityButton` is a button that is used for actions in the context of
 * learner activities. It uses a "chonky" design, which is a more playful and
 * engaging design that is suitable for learner activities.
 *
 * ```tsx
 * import magnifyingGlassIcon from
 * "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {ActivityButton} from "@khanacademy/wonder-blocks-button";
 *
 * <ActivityButton
 *     startIcon={magnifyingGlassIcon}
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *  Hello, world!
 * </ActivityButton>
 * ```
 */
export const ActivityButton = React.forwardRef(function ActivityButton(
    props: ActivityButtonProps,
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
        kind = "primary",
        disabled = false,
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
    // prevent redundant roles for links and buttons, while allowing other roles
    // like `tab` or `menuitem`
    const renderedRole =
        role === "link" || role === "button" ? undefined : role;

    return (
        <ClickableBehavior
            disabled={disabled}
            href={href}
            role={roleForEvents}
            type={type}
            onClick={onClick}
            safeWithNav={safeWithNav}
            rel={rel}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...extraClickableProps}
        >
            {(state: ClickableState, restChildProps: ChildrenProps) => {
                return (
                    <ActivityButtonCore
                        {...sharedButtonCoreProps}
                        {...state}
                        {...restChildProps}
                        disabled={disabled}
                        kind={kind}
                        skipClientNav={skipClientNav}
                        href={href}
                        role={renderedRole}
                        target={target}
                        type={type}
                        tabIndex={tabIndex}
                        ref={ref}
                    >
                        {children}
                    </ActivityButtonCore>
                );
            }}
        </ClickableBehavior>
    );
});
