import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";

import {AriaProps, View, addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useId} from "react";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import baseStyles from "./base-styles";
import {theme} from "../theme/index";

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
    icon?: React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>;
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
    /**
     * Adds CSS classes to the component.
     */
    className?: string;
};

const StyledSpan = addStyle("span");
const StyledInput = addStyle("input");

const focusStylesObject = focusStyles.focus[":focus-visible"];

const sharedStyles = StyleSheet.create({
    hidden: {
        opacity: 0,
        height: 0,
        width: 0,
    },
    switch: {
        display: "inline-flex",
        height: theme.root.sizing.height,
        width: theme.root.sizing.width,
        borderRadius: theme.root.border.radius.default,
        flexShrink: 0,
    },
    switchFocus: {
        ":focus-within": focusStylesObject,
    } as any,
    disabled: {
        cursor: "not-allowed",
        ":hover": {
            outline: "none",
        },
        ":active": {
            outline: "none",
        },
    },
    disabledFocus: {
        ":focus-within": focusStylesObject,
    } as any,
    slider: {
        position: "absolute",
        top: theme.slider.position.top,
        left: theme.slider.position.left,
        height: theme.slider.sizing.height,
        width: theme.slider.sizing.width,
        borderRadius: theme.root.border.radius.default,
        backgroundColor: baseStyles.color.bg.slider.on,
        transition: theme.slider.transform.transition,
    },
    icon: {
        position: "absolute",
        top: theme.icon.position.top,
        left: theme.icon.position.left,
        zIndex: 1,
        transition: theme.icon.transform.transition,
    },
});

const Switch = React.forwardRef(function Switch(
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        checked,
        className,
        disabled = false,
        icon,
        id,
        onChange,
        testId,
    } = props;

    const generatedUniqueId = useId();
    const uniqueId = id ?? generatedUniqueId;

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
    );

    const combinedStyles = [
        sharedStyles.switch,
        sharedStyles.switchFocus,
        stateStyles.switch,
        disabled && sharedStyles.disabled,
        disabled && sharedStyles.disabledFocus,
    ];

    let styledIcon:
        | React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        | undefined;
    if (icon) {
        styledIcon = React.cloneElement(icon, {
            size: "small",
            style: [sharedStyles.icon, stateStyles.icon],
            "aria-hidden": true,
        } as Partial<React.ComponentProps<typeof PhosphorIcon>>);
    }

    return (
        <View
            onClick={handleClick}
            style={combinedStyles}
            className={className}
            testId={testId}
        >
            <StyledInput
                aria-describedby={ariaDescribedBy}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                checked={checked}
                aria-disabled={disabled}
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

const styles: Record<string, any> = {};
const _generateStyles = (
    checked: boolean,
    clickable: boolean,
    disabled: boolean,
) => {
    const checkedStyle = `${checked}-${clickable}-${disabled}`;
    // The styles are cached to avoid creating a new object on every render.
    if (styles[checkedStyle]) {
        return styles[checkedStyle];
    }

    let newStyles: Record<string, CSSProperties> = {};
    const sharedSwitchStyles = {
        cursor: clickable ? "pointer" : "auto",
        ":hover": {
            ...focusStylesObject,
            outline: clickable ? focusStylesObject.outline : "none",
        },
    };

    if (checked) {
        newStyles = {
            switch: {
                backgroundColor: disabled
                    ? baseStyles.color.bg.switch.disabledOn
                    : baseStyles.color.bg.switch.on,
                ":active": {
                    backgroundColor:
                        !disabled && clickable
                            ? baseStyles.color.bg.switch.activeOn
                            : undefined,
                    ...focusStylesObject,
                    outline: clickable ? focusStylesObject.outline : "none",
                },
                ...sharedSwitchStyles,
            },
            slider: {
                transform: theme.slider.transform.default,
            },
            icon: {
                color: disabled
                    ? baseStyles.color.bg.icon.disabledOn
                    : baseStyles.color.bg.icon.on,
                transform: theme.icon.transform.default,
            },
        };
    } else {
        newStyles = {
            switch: {
                backgroundColor: disabled
                    ? baseStyles.color.bg.switch.disabledOff
                    : baseStyles.color.bg.switch.off,
                ":active": {
                    backgroundColor:
                        !disabled && clickable
                            ? baseStyles.color.bg.switch.activeOff
                            : undefined,
                    ...focusStylesObject,
                    outline: clickable ? focusStylesObject.outline : "none",
                },
                ...sharedSwitchStyles,
            },
            slider: {
                backgroundColor: baseStyles.color.bg.slider.off,
            },
            icon: {
                color: disabled
                    ? baseStyles.color.bg.icon.disabledOff
                    : baseStyles.color.bg.icon.off,
            },
        };
    }

    styles[checkedStyle] = StyleSheet.create(newStyles);
    return styles[checkedStyle];
};

export default Switch;
