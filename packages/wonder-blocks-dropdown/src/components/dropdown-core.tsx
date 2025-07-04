/* eslint-disable max-lines */
// A menu that consists of action items

import * as React from "react";
import * as ReactDOM from "react-dom";

import {StyleSheet} from "aphrodite";
import {VariableSizeList as List} from "react-window";

import {semanticColor, border, sizing} from "@khanacademy/wonder-blocks-tokens";

import {PropsFor, View, keys} from "@khanacademy/wonder-blocks-core";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";
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

// we need to define a DefaultProps type to allow the HOC expose the default
// values to the parent components that are instantiating this component
// @see https://flow.org/en/docs/react/hoc/#toc-exporting-wrapped-components
type DefaultProps = Readonly<{
    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right";
    /**
     * Whether to auto focus an option. Defaults to true.
     */
    autoFocus: boolean;
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
    enableTypeAhead: boolean;
    /**
     * An index that represents the index of the focused element when the menu
     * is opened.
     */
    initialFocusedIndex?: number;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels: LabelsValues;
    /**
     * Used to determine if we can automatically select an item using the keyboard.
     */
    selectionType: "single" | "multi";
}>;

type DropdownAriaRole = "listbox" | "menu";
type ItemAriaRole = "option" | "menuitem";
type DropdownAriaProps = Pick<AriaProps, "aria-invalid" | "aria-required">;

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
    alignment?: "left" | "right";
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

type Props = DefaultProps &
    ExportProps &
    WithActionSchedulerProps &
    DropdownAriaProps;

type State = Readonly<{
    /**
     * Refs to use for keyboard focus, contains only those for focusable items.
     * Also keeps track of the original index of the item.
     */
    itemRefs: Array<{
        ref: {
            current: any;
        };
        originalIndex: number;
    }>;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels: LabelsValues;
    /**
     * Because getDerivedStateFromProps doesn't store previous props (in the
     * spirit of performance), we store the previous items just to be able to
     * compare them to see if we need to update itemRefs. Inspired by
     * https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
     */
    prevItems: Array<DropdownItem>;
    /**
     * Whether the set of items that are focusable are the same, used for
     * resetting focusedIndex and focusedOriginalIndex when an update happens.
     */
    sameItemsFocusable: boolean;
}>;

/**
 * A core dropdown component that takes an opener and children to display as
 * part of the dropdown menu. Renders the dropdown as a portal to avoid clipping
 * in overflow: auto containers.
 */
class DropdownCore extends React.Component<Props, State> {
    popperElement: HTMLElement | null | undefined;

    // Keeps a reference of the virtualized list instance
    virtualizedListRef: React.RefObject<List>;

    handleKeyDownDebounced: (key: string) => void;

    textSuggestion: string;

    // Figure out if the same items are focusable. If an item has been added or
    // removed, this method will return false.
    static sameItemsFocusable(
        prevItems: Array<DropdownItem>,
        currentItems: Array<DropdownItem>,
    ): boolean {
        if (prevItems.length !== currentItems.length) {
            return false;
        }
        for (let i = 0; i < prevItems.length; i++) {
            if (prevItems[i].focusable !== currentItems[i].focusable) {
                return false;
            }
        }
        return true;
    }

    static defaultProps: DefaultProps = {
        alignment: "left",
        autoFocus: true,
        enableTypeAhead: true,
        labels: {
            clearSearch: defaultLabels.clearSearch,
            filter: defaultLabels.filter,
            noResults: defaultLabels.noResults,
            someResults: defaultLabels.someSelected,
        },
        selectionType: "single",
    };

    // This is here to avoid calling React.createRef on each rerender. Instead,
    // we create the itemRefs only if it's the first time or if the set of items
    // that are focusable has changed.
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): Partial<State> {
        if (
            (state.itemRefs.length === 0 && props.open) ||
            !DropdownCore.sameItemsFocusable(state.prevItems, props.items)
        ) {
            const itemRefs: Array<{
                originalIndex: number;
                ref: {
                    current: null | HTMLDivElement;
                };
            }> = [];
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].focusable) {
                    const ref = React.createRef<null | HTMLDivElement>();
                    itemRefs.push({ref, originalIndex: i});
                }
            }
            return {
                itemRefs,
                prevItems: props.items,
                sameItemsFocusable: false,
            };
        } else {
            return {
                prevItems: props.items,
                sameItemsFocusable: true,
            };
        }
    }

    constructor(props: Props) {
        super(props);

        // Apply our initial focus index
        this.resetFocusedIndex();

        this.state = {
            prevItems: this.props.items,
            itemRefs: [],
            sameItemsFocusable: false,
            labels: {
                // @ts-expect-error [FEI-5019] - TS2783 - 'noResults' is specified more than once, so this usage will be overwritten.
                noResults: defaultLabels.noResults,
                // In case we are not overriding this from the caller.
                // @ts-expect-error [FEI-5019] - TS2783 - 'someResults' is specified more than once, so this usage will be overwritten.
                someResults: defaultLabels.someSelected,
                ...props.labels,
            },
        };

        this.virtualizedListRef = React.createRef();

        // We debounce the keydown handler to get the ASCII chars because it's
        // called on every keydown
        this.handleKeyDownDebounced = debounce(
            this.handleKeyDownDebounceResult,
            // Leaving enough time for the user to type a valid query (e.g. jul)
            500,
        );
        this.textSuggestion = "";
    }

    componentDidMount() {
        this.updateEventListeners();
        this.maybeFocusInitialItem();
    }

    componentDidUpdate(prevProps: Props) {
        const {open, searchText} = this.props;

        if (prevProps.open !== open) {
            this.updateEventListeners();
            this.maybeFocusInitialItem();
        }
        // If the menu changed, but from open to open, figure out if we need
        // to recalculate the focus somehow.
        else if (open) {
            const {itemRefs, sameItemsFocusable} = this.state;
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
                    (ref) => ref.originalIndex === this.focusedOriginalIndex,
                );
                if (newFocusableIndex === -1) {
                    // Can't find the originally focused item, return focus to
                    // the first item that IS focusable
                    this.focusedIndex = 0;
                    // Reset the knowledge that things had been clicked
                    this.itemsClicked = false;
                    this.scheduleToFocusCurrentItem();
                } else {
                    this.focusedIndex = newFocusableIndex;
                }
            }

            if (this.props.labels !== prevProps.labels) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    labels: {...this.state.labels, ...this.props.labels},
                });
            }
        }
    }

    componentWillUnmount() {
        this.removeEventListeners();
    }

    // Keeps track of the index of the focused item, out of a list of focusable items
    focusedIndex = -1;
    // Keeps track of the index of the focused item in the context of all the
    // items contained by this menu, whether focusable or not, used for figuring
    // out focus correctly when the items have changed in terms of whether
    // they're focusable or not
    focusedOriginalIndex = -1;
    // Whether any items have been selected since the menu was opened
    itemsClicked = false;

    searchFieldRef: {
        current: null | HTMLInputElement;
    } = React.createRef();

    // Resets our initial focus index to what was passed in via the props
    resetFocusedIndex(): void {
        const {initialFocusedIndex} = this.props;

        // If we are given an initial focus index, select it. Otherwise default
        // to the first item
        if (typeof initialFocusedIndex !== "undefined") {
            this.focusedIndex = initialFocusedIndex;
        } else {
            if (this.hasSearchField() && !this.isSearchFieldFocused()) {
                return this.focusSearchField();
            }

            this.focusedIndex = 0;
        }
    }

    // Figure out focus states for the dropdown after it has changed from open
    // to closed or vice versa
    maybeFocusInitialItem() {
        const {autoFocus, open} = this.props;

        if (!autoFocus) {
            return;
        }

        if (open) {
            this.resetFocusedIndex();
            this.scheduleToFocusCurrentItem();
        } else if (!open) {
            this.itemsClicked = false;
        }
    }

    updateEventListeners() {
        if (this.props.open) {
            this.addEventListeners();
        } else {
            this.removeEventListeners();
        }
    }

    addEventListeners() {
        document.addEventListener("mouseup", this.handleInteract);
        document.addEventListener("touchend", this.handleInteract);
    }

    removeEventListeners() {
        document.removeEventListener("mouseup", this.handleInteract);
        document.removeEventListener("touchend", this.handleInteract);
    }

    handleInteract: (event: Event) => void = (event) => {
        const {open, onOpenChanged} = this.props;
        const target: Node = event.target as any;
        // eslint-disable-next-line import/no-deprecated
        const thisElement = ReactDOM.findDOMNode(this);
        if (
            open &&
            thisElement &&
            !thisElement.contains(target) &&
            this.popperElement &&
            !this.popperElement.contains(target)
        ) {
            onOpenChanged(false);
        }
    };

    scheduleToFocusCurrentItem(
        onFocus?: (node: undefined | HTMLElement) => void,
    ) {
        if (this.shouldVirtualizeList()) {
            // wait for windowed items to be recalculated
            this.props.schedule.animationFrame(() => {
                this.focusCurrentItem(onFocus);
            });
        } else {
            // immediately focus the current item if we're not virtualizing
            this.focusCurrentItem(onFocus);
        }
    }

    /**
     * Focus on the current item.
     * @param [onFocus] - Callback to be called when the item is focused.
     */
    focusCurrentItem(onFocus?: (node: HTMLElement) => void) {
        const focusedItemRef = this.state.itemRefs[this.focusedIndex];

        if (!focusedItemRef) {
            return;
        }

        const {current: virtualizedList} = this.virtualizedListRef;
        if (virtualizedList) {
            // Our focused index does not include disabled items, but the
            // react-window index system does include the disabled items
            // in the count.  So we need to use "originalIndex", which
            // does account for disabled items.
            virtualizedList.scrollToItem(focusedItemRef.originalIndex);
        }

        const focusNode = () => {
            // No point in doing work if we're not open.
            if (!this.props.open) {
                return;
            }

            // We look the item up just to make sure we have the right
            // information at the point this function runs.
            const currentFocusedItemRef =
                this.state.itemRefs[this.focusedIndex];

            // eslint-disable-next-line import/no-deprecated
            const node = ReactDOM.findDOMNode(
                currentFocusedItemRef.ref.current,
            ) as HTMLElement;

            if (!node && this.shouldVirtualizeList()) {
                // Wait for the next animation frame to focus the item,
                // that way the virtualized list has time to render the
                // item in the DOM. We do this in a recursive way as
                // occasionally, one frame is not enough.
                this.props.schedule.animationFrame(focusNode);
                return;
            }

            // If the node doesn't exist and we're still mounted, then
            // we need to schedule another focus attempt so that we run when
            // the node *is* mounted.
            if (node) {
                node.focus();
                // Keep track of the original index of the newly focused item.
                // To be used if the set of focusable items in the menu changes
                this.focusedOriginalIndex = currentFocusedItemRef.originalIndex;

                if (onFocus) {
                    // Call the callback with the node that was focused.
                    onFocus(node);
                }
            }
        };

        // If we are virtualized, we need to make sure the scroll can occur
        // before focus is updated. So, we schedule the focus to happen in an
        // animation frame.
        if (this.shouldVirtualizeList()) {
            this.props.schedule.animationFrame(focusNode);
        } else {
            focusNode();
        }
    }

    focusSearchField() {
        if (this.searchFieldRef.current) {
            this.searchFieldRef.current.focus();
        }
    }

    hasSearchField(): boolean {
        return !!this.props.isFilterable;
    }

    isSearchFieldFocused(): boolean {
        return (
            this.hasSearchField() &&
            document.activeElement === this.searchFieldRef.current
        );
    }

    focusPreviousItem(): void {
        if (
            this.focusedIndex === 0 ||
            (this.isSearchFieldFocused() && !this.props.enableTypeAhead)
        ) {
            // Move the focus to the search field if it is the first item.
            if (this.hasSearchField() && !this.isSearchFieldFocused()) {
                return this.focusSearchField();
            }
            this.focusedIndex = this.state.itemRefs.length - 1;
        } else if (!this.isSearchFieldFocused()) {
            this.focusedIndex -= 1;
        }

        this.scheduleToFocusCurrentItem();
    }

    focusNextItem(): void {
        if (
            this.focusedIndex === this.state.itemRefs.length - 1 ||
            (this.isSearchFieldFocused() && !this.props.enableTypeAhead)
        ) {
            // Move the focus to the search field if it is the last item.
            if (this.hasSearchField() && !this.isSearchFieldFocused()) {
                return this.focusSearchField();
            }
            this.focusedIndex = 0;
        } else if (!this.isSearchFieldFocused()) {
            this.focusedIndex += 1;
        }

        this.scheduleToFocusCurrentItem();
    }

    restoreTabOrder() {
        // NOTE: Because the dropdown is portalled out of its natural
        // position in the DOM, we need to manually return focus to the
        // opener element before we let the natural propagation of tab
        // shift the focus to the next element in the tab order.
        if (this.props.openerElement) {
            this.props.openerElement.focus();
        }
    }

    handleKeyDown: (event: React.KeyboardEvent) => void = (event) => {
        const {enableTypeAhead, onOpenChanged, open, searchText} = this.props;
        const key = event.key;

        // Listen for the keydown events if we are using ASCII characters.
        if (enableTypeAhead && getStringForKey(key)) {
            event.stopPropagation();
            this.textSuggestion += key;
            // Trigger the filter logic only after the debounce is resolved.
            this.handleKeyDownDebounced(this.textSuggestion);
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
                if (this.isSearchFieldFocused() && searchText) {
                    return;
                }
                this.restoreTabOrder();
                onOpenChanged(false);
                return;
            case keys.space:
                // When we display SearchField and the focus is on it, we should
                // let the user type space.
                if (this.isSearchFieldFocused()) {
                    return;
                }
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case keys.up:
                event.preventDefault();
                this.focusPreviousItem();
                return;
            case keys.down:
                event.preventDefault();
                this.focusNextItem();
                return;
        }
    };

    // Some keys should be handled during the keyup event instead.
    handleKeyUp: (event: React.KeyboardEvent) => void = (event) => {
        const {onOpenChanged, open} = this.props;
        const key = event.key;
        switch (key) {
            case keys.space:
                // When we display SearchField and the focus is on it, we should
                // let the user type space.
                if (this.isSearchFieldFocused()) {
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
                    this.restoreTabOrder();
                    onOpenChanged(false);
                }
                return;
        }
    };

    handleKeyDownDebounceResult: (key: string) => void = (key) => {
        const foundIndex = this.props.items
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
            const isClosed = !this.props.open;
            if (isClosed) {
                // Open the menu to be able to focus on the item that matches
                // the text suggested.
                this.props.onOpenChanged(true);
            }
            // Update the focus reference.
            this.focusedIndex = foundIndex;

            this.scheduleToFocusCurrentItem((node) => {
                // Force click only if the dropdown is closed and we are using
                // the SingleSelect component.
                if (this.props.selectionType === "single" && isClosed && node) {
                    node.click();
                    this.props.onOpenChanged(false);
                }
            });
        }

        // Otherwise, reset current text
        this.textSuggestion = "";
    };

    handleClickFocus: (index: number) => void = (index) => {
        // Turn itemsClicked on so pressing up or down would focus the
        // appropriate item in handleKeyDown
        this.itemsClicked = true;
        this.focusedIndex = index;
        this.focusedOriginalIndex =
            this.state.itemRefs[this.focusedIndex].originalIndex;
    };

    handleDropdownMouseUp: (event: React.MouseEvent) => void = (event) => {
        if (event.nativeEvent.stopImmediatePropagation) {
            event.nativeEvent.stopImmediatePropagation();
        } else {
            // Workaround for jsdom
            event.stopPropagation();
        }
    };

    getItemRole(): ItemAriaRole {
        const {role} = this.props;

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
    }

    maybeRenderNoResults(): React.ReactNode {
        const {
            items,
            labels: {noResults},
        } = this.props;

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
    }

    /**
     * Handles click events for each item in the dropdown.
     */
    handleItemClick: (focusIndex: number, item: DropdownItem) => void = (
        focusIndex: number,
        item: DropdownItem,
    ) => {
        this.handleClickFocus(focusIndex);
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
     * Determines which rendering strategy we are going to apply to the options
     * list.
     */
    shouldVirtualizeList(): boolean {
        // Verify if the list is long enough to be virtualized (passes the
        // threshold).
        return this.props.items.length > VIRTUALIZE_THRESHOLD;
    }

    /**
     * Renders the non-virtualized list of items.
     */
    renderList(): React.ReactNode {
        let focusCounter = 0;
        const itemRole = this.getItemRole();

        // if we don't need to virtualize, we can render the list directly
        return this.props.items.map((item, index) => {
            if (SeparatorItem.isClassOf(item.component)) {
                return item.component;
            }

            const {component, focusable, populatedProps} = item;

            if (focusable) {
                focusCounter += 1;
            }

            const focusIndex = focusCounter - 1;
            // The reference to the item is used to restore focus.
            const currentRef = this.state.itemRefs[focusIndex]
                ? this.state.itemRefs[focusIndex].ref
                : null;

            // Render OptionItem and/or ActionItem elements.
            return React.cloneElement(component, {
                ...populatedProps,
                key: index,
                onClick: () => {
                    this.handleItemClick(focusIndex, item);
                },
                // Only pass the ref if the item is focusable.
                ref: focusable ? currentRef : null,
                role: populatedProps.role || itemRole,
            });
        });
    }

    /**
     * Process the items and wrap them into an array that react-window can
     * interpret.
     *
     * NOTE: The main difference with the collection in renderList() is that we
     * massage the items to be able to clone them later in
     * DropdownVirtualizedItem, where as renderList() clones the items directly.
     */
    parseVirtualizedItems(): Array<DropdownItem> {
        let focusCounter = 0;
        const itemRole = this.getItemRole();

        return this.props.items.map((item, index) => {
            const {populatedProps} = item;
            if (!SeparatorItem.isClassOf(item.component) && item.focusable) {
                focusCounter += 1;
            }

            const focusIndex = focusCounter - 1;

            return {
                ...item,
                role: populatedProps.role || itemRole,
                ref:
                    item.focusable && this.state.itemRefs[focusIndex]
                        ? this.state.itemRefs[focusIndex].ref
                        : null,
                onClick: () => {
                    this.handleItemClick(focusIndex, item);
                },
            };
        });
    }

    /**
     * Render the items using a virtualized list
     */
    renderVirtualizedList(): React.ReactNode {
        // preprocess items data to pass it to the renderer
        const virtualizedItems = this.parseVirtualizedItems();
        return (
            <DropdownCoreVirtualized
                data={virtualizedItems}
                listRef={this.virtualizedListRef}
            />
        );
    }

    handleSearchTextChanged: (searchText: string) => void = (
        searchText: string,
    ) => {
        const {onSearchTextChanged} = this.props;

        if (onSearchTextChanged) {
            onSearchTextChanged(searchText);
        }
    };

    renderSearchField(): React.ReactNode {
        const {searchText} = this.props;
        const {labels} = this.state;

        return (
            <SearchField
                clearAriaLabel={labels.clearSearch}
                onChange={this.handleSearchTextChanged}
                placeholder={labels.filter}
                ref={this.searchFieldRef}
                style={styles.searchInputStyle}
                value={searchText || ""}
            />
        );
    }

    renderDropdownMenu(
        listRenderer: React.ReactNode,
        isReferenceHidden?: boolean | null,
    ): React.ReactNode {
        const {
            "aria-invalid": ariaInvalid,
            "aria-required": ariaRequired,
            dropdownStyle,
            isFilterable,
            openerElement,
            role,
            id,
        } = this.props;

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
                onMouseUp={this.handleDropdownMouseUp}
                style={[
                    styles.dropdown,
                    isReferenceHidden && styles.hidden,
                    dropdownStyle,
                ]}
                testId="dropdown-core-container"
            >
                {isFilterable && this.renderSearchField()}
                <View
                    id={id}
                    role={role}
                    style={[
                        styles.listboxOrMenu,
                        {
                            minWidth: minDropdownWidth,
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
                {this.maybeRenderNoResults()}
            </View>
        );
    }

    renderDropdown(): React.ReactNode {
        const {alignment, openerElement} = this.props;

        // Preprocess the items that are used inside the Popper instance. By
        // doing this, we optimize the list to be processed only one time
        // instead of every time popper changes.
        // NOTE: This improves the performance impact of the dropdown by
        // reducing the execution time up to 2.5X.
        const listRenderer = this.shouldVirtualizeList()
            ? this.renderVirtualizedList()
            : this.renderList();

        return (
            <DropdownPopper
                alignment={alignment}
                onPopperElement={(popperElement) => {
                    this.popperElement = popperElement;
                }}
                referenceElement={openerElement}
            >
                {(isReferenceHidden) =>
                    this.renderDropdownMenu(listRenderer, isReferenceHidden)
                }
            </DropdownPopper>
        );
    }

    render(): React.ReactNode {
        const {open, opener, style, className, disabled} = this.props;

        return (
            <View
                onKeyDown={!disabled ? this.handleKeyDown : undefined}
                onKeyUp={!disabled ? this.handleKeyUp : undefined}
                style={[styles.menuWrapper, style]}
                className={className}
            >
                {opener}
                {open && this.renderDropdown()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuWrapper: {
        width: "fit-content",
    },

    dropdown: {
        backgroundColor: semanticColor.surface.primary,
        borderRadius: theme.listbox.border.radius,
        paddingBlock: theme.listbox.layout.padding.block,
        paddingInline: theme.listbox.layout.padding.inline,
        border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
        // TODO(WB-1878): Move to elevation tokens.
        boxShadow: theme.listbox.shadow.default,
        // We use a custom property to set the max height of the dropdown.
        // This comes from the maxHeight custom modifier.
        // @see ../util/popper-max-height-modifier.ts
        maxHeight: "var(--popper-max-height)",
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
        // Set `minHeight` to "auto" to stop the search field from having
        // a height of 0 and being cut off.
        minHeight: "auto",
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

export default withActionScheduler(
    DropdownCore,
    // NOTE(kevinb): We convert to unknown first before converting to the property type.
    // This is because TypeScript doesn't like how we're changing props that have default
    // props.
) as unknown as React.ComponentType<ExportProps>;
