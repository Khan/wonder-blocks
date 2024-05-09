import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {color, font, spacing} from "@khanacademy/wonder-blocks-tokens";
import xIcon from "@phosphor-icons/core/regular/x.svg";

/**
 * Renders the selected items as pills that are horizontally stacked before
 * the input element.
 */
export const MultipleSelection = React.memo(function SelectedPills({
    disabled,
    focusedMultiSelectIndex,
    id,
    labels,
    selected,
    testId,
    setSelected,
}: {
    disabled?: boolean;
    focusedMultiSelectIndex: number;
    id: string;
    labels: Array<string>;
    selected: Array<string>;
    setSelected: (value: Array<string>) => void;
    testId?: string;
}) {
    /**
     * Handles the click event on a pill to remove it from the list of selected
     * items.
     */
    const handlePillClick = React.useCallback(
        (value: string) => {
            // Remove the selected item from the list of selected items.
            const newValues = selected.filter(
                (selectedValue) => selectedValue !== value,
            );

            setSelected(newValues);
        },
        [selected, setSelected],
    );

    const selectedPills = selected.map((value, index) => {
        const label = labels[index] as string;
        const focused = index === focusedMultiSelectIndex;
        const uniqueId = id + index;

        return (
            <Pill
                id={uniqueId}
                key={uniqueId}
                testId={testId}
                size="small"
                style={[styles.pill, focused && styles.pillFocused]}
                kind={focused ? "info" : "neutral"}
                // TODO(WB-1676.2): Use the `labels` prop.
                aria-label={`Remove ${label}`}
                tabIndex={-1}
                onClick={() => handlePillClick(value)}
            >
                <>
                    {label}
                    {!disabled && <PhosphorIcon icon={xIcon} size="small" />}
                </>
            </Pill>
        );
    });

    return <>{selectedPills}</>;
});

const styles = StyleSheet.create({
    pill: {
        fontSize: font.size.small,
        justifyContent: "space-between",
        alignItems: "center",
        marginBlockStart: spacing.xxxSmall_4,
        marginInlineEnd: spacing.xxxSmall_4,
        paddingInlineEnd: spacing.xxxSmall_4,
    },
    pillFocused: {
        outline: `1px solid ${color.blue}`,
    },
});
