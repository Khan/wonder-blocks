// @flow
// A menu that consists of action items

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Color, {fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

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
|};

export default class DropdownCore extends React.Component<DropdownCoreProps> {
    element: ?Element;
    // We need the menu width to tell it how to position itself for
    // right-aligned menus
    menuWidth: ?number;
    menuElement: ?Element;

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

        // If the menu just changed from closed to open, and if we haven't
        // found the correct menuWidth yet
        if (!prevProps.open && this.props.open && !this.menuWidth) {
            // There is a timeout because if we call getBoundingClientRect
            // right away, it returns the value of the document width instead
            // of the width of the just-mounted component, the menu.
            requestAnimationFrame(() => {
                if (this.menuElement) {
                    const rect = this.menuElement.getBoundingClientRect();
                    // This update forcing would only happen once, because now
                    // this.menuWidth is set
                    this.menuWidth = rect.width;
                    this.forceUpdate();
                }
            });
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
        document.addEventListener("mouseup", this._handleInteract);
        document.addEventListener("touchend", this._handleInteract);
        // This is still keyup because we are listening for the escape key,
        // which invokes events keydown and keyup and NOT keypress.
        document.addEventListener("keyup", this._handleKeyup);
    }

    removeEventListeners() {
        document.removeEventListener("mouseup", this._handleInteract);
        document.removeEventListener("touchend", this._handleInteract);
        document.removeEventListener("keyup", this._handleKeyup);
    }

    _handleInteract = (event: {target: any}) => {
        const target: Node = event.target;
        if (this.props.open && this.element && !this.element.contains(target)) {
            this.props.onOpenChanged(false);
        }
    };

    _handleKeyup = (event: KeyboardEvent) => {
        if (this.props.open && event.key === "Escape") {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.props.onOpenChanged(false);
        }
    };

    getOpenerBounds() {
        const {openerElement} = this.props;
        if (openerElement) {
            const rect = openerElement.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset,
                width: rect.width,
            };
        }
    }

    getTranslatedPosition(openerBounds: {
        top: number,
        left: number,
        width: number,
    }) {
        const {top, left, width} = openerBounds;
        if (this.props.alignment === "left") {
            return {
                transform: `translate3d(${left}px, ${top}px, 0)`,
            };
        } else {
            return {
                transform: `translate3d(${left +
                    width -
                    (this.menuWidth || 0)}px, ${top}px, 0)`,
            };
        }
    }

    maybeRenderMenu() {
        const {items, light, open, style} = this.props;
        const body = document.querySelector("body");

        const bounds = this.getOpenerBounds();
        const translatedPosition = bounds && this.getTranslatedPosition(bounds);

        if (open && body) {
            return ReactDOM.createPortal(
                <View
                    onMouseUp={(event) => {
                        // Stop propagation to prevent the mouseup listener
                        // on the document from closing the menu.
                        event.nativeEvent.stopImmediatePropagation();
                    }}
                    ref={(node) =>
                        (this.menuElement = ((ReactDOM.findDOMNode(
                            node,
                        ): any): Element))
                    }
                    style={[
                        styles.dropdown,
                        light && styles.light,
                        !(open && this.menuWidth) && styles.hide,
                        translatedPosition,
                        // TODO: apply styld in better place
                        style,
                    ]}
                >
                    {items}
                </View>,
                body,
            );
        }
    }

    render() {
        const {alignment, opener} = this.props;

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
                {this.maybeRenderMenu()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuWrapper: {
        width: "fit-content",
        alignItems: "flex-start",
    },

    rightAlign: {
        alignItems: "flex-end",
        alignSelf: "flex-end",
    },

    dropdown: {
        backgroundColor: Color.white,
        position: "absolute",
        borderRadius: 4,
        // The space between the opener and the top of the menu
        paddingTop: Spacing.xxxSmall,
        paddingBottom: Spacing.xxxSmall,
        border: `solid 1px ${Color.offBlack16}`,
        boxShadow: `0px 8px 8px 0px ${fade(Color.offBlack, 0.1)}`,
        top: 40,
        // NOTE: This is the z-index of the currently existing menus in the
        // webapp. Perhaps wonderblocks will design a z-index hierarchy?
        // TODO(sophie): remove when portals are incorporated
        zIndex: 1000,
    },

    light: {
        // Pretty much just remove the border
        border: "none",
    },

    hide: {
        visibility: "hidden",
    },
});
