import {addStyle} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {defaultComboboxLabels} from "../util/constants";
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
    labels?: Pick<
        ComboboxLabels,
        | "closedState"
        | "liveRegionCurrentItem"
        | "liveRegionListboxTotal"
        | "liveRegionMultipleSelectionTotal"
    >;

    /**
     * Whether the listbox is open/expanded.
     */
    opened?: boolean;
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
    labels = {
        closedState: defaultComboboxLabels.closedState,
        liveRegionCurrentItem: defaultComboboxLabels.liveRegionCurrentItem,
        liveRegionListboxTotal: defaultComboboxLabels.liveRegionListboxTotal,
        liveRegionMultipleSelectionTotal:
            defaultComboboxLabels.liveRegionMultipleSelectionTotal,
    },
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
        if (selected !== lastSelectedValue?.current) {
            let newMessage = "";
            const lastSelectedLength = lastSelectedValue?.current?.length ?? 0;
            const selectedLength = selected?.length ?? 0;
            const selectedState =
                selectedLength > lastSelectedLength
                    ? "selected"
                    : "not selected";
            if (Array.isArray(selected) && selected.length > 0) {
                newMessage = `${multiSelectLabels.join(", ")} ${selectedState}`;
            }
            setMessage(newMessage);
        }

        lastSelectedValue.current = selected;

        if (!opened) {
            setMessage(labels.closedState);
        }
    }, [labels.closedState, multiSelectLabels, opened, selected]);

    const focusedElementDescription = React.useMemo(() => {
        // If there are focused items in the multi-select combobox, announce the
        // focused item.
        if (focusedMultiSelectIndex >= 0) {
            // Announces the pill group.
            const label = multiSelectLabels[focusedMultiSelectIndex];
            return (
                labels.liveRegionCurrentItem({
                    current: label,
                    focused: true,
                    index: focusedMultiSelectIndex,
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

        // Announces the focused item in the listbox. This happens when the user
        // navigates the listbox using the arrow keys.
        const currentItemProps = options[focusedIndex].props;
        const label = getLabel(currentItemProps);
        const totalResults = options.length;

        return (
            labels.liveRegionCurrentItem({
                current: label,
                disabled: currentItemProps.disabled,
                focused: false,
                index: focusedIndex,
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
            aria-live="assertive"
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
