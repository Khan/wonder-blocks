// @flow
// A menu that consists of action items

import * as React from "react";
import ReactDOM from "react-dom";
import {Popper} from "react-popper";
import {StyleSheet} from "aphrodite";

import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
// NOTE(jeff): Here we share some code for use with PopperJS. Long term,
// we should either contribute this code to the PopperJS component, or its
// own non-wonder-blocks package.
// $FlowIgnoreMe
import visibilityModifierDefaultConfig from "../../../shared-unpackaged/visibility-modifier.js"; // eslint-disable-line import/no-restricted-paths
import SeparatorItem from "./separator-item.js";
import {keyCodes} from "../util/constants.js";
import type {DropdownItem} from "../util/types.js";

type DropdownProps = {|
    /**
     * Items for the menu.
     */
    items: Array<DropdownItem>,

    /**
     * A handler to set the searchText of the parent. When this is provided,
     * a search text input will be displayed at the top of the dropdown body.
     */
    handleSearchTextChanged: ?(e: SyntheticInputEvent<>) => void,

    /**
     * An index that represents the index of the focused element when the menu
     * is opened.
     */
    initialFocusedIndex: number,

    /**
     * Whether the user used the keyboard to open this menu. This activates
     * keyboard navigation behavior and focus from the very start.
     */
    keyboard: ?boolean,

    /**
     * Callback for when the menu is opened or closed. Parameter is whether
     * the dropdown menu should be open and whether a keyboard event triggered
     * the change.
     */
    onOpenChanged: (open: boolean, keyboard?: boolean) => mixed,

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
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

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
     * The aria "role" applied to the dropdown container.
     */
    role: "listbox" | "menu",
|};

type State = {|
    /**
     * Refs to use for keyboard focus, contains only those for focusable items.
     * Also keeps track of the original index of the item.
     */
    itemRefs: Array<{ref: {current: any}, originalIndex: number}>,

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
|};

/**
 * A core dropdown component that takes an opener and children to display as
 * part of the dropdown menu. Renders the dropdown as a portal to avoid clipping
 * in overflow: auto containers.
 */
export default class DropdownCore extends React.Component<
    DropdownProps,
    State,
> {
    // Keeps track of the index of the focused item, out of a list of focusable items
    focusedIndex: number;
    // Keeps track of the index of the focused item in the context of all the
    // items contained by this menu, whether focusable or not, used for figuring
    // out focus correctly when the items have changed in terms of whether
    // they're focusable or not
    focusedOriginalIndex: number;
    // Whether keyboard nav has been activated
    keyboardNavOn: boolean;
    // Whether any items have been selected since the menu was opened
    itemsClicked: boolean;
    popperElement: ?HTMLElement;

    static defaultProps = {
        alignment: "left",
        initialFocusedIndex: 0,
        light: false,
        handleSearchTextChanged: null,
    };

    // Figure out if the same items are focusable. If an item has been added or
    // removed, this method will return false.
    static sameItemsFocusable(
        prevItems: Array<DropdownItem>,
        currentItems: Array<DropdownItem>,
    ) {
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

    // This is here to avoid calling React.createRef on each rerender. Instead,
    // we create the itemRefs only if it's the first time or if the set of items
    // that are focusable has changed.
    static getDerivedStateFromProps(props: DropdownProps, state: State) {
        if (
            (state.itemRefs.length === 0 && props.open) ||
            !DropdownCore.sameItemsFocusable(state.prevItems, props.items)
        ) {
            const itemRefs = [];
            // If the searchTextChange handler is provided, the first focusable
            // item is the search text input element.
            if (props.handleSearchTextChanged) {
                const ref = React.createRef<null | HTMLDivElement>();
                itemRefs.push({ref, originalIndex: 0});
            }

            const shiftItemIndexBy = props.handleSearchTextChanged ? 1 : 0;

            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].focusable) {
                    const ref = React.createRef<null | HTMLDivElement>();
                    itemRefs.push({ref, originalIndex: i + shiftItemIndexBy});
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

    constructor(props: DropdownProps) {
        super(props);

        this.focusedIndex = this.props.initialFocusedIndex;
        this.keyboardNavOn = false;
        this.state = {
            prevItems: this.props.items,
            itemRefs: [],
            sameItemsFocusable: false,
        };
    }

    componentDidMount() {
        this.updateEventListeners();
        this.initialFocusItem();
    }

    componentDidUpdate(prevProps: DropdownProps) {
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
                    if (this.keyboardNavOn) {
                        // If keyboard navigation was already on, use that
                        this.focusCurrentItem();
                    } else {
                        // Otherwise shift focus to the original focus item
                        // (the opener) to listen for further keyboard events
                        if (this.props.openerElement) {
                            this.props.openerElement.focus();
                        }
                    }
                } else {
                    this.focusedIndex = newFocusableIndex;
                }
            }
        }
    }

    componentWillUnmount() {
        this.removeEventListeners();
    }

    // Figure out focus states for the dropdown after it has changed from open
    // to closed or vice versa
    initialFocusItem() {
        const {keyboard, initialFocusedIndex, open} = this.props;

        if (open) {
            // Reset focused index
            this.focusedIndex = initialFocusedIndex;
            // We explicitly set focus to the first item only if we sense
            // that the user opened the menu via the keyboard
            if (keyboard) {
                this.keyboardNavOn = true;
                this.focusCurrentItem();
            }
        } else if (!open) {
            // If the dropdown has been closed, reset the keyboardNavOn boolean
            this.keyboardNavOn = false;
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

    handleInteract = (event: {target: any}) => {
        const {open, onOpenChanged} = this.props;
        const target: Node = event.target;
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

    focusCurrentItem() {
        // Because the dropdown menu is portalled, focusing this element
        // will scroll the window all the way to the top of the screen.
        const x = window.scrollX;
        const y = window.scrollY;
        const node = ((ReactDOM.findDOMNode(
            this.state.itemRefs[this.focusedIndex].ref.current,
        ): any): HTMLElement);
        if (node) {
            node.focus();
            // Keep track of the original index of the newly focused item.
            // To be used if the set of focusable items in the menu changes
            this.focusedOriginalIndex = this.state.itemRefs[
                this.focusedIndex
            ].originalIndex;
        }
        window.scrollTo(x, y);
    }

    focusPreviousItem() {
        if (this.focusedIndex === 0) {
            this.focusedIndex = this.state.itemRefs.length - 1;
        } else {
            this.focusedIndex -= 1;
        }
        this.focusCurrentItem();
    }

    focusNextItem() {
        if (this.focusedIndex === this.state.itemRefs.length - 1) {
            this.focusedIndex = 0;
        } else {
            this.focusedIndex += 1;
        }
        this.focusCurrentItem();
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

    handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
        const {
            initialFocusedIndex,
            onOpenChanged,
            open,
            handleSearchTextChanged: displaySearchTextInput,
        } = this.props;
        const keyCode = event.which || event.keyCode;

        // If menu isn't open and user presses down, open the menu
        if (!open) {
            if (keyCode === keyCodes.down) {
                event.preventDefault();
                onOpenChanged(true, true);
                return;
            }
            return;
        }

        // This is the first use of keyboard navigation
        if (
            !this.keyboardNavOn &&
            (keyCode === keyCodes.up || keyCode === keyCodes.down)
        ) {
            this.keyboardNavOn = true;
            // No items have been clicked so we focus the initial item
            if (!this.itemsClicked) {
                event.preventDefault();
                this.focusedIndex = initialFocusedIndex;
                this.focusCurrentItem();
                return;
            }
        }

        // Handle all other key behavior
        switch (keyCode) {
            case keyCodes.tab:
                this.restoreTabOrder();
                onOpenChanged(false, true);
                return;
            case keyCodes.space:
                // When we display search text input and the focus is on that
                // input, we should let the user type space.
                if (displaySearchTextInput && this.focusedIndex === 0) {
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

    // Some keys should be handled during the keyup event instead.
    handleKeyUp = (event: SyntheticKeyboardEvent<>) => {
        const {
            onOpenChanged,
            open,
            handleSearchTextChanged: displaySearchTextInput,
        } = this.props;
        const keyCode = event.which || event.keyCode;

        switch (keyCode) {
            case keyCodes.space:
                // When we display search text input and the focus is on that
                // input, we should let the user type space.
                if (displaySearchTextInput && this.focusedIndex === 0) {
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
                    onOpenChanged(false, true);
                }
                return;
        }
    };

    handleClickFocus(index: number) {
        // Turn itemsClicked on so pressing up or down would focus the
        // appropriate item in handleKeyDown
        this.itemsClicked = true;
        this.focusedIndex = index;
        this.focusedOriginalIndex = this.state.itemRefs[
            this.focusedIndex
        ].originalIndex;
    }

    handleDropdownMouseUp = (event: SyntheticMouseEvent<>) => {
        if (event.nativeEvent.stopImmediatePropagation) {
            event.nativeEvent.stopImmediatePropagation();
        } else {
            // Workaround for jsdom
            event.stopPropagation();
        }
    };

    getItemRole() {
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

    renderSearchTextInput() {
        const {items, handleSearchTextChanged} = this.props;
        const noResult = handleSearchTextChanged && items.length === 0;
        // TODO(jangmi): Use TextField once we have it.
        // https://khanacademy.atlassian.net/browse/WB-578
        // TODO(jangmi): Use translated strings for "Filter", "No results"
        return (
            <React.Fragment>
                <input
                    type="text"
                    onChange={handleSearchTextChanged}
                    onClick={() => this.handleClickFocus(0)}
                    ref={this.state.itemRefs[0].ref}
                    placeholder="Filter"
                />
                {noResult && (
                    <LabelMedium style={styles.noResult}>
                        No results
                    </LabelMedium>
                )}
            </React.Fragment>
        );
    }

    renderItems(outOfBoundaries: ?boolean) {
        const {
            items,
            dropdownStyle,
            light,
            openerElement,
            handleSearchTextChanged,
        } = this.props;

        // The dropdown width is at least the width of the opener.
        const openerStyle = window.getComputedStyle(openerElement);
        const minDropdownWidth = openerStyle
            ? openerStyle.getPropertyValue("width")
            : 0;

        const itemRole = this.getItemRole();

        // The first item to focus is the search text input if it exists.
        const displaySearchTextInput = !!handleSearchTextChanged;
        let focusCounter = displaySearchTextInput ? 1 : 0;

        return (
            <View
                // Stop propagation to prevent the mouseup listener on the
                // document from closing the menu.
                onMouseUp={this.handleDropdownMouseUp}
                role={this.props.role}
                style={[
                    styles.dropdown,
                    light && styles.light,
                    outOfBoundaries && styles.hidden,
                    {minWidth: minDropdownWidth},
                    dropdownStyle,
                ]}
            >
                {displaySearchTextInput && this.renderSearchTextInput()}
                {items.map((item, index) => {
                    if (SeparatorItem.isClassOf(item.component)) {
                        return item.component;
                    } else {
                        if (item.focusable) {
                            focusCounter += 1;
                        }
                        const focusIndex = focusCounter - 1;
                        return React.cloneElement(item.component, {
                            ...item.populatedProps,
                            key: index,
                            ref:
                                item.focusable &&
                                this.state.itemRefs[focusIndex].ref,
                            role: itemRole,
                            onClick: () => {
                                this.handleClickFocus(focusIndex);
                                if (item.component.props.onClick) {
                                    //$FlowFixMe
                                    item.component.props.onClick();
                                }
                                if (item.populatedProps.onClick) {
                                    item.populatedProps.onClick();
                                }
                            },
                        });
                    }
                })}
            </View>
        );
    }

    renderDropdown() {
        const {alignment, openerElement} = this.props;
        // If we are in a modal, we find where we should be portalling the menu
        // by using the helper function from the modal package on the opener
        // element.
        // If we are not in a modal, we use body as the location to portal to.
        const modalHost =
            maybeGetPortalMountedModalHostElement(openerElement) ||
            document.querySelector("body");

        if (modalHost) {
            return ReactDOM.createPortal(
                <Popper
                    innerRef={(node) => {
                        if (node) {
                            this.popperElement = node;
                        }
                    }}
                    referenceElement={this.props.openerElement}
                    placement={
                        alignment === "left" ? "bottom-start" : "bottom-end"
                    }
                    modifiers={{
                        wbVisibility: visibilityModifierDefaultConfig,
                        preventOverflow: {
                            boundariesElement: "viewport",
                            escapeWithReference: true,
                        },
                    }}
                >
                    {({placement, ref, style, outOfBoundaries}) => {
                        return (
                            <div
                                ref={ref}
                                style={style}
                                data-placement={placement}
                            >
                                {this.renderItems(outOfBoundaries)}
                            </div>
                        );
                    }}
                </Popper>,
                modalHost,
            );
        }
    }

    render() {
        const {open, opener, style} = this.props;
        return (
            <View
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                style={[styles.menuWrapper, style]}
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
        paddingTop: Spacing.xxxSmall,
        paddingBottom: Spacing.xxxSmall,
        border: `solid 1px ${Color.offBlack16}`,
        boxShadow: `0px 8px 8px 0px ${fade(Color.offBlack, 0.1)}`,
        overflowY: "auto",
    },

    light: {
        // Pretty much just remove the border
        border: "none",
    },

    hidden: {
        visibility: "hidden",
    },

    noResult: {
        color: Color.offBlack64,
        alignSelf: "center",
    },
});
