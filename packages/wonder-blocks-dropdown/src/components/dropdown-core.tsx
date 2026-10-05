/* eslint-disable max-lines */
// A menu that consists of action items

import * as React from "react";
import * as ReactDOM from "react-dom";

import {StyleSheet} from "aphrodite";
import {VariableSizeList as List} from "react-window";

import {semanticColor, border, sizing} from "@khanacademy/wonder-blocks-tokens";

import {
    PropsFor,
    View,
    keys,
    useLatestRef,
} from "@khanacademy/wonder-blocks-core";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {useActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {Placement} from "@popperjs/core";
import DropdownCoreVirtualized from "./dropdown-core-virtualized";
import SeparatorItem from "./separator-item";
import {defaultLabels} from "../util/constants";
import type {DropdownItem} from "../util/types";
import DropdownPopper from "./dropdown-popper";
import {debounce, getLabel, getStringForKey} from "../util/helpers";
import OptionItem from "./option-item";
import theme from "../theme";

/**
 * The number of options to apply the virtualized list to.
 *
 * NOTE: The threshold is defined taking into account performance
 * implications (e.g. process input events for users should not be longer
 * than 100ms).
 * @see https://web.dev/rail/?utm_source=devtools#goals-and-guidelines
 *
 * TODO(juan, WB-1263): Improve performance by refactoring this component.
 */
const VIRTUALIZE_THRESHOLD = 125;

type LabelsValues = {
    /**
     * Label for describing the dismiss icon on the search filter.
     */
    clearSearch: string;
    /**
     * Label for the search placeholder.
     */
    filter: string;
    /**
     * Label for when the filter returns no results.
     */
    noResults: string;
    /**
     * The total number of available options in the dropdown.
     * These can be all items or only the ones that match the filter.
     */
    someResults: (numOptions: number) => string;
};

type DropdownAriaRole = "listbox" | "menu";
type ItemAriaRole = "option" | "menuitem";
type DropdownAriaProps = Pick<
    AriaProps,
    "aria-invalid" | "aria-required" | "aria-label" | "aria-labelledby"
>;

type ExportProps = Readonly<{
    // Required props

    /**
     * Items for the menu.
     */
    items: Array<DropdownItem>;
    /**
     * Callback for when the menu is opened or closed. Parameter is whether
     * the dropdown menu should be open.
     */
    onOpenChanged: (open: boolean) => unknown;
    /**
     * Whether the menu is open or not.
     */
    open: boolean;
    /**
     * The component that opens the menu.
     */
    opener: React.ReactElement<any>;
    /**
     * Ref to the opener element.
     */
    openerElement?: HTMLElement;
    /**
     * The aria "role" applied to the dropdown container.
     */
    role: DropdownAriaRole;
    // Optional props

    /**
     * An optional handler to set the searchText of the parent. When this and
     * the searchText exist, SearchField will be displayed at the top of the
     * dropdown body.
     */
    onSearchTextChanged?: (searchText: string) => unknown | null | undefined;
    /**
     * An optional string that the user entered to search the items. When this
     * and the onSearchTextChanged exist, SearchField will be displayed at the
     * top of the dropdown body.
     */
    searchText?: string | null | undefined;
    /**
     * Styling specific to the dropdown component that isn't part of the opener,
     * passed by the specific implementation of the dropdown menu,
     */
    dropdownStyle?: StyleType;
    /**
     * Optional styling for the entire dropdown component.
     */
    style?: StyleType;
    /**
     * Optional CSS classes for the entire dropdown component.
     */
    className?: string;
    /**
     * When this is true, the dropdown body shows a search text input at the
     * top. The items will be filtered by the input.
     */
    isFilterable?: boolean;
    /**
     * Whether the dropdown and it's interactions should be disabled.
     */
    disabled?: boolean;
    /**
     * Unique identifier attached to the dropdown.
     */
    id?: string;

    // Optional props with defaults
    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right" | Placement;
    /**
     * Whether to auto focus an option. Defaults to true.
     */
    autoFocus?: boolean;
    /**
     * Whether to enable the type-ahead suggestions feature. Defaults to true.
     *
     * This feature allows to navigate the listbox using the keyboard.
     * - Type a character: focus moves to the next item with a name that starts
     *   with the typed character.
     * - Type multiple characters in rapid succession: focus moves to the next
     *   item with a name that starts with the string of characters typed.
     *
     * **NOTE:** Type-ahead is recommended for all listboxes, but there might be
     * some cases where it's not desirable (for example when using a `TextField`
     * as the opener element).
     */
    enableTypeAhead?: boolean;
    /**
     * An index that represents the index of the focused element when the menu
     * is opened.
     */
    initialFocusedIndex?: number;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels?: LabelsValues;
    /**
     * Used to determine if we can automatically select an item using the keyboard.
     */
    selectionType?: "single" | "multi";
}>;

type Props = ExportProps & DropdownAriaProps;

type ItemRefs = Array<{
    ref: {
        current: any;
    };
    originalIndex: number;
}>;

// Figure out if the same items are focusable. If an item has been added or
// removed, this method will return false.
const sameItemsFocusable = (
    prevItems: Array<DropdownItem>,
    currentItems: Array<DropdownItem>,
): boolean => {
    if (prevItems.length !== currentItems.length) {
        return false;
    }
    for (let i = 0; i < prevItems.length; i++) {
        if (prevItems[i].focusable !== currentItems[i].focusable) {
            return false;
        }
    }
    return true;
};

const createItemRefs = (items: Array<DropdownItem>): ItemRefs => {
    const itemRefs: ItemRefs = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].focusable) {
            const ref = React.createRef<null | HTMLDivElement>();
            itemRefs.push({ref, originalIndex: i});
        }
    }
    return itemRefs;
};

const defaultPropLabels: LabelsValues = {
    clearSearch: defaultLabels.clearSearch,
    filter: defaultLabels.filter,
    noResults: defaultLabels.noResults,
    someResults: defaultLabels.someSelected,
};

/**
 * A core dropdown component that takes an opener and children to display as
 * part of the dropdown menu. Renders the dropdown as a portal to avoid clipping
 * in overflow: auto containers.
 */
const DropdownCore = (props: Props) => {
    const {
        "aria-invalid": ariaInvalid,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "aria-required": ariaRequired,
        alignment = "left",
        autoFocus = true,
        className,
        disabled,
        dropdownStyle,
        enableTypeAhead = true,
        id,
        initialFocusedIndex,
        isFilterable,
        items,
        labels: propLabels = defaultPropLabels,
        onOpenChanged,
        onSearchTextChanged,
        open,
        opener,
        openerElement,
        role,
        searchText,
        selectionType = "single",
        style,
    } = props;

    // NOTE: The scheduler must be created before any of the effects below run,
    // so this hook has to be called before them.
    const schedule = useActionScheduler();

    // Keep the latest `open` value in a ref, so that focus attempts that run
    // asynchronously (in a timeout or animation frame) check the current value
    // instead of the one from the render that scheduled them.
    const openRef = useLatestRef(open);

    // The root element of the component, used to detect clicks outside of it.
    const rootRef = React.useRef<HTMLElement | null>(null);

    const popperElementRef = React.useRef<HTMLElement | null | undefined>(
        undefined,
    );

    // Keeps a reference of the virtualized list instance
    const virtualizedListRef = React.useRef<List>(null);

    const searchFieldRef = React.useRef<HTMLInputElement | null>(null);

    const textSuggestionRef = React.useRef("");

    /**
     * The object containing the custom labels used inside this component.
     */
    const [labels, setLabels] = React.useState<LabelsValues>(() => ({
        // @ts-expect-error [FEI-5019] - TS2783 - 'noResults' is specified more than once, so this usage will be overwritten.
        noResults: defaultLabels.noResults,
        // In case we are not overriding this from the caller.
        // @ts-expect-error [FEI-5019] - TS2783 - 'someResults' is specified more than once, so this usage will be overwritten.
        someResults: defaultLabels.someSelected,
        ...propLabels,
    }));

    // Refs to use for keyboard focus, contains only those for focusable items.
    // Also keeps track of the original index of the item.
    //
    // This mirrors what `getDerivedStateFromProps` did in the class version:
    // we avoid calling React.createRef on each rerender. Instead, we create
    // the itemRefs only if it's the first time or if the set of items that are
    // focusable has changed. The committed values are stored in this ref, and
    // the values for the current render are derived from them below.
    const committedItemsRef = React.useRef<{
        itemRefs: ItemRefs;
        /**
         * We store the previous items just to be able to compare them to see
         * if we need to update itemRefs.
         */
        prevItems: Array<DropdownItem>;
    }>({itemRefs: [], prevItems: items});

    const {itemRefs: prevItemRefs, prevItems} = committedItemsRef.current;
    const shouldCreateItemRefs =
        (prevItemRefs.length === 0 && open) ||
        !sameItemsFocusable(prevItems, items);

    const derivedItems: {
        itemRefs: ItemRefs;
        /**
         * Whether the set of items that are focusable are the same, used for
         * resetting focusedIndex and focusedOriginalIndex when an update
         * happens.
         */
        sameItemsFocusable: boolean;
    } = shouldCreateItemRefs
        ? {itemRefs: createItemRefs(items), sameItemsFocusable: false}
        : {itemRefs: prevItemRefs, sameItemsFocusable: true};

    // Keep the latest itemRefs in a ref, so that callbacks can read them after
    // the render has been committed (like `this.state.itemRefs`).
    const itemRefsRef = React.useRef<ItemRefs>(derivedItems.itemRefs);

    React.useEffect(() => {
        committedItemsRef.current = {
            itemRefs: derivedItems.itemRefs,
            prevItems: items,
        };
        itemRefsRef.current = derivedItems.itemRefs;
    });

    const hasSearchField = React.useCallback((): boolean => {
        return !!isFilterable;
    }, [isFilterable]);

    const isSearchFieldFocused = React.useCallback((): boolean => {
        return (
            hasSearchField() &&
            document.activeElement === searchFieldRef.current
        );
    }, [hasSearchField]);

    const focusSearchField = React.useCallback(() => {
        if (searchFieldRef.current) {
            searchFieldRef.current.focus();
        }
    }, []);

    // Keeps track of the index of the focused item, out of a list of focusable
    // items. We apply our initial focus index when the component is created.
    const focusedIndexRef = React.useRef<number>(-1);
    // Keeps track of the index of the focused item in the context of all the
    // items contained by this menu, whether focusable or not, used for figuring
    // out focus correctly when the items have changed in terms of whether
    // they're focusable or not
    const focusedOriginalIndexRef = React.useRef(-1);
    // Whether any items have been selected since the menu was opened
    const itemsClickedRef = React.useRef(false);

    // Resets our initial focus index to what was passed in via the props
    const resetFocusedIndex = React.useCallback((): void => {
        // If we are given an initial focus index, select it. Otherwise default
        // to the first item
        if (typeof initialFocusedIndex !== "undefined") {
            focusedIndexRef.current = initialFocusedIndex;
        } else {
            if (hasSearchField() && !isSearchFieldFocused()) {
                return focusSearchField();
            }

            focusedIndexRef.current = 0;
        }
    }, [
        focusSearchField,
        hasSearchField,
        initialFocusedIndex,
        isSearchFieldFocused,
    ]);

    // Apply our initial focus index (this used to happen in the constructor).
    const initializedRef = React.useRef(false);
    if (!initializedRef.current) {
        initializedRef.current = true;
        resetFocusedIndex();
    }

    /**
     * Determines which rendering strategy we are going to apply to the options
     * list.
     */
    const shouldVirtualizeList = React.useCallback((): boolean => {
        // Verify if the list is long enough to be virtualized (passes the
        // threshold).
        return items.length > VIRTUALIZE_THRESHOLD;
    }, [items]);

    /**
     * Focus on the current item.
     * @param [onFocus] - Callback to be called when the item is focused.
     */
    const focusCurrentItem = React.useCallback(
        (onFocus?: (node: HTMLElement) => void) => {
            const focusedItemRef = itemRefsRef.current[focusedIndexRef.current];

            if (!focusedItemRef) {
                return;
            }

            const {current: virtualizedList} = virtualizedListRef;
            if (virtualizedList) {
                // Our focused index does not include disabled items, but the
                // react-window index system does include the disabled items
                // in the count.  So we need to use "originalIndex", which
                // does account for disabled items.
                virtualizedList.scrollToItem(focusedItemRef.originalIndex);
            }

            const focusNode = () => {
                // No point in doing work if we're not open.
                if (!openRef.current) {
                    return;
                }

                // We look the item up just to make sure we have the right
                // information at the point this function runs.
                const currentFocusedItemRef =
                    itemRefsRef.current[focusedIndexRef.current];

                // eslint-disable-next-line import/no-deprecated
                const node = ReactDOM.findDOMNode(
                    currentFocusedItemRef.ref.current,
                ) as HTMLElement;

                if (!node && shouldVirtualizeList()) {
                    // Wait for the next animation frame to focus the item,
                    // that way the virtualized list has time to render the
                    // item in the DOM. We do this in a recursive way as
                    // occasionally, one frame is not enough.
                    schedule.animationFrame(focusNode);
                    return;
                }

                // If the node doesn't exist and we're still mounted, then
                // we need to schedule another focus attempt so that we run when
                // the node *is* mounted.
                if (node) {
                    // WB-2143: Add a delay to ensure expanded state is announced in NVDA/JAWS
                    // Note: aria-expanded is no longer announced in VO/Safari with this timeout
                    schedule.timeout(() => {
                        node.focus();
                    }, 0);
                    // Keep track of the original index of the newly focused item.
                    // To be used if the set of focusable items in the menu changes
                    focusedOriginalIndexRef.current =
                        currentFocusedItemRef.originalIndex;

                    if (onFocus) {
                        // Call the callback with the node that was focused.
                        onFocus(node);
                    }
                }
            };

            // If we are virtualized, we need to make sure the scroll can occur
            // before focus is updated. So, we schedule the focus to happen in an
            // animation frame.
            if (shouldVirtualizeList()) {
                schedule.animationFrame(focusNode);
            } else {
                focusNode();
            }
        },
        [openRef, schedule, shouldVirtualizeList],
    );

    const scheduleToFocusCurrentItem = React.useCallback(
        (onFocus?: (node: undefined | HTMLElement) => void) => {
            if (shouldVirtualizeList()) {
                // wait for windowed items to be recalculated
                schedule.animationFrame(() => {
                    focusCurrentItem(onFocus);
                });
            } else {
                // immediately focus the current item if we're not virtualizing
                focusCurrentItem(onFocus);
            }
        },
        [focusCurrentItem, schedule, shouldVirtualizeList],
    );

    // Figure out focus states for the dropdown after it has changed from open
    // to closed or vice versa
    const maybeFocusInitialItem = React.useCallback(() => {
        if (!autoFocus) {
            return;
        }

        if (open) {
            resetFocusedIndex();
            scheduleToFocusCurrentItem();
        } else if (!open) {
            itemsClickedRef.current = false;
        }
    }, [autoFocus, open, resetFocusedIndex, scheduleToFocusCurrentItem]);

    // Close the menu when the user interacts outside of it. The listeners are
    // only attached while the menu is open.
    React.useEffect(() => {
        if (!open) {
            return;
        }

        const handleInteract = (event: Event) => {
            const target: Node = event.target as any;
            const thisElement = rootRef.current;
            if (
                thisElement &&
                !thisElement.contains(target) &&
                popperElementRef.current &&
                !popperElementRef.current.contains(target)
            ) {
                onOpenChanged(false);
            }
        };

        document.addEventListener("mouseup", handleInteract);
        document.addEventListener("touchend", handleInteract);

        return () => {
            document.removeEventListener("mouseup", handleInteract);
            document.removeEventListener("touchend", handleInteract);
        };
    }, [open, onOpenChanged]);

    // componentDidMount
    React.useEffect(() => {
        maybeFocusInitialItem();
        // This should only run on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // componentDidUpdate
    //
    // NOTE: This is kept as a single effect (instead of one per concern) so
    // that the order and the early returns of the original componentDidUpdate
    // are preserved exactly.
    const prevRenderRef = React.useRef<{
        open: boolean;
        searchText: string | null | undefined;
        labels: LabelsValues;
        derivedItems: typeof derivedItems;
    } | null>(null);
    // This runs after every update, like componentDidUpdate. It can't cause an
    // infinite loop: `setLabels` is only called when the `labels` prop changed
    // since the last processed render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const prevProps = prevRenderRef.current;
        prevRenderRef.current = {
            open,
            searchText,
            labels: propLabels,
            derivedItems,
        };

        // Skip the initial mount (handled above), and any re-run of an effect
        // for a render we have already processed.
        if (!prevProps || prevProps.derivedItems === derivedItems) {
            return;
        }

        if (prevProps.open !== open) {
            maybeFocusInitialItem();
        }
        // If the menu changed, but from open to open, figure out if we need
        // to recalculate the focus somehow.
        else if (open) {
            const {itemRefs, sameItemsFocusable} = derivedItems;
            // Check if the same items are focused by comparing the items at
            // each index and seeing if the {focusable} property is the same.
            // Very rarely do the set of focusable items change if the menu
            // hasn't been re-opened. This is for cases like a {Select all}
            // option that becomes disabled iff all the options are selected.
            if (sameItemsFocusable || prevProps.searchText !== searchText) {
                return;
            } else {
                // If the set of items that was focusabled changed, it's very
                // likely that the previously focused item no longer has the
                // same index relative to the list of focusable items. Instead,
                // use the focusedOriginalIndex to find the new index of the
                // last item that was focused before this change
                const newFocusableIndex = itemRefs.findIndex(
                    (ref) =>
                        ref.originalIndex === focusedOriginalIndexRef.current,
                );
                if (newFocusableIndex === -1) {
                    // Can't find the originally focused item, return focus to
                    // the first item that IS focusable
                    focusedIndexRef.current = 0;
                    // Reset the knowledge that things had been clicked
                    itemsClickedRef.current = false;
                    scheduleToFocusCurrentItem();
                } else {
                    focusedIndexRef.current = newFocusableIndex;
                }
            }

            if (propLabels !== prevProps.labels) {
                setLabels((prevLabels) => ({...prevLabels, ...propLabels}));
            }
        }
    });

    const focusPreviousItem = React.useCallback((): void => {
        if (isSearchFieldFocused()) {
            // From search field, up arrow goes to last item
            focusedIndexRef.current = itemRefsRef.current.length - 1;
        } else if (focusedIndexRef.current === 0) {
            // At first item, go to search field if it exists
            if (hasSearchField()) {
                return focusSearchField();
            }
            // Otherwise wrap to last item
            focusedIndexRef.current = itemRefsRef.current.length - 1;
        } else {
            focusedIndexRef.current -= 1;
        }

        scheduleToFocusCurrentItem();
    }, [
        focusSearchField,
        hasSearchField,
        isSearchFieldFocused,
        scheduleToFocusCurrentItem,
    ]);

    const focusNextItem = React.useCallback((): void => {
        if (isSearchFieldFocused()) {
            // From search field, down arrow goes to first item
            focusedIndexRef.current = 0;
        } else if (focusedIndexRef.current === itemRefsRef.current.length - 1) {
            // At last item, go to search field if it exists
            if (hasSearchField()) {
                return focusSearchField();
            }
            // Otherwise wrap to first item
            focusedIndexRef.current = 0;
        } else {
            focusedIndexRef.current += 1;
        }

        scheduleToFocusCurrentItem();
    }, [
        focusSearchField,
        hasSearchField,
        isSearchFieldFocused,
        scheduleToFocusCurrentItem,
    ]);

    const restoreTabOrder = React.useCallback(() => {
        // NOTE: Because the dropdown is portalled out of its natural
        // position in the DOM, we need to manually return focus to the
        // opener element before we let the natural propagation of tab
        // shift the focus to the next element in the tab order.
        if (openerElement) {
            openerElement.focus();
        }
    }, [openerElement]);

    const handleKeyDownDebounceResult = React.useCallback(
        (key: string) => {
            const foundIndex = items
                .filter((item) => item.focusable)
                .findIndex(({component}) => {
                    if (SeparatorItem.isClassOf(component)) {
                        return false;
                    }

                    if (OptionItem.isClassOf(component)) {
                        const optionItemProps = component.props as PropsFor<
                            typeof OptionItem
                        >;

                        return getLabel(optionItemProps)
                            .toLowerCase()
                            .startsWith(key.toLowerCase());
                    }

                    return false;
                });

            if (foundIndex >= 0) {
                const isClosed = !open;
                if (isClosed) {
                    // Open the menu to be able to focus on the item that matches
                    // the text suggested.
                    onOpenChanged(true);
                }
                // Update the focus reference.
                focusedIndexRef.current = foundIndex;

                scheduleToFocusCurrentItem((node) => {
                    // Force click only if the dropdown is closed and we are using
                    // the SingleSelect component.
                    if (selectionType === "single" && isClosed && node) {
                        node.click();
                        onOpenChanged(false);
                    }
                });
            }

            // Otherwise, reset current text
            textSuggestionRef.current = "";
        },
        [items, onOpenChanged, open, scheduleToFocusCurrentItem, selectionType],
    );

    // Keep the latest version of the debounce result handler, so the debounced
    // function (created once) always calls it.
    const handleKeyDownDebounceResultRef = React.useRef(
        handleKeyDownDebounceResult,
    );
    handleKeyDownDebounceResultRef.current = handleKeyDownDebounceResult;

    // We debounce the keydown handler to get the ASCII chars because it's
    // called on every keydown
    const handleKeyDownDebounced = React.useMemo(
        () =>
            debounce(
                (key: string) => handleKeyDownDebounceResultRef.current(key),
                // Leaving enough time for the user to type a valid query (e.g. jul)
                500,
            ),
        [],
    );

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key;

        // Listen for the keydown events if we are using ASCII characters.
        if (enableTypeAhead && getStringForKey(key)) {
            event.stopPropagation();
            textSuggestionRef.current += key;
            // Trigger the filter logic only after the debounce is resolved.
            handleKeyDownDebounced(textSuggestionRef.current);
        }

        // If menu isn't open and user presses down, open the menu
        if (!open) {
            if (key === keys.down) {
                event.preventDefault();
                onOpenChanged(true);
                return;
            }
            return;
        }

        // Handle all other key behavior
        switch (key) {
            case keys.tab:
                // When we show SearchField and that is focused and the
                // searchText is entered at least one character, dismiss button
                // is displayed. When user presses tab, we should move focus to
                // the dismiss button.
                if (isSearchFieldFocused() && searchText) {
                    return;
                }
                restoreTabOrder();
                onOpenChanged(false);
                return;
            case keys.space:
                // When we display SearchField and the focus is on it, we should
                // let the user type space.
                if (isSearchFieldFocused()) {
                    return;
                }
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case keys.up:
                event.preventDefault();
                focusPreviousItem();
                return;
            case keys.down:
                event.preventDefault();
                focusNextItem();
                return;
        }
    };

    // Some keys should be handled during the keyup event instead.
    const handleKeyUp = (event: React.KeyboardEvent) => {
        const key = event.key;
        switch (key) {
            case keys.space:
                // When we display SearchField and the focus is on it, we should
                // let the user type space.
                if (isSearchFieldFocused()) {
                    return;
                }
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case keys.escape:
                // Close only the dropdown, not other elements that are
                // listening for an escape press
                if (open) {
                    event.stopPropagation();
                    restoreTabOrder();
                    onOpenChanged(false);
                }
                return;
        }
    };

    const handleClickFocus = (index: number) => {
        // Turn itemsClicked on so pressing up or down would focus the
        // appropriate item in handleKeyDown
        itemsClickedRef.current = true;
        focusedIndexRef.current = index;
        focusedOriginalIndexRef.current =
            itemRefsRef.current[focusedIndexRef.current].originalIndex;
    };

    const handleDropdownMouseUp = (event: React.MouseEvent) => {
        if (event.nativeEvent.stopImmediatePropagation) {
            event.nativeEvent.stopImmediatePropagation();
        } else {
            // Workaround for jsdom
            event.stopPropagation();
        }
    };

    const getItemRole = (): ItemAriaRole => {
        switch (role) {
            case "listbox":
                return "option";
            case "menu":
                return "menuitem";
            default:
                throw new Error(
                    `Expected "listbox" or "menu" for role, but receieved "${role}" instead.`,
                );
        }
    };

    const maybeRenderNoResults = (): React.ReactNode => {
        const {noResults} = propLabels;

        // Verify if there are items to be rendered or not
        const numResults = items.length;

        if (numResults === 0) {
            return (
                <BodyText
                    style={styles.noResult}
                    testId="dropdown-core-no-results"
                >
                    {noResults}
                </BodyText>
            );
        }
        return null;
    };

    /**
     * Handles click events for each item in the dropdown.
     */
    const handleItemClick = (focusIndex: number, item: DropdownItem) => {
        handleClickFocus(focusIndex);
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'onClick' does not exist on type '{}'.
        if (item.component.props.onClick) {
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'onClick' does not exist on type '{}'.
            item.component.props.onClick();
        }
        if (item.populatedProps.onClick) {
            item.populatedProps.onClick();
        }
    };

    /**
     * Renders the non-virtualized list of items.
     */
    const renderList = (): React.ReactNode => {
        let focusCounter = 0;
        const itemRole = getItemRole();

        // if we don't need to virtualize, we can render the list directly
        return items.map((item, index) => {
            if (SeparatorItem.isClassOf(item.component)) {
                return item.component;
            }

            const {component, focusable, populatedProps} = item;

            if (focusable) {
                focusCounter += 1;
            }

            const focusIndex = focusCounter - 1;
            // The reference to the item is used to restore focus.
            const currentRef = derivedItems.itemRefs[focusIndex]
                ? derivedItems.itemRefs[focusIndex].ref
                : null;

            // Render OptionItem and/or ActionItem elements.
            return React.cloneElement(component, {
                ...populatedProps,
                key: index,
                onClick: () => {
                    handleItemClick(focusIndex, item);
                },
                // Only pass the ref if the item is focusable.
                ref: focusable ? currentRef : null,
                role: populatedProps.role || itemRole,
            });
        });
    };

    /**
     * Process the items and wrap them into an array that react-window can
     * interpret.
     *
     * NOTE: The main difference with the collection in renderList() is that we
     * massage the items to be able to clone them later in
     * DropdownVirtualizedItem, where as renderList() clones the items directly.
     */
    const parseVirtualizedItems = (): Array<DropdownItem> => {
        let focusCounter = 0;
        const itemRole = getItemRole();

        return items.map((item, index) => {
            const {populatedProps} = item;
            if (!SeparatorItem.isClassOf(item.component) && item.focusable) {
                focusCounter += 1;
            }

            const focusIndex = focusCounter - 1;

            return {
                ...item,
                role: populatedProps.role || itemRole,
                ref:
                    item.focusable && derivedItems.itemRefs[focusIndex]
                        ? derivedItems.itemRefs[focusIndex].ref
                        : null,
                onClick: () => {
                    handleItemClick(focusIndex, item);
                },
            };
        });
    };

    /**
     * Render the items using a virtualized list
     */
    const renderVirtualizedList = (): React.ReactNode => {
        // preprocess items data to pass it to the renderer
        const virtualizedItems = parseVirtualizedItems();
        return (
            <DropdownCoreVirtualized
                data={virtualizedItems}
                listRef={virtualizedListRef}
            />
        );
    };

    const handleSearchTextChanged = (searchText: string) => {
        if (onSearchTextChanged) {
            onSearchTextChanged(searchText);
        }
    };

    const renderSearchField = (): React.ReactNode => {
        return (
            <SearchField
                clearAriaLabel={labels.clearSearch}
                onChange={handleSearchTextChanged}
                placeholder={labels.filter}
                ref={searchFieldRef}
                style={styles.searchInputStyle}
                value={searchText || ""}
            />
        );
    };

    const renderDropdownMenu = (
        listRenderer: React.ReactNode,
        isReferenceHidden?: boolean | null,
    ): React.ReactNode => {
        // The dropdown width is at least the width of the opener.
        // It's only used if the element exists in the DOM
        const openerStyle =
            openerElement && window.getComputedStyle(openerElement);
        const minDropdownWidth = openerStyle
            ? openerStyle.getPropertyValue("width")
            : 0;

        return (
            <View
                // Stop propagation to prevent the mouseup listener on the
                // document from closing the menu.
                onMouseUp={handleDropdownMouseUp}
                style={[
                    styles.dropdown,
                    isReferenceHidden && styles.hidden,
                    dropdownStyle,
                ]}
                testId="dropdown-core-container"
            >
                {isFilterable && renderSearchField()}
                <View
                    id={id}
                    role={role}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    style={[
                        styles.listboxOrMenu,
                        {
                            minInlineSize: minDropdownWidth,
                        },
                    ]}
                    // Only the `listbox` role supports aria-invalid and aria-required because
                    // the `menu` role is not a form control.
                    aria-invalid={role === "listbox" ? ariaInvalid : undefined}
                    aria-required={
                        role === "listbox" ? ariaRequired : undefined
                    }
                >
                    {listRenderer}
                </View>
                {maybeRenderNoResults()}
            </View>
        );
    };

    const renderDropdown = (): React.ReactNode => {
        // Preprocess the items that are used inside the Popper instance. By
        // doing this, we optimize the list to be processed only one time
        // instead of every time popper changes.
        // NOTE: This improves the performance impact of the dropdown by
        // reducing the execution time up to 2.5X.
        const listRenderer = shouldVirtualizeList()
            ? renderVirtualizedList()
            : renderList();

        return (
            <DropdownPopper
                alignment={alignment}
                onPopperElement={(popperElement) => {
                    popperElementRef.current = popperElement;
                }}
                referenceElement={openerElement}
            >
                {(isReferenceHidden) =>
                    renderDropdownMenu(listRenderer, isReferenceHidden)
                }
            </DropdownPopper>
        );
    };

    return (
        <View
            ref={rootRef}
            onKeyDown={!disabled ? handleKeyDown : undefined}
            onKeyUp={!disabled ? handleKeyUp : undefined}
            style={[styles.menuWrapper, style]}
            className={className}
        >
            {opener}
            {open && renderDropdown()}
        </View>
    );
};

const styles = StyleSheet.create({
    menuWrapper: {
        width: "fit-content",
        maxInlineSize: "100%",
    },

    dropdown: {
        backgroundColor: semanticColor.core.background.base.default,
        borderRadius: theme.listbox.border.radius,
        paddingBlock: theme.listbox.layout.padding.block,
        paddingInline: theme.listbox.layout.padding.inline,
        border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
        boxShadow: theme.listbox.shadow.default,
        // We use a custom property to set the max height of the dropdown.
        // This comes from the maxHeight custom modifier.
        // @see ../util/popper-max-height-modifier.ts
        maxBlockSize: "var(--popper-max-height)",
    },

    listboxOrMenu: {
        overflowY: "auto",
    },

    hidden: {
        pointerEvents: "none",
        visibility: "hidden",
    },

    noResult: {
        color: semanticColor.core.foreground.neutral.default,
        alignSelf: "center",
        marginBlockStart: sizing.size_060,
    },

    searchInputStyle: {
        margin: sizing.size_080,
        marginBlockStart: sizing.size_040,
        // Set `minBlockSize` to "auto" to stop the search field from having
        // a height of 0 and being cut off.
        minBlockSize: "auto",
        position: "sticky",
    },

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

export default DropdownCore;
