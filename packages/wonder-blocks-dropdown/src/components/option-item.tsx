import * as React from "react";
import {StyleSheet} from "aphrodite";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import {AriaProps, StyleType, View} from "@khanacademy/wonder-blocks-core";

import {Strut} from "@khanacademy/wonder-blocks-layout";
import {DROPDOWN_ITEM_HEIGHT} from "../util/constants";
import Check from "./check";
import Checkbox from "./checkbox";
import {CellProps, OptionLabel} from "../util/types";

type OptionProps = AriaProps & {
    /**
     * Display text of the option item.
     */
    label: OptionLabel;

    /**
     * Optional text to use as the label. If not provided, label will be used.
     * This is useful for cases where the label is a complex component and you
     * want to display a simpler string in the menu.
     */
    labelAsText?: string;

    /**
     * Value of the item, used as a key of sorts for the parent to manage its
     * items, because label/display text may be identical for some selects. This
     * is the value passed back when the item is selected.
     */
    value: string;
    /**
     * Whether this option item is disabled.
     */
    disabled: boolean;
    /**
     * Optional user-supplied callback when this item is called.
     */
    onClick?: () => unknown;
    /**
     * Callback for when this item is pressed to change its selection state.
     * Passes value of the item. Auto-populated by menu or select.
     * @ignore
     */
    onToggle: (value: string) => unknown;
    /**
     * Whether this item is selected. Auto-populated by menu or select.
     * @ignore
     */
    selected: boolean;
    /**
     * Aria role to use, defaults to "option".
     */
    role: "menuitem" | "option";
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Whether the item should show a check or checkbox to indicate selection
     * state. Auto-populated by menu or select.
     * @ignore
     */
    variant?: "check" | "checkbox";
    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType;

    /**
     * Inherited from WB Cell.
     */

    /**
     * Adds a horizontal rule at the bottom of the cell that can be used to
     * separate items within ActionMenu instances. Defaults to `none`.
     */
    horizontalRule: CellProps["horizontalRule"];

    /**
     * Optional left accessory to display in the `OptionItem` element.
     */
    leftAccessory?: CellProps["leftAccessory"];

    /**
     * Optional right accessory to display in the `OptionItem` element.
     */
    rightAccessory?: CellProps["rightAccessory"];

    /**
     * Optional subtitle to display before the label.
     */
    subtitle1?: CellProps["subtitle1"];

    /**
     * Optional subtitle to display after the label.
     */
    subtitle2?: CellProps["subtitle2"];
};

type DefaultProps = {
    disabled: OptionProps["disabled"];
    horizontalRule: OptionProps["horizontalRule"];
    onToggle: OptionProps["onToggle"];
    role: OptionProps["role"];
    selected: OptionProps["selected"];
};

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in SingleSelect or
 * MultiSelect.
 */
export default class OptionItem extends React.Component<OptionProps> {
    static isClassOf(instance: React.ReactElement<any>): boolean {
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__IS_OPTION_ITEM__' does not exist on type 'string | JSXElementConstructor<any>'.
        return instance && instance.type && instance.type.__IS_OPTION_ITEM__;
    }
    static defaultProps: DefaultProps = {
        disabled: false,
        horizontalRule: "none",
        onToggle: () => void 0,
        role: "option",
        selected: false,
    };
    static __IS_OPTION_ITEM__ = true;

    getCheckComponent(): typeof Check | typeof Checkbox {
        if (this.props.variant === "check") {
            return Check;
        } else {
            return Checkbox;
        }
    }

    handleClick: () => void = () => {
        const {onClick, onToggle, value} = this.props;
        onToggle(value);
        if (onClick) {
            onClick();
        }
    };

    render(): React.ReactNode {
        const {
            disabled,
            label,
            role,
            selected,
            testId,
            style,
            leftAccessory,
            horizontalRule,
            rightAccessory,
            subtitle1,
            subtitle2,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            value,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            onClick,
            onToggle,
            variant,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...sharedProps
        } = this.props;

        const CheckComponent = this.getCheckComponent();

        const defaultStyle = [
            styles.item,
            // pass optional styles from react-window (if applies)
            style,
        ];

        return (
            <DetailCell
                disabled={disabled}
                horizontalRule={horizontalRule}
                rootStyle={defaultStyle}
                style={styles.itemContainer}
                aria-selected={selected ? "true" : "false"}
                role={role}
                testId={testId}
                leftAccessory={
                    <>
                        {leftAccessory ? (
                            <View style={{flexDirection: "row"}}>
                                <CheckComponent
                                    disabled={disabled}
                                    selected={selected}
                                />
                                <Strut size={Spacing.xSmall_8} />
                                {leftAccessory}
                            </View>
                        ) : (
                            <CheckComponent
                                disabled={disabled}
                                selected={selected}
                            />
                        )}
                    </>
                }
                rightAccessory={rightAccessory}
                subtitle1={
                    <LabelSmall className="subtitle">{subtitle1}</LabelSmall>
                }
                title={<LabelMedium style={styles.label}>{label}</LabelMedium>}
                subtitle2={
                    <LabelSmall className="subtitle">{subtitle2}</LabelSmall>
                }
                onClick={this.handleClick}
                {...sharedProps}
            />
        );
    }
}

const {blue, white, offBlack, offBlack32} = Color;

const activeBlue = mix(offBlack32, blue);

const styles = StyleSheet.create({
    item: {
        // Reset the default styles for the cell element so it can grow
        // vertically.
        minHeight: "auto",
        /**
         * States
         */
        ":focus": {
            // Override the default focus state for the cell element, so that it
            // can be added programmatically to the button element.
            borderRadius: Spacing.xxxSmall_4,
            outline: `${Spacing.xxxxSmall_2}px solid ${Color.blue}`,
            outlineOffset: -Spacing.xxxxSmall_2,
        },

        // Overrides the default cell state for the button element.
        [":hover[aria-disabled=false]" as any]: {
            color: white,
            background: blue,
        },

        // Allow hover styles on non-touch devices only. This prevents an
        // issue with hover being sticky on touch devices (e.g. mobile).
        ["@media not (hover: hover)" as any]: {
            // Revert the hover styles to the default/resting state (mobile
            // only).
            [":hover[aria-disabled=false]" as any]: {
                color: white,
                background: offBlack,
            },
        },

        // active and pressed states
        [":active[aria-disabled=false]" as any]: {
            color: mix(fade(blue, 0.32), white),
            background: activeBlue,
        },

        // checkbox states (see checkbox.tsx)
        [":hover[aria-disabled=false] .checkbox" as any]: {
            background: white,
        },
        [":hover[aria-disabled=false] .check" as any]: {
            color: blue,
        },
        [":active[aria-disabled=false] .check" as any]: {
            color: activeBlue,
        },

        [":is([aria-selected=true]) .checkbox" as any]: {
            background: blue,
        },

        [":is([aria-selected=true]) .check" as any]: {
            color: white,
        },

        /**
         * Cell states
         */
        [":is([aria-disabled=false]) .subtitle" as any]: {
            color: Color.offBlack64,
        },

        [":hover[aria-disabled=false] .subtitle" as any]: {
            color: Color.offWhite,
        },
        [":active[aria-disabled=false] .subtitle" as any]: {
            color: mix(fade(blue, 0.16), white),
        },
    },
    itemContainer: {
        minHeight: DROPDOWN_ITEM_HEIGHT,
        padding: Spacing.xSmall_8,
        paddingRight: Spacing.medium_16,
        whiteSpace: "nowrap",
    },

    label: {
        whiteSpace: "nowrap",
        userSelect: "none",
        // added to truncate strings that are longer than expected
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    hide: {
        visibility: "hidden",
    },
});
