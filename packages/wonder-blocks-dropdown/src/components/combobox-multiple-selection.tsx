import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {font, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {View} from "@khanacademy/wonder-blocks-core";

type Props = {
    /**
     * Whether the combobox is disabled.
     */
    disabled?: boolean;
    /**
     * The index of the focused item in the pills group.
     */
    focusedMultiSelectIndex: number;
    /**
     * The unique identifier for the selected items.
     */
    id: string;
    /**
     * The list of labels for the selected items.
     */
    labels: Array<string>;
    /**
     * Function to remove a selected item.
     */
    onRemove: (value: string) => void;
    /**
     * Accessible label for the remove button.
     */
    removeSelectedLabel: (value: string) => string;
    /**
     * The list of selected items, where each item represents the value of the
     * selected option.
     */
    selected: Array<string>;
    /**
     * The testId prefix used for the pills.
     */
    testId?: string;
};

/**
 * Renders the selected items as pills that are horizontally stacked before
 * the input element.
 */
export const MultipleSelection = React.memo(function SelectedPills({
    disabled,
    focusedMultiSelectIndex,
    id,
    labels,
    onRemove,
    removeSelectedLabel,
    selected,
    testId,
}: Props) {
    return (
        <View role="group" style={styles.pillsWrapper} id={id}>
            {selected.map((value, index) => {
                const label = labels[index] as string;
                const focused = index === focusedMultiSelectIndex;
                const uniqueId = id + index;

                return (
                    <Pill
                        id={uniqueId}
                        key={uniqueId}
                        testId={testId ? `${testId}-pill-${index}` : undefined}
                        size="small"
                        style={[styles.pill, focused && styles.pillFocused]}
                        kind={focused ? "info" : "neutral"}
                        aria-label={removeSelectedLabel(label)}
                        tabIndex={-1}
                        onClick={() => onRemove(value)}
                    >
                        <>
                            {label}
                            {!disabled && (
                                <PhosphorIcon icon={xIcon} size="small" />
                            )}
                        </>
                    </Pill>
                );
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    pillsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    pill: {
        fontSize: font.size.small,
        justifyContent: "space-between",
        alignItems: "center",
        marginBlockStart: spacing.xxxSmall_4,
        marginInlineEnd: spacing.xxxSmall_4,
        paddingInlineEnd: spacing.xxxSmall_4,
    },
    pillFocused: {
        outline: `1px solid ${semanticColor.focus.outer}`,
    },
});
