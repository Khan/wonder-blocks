// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipPopper, TooltipTail} from "@khanacademy/wonder-blocks-tooltip";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

import PopoverContent from "./popover-content.js";
import PopoverContentCore from "./popover-content-core.js";
import PopoverContext from "./popover-context.js";
import PopoverAnchor from "./popover-anchor.js";

type Props = {|
    ...AriaProps,

    /**
     * The element that triggers the popover. This element will be used to
     * position the popover. It can be either a Node or a function using the
     * children-as-function pattern to pass an open function for use anywhere
     * within children. The latter provides a lot of flexibility in terms of
     * what actions may trigger the `Popover` to launch the popover window.
     */
    children: React.Element<any> | (({open: () => void}) => React.Node),

    /**
     * The content of the popover. You can either use
     * [PopoverContent](#PopoverContent) with one of the pre-defined variants,
     * or include your own custom content using
     * [PopoverContentCore](#PopoverContentCore directly.
     *
     * If the popover needs to close itself, the close function provided to this
     * callback can be called to close the popover.
     */
    content:
        | React.Element<typeof PopoverContent>
        | React.Element<typeof PopoverContentCore>
        | (({close: () => void}) =>
              | React.Element<typeof PopoverContentCore>
              | React.Element<typeof PopoverContent>),

    /**
     * Where the popover should try to appear in relation to the trigger element.
     */
    placement: Placement,

    /**
     * When enabled, user can hide the popover content by pressing the `esc` key
     * or clicking/tapping outside of it.
     */
    dismissEnabled?: boolean,

    /**
     * The unique identifier to give to the popover. Provide this in cases where
     * you want to override the default accessibility solution. This identifier
     * will be applied to the popover content.
     *
     * By providing this identifier, the children that this popover anchors to
     * will not be automatically given the
     * [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
     * attribute. Instead, the accessibility solution is the responsibility of
     * the caller.
     *
     * If this is not provided, the
     * [aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
     * attribute will be added to the children with a unique identifier pointing
     * to the popover window.
     */
    id?: string,

    /**
     * Renders the popover when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component. The
     * parent is responsible for managing the opening/closing of the popover
     * when using this prop.
     */
    opened?: boolean,

    /**
     * Called when the popover closes
     */
    onClose?: () => mixed,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type State = {|
    opened: boolean,
    anchorElement: ?HTMLElement,
|};

/**
 * Popovers provide additional related information that is related to a
 * particular element and/or content. They can include text, links, icons and
 * illustrations. The main difference with `Tooltip` is that they are normally
 * triggered by clicking an element.
 *
 * This component uses the `PopoverPopper` component to position the
 * `PopoverContentCore` component according to the children it is wrapping.
 */
export default class Popover extends React.Component<Props, State> {
    // anchorRef: {current: null | HTMLElement};

    static defaultProps = {
        placement: "top",
    };

    state = {
        opened: false,
        anchorElement: null,
    };

    componentDidMount() {
        // check if the current content contains an illustration
        React.Children.map(this.props.content, (child) => {
            // if it's an illustration, check that placement is vertical
            if (
                child.props.image &&
                (this.props.placement === "left" ||
                    this.props.placement === "right")
            ) {
                throw new Error(
                    "'image' can only be vertically placed. You can fix this by either changing `placement` to `top` or `bottom` or removing the `image` prop inside `content`.",
                );
            }
        });
    }

    /**
     * Popover window closed
     */
    handleClose = () => {
        this.setState({opened: false}, () => {
            this.props.onClose && this.props.onClose();
        });
    };

    /**
     * Popover window opened
     */
    handleOpen = () => {
        this.setState({opened: true});
    };

    updateRef(ref: any) {
        const actualRef = ref && ReactDOM.findDOMNode(ref);
        if (actualRef && this.state.anchorElement !== actualRef) {
            this.setState({anchorElement: ((actualRef: any): ?HTMLElement)});
        }
    }

    renderContent() {
        const {content} = this.props;

        if (typeof content === "function") {
            return content({
                close: this.handleClose,
            });
        } else {
            return content;
        }
    }

    renderFrame(props: any) {
        const {placement} = this.props;

        return (
            <View
                ref={props.updateBubbleRef}
                data-placement={placement}
                style={[
                    props.outOfBoundaries && styles.hide,
                    styles[`content-${placement}`],
                    props.style,
                ]}
            >
                {this.renderContent()}
                <TooltipTail
                    updateRef={props.updateTailRef}
                    placement={props.placement}
                    offset={props.tailOffset}
                />
            </View>
        );
    }

    renderPopper() {
        const {placement} = this.props;

        return (
            <TooltipPopper
                anchorElement={this.state.anchorElement}
                placement={placement}
            >
                {(props: any) => this.renderFrame(props)}
            </TooltipPopper>
        );
    }

    getHost() {
        // If we are in a modal, we find where we should be portalling the
        // popover by using the helper function from the modal package on the
        // trigger element. If we are not in a modal, we use body as the
        // location to portal to.
        return (
            maybeGetPortalMountedModalHostElement(this.state.anchorElement) ||
            document.body
        );
    }

    render() {
        const {children} = this.props;
        const {opened} = this.state;

        const popperHost = this.getHost();

        return (
            <PopoverContext.Provider value={{close: this.handleClose}}>
                <PopoverAnchor
                    anchorRef={(ref) => this.updateRef(ref)}
                    onClick={this.handleOpen}
                >
                    {children}
                </PopoverAnchor>
                {popperHost &&
                    opened &&
                    ReactDOM.createPortal(this.renderPopper(), popperHost)}
            </PopoverContext.Provider>
        );
    }
}

const styles = StyleSheet.create({
    /**
     * The hide style ensures that the bounds of the popover stay unchanged.
     * This is because popper.js calculates the bubble position based off its
     * bounds and if we stopped rendering it entirely, it wouldn't know where to
     * place it when it reappeared.
     */
    hide: {
        pointerEvents: "none",
        opacity: 0,
        backgroundColor: "transparent",
        color: "transparent",
    },

    /**
     * Ensure the content and tail are properly arranged.
     */
    "content-top": {
        flexDirection: "column",
    },
    "content-right": {
        flexDirection: "row-reverse",
    },
    "content-bottom": {
        flexDirection: "column-reverse",
    },
    "content-left": {
        flexDirection: "row",
    },
});
