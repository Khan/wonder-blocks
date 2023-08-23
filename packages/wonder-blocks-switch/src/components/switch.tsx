import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    AriaProps,
    UniqueIDProvider,
    View,
    addStyle,
} from "@khanacademy/wonder-blocks-core";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import Icon from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = Pick<
    AriaProps,
    "aria-labelledby" | "aria-label" | "aria-describedby"
> & {
    /**
     * Whether this compoonent is checked.
     */
    checked: boolean;
    /**
     * Whether the switch is disabled. Defaults to `false`.
     */
    disabled?: boolean;
    /**
     * Optional icon to display on the slider.
     */
    icon?: React.ReactElement<typeof Icon>;
    /**
     * The unique identifier for the switch.
     */
    id?: string;
    /**
     * Function to call when the switch is clicked.
     * @param newCheckedValue
     * @returns {unknown}
     */
    onChange?: (newCheckedState: boolean) => unknown;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

const StyledSpan = addStyle("span");
const StyledInput = addStyle("input");

const Switch = React.forwardRef(function Switch(
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        checked,
        disabled = false,
        icon,
        id,
        onChange,
        testId,
    } = props;

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };
    const handleChange = () => {};

    const stateStyles = _generateStyles(
        checked,
        disabled,
        onChange !== undefined,
    );

    let styledIcon: React.ReactElement<typeof Icon> | undefined;
    if (icon) {
        styledIcon = React.cloneElement(icon, {
            size: "small",
            style: [sharedStyles.icon, stateStyles.icon],
            "aria-hidden": true,
            ...icon.props,
        } as Partial<React.ComponentProps<typeof Icon>>);
    }

    return (
        <UniqueIDProvider mockOnFirstRender={true} scope="switch">
            {(ids) => {
                const uniqueId = id || ids.get("switch");

                return (
                    <View
                        onClick={handleClick}
                        style={[
                            sharedStyles.switch,
                            stateStyles.switch,
                            disabled && sharedStyles.disabled,
                        ]}
                        testId={testId}
                    >
                        <StyledInput
                            aria-describedby={ariaDescribedBy}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy}
                            checked={checked}
                            disabled={disabled}
                            id={uniqueId}
                            // Need to specify because this is a controlled React component, but we
                            // handle the clicks on the outer View
                            onChange={handleChange}
                            ref={ref}
                            role="switch"
                            // Input is visually hidden because we use a view and span to render
                            // the actual switch. The input is used for accessibility.
                            style={sharedStyles.hidden}
                            type="checkbox"
                        />
                        {icon && styledIcon}
                        <StyledSpan
                            style={[sharedStyles.slider, stateStyles.slider]}
                        />
                    </View>
                );
            }}
        </UniqueIDProvider>
    );
});

const sharedStyles = StyleSheet.create({
    hidden: {
        opacity: 0,
        height: 0,
        width: 0,
    },
    switch: {
        display: "inline-flex",
        height: Spacing.large_24,
        width: `calc(${Spacing.xLarge_32}px + ${Spacing.xSmall_8}px)`,
        borderRadius: Spacing.small_12,
        flexShrink: 0,
        cursor: "pointer",
        ":hover": {
            outlineOffset: 1,
        },
        transition: "background-color 0.15s ease-in-out",
    },
    disabled: {
        cursor: "auto",
        ":hover": {
            outline: "none",
        },
    },
    slider: {
        position: "absolute",
        top: Spacing.xxxxSmall_2,
        left: Spacing.xxxxSmall_2,
        height: `calc(${Spacing.medium_16}px + ${Spacing.xxxSmall_4}px)`,
        width: `calc(${Spacing.medium_16}px + ${Spacing.xxxSmall_4}px)`,
        borderRadius: "50%",
        backgroundColor: Color.white,
        transition: "transform 0.15s ease-in-out",
    },
    icon: {
        position: "absolute",
        top: Spacing.xxxSmall_4,
        left: Spacing.xxxSmall_4,
        zIndex: 1,
        transition: "0.15s ease-in-out",
        transitionProperty: "transform, color",
    },
});

const styles: Record<string, any> = {};
const _generateStyles = (
    checked: boolean,
    disabled: boolean,
    clickable: boolean,
) => {
    const checkedStyle = `${checked}-${disabled}-${clickable}`;
    // The styles are cached to avoid creating a new object on every render.
    if (styles[checkedStyle]) {
        return styles[checkedStyle];
    }

    let newStyles: Record<string, any> = {};

    const disabledBlue = mix(Color.blue, Color.offBlack50);
    const activeBlue = mix(Color.offBlack32, Color.blue);

    if (checked) {
        newStyles = {
            switch: {
                backgroundColor: disabled ? disabledBlue : Color.blue,
                ":active": {
                    backgroundColor: !disabled && clickable && activeBlue,
                },
                ":focus-within": {
                    outline: `solid ${Spacing.xxxxSmall_2}px ${Color.blue}`,
                    outlineOffset: 1,
                },
                ":hover": {
                    outline: clickable
                        ? `solid ${Spacing.xxxxSmall_2}px ${Color.blue}`
                        : "none",
                },
            },
            slider: {
                transform: `translateX(${Spacing.medium_16}px)`,
            },
            icon: {
                color: disabled ? disabledBlue : Color.blue,
                transform: `translateX(${Spacing.medium_16}px)`,
            },
        };
    } else {
        newStyles = {
            switch: {
                backgroundColor: disabled ? Color.offBlack32 : Color.offBlack50,
                ":active": {
                    backgroundColor: !disabled && clickable && Color.offBlack64,
                },
                ":focus-within": {
                    outline: `solid ${Spacing.xxxxSmall_2}px ${Color.blue}`,
                    outlineOffset: 1,
                },
                ":hover": {
                    outline: clickable
                        ? `solid ${Spacing.xxxxSmall_2}px ${Color.blue}`
                        : "none",
                },
            },
            icon: {
                color: disabled ? Color.offBlack32 : Color.offBlack50,
            },
        };
    }

    styles[checkedStyle] = StyleSheet.create(newStyles);
    return styles[checkedStyle];
};

Switch.displayName = "Switch";

export default Switch;
