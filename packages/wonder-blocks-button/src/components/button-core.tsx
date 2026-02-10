import * as React from "react";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {View, cx} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {ButtonProps, ButtonRef} from "../util/button.types";
import {getButtonVars} from "../util/get-button-vars";
import {ButtonIcon} from "./button-icon";

import {ButtonUnstyled} from "./button-unstyled";

import coreStyles from "./button-core.module.css";

type Props = ButtonProps & ChildrenProps & ClickableState;

const ButtonCore: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, Props>(function ButtonCore(props: Props, ref) {
    const {
        children,
        skipClientNav,
        actionType = "progressive",
        disabled: disabledProp,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- make sure it is not included in restProps
        focused,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- make sure it is not included in restProps
        hovered,
        href = undefined,
        kind = "primary",
        labelStyle,
        pressed,
        size = "medium",
        style,
        testId,
        type = undefined,
        spinner,
        startIcon,
        endIcon,
        id,
        waiting: _,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        ...restProps
    } = props;

    const cssVars = getButtonVars(actionType, kind, size);

    const disabled = spinner || disabledProp;

    const kindClass =
        kind === "primary"
            ? coreStyles.kindPrimary
            : kind === "secondary"
              ? coreStyles.kindSecondary
              : coreStyles.kindTertiary;

    const buttonClassName = cx(
        coreStyles.shared,
        coreStyles.button,
        kindClass,
        disabled && coreStyles.disabled,
        !disabled && pressed && coreStyles.pressed,
        !disabled && pressed && kind === "primary" && coreStyles.pressedPrimary,
        !disabled &&
            pressed &&
            kind === "secondary" &&
            coreStyles.pressedSecondary,
        !disabled &&
            pressed &&
            kind === "tertiary" &&
            coreStyles.pressedTertiary,
        !disabled && !pressed && focused && coreStyles.focused,
    );

    const label = (
        <BodyText
            size={size === "small" ? "small" : undefined}
            weight={size === "large" ? "bold" : undefined}
            tag="span"
            style={[
                coreStyles.text,
                size === "small" && coreStyles.smallText,
                size === "large" && coreStyles.largeText,
                labelStyle,
                spinner && coreStyles.hiddenText,
            ]}
            testId={testId ? `${testId}-inner-label` : undefined}
        >
            {children}
        </BodyText>
    );

    const sizeMapping = {
        medium: "small",
        small: "xsmall",
        large: "medium",
    } as const;

    // We have to use `medium` for both md and lg buttons so we can fit the
    // icons in large buttons.
    const iconSize = size === "small" ? "small" : "medium";

    const contents = (
        <React.Fragment>
            {startIcon && (
                <View
                    // The start icon doesn't have the circle around it
                    // in the Khanmigo theme, but we wrap it with
                    // iconWrapper anyway to give it the same spacing
                    // as the end icon so the button is symmetrical.
                    style={coreStyles.iconWrapper}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={startIcon}
                        style={[
                            coreStyles.startIcon,
                            kind === "tertiary" && coreStyles.tertiaryStartIcon,
                        ]}
                        testId={testId ? `${testId}-start-icon` : undefined}
                    />
                </View>
            )}
            {label}
            {spinner && (
                <CircularSpinner
                    style={coreStyles.spinner}
                    size={sizeMapping[size]}
                    light={kind === "primary"}
                    testId={`${testId || "button"}-spinner`}
                />
            )}
            {endIcon && (
                <View
                    testId={testId ? `${testId}-end-icon-wrapper` : undefined}
                    style={[
                        coreStyles.endIcon,
                        coreStyles.iconWrapper,
                        coreStyles.endIconWrapper,
                        kind === "tertiary" &&
                            coreStyles.endIconWrapperTertiary,
                    ]}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={endIcon}
                        testId={testId ? `${testId}-end-icon` : undefined}
                    />
                </View>
            )}
        </React.Fragment>
    );

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            href={href}
            id={id}
            ref={ref}
            skipClientNav={skipClientNav}
            style={[buttonClassName, cssVars, style]}
            testId={testId}
            tabIndex={props.tabIndex}
            type={type}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {contents}
        </ButtonUnstyled>
    );
});

export default ButtonCore;
