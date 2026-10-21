import {addStyle} from "@khanacademy/wonder-blocks-core";
import {useWonderBlocksI18n} from "@khanacademy/wonder-blocks-config";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {
    ComboboxLabels,
    MaybeValueOrValues,
    OptionItemComponent,
} from "../util/types";

const StyledSpan = addStyle("span");

type Props = {
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
    focusedMultiSelectIndex,
    labels: propLabels,
    selectedLabels,
    opened,
    options,
    selected,
    selectionType = "single",
    testId,
}: Props) {
    const {strings} = useWonderBlocksI18n();
    // Use the labels prop if it is provided (and not empty), otherwise use the
    // strings from `WonderBlocksConfigProvider`.
    // NOTE: The `labels` prop keeps its positional function args (e.g.
    // `selected(labels)`), so the strings are adapted to them here.
    const labels: Required<NonNullable<Props["labels"]>> = React.useMemo(
        () => ({
            closedState: propLabels?.closedState || strings.srComboboxClosed,
            liveRegionCurrentItem:
                propLabels?.liveRegionCurrentItem ||
                (({current, index, total, focused}) => {
                    // The focused state is a separate string so it can be
                    // translated on its own.
                    return strings.srCurrentItemDetails({
                        current: focused
                            ? `${current} ${strings.srFocused}`
                            : current,
                        // `index` is 0-based, but the announcement is 1-based.
                        // This is done here since translated messages can't
                        // add 1 to it.
                        index: index + 1,
                        total,
                    });
                }),
            liveRegionMultipleSelectionTotal:
                propLabels?.liveRegionMultipleSelectionTotal ||
                ((total) => strings.srNumSelectedOptions({num: total})),
            noItems: propLabels?.noItems || strings.noResults,
            selected:
                propLabels?.selected ||
                ((labels) => strings.srItemsSelected({labels})),
            selectionCleared:
                propLabels?.selectionCleared || strings.srSelectionCleared,
            unselected:
                propLabels?.unselected ||
                ((labels) => strings.srItemsNotSelected({labels})),
        }),
        [propLabels, strings],
    );
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
                const selectedState =
                    selectedLength > lastSelectedLength
                        ? labels.selected(currentLabels)
                        : labels.unselected(currentLabels);

                newMessage = selectedState;
            } else {
                // Announces the selected item for single select combobox.
                newMessage = labels.selected(selectedLabels[0]);
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
            setMessage(labels.selectionCleared);
        }

        lastSelectedValue.current = selected;

        if (selectionType === "multiple" && !opened) {
            setMessage(labels.closedState);
        }
    }, [
        labels,
        labels.closedState,
        selectedLabels,
        opened,
        selected,
        selectionType,
    ]);

    const focusedElementDescription = React.useMemo(() => {
        // If there are focused items in the multi-select combobox, announce the
        // focused item.
        if (focusedMultiSelectIndex >= 0) {
            // Announces the pill group.
            const label = selectedLabels[focusedMultiSelectIndex];
            return (
                labels.liveRegionCurrentItem({
                    current: label,
                    focused: true,
                    index: focusedMultiSelectIndex,
                    total: selectedLabels.length,
                }) +
                " " +
                labels.liveRegionMultipleSelectionTotal(selectedLabels.length)
            );
        }

        if (options.length === 0) {
            return labels.noItems;
        }

        // NOTE: The focused option in the listbox isn't announced here, since
        // screen readers already announce it from `aria-activedescendant`.
        return "";
    }, [focusedMultiSelectIndex, labels, options, selectedLabels]);

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
