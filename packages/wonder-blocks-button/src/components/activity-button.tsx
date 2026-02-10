import * as React from "react";
import {useInRouterContext} from "react-router-dom-v5-compat";

import {View, cx} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {
    ChildrenProps,
    ClickableState,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-clickable";
import type {ActivityButtonProps, ButtonRef} from "../util/button.types";
import {getActivityButtonVars} from "../util/get-activity-button-vars";

import {ButtonUnstyled} from "./button-unstyled";

import actStyles from "./activity-button.module.css";

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

    const cssVars = getActivityButtonVars(actionType, kind, disabled);

    const buttonClassName = cx(
        actStyles.button,
        disabled && actStyles.disabled,
        !disabled && pressed && actStyles.pressed,
        !disabled && !pressed && focused && actStyles.focused,
    );

    const chonkyClassName = cx(actStyles.chonky, "chonky");

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            ref={ref}
            style={[buttonClassName, cssVars, stylesProp?.root]}
            type={type}
        >
            <>
                {/* NOTE: Using a regular className to be able to use descendant selectors to account for the hover and press states */}
                <View style={stylesProp?.box} className={chonkyClassName}>
                    {/* If startIcon is a string, we use the `PhosphorIcon` component to render it. Otherwise, we render the element directly */}
                    {startIcon &&
                        (typeof startIcon === "string" ? (
                            // We use the `PhosphorIcon` component to render the icon.
                            // It is a wrapper around the Phosphor icons library.
                            <PhosphorIcon
                                size="medium"
                                color="currentColor"
                                icon={startIcon}
                                style={[
                                    staticStyles.icon,
                                    stylesProp?.startIcon,
                                ]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(startIcon, {
                                "aria-hidden": true,
                                style: [
                                    staticStyles.icon,
                                    stylesProp?.startIcon,
                                ],
                            })
                        ))}

                    <BodyText
                        tag="span"
                        size="medium"
                        weight="semi"
                        style={[staticStyles.label, stylesProp?.label]}
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
                                style={[staticStyles.icon, stylesProp?.endIcon]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(endIcon, {
                                "aria-hidden": true,
                                style: [staticStyles.icon, stylesProp?.endIcon],
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

// Static styles for icon and label that don't vary by variant.
const staticStyles = {
    icon: {
        alignSelf: "center",
        width: sizing.size_200,
        height: sizing.size_200,
    },
    label: {
        lineHeight: sizing.size_140,
        paddingBlockStart: sizing.size_040,
        paddingBlockEnd: sizing.size_060,
    },
};
