import {addStyle} from "@khanacademy/wonder-blocks-core";
import {useWonderBlocksI18n} from "@khanacademy/wonder-blocks-config";
import type {WonderBlocksStrings} from "@khanacademy/wonder-blocks-config";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {getLabel} from "../util/helpers";
import {
    ComboboxLabels,
    MaybeValueOrValues,
    OptionItemComponent,
} from "../util/types";

const StyledSpan = addStyle("span");

/**
 * Returns the announcement for the current item, using the
 * `liveRegionCurrentItem` label if it is provided, otherwise the strings from
 * `WonderBlocksConfigProvider`.
 */
const getCurrentItemDetails = (
    labels: Props["labels"],
    strings: WonderBlocksStrings,
    item: Parameters<ComboboxLabels["liveRegionCurrentItem"]>[0],
): string => {
    if (labels?.liveRegionCurrentItem) {
        return labels.liveRegionCurrentItem(item);
    }

    const {current, index, total, disabled, focused, selected} = item;
    // The states are separate strings so they can be translated without
    // needing a message for each combination of them.
    const states = [
        focused && strings.srFocused,
        disabled && strings.srDisabled,
        selected && strings.srSelected,
    ].filter(Boolean);

    return strings.srCurrentItemDetails({
        current: [current, ...states].join(" "),
        // `index` is 0-based, but the announcement is 1-based. This is done
        // here since translated messages can't add 1 to it.
        index: index + 1,
        total,
    });
};

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
    labels?: Partial<
        Pick<
            ComboboxLabels,
            | "closedState"
            | "liveRegionCurrentItem"
            | "liveRegionListboxTotal"
            | "liveRegionMultipleSelectionTotal"
            | "noItems"
            | "selected"
            | "selectionCleared"
            | "unselected"
        >
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
     * The value of the selected item(s).
     */
    selected: MaybeValueOrValues;
    /**
     * The label(s) of the selected item(s).
     */
    selectedLabels: Array<string>;
    /**
     * Whether the use can select more than one option item. Defaults to
     * `single`.
     */
    selectionType?: "single" | "multiple";
    /**
     * The testId used for the live region.
     */
    testId?: string;
};

// TODO (WB-1757.2): Refactor this component to use hooks + Context.
/**
 * A component that announces focus changes to Screen Readers.
 *
 * This is useful as there are lots of issues with `role="combobox"` + Safari
 * when the browser is not capable of announcing correctly the status of the
 * currently focused option item.
 *
 * @see https://bugs.webkit.org/show_bug.cgi?id=167671
 */
export function ComboboxLiveRegion({
    focusedIndex,
    focusedMultiSelectIndex,
    labels,
    selectedLabels,
    opened,
    options,
    selected,
    selectionType = "single",
    testId,
}: Props) {
    const {strings} = useWonderBlocksI18n();
    // NOTE: Each label below uses the labels prop if it is provided (and not
    // empty), otherwise the strings from `WonderBlocksConfigProvider`. The
    // `labels` prop keeps its positional function args (e.g.
    // `selected(labels)`), so the strings are adapted to them.
    const lastSelectedValue = React.useRef<MaybeValueOrValues>(null);
    const [message, setMessage] = React.useState("");

    // Announce when an item is selected.
    React.useEffect(() => {
        // Only announce when the selected value changes (and exists).
        if (selected && selected !== lastSelectedValue?.current) {
            let newMessage = "";
            const lastSelectedLength = lastSelectedValue?.current?.length ?? 0;
            const selectedLength = selected?.length ?? 0;

            // Multi-select combobox.
            if (Array.isArray(selected) && selected.length > 0) {
                const currentLabels = selectedLabels.join(", ");
                let selectedState;
                if (selectedLength > lastSelectedLength) {
                    selectedState = labels?.selected
                        ? labels.selected(currentLabels)
                        : strings.srItemsSelected({labels: currentLabels});
                } else {
                    selectedState = labels?.unselected
                        ? labels.unselected(currentLabels)
                        : strings.srItemsNotSelected({labels: currentLabels});
                }

                newMessage = selectedState;
            } else {
                // Announces the selected item for single select combobox.
                newMessage = labels?.selected
                    ? labels.selected(selectedLabels[0])
                    : strings.srItemsSelected({labels: selectedLabels[0]});
            }
            setMessage(newMessage);
        }

        // Announce when the single-select value is cleared.
        // NOTE: It only applies after the user has selected an option.
        if (
            selectionType === "single" &&
            !selected &&
            lastSelectedValue.current
        ) {
            setMessage(labels?.selectionCleared || strings.srSelectionCleared);
        }

        lastSelectedValue.current = selected;

        if (selectionType === "multiple" && !opened) {
            setMessage(labels?.closedState || strings.srComboboxClosed);
        }
    }, [labels, selectedLabels, opened, selected, selectionType, strings]);

    const focusedElementDescription = React.useMemo(() => {
        // If there are focused items in the multi-select combobox, announce the
        // focused item.
        if (focusedMultiSelectIndex >= 0) {
            // Announces the pill group.
            const label = selectedLabels[focusedMultiSelectIndex];
            const total = selectedLabels.length;
            return (
                getCurrentItemDetails(labels, strings, {
                    current: label,
                    focused: true,
                    index: focusedMultiSelectIndex,
                    total,
                }) +
                " " +
                (labels?.liveRegionMultipleSelectionTotal
                    ? labels.liveRegionMultipleSelectionTotal(total)
                    : strings.srNumSelectedOptions({num: total}))
            );
        }

        if (options.length === 0) {
            return labels?.noItems || strings.noResults;
        }

        // If there are no focused items, don't announce anything.
        if (focusedIndex < 0 || !options[focusedIndex]) {
            return "";
        }

        // Announces the focused item in the listbox. This happens when the user
        // navigates the listbox using the arrow keys.
        const currentItemProps = options[focusedIndex].props;
        const label = getLabel(currentItemProps);
        const totalResults = options.length;

        return (
            getCurrentItemDetails(labels, strings, {
                current: label,
                disabled: currentItemProps.disabled,
                focused: false,
                index: focusedIndex,
                selected: currentItemProps.selected,
                total: totalResults,
            }) +
            " " +
            (labels?.liveRegionListboxTotal
                ? labels.liveRegionListboxTotal(totalResults)
                : strings.srNumResultsAvailable({num: totalResults}))
        );
    }, [
        focusedIndex,
        focusedMultiSelectIndex,
        labels,
        options,
        selectedLabels,
        strings,
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
