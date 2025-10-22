import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {font, sizing} from "@khanacademy/wonder-blocks-tokens";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import Button from "@khanacademy/wonder-blocks-button";

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
                    <Button
                        id={uniqueId}
                        key={uniqueId}
                        testId={testId ? `${testId}-pill-${index}` : undefined}
                        size="small"
                        style={[styles.pill, focused && styles.pillFocused]}
                        kind="secondary"
                        actionType="neutral"
                        aria-label={removeSelectedLabel(label)}
                        tabIndex={-1}
                        onClick={() => onRemove(value)}
                        endIcon={
                            disabled ? undefined : (
                                <PhosphorIcon icon={xIcon} size="small" />
                            )
                        }
                    >
                        {label}
                    </Button>
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
        fontSize: font.body.size.small,
        justifyContent: "space-between",
        alignItems: "center",
        marginBlockStart: sizing.size_040,
        marginInlineEnd: sizing.size_040,
        paddingInlineEnd: sizing.size_040,
    },
    pillFocused: focusStyles.focus[":focus-visible"],
});
