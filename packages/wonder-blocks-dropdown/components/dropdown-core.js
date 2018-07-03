// @flow
// A menu that consists of action items

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

type DropdownCoreProps = {
    // TODO(sophie): figure out how to type ActionItem | SelectItem | SeperatorItem inline
    /**
     * Items for the menu.
     */
    items: Array<React.Node>,

    /**
     * Whether the menu is open or not.
     */
    open: boolean,

    /**
     * The component that opens the menu.
     */
    opener: React.Node,

    /**
     * Callback for when the menu is closed.
     */
    onClose: () => void,

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
};

export default class DropdownCore extends React.Component<DropdownCoreProps> {
    node: ?HTMLDivElement;
    // TODO(sophie): figure out flow typing
    handleClick: (event: any) => void;

    static defaultProps = {
        alignment: "left",
    };

    constructor(props: DropdownCoreProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener("click", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }

    handleClick(event: SyntheticEvent<>) {
        // If click was inside the component, return
        // $FlowFixMe
        if (this.node && this.node.contains(event.target)) {
            return;
        }
        this.props.onClose();
    }

    render() {
        const {alignment, items, light, open, opener, style} = this.props;

        // TODO(sophie): why doesn't ref work with View?
        return (
            <div
                ref={(node) => {
                    this.node = node;
                }}
            >
                <View
                    style={[
                        styles.menuWrapper,
                        alignment === "right" && styles.rightAlign,
                    ]}
                >
                    {opener}
                    {items && (
                        <View
                            style={[
                                styles.dropdown,
                                !open && styles.hide,
                                light && styles.light,
                                style,
                            ]}
                        >
                            {items}
                        </View>
                    )}
                    {open && (
                        <DropdownKeypressListener
                            onClose={this.props.onClose}
                        />
                    )}
                </View>
            </div>
        );
    }
}

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
class DropdownKeypressListener extends React.Component<{
    onClose: () => void,
}> {
    componentDidMount() {
        window.addEventListener("keyup", this._handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this._handleKeyup);
    }

    _handleKeyup = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.props.onClose();
        }
    };

    render() {
        return null;
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
        position: "absolute",
        borderRadius: 4,
        // The space between the opener and the top of the menu
        marginTop: Spacing.xxxSmall,
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
