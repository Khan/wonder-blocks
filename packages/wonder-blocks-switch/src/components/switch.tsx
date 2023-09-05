import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    AriaProps,
    View,
    addStyle,
    useUniqueIdWithMock,
} from "@khanacademy/wonder-blocks-core";
import Icon from "@khanacademy/wonder-blocks-icon";
import {
    ThemedStylesFn,
    useScopedTheme,
    useStyles,
} from "@khanacademy/wonder-blocks-theming";
import ThemedSwitch, {
    SwitchThemeContext,
    SwitchThemeContract,
} from "../themes/themed-switch";

type Props = Pick<
    AriaProps,
    "aria-labelledby" | "aria-label" | "aria-describedby"
> & {
    /**
     * Whether this component is checked.
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

const SwitchCore = React.forwardRef(function SwitchCore(
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

    const ids = useUniqueIdWithMock("labeled-field");
    const uniqueId = id ?? ids.get("labeled-field-id");

    const {theme, themeName} = useScopedTheme(SwitchThemeContext);
    const sharedStyles = useStyles(themedSharedStyles, theme);

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };
    const handleChange = () => {};

    const stateStyles = _generateStyles(
        checked,
        onChange !== undefined,
        disabled,
        theme,
        themeName,
    );

    let styledIcon: React.ReactElement<typeof Icon> | undefined;
    if (icon) {
        styledIcon = React.cloneElement(icon, {
            size: "small",
            style: [sharedStyles.icon, stateStyles.icon],
            "aria-hidden": true,
        } as Partial<React.ComponentProps<typeof Icon>>);
    }

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
            <StyledSpan style={[sharedStyles.slider, stateStyles.slider]} />
        </View>
    );
});

const themedSharedStyles: ThemedStylesFn<SwitchThemeContract> = (theme) => ({
    hidden: {
        opacity: 0,
        height: theme.size.height.none,
        width: theme.size.width.none,
    },
    switch: {
        display: "inline-flex",
        height: theme.size.height.large,
        width: theme.size.width.large,
        borderRadius: theme.border.radius.small,
        flexShrink: 0,
        ":hover": {
            outlineOffset: theme.size.offset.default,
        },
        ":focus-within": {
            outline: `solid ${theme.size.width.small}px ${theme.color.outline.default}`,
            outlineOffset: theme.size.offset.default,
        },
    },
    disabled: {
        cursor: "auto",
        ":hover": {
            outline: "none",
        },
    },
    slider: {
        position: "absolute",
        top: theme.spacing.slider.position,
        left: theme.spacing.slider.position,
        height: theme.size.height.medium,
        width: theme.size.width.medium,
        borderRadius: theme.border.radius.full,
        backgroundColor: theme.color.bg.slider.on,
        transition: theme.spacing.transform.transition,
    },
    icon: {
        position: "absolute",
        top: theme.spacing.icon.position,
        left: theme.spacing.icon.position,
        zIndex: 1,
        transition: theme.spacing.transform.transition,
    },
});

const styles: Record<string, any> = {};
const _generateStyles = (
    checked: boolean,
    clickable: boolean,
    disabled: boolean,
    theme: SwitchThemeContract,
    themeName: string,
) => {
    const checkedStyle = `${checked}-${clickable}-${disabled}-${themeName}`;
    // The styles are cached to avoid creating a new object on every render.
    if (styles[checkedStyle]) {
        return styles[checkedStyle];
    }

    let newStyles: Record<string, any> = {};
    const sharedSwitchStyles = {
        cursor: clickable ? "pointer" : "auto",
        ":hover": {
            outline: clickable
                ? `solid ${theme.size.width.small}px ${theme.color.outline.default}`
                : "none",
        },
    };

    if (checked) {
        newStyles = {
            switch: {
                backgroundColor: disabled
                    ? theme.color.bg.switch.disabledOn
                    : theme.color.bg.switch.on,
                ":active": {
                    backgroundColor:
                        !disabled &&
                        clickable &&
                        theme.color.bg.switch.activeOn,
                },
                ...sharedSwitchStyles,
            },
            slider: {
                transform: theme.spacing.transform.default,
            },
            icon: {
                color: disabled
                    ? theme.color.bg.icon.disabledOn
                    : theme.color.bg.icon.on,
                transform: theme.spacing.transform.default,
            },
        };
    } else {
        newStyles = {
            switch: {
                backgroundColor: disabled
                    ? theme.color.bg.switch.disabledOff
                    : theme.color.bg.switch.off,
                ":active": {
                    backgroundColor:
                        !disabled &&
                        clickable &&
                        theme.color.bg.switch.activeOff,
                },
                ...sharedSwitchStyles,
            },
            slider: {
                backgroundColor: theme.color.bg.slider.off,
            },
            icon: {
                color: disabled
                    ? theme.color.bg.icon.disabledOff
                    : theme.color.bg.icon.off,
            },
        };
    }

    styles[checkedStyle] = StyleSheet.create(newStyles);
    return styles[checkedStyle];
};

const Switch = React.forwardRef(function Switch(
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    return (
        <ThemedSwitch>
            <SwitchCore {...props} ref={ref} />
        </ThemedSwitch>
    );
});

Switch.displayName = "Switch";

export default Switch;
