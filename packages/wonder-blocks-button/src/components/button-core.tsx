import * as React from "react";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {ButtonProps, ButtonRef} from "../util/button.types";
import {ButtonIcon} from "./button-icon";

import {ButtonUnstyled} from "./button-unstyled";
import styles from "./button.module.css";

type Props = ButtonProps & ChildrenProps & ClickableState;

const ButtonCore: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, Props>(function ButtonCore(props: Props, ref) {
    const {
        children,
        skipClientNav,
        actionType,
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
        styles: stylesProp,
        id,
        waiting: _,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        ...restProps
    } = props;

    const disabled = spinner || disabledProp;

    // The `kind` and `actionType` axes of the variant matrix are selected in
    // CSS via the `[data-kind]` attribute (set by `ButtonUnstyled`) combined
    // with the `actionType` class below. `disabled` is selected via the
    // `[aria-disabled="true"]` attribute (also set by `ButtonUnstyled`), which
    // keeps the element focusable. Class-name strings are composed through the
    // `style` prop — `processStyleList` routes them to `className`.
    const defaultStyle = [
        styles.button,
        actionType && styles[actionType],
        size === "small" && styles.small,
        size === "large" && styles.large,
        // Enable the press / focus states for programmatic (keyboard)
        // interaction tracked by `ClickableBehavior`.
        !disabled && pressed && styles.pressed,
        !disabled && !pressed && focused && styles.focused,
    ];

    const label = (
        <BodyText
            size={size === "small" ? "small" : undefined}
            weight={size === "large" ? "bold" : undefined}
            tag="span"
            style={[
                styles.text,
                size === "small" && styles.smallText,
                size === "large" && styles.largeText,
                labelStyle,
                spinner && styles.hiddenText,
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
                    style={styles.iconWrapper}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={startIcon}
                        style={[
                            styles.startIcon,
                            kind === "tertiary" && styles.tertiaryStartIcon,
                            stylesProp?.startIcon,
                        ]}
                        testId={testId ? `${testId}-start-icon` : undefined}
                    />
                </View>
            )}
            {label}
            {spinner && (
                <CircularSpinner
                    style={styles.spinner}
                    size={sizeMapping[size]}
                    light={kind === "primary"}
                    testId={`${testId || "button"}-spinner`}
                />
            )}
            {endIcon && (
                <View
                    testId={testId ? `${testId}-end-icon-wrapper` : undefined}
                    style={[
                        styles.endIcon,
                        styles.iconWrapper,
                        styles.endIconWrapper,
                        kind === "tertiary" && styles.endIconWrapperTertiary,
                    ]}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={endIcon}
                        style={stylesProp?.endIcon}
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
            style={[defaultStyle, style]}
            testId={testId}
            tabIndex={props.tabIndex}
            type={type}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            kind={kind}
        >
            {contents}
        </ButtonUnstyled>
    );
});

export default ButtonCore;
