// @flow
// A menu that consists of action items

import * as React from "react";
import ReactDOM from "react-dom";

import {StyleSheet} from "aphrodite";
import {VariableSizeList as List} from "react-window";

import Color, {fade} from "@khanacademy/wonder-blocks-color";

import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "@khanacademy/wonder-blocks-timing";
import DropdownCoreVirtualized from "./dropdown-core-virtualized.js";
import SeparatorItem from "./separator-item.js";
import SearchTextInput from "./search-text-input.js";
import {defaultLabels, keyCodes, searchInputStyle} from "../util/constants.js";
import {debounce, getStringForKey} from "../util/helpers.js";
import DropdownPopper from "./dropdown-popper.js";
import {
    generateDropdownMenuStyles,
    getDropdownMenuHeight,
} from "../util/dropdown-menu-styles.js";

import type {DropdownItem} from "../util/types.js";

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

type Labels = {|
    noResults: string,
|};

// we need to define a DefaultProps type to allow the HOC expose the default
// values to the parent components that are instantiating this component
// @see https://flow.org/en/docs/react/hoc/#toc-exporting-wrapped-components
type DefaultProps = {|
    /**
     * An index that represents the index of the focused element when the menu
     * is opened.
     */
    initialFocusedIndex?: number,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * The object containing the custom labels used inside this component.
     */
    labels: Labels,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

    selectionType: "single" | "multi",
|};

type DropdownAriaRole = "listbox" | "menu";
type ItemAriaRole = "option" | "menuitem";

type Props = {|
    ...DefaultProps,
    /**
     * Items for the menu.
     */
    items: Array<DropdownItem>,

    /**
     * An optional handler to set the searchText of the parent. When this and
     * the searchText exist, SearchTextInput will be displayed at the top of
     * the dropdown body.
     */
    onSearchTextChanged?: ?(searchText: string) => mixed,

    /**
     * An optional string that the user entered to search the items. When this
     * and the onSearchTextChanged exist, SearchTextInput will be displayed at
     * the top of the dropdown body.
     */
    searchText?: ?string,

    /**
     * Callback for when the menu is opened or closed. Parameter is whether
     * the dropdown menu should be open.
     */
    onOpenChanged: (open: boolean) => mixed,

    /**
     * Whether the menu is open or not.
     */
    open: boolean,

    /**
     * The component that opens the menu.
     */
    opener: React.Element<any>,

    /**
     * Ref to the opener element.
     */
    openerElement: ?HTMLElement,

    /**
     * Styling specific to the dropdown component that isn't part of the opener,
     * passed by the specific implementation of the dropdown menu,
     */
    dropdownStyle?: StyleType,

    /**
     * Optional styling for the entire dropdown component.
     */
    style?: StyleType,

    /**
     * Optional CSS classes for the entire dropdown component.
     */
    className?: string,

    /**
     * The aria "role" applied to the dropdown container.
     */
    role: DropdownAriaRole,

    ...WithActionSchedulerProps,
|};

type State = {|
    /**
     * Refs to use for keyboard focus, contains only those for focusable items.
     * Also keeps track of the original index of the item.
     */
    itemRefs: Array<{|ref: {|current: any|}, originalIndex: number|}>,

    /**
     * Because getDerivedStateFromProps doesn't store previous props (in the
     * spirit of performance), we store the previous items just to be able to
     * compare them to see if we need to update itemRefs. Inspired by
     * https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
     */
    prevItems: Array<DropdownItem>,

    /**
     * Whether the set of items that are focusable are the same, used for
     * resetting focusedIndex and focusedOriginalIndex when an update happens.
     */
    sameItemsFocusable: boolean,

    /**
     * The object containing the custom labels used inside this component.
     */
    labels: Labels,
|};

/**
 * A core dropdown component that takes an opener and children to display as
 * part of the dropdown menu. Renders the dropdown as a portal to avoid clipping
 * in overflow: auto containers.
 */
class DropdownCore extends React.Component<Props, State> {
    // Keeps track of the index of the focused item, out of a list of focusable items
    focusedIndex: number;
    // Keeps track of the index of the focused item in the context of all the
    // items contained by this menu, whether focusable or not, used for figuring
    // out focus correctly when the items have changed in terms of whether
    // they're focusable or not
    focusedOriginalIndex: number;
    // Whether any items have been selected since the menu was opened
    itemsClicked: boolean;
    popperElement: ?HTMLElement;
    // Keeps a reference of the virtualized list instance
    virtualizedListRef: {|
        current: null | React.ElementRef<typeof List>,
    |};

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
        labels: {
            noResults: defaultLabels.noResults,
        },
        light: false,
        selectionType: "multi",
    };

    // This is here to avoid calling React.createRef on each rerender. Instead,
    // we create the itemRefs only if it's the first time or if the set of items
    // that are focusable has changed.
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): ?Partial<State> {
        if (
            (state.itemRefs.length === 0 && props.open) ||
            !DropdownCore.sameItemsFocusable(state.prevItems, props.items)
        ) {
            const itemRefs = [];
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
                noResults: defaultLabels.noResults,
                ...props.labels,
            },
        };

        this.virtualizedListRef = React.createRef();

        // We debounce the keydown handler to get the ASCII chars because it's
        // called on every keydown
        this.handleKeyDownDebounced = debounce(
            this.handleKeyDownDebounceResult,
            250,
        );
        this.textSuggestion = "";
    }

    componentDidMount() {
        this.updateEventListeners();
        this.initialFocusItem();
    }

    componentDidUpdate(prevProps: Props) {
        const {open} = this.props;

        if (prevProps.open !== open) {
            this.updateEventListeners();
            this.initialFocusItem();
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
            if (sameItemsFocusable) {
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
                    // Reset the knowlege that things had been clicked
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

    hasSearchBox(): boolean {
        return (
            !!this.props.onSearchTextChanged &&
            typeof this.props.searchText === "string"
        );
    }

    // Resets our initial focus index to what was passed in
    // via the props
    resetFocusedIndex() {
        const {initialFocusedIndex} = this.props;

        // If we are given an initial focus index, select it.  Otherwise
        // default to the first item
        if (initialFocusedIndex) {
            // If we have a search box visible, then our focus
            // index is going to be offset by 1, since the orginal
            // index doesn't account for the search box's
            // existence.
            if (this.hasSearchBox()) {
                this.focusedIndex = initialFocusedIndex + 1;
            } else {
                this.focusedIndex = initialFocusedIndex;
            }
        } else {
            this.focusedIndex = 0;
        }
    }

    // Figure out focus states for the dropdown after it has changed from open
    // to closed or vice versa
    initialFocusItem() {
        const {open} = this.props;

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
        const target: Node = (event.target: $FlowFixMe);
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

    scheduleToFocusCurrentItem(onFocus?: (node: void | HTMLElement) => void) {
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
        const fousedItemRef = this.state.itemRefs[this.focusedIndex];

        if (fousedItemRef) {
            // force react-window to scroll to ensure the focused item is visible
            if (this.virtualizedListRef.current) {
                // Our focused index does not include disabled items, but the
                // react-window index system does include the disabled items
                // in the count.  So we need to use "originalIndex", which
                // does account for disabled items.
                this.virtualizedListRef.current.scrollToItem(
                    fousedItemRef.originalIndex,
                );
            }

            const node = ((ReactDOM.findDOMNode(
                fousedItemRef.ref.current,
            ): any): HTMLElement);
            if (node) {
                node.focus();
                // Keep track of the original index of the newly focused item.
                // To be used if the set of focusable items in the menu changes
                this.focusedOriginalIndex = fousedItemRef.originalIndex;

                if (onFocus) {
                    // Call the callback with the node that was focused.
                    onFocus(node);
                }
            }
        }
    }

    focusPreviousItem() {
        if (this.focusedIndex === 0) {
            this.focusedIndex = this.state.itemRefs.length - 1;
        } else {
            this.focusedIndex -= 1;
        }

        this.scheduleToFocusCurrentItem();
    }

    focusNextItem() {
        if (this.focusedIndex === this.state.itemRefs.length - 1) {
            this.focusedIndex = 0;
        } else {
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

    handleKeyDown: (event: SyntheticKeyboardEvent<>) => void = (event) => {
        const {onOpenChanged, open, searchText} = this.props;
        const keyCode = event.which || event.keyCode;

        // Listen for the keydown events if we are using ASCII characters.
        if (getStringForKey(event.key)) {
            event.stopPropagation();
            this.textSuggestion += event.key;
            this.handleKeyDownDebounced(this.textSuggestion);
        }

        // If menu isn't open and user presses down, open the menu
        if (!open) {
            if (keyCode === keyCodes.down) {
                event.preventDefault();
                onOpenChanged(true);
                return;
            }
            return;
        }

        // Handle all other key behavior
        switch (keyCode) {
            case keyCodes.tab:
                // When we show SearchTextInput and that is focused and the
                // searchText is entered at least one character, dismiss button
                // is displayed. When user presses tab, we should move focus
                // to the dismiss button.
                if (
                    this.hasSearchBox() &&
                    this.focusedIndex === 0 &&
                    searchText
                ) {
                    return;
                }
                this.restoreTabOrder();
                onOpenChanged(false);
                return;
            case keyCodes.space:
                // When we display SearchTextInput and the focus is on it,
                // we should let the user type space.
                if (this.hasSearchBox() && this.focusedIndex === 0) {
                    return;
                }
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case keyCodes.up:
                event.preventDefault();
                this.focusPreviousItem();
                return;
            case keyCodes.down:
                event.preventDefault();
                this.focusNextItem();
                return;
        }
    };

    handleKeyDownDebounceResult: (key: string) => void = (key) => {
        const foundIndex = this.props.items.findIndex(({component}) => {
            if (
                SearchTextInput.isClassOf(component) ||
                SeparatorItem.isClassOf(component)
            ) {
                return false;
            }

            // Flow doesn't know that the component is an OptionItem
            // $FlowIgnore[prop-missing]
            const label = component.props?.label.toLowerCase();
            return label.startsWith(key);
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
                }
            });
        }

        // Otherwise, reset current text
        this.textSuggestion = "";
    };

    // Some keys should be handled during the keyup event instead.
    handleKeyUp: (event: SyntheticKeyboardEvent<>) => void = (event) => {
        const {onOpenChanged, open} = this.props;
        const keyCode = event.which || event.keyCode;
        switch (keyCode) {
            case keyCodes.space:
                // When we display SearchTextInput and the focus is on it,
                // we should let the user type space.
                if (this.hasSearchBox() && this.focusedIndex === 0) {
                    return;
                }
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
            case keyCodes.escape:
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

    handleClickFocus: (index: number) => void = (index) => {
        // Turn itemsClicked on so pressing up or down would focus the
        // appropriate item in handleKeyDown
        this.itemsClicked = true;
        this.focusedIndex = index;
        this.focusedOriginalIndex =
            this.state.itemRefs[this.focusedIndex].originalIndex;
    };

    handleDropdownMouseUp: (event: SyntheticMouseEvent<>) => void = (event) => {
        // $FlowIgnore[method-unbinding]
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

    maybeRenderNoResults(): React.Node {
        const {
            items,
            onSearchTextChanged,
            searchText,
            labels: {noResults},
        } = this.props;
        const showSearchTextInput =
            !!onSearchTextChanged && typeof searchText === "string";

        const includeSearchCount = showSearchTextInput ? 1 : 0;

        // Verify if there are items to be rendered or not
        const numResults = items.length - includeSearchCount;

        if (numResults === 0) {
            return (
                <LabelMedium
                    style={styles.noResult}
                    testId="dropdown-core-no-results"
                >
                    {noResults}
                </LabelMedium>
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
        if (item.component.props.onClick) {
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
    renderList(): React.Node {
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

            // Render the SearchField component.
            if (SearchTextInput.isClassOf(component)) {
                return React.cloneElement(component, {
                    ...populatedProps,

                    key: "search-text-input",
                    // pass the current ref down to the input element
                    itemRef: currentRef,
                    // override to avoid losing focus when pressing a key
                    onClick: () => {
                        this.handleClickFocus(0);
                        this.focusCurrentItem();
                    },
                    // apply custom styles
                    style: searchInputStyle,
                });
            }

            // Render OptionItem and/or ActionItem elements.
            return React.cloneElement(component, {
                ...populatedProps,
                key: index,
                onClick: () => {
                    this.handleItemClick(focusIndex, item);
                },
                // Only pass the ref if the item is focusable.
                ref: focusable ? currentRef : null,
                role: itemRole,
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
            if (!SeparatorItem.isClassOf(item.component) && item.focusable) {
                focusCounter += 1;
            }

            const focusIndex = focusCounter - 1;

            if (SearchTextInput.isClassOf(item.component)) {
                return {
                    ...item,
                    // override to avoid losing focus when pressing a key
                    onClick: () => {
                        this.handleClickFocus(0);
                        this.focusCurrentItem();
                    },
                    populatedProps: {
                        style: searchInputStyle,
                        // pass the current ref down to the input element
                        itemRef: this.state.itemRefs[focusIndex]
                            ? this.state.itemRefs[focusIndex].ref
                            : null,
                    },
                };
            }

            return {
                ...item,
                role: itemRole,
                ref: item.focusable
                    ? this.state.itemRefs[focusIndex]
                        ? this.state.itemRefs[focusIndex].ref
                        : null
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
    renderVirtualizedList(): React.Node {
        // preprocess items data to pass it to the renderer
        const virtualizedItems = this.parseVirtualizedItems();
        return (
            <DropdownCoreVirtualized
                data={virtualizedItems}
                listRef={this.virtualizedListRef}
            />
        );
    }

    renderDropdownMenu(
        listRenderer: React.Node,
        isReferenceHidden: ?boolean,
    ): React.Node {
        const {dropdownStyle, light, openerElement} = this.props;

        // The dropdown width is at least the width of the opener.
        // It's only used if the element exists in the DOM
        const openerStyle =
            openerElement && window.getComputedStyle(openerElement);
        const minDropdownWidth = openerStyle
            ? openerStyle.getPropertyValue("width")
            : 0;

        // Vertical padding of the dropdown menu + borders
        const initialHeight = 12;

        const maxDropdownHeight = getDropdownMenuHeight(
            this.props.items,
            initialHeight,
        );

        return (
            <View
                // Stop propagation to prevent the mouseup listener on the
                // document from closing the menu.
                onMouseUp={this.handleDropdownMouseUp}
                role={this.props.role}
                style={[
                    styles.dropdown,
                    light && styles.light,
                    isReferenceHidden && styles.hidden,
                    generateDropdownMenuStyles(
                        minDropdownWidth,
                        maxDropdownHeight,
                    ),

                    dropdownStyle,
                ]}
            >
                {listRenderer}
                {this.maybeRenderNoResults()}
            </View>
        );
    }

    renderDropdown(): React.Node {
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

    render(): React.Node {
        const {open, opener, style, className} = this.props;

        return (
            <View
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
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
        backgroundColor: Color.white,
        borderRadius: 4,
        paddingTop: Spacing.xxxSmall_4,
        paddingBottom: Spacing.xxxSmall_4,
        border: `solid 1px ${Color.offBlack16}`,
        boxShadow: `0px 8px 8px 0px ${fade(Color.offBlack, 0.1)}`,
        overflowY: "auto",
    },

    light: {
        // Pretty much just remove the border
        border: "none",
    },

    hidden: {
        pointerEvents: "none",
        visibility: "hidden",
    },

    noResult: {
        color: Color.offBlack64,
        alignSelf: "center",
        marginTop: Spacing.xxSmall_6,
    },
});

type ExportProps = WithoutActionScheduler<
    React.ElementConfig<typeof DropdownCore>,
>;

export default (withActionScheduler(
    DropdownCore,
): React.ComponentType<ExportProps>);
