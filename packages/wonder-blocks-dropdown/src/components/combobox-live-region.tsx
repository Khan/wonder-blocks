import {addStyle} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {getLabel} from "../util/helpers";
import {
    ComboboxLabels,
    MaybeValueOrValues,
    OptionItemComponent,
} from "../util/types";

const StyledSpan = addStyle("span");

type Props = {
    /**
     * The index of the focused item in the listbox.
     */
    focusedIndex: number;
    /**
     * The index of the focused item in the multi-select combobox.
     */
    focusedMultiSelectIndex: number;
    /**
     * The labels associated with the live region.
     */
    labels: Pick<
        ComboboxLabels,
        | "closedState"
        | "liveRegionCurrentItem"
        | "liveRegionListboxTotal"
        | "liveRegionMultipleSelectionTotal"
    >;

    /**
     * Whether the listbox is open/expanded.
     */
    opened: boolean;
    /**
     * The list of items in the listbox.
     */
    options: Array<OptionItemComponent>;
    /**
     * The labels of the selected items (multi-select only).
     */
    multiSelectLabels: Array<string>;
    /**
     * The value of the selected item(s).
     */
    selected: MaybeValueOrValues;
    /**
     * The testId used for the live region.
     */
    testId?: string;
};

export function ComboboxLiveRegion({
    focusedIndex,
    focusedMultiSelectIndex,
    labels,
    multiSelectLabels,
    selected,
    opened,
    options,
    testId,
}: Props) {
    const lastSelectedValue = React.useRef<MaybeValueOrValues>(null);
    const [message, setMessage] = React.useState("");

    // Announce when an item is selected.
    React.useEffect(() => {
        if (selected !== lastSelectedValue.current) {
            setMessage(`${selected}, selected`);
        }

        lastSelectedValue.current = selected;
    }, [selected]);

    const focusedElementDescription = React.useMemo(() => {
        // If there are focused items in the multi-select combobox, announce the
        // focused item.
        if (focusedMultiSelectIndex >= 0) {
            const label = multiSelectLabels[focusedMultiSelectIndex];
            return (
                labels.liveRegionCurrentItem({
                    current: label,
                    focused: true,
                    index: focusedMultiSelectIndex + 1,
                    total: multiSelectLabels.length,
                }) +
                " " +
                labels.liveRegionMultipleSelectionTotal(
                    multiSelectLabels.length,
                )
            );
        }

        // If there are no focused items, don't announce anything.
        if (focusedIndex < 0) {
            return "";
        }

        const currentItemProps = options[focusedIndex].props;
        const label = getLabel(currentItemProps);
        const totalResults = options.length;

        return (
            labels.liveRegionCurrentItem({
                current: label,
                disabled: currentItemProps.disabled,
                focused: false,
                index: focusedIndex + 1,
                selected: currentItemProps.selected,
                total: totalResults,
            }) +
            " " +
            labels.liveRegionListboxTotal(totalResults)
        );
    }, [
        focusedIndex,
        focusedMultiSelectIndex,
        labels,
        options,
        multiSelectLabels,
    ]);

    return (
        <StyledSpan
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions text"
            style={styles.srOnly}
            data-testid={testId ? `${testId}-status` : undefined}
        >
            {opened ? focusedElementDescription : message}
        </StyledSpan>
    );
}

const styles = StyleSheet.create({
    srOnly: {
        border: 0,
        clip: "rect(0,0,0,0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
    },
});
