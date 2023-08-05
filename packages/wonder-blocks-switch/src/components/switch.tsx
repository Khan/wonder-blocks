import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

type Props = {
    /**
     * A label for the switch.
     * If a visible label is not provided, aria-label should be used to
     * describe the purpose of the switch.
     */
    ariaLabel?: string;
    /**
     * Whether this compoonent is checked.
     */
    checked: boolean;
    /**
     * Whether the switch is disabled. Defaults to `false`.
     */
    disabled?: boolean;
    /**
     * The unique identifier for the switch.
     */
    id?: string;
    /**
     * Optional label text on the right of the switch.
     */
    label?: string;
    /**
     * Function to call when the switch is clicked.
     * @param newCheckedState
     * @returns {unknown}
     */
    onChange: (newCheckedState: boolean) => unknown;
    /**
     * Optional test ID used for e2e testing.
     */
    testId?: string;
};

const StyledSpan = addStyle("span");

const Switch = React.forwardRef(function Switch(
    props: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {ariaLabel, checked, disabled, id, label, onChange, testId} = props;

    const handleClick = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <Clickable
            id={id}
            onClick={handleClick}
            style={[styles.hiddenOutline, disabled && styles.disabled]}
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            testId={testId}
            ref={ref}
        >
            {({hovered, focused, pressed}) => {
                const showOutline = !disabled && (hovered || focused);
                const showDisabledOutline = disabled && focused;

                return (
                    <View style={styles.centered}>
                        <View
                            style={[
                                styles.switch,
                                checked && styles.checkedSwitch,
                                showOutline && styles.outline,
                                showDisabledOutline && styles.disabledOutline,
                                pressed && styles.pressed,
                                disabled &&
                                    (checked
                                        ? styles.disabledOnSwitch
                                        : styles.disabledOffSwitch),
                            ]}
                        >
                            <StyledSpan
                                style={[
                                    styles.slider,
                                    checked && styles.checkedSlider,
                                ]}
                            />
                        </View>
                        {label && (
                            <LabelMedium
                                style={[
                                    styles.label,
                                    disabled && styles.disabledLabel,
                                ]}
                            >
                                {label}
                            </LabelMedium>
                        )}
                    </View>
                );
            }}
        </Clickable>
    );
});

const styles = StyleSheet.create({
    switch: {
        display: "inline-block",
        verticalAlign: "middle",
        height: "20px",
        width: "35px",
        backgroundColor: Color.offBlack50,
        borderRadius: "10px",
        alignSelf: "center",
    },
    checkedSwitch: {
        backgroundColor: Color.green,
    },
    disabledOffSwitch: {
        backgroundColor: Color.offBlack32,
    },
    disabledOnSwitch: {
        backgroundColor: `${mix(Color.green, Color.offBlack50)}`,
    },
    slider: {
        position: "absolute",
        top: "4px",
        left: "4px",
        borderRadius: "50%",
        backgroundColor: Color.white,
        height: "12px",
        width: "12px",
    },
    checkedSlider: {
        transform: "translateX(15px)",
    },
    hidden: {
        width: 0,
        height: 0,
        opacity: 0,
    },
    outline: {
        boxShadow: `0 0 0 1px ${Color.white}, 0 0 0 3px ${Color.blue}`,
    },
    hiddenOutline: {
        ":focus": {
            outline: "none",
        },
    },
    disabledOutline: {
        boxShadow: `0 0 0 1px ${Color.white}, 0 0 0 3px ${Color.offBlack32}`,
    },
    pressed: {
        backgroundColor: `${Color.offBlack64}`,
    },
    disabled: {
        cursor: "auto",
    },
    label: {
        display: "inline-flex",
        verticalAlign: "middle",
        paddingLeft: Spacing.xSmall_8,
        color: Color.offBlack64,
    },
    disabledLabel: {
        color: Color.offBlack50,
    },
    centered: {
        display: "inline-block",
    },
});

Switch.displayName = "Switch";

export default Switch;
