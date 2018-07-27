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

import visibilityModifierDefaultConfig from "../util/visibility-modifier.js";
import typeof ActionItem from "./action-item.js";
import typeof SelectItem from "./select-item.js";
import typeof SeparatorItem from "./separator-item.js";

type DropdownCoreProps = {|
    /**
     * Items for the menu.
     */
    items: Array<React.Element<ActionItem | SelectItem | SeparatorItem>>,

    /**
     * Whether the menu is open or not.
     */
    open: boolean,

    /**
     * The component that opens the menu.
     */
    opener: React.Element<*>,

    /**
     * Ref to the opener element.
     */
    openerElement: ?Element,

    /**
     * Callback for when the menu is opened or closed. Parameter is whether
     * the dropdown menu should be open.
     */
    onOpenChanged: (open: boolean) => void,

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
     * Optional styling to add to dropdown menu.
     */
    style?: any,

    dropdownStyle?: any,
|};

export default class DropdownCore extends React.Component<DropdownCoreProps> {
    element: ?Element;

    static defaultProps = {
        alignment: "left",
    };

    constructor(props: DropdownCoreProps) {
        super(props);
    }

    componentDidMount() {
        this.updateEventListeners();
    }

    componentDidUpdate(prevProps: DropdownCoreProps) {
        if (prevProps.open !== this.props.open) {
            this.updateEventListeners();
        }
    }

    componentWillUnmount() {
        this.removeEventListeners();
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
        document.addEventListener("keyup", this.handleKeyup);
    }

    removeEventListeners() {
        document.removeEventListener("mouseup", this.handleInteract);
        document.removeEventListener("touchend", this.handleInteract);
        document.removeEventListener("keyup", this.handleKeyup);
    }

    handleInteract = (event: {target: any}) => {
        const {open, onOpenChanged} = this.props;
        const target: Node = event.target;
        if (open && this.element && !this.element.contains(target)) {
            onOpenChanged(false);
        }
    };

    handleKeyup = (event: KeyboardEvent) => {
        const {open, onOpenChanged} = this.props;
        if (open && event.key === "Escape") {
            event.preventDefault();
            event.stopImmediatePropagation();
            onOpenChanged(false);
        }
    };

    renderMenu(outOfBoundaries: ?boolean) {
        const {items, light, dropdownStyle} = this.props;

        return (
            <View
                onMouseUp={(event) => {
                    // Stop propagation to prevent the mouseup listener
                    // on the document from closing the menu.
                    event.nativeEvent.stopImmediatePropagation();
                }}
                style={[
                    styles.dropdown,
                    light && styles.light,
                    outOfBoundaries && styles.hidden,
                    dropdownStyle,
                ]}
            >
                {items}
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
                    referenceElement={this.props.openerElement}
                    placement={
                        alignment === "left" ? "bottom-start" : "bottom-end"
                    }
                    modifiers={{
                        wbVisibility: visibilityModifierDefaultConfig,
                        preventOverflow: {boundariesElement: "viewport"},
                    }}
                >
                    {({placement, ref, style, outOfBoundaries}) => {
                        return (
                            <div
                                ref={ref}
                                style={style}
                                data-placement={placement}
                            >
                                {this.renderMenu(outOfBoundaries)}
                            </div>
                        );
                    }}
                </Popper>,
                modalHost,
            );
        }
    }

    render() {
        const {alignment, open, opener} = this.props;

        return (
            <View
                ref={(node) =>
                    (this.element = ((ReactDOM.findDOMNode(
                        node,
                    ): any): Element))
                }
                style={[
                    styles.menuWrapper,
                    alignment === "right" && styles.rightAlign,
                ]}
            >
                {opener}
                {open && this.renderDropdown()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuWrapper: {
        alignItems: "flex-start",
    },

    rightAlign: {
        alignItems: "flex-end",
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
});
