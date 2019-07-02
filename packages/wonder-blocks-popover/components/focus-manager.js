// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {findFocusableNodes} from "../util/util.js";

type Props = {|
    /**
     * The popover content container
     */
    children: React.Element<any>,

    /**
     * A reference to the trigger element
     */
    anchorElement: ?HTMLElement,
|};

/**
 * This component ensures that focus flows correctly when the popover is open.
 *
 * Inside the popover:
 * - `tab`: Moves focus to the next focusable element.
 * - `shift + tab`: Moves focus to the previous focusable element.
 *
 * After the focus reaches the start/end of the popover,  then we handle two
 * different scenarios:
 *
 * 1. If the focus has reached the last focusable element inside the popover,
 *    the next tab will set focus on the next focusable element that exists
 *    after the PopoverAnchor.
 * 2. If the focus is set to the first focusable element inside the popover, the
 *    next shift + tab will set focus on the PopoverAnchor element.
 *
 */
export default class FocusManager extends React.Component<Props> {
    /**
     * The focusable element that is positioned after the trigger element
     */
    nextElementAfterPopover: ?HTMLElement;

    /**
     * Tabbing is restricted to descendents of this element.
     */
    rootNode: ?HTMLElement;

    componentDidMount() {
        if (!this.nextElementAfterPopover) {
            this.getNextFocusableElement();
        }
    }

    componentDidUpdate() {
        if (!this.nextElementAfterPopover) {
            this.getNextFocusableElement();
        }
    }

    /**
     * Remove handlers
     */
    componentWillUnmount() {
        const {anchorElement} = this.props;

        if (anchorElement) {
            // wait for styles to applied
            setTimeout(() => anchorElement.focus(), 0);

            anchorElement.removeEventListener(
                "keydown",
                this.handleKeydownPreviousFocusableElement,
                true,
            );
        }

        if (this.nextElementAfterPopover) {
            this.nextElementAfterPopover.removeEventListener(
                "keydown",
                this.handleKeydownNextFocusableElement,
                true,
            );
        }
    }

    /**
     * List of focusable elements within the popover content
     */
    focusableElementsInPopover = [];

    /**
     * Gets the next focusable element after the anchor element
     */
    getNextFocusableElement = () => {
        const {anchorElement} = this.props;

        if (!anchorElement) {
            return;
        }

        // get the total list of focusable elements within the document
        const focusableElements = findFocusableNodes(document);

        // get anchor element index
        const anchorIndex = focusableElements.indexOf(anchorElement);

        if (anchorIndex >= 0) {
            // guess next focusable element index
            const nextElementIndex =
                anchorIndex < focusableElements.length - 1
                    ? anchorIndex + 1
                    : 0;

            // get next element's DOM reference
            this.nextElementAfterPopover = focusableElements[nextElementIndex];

            this.nextElementAfterPopover.addEventListener(
                "keydown",
                this.handleKeydownNextFocusableElement,
                true,
            );

            anchorElement.addEventListener(
                "keydown",
                this.handleKeydownPreviousFocusableElement,
                true,
            );
        }
    };

    /**
     * Gets the list of focusable elements inside the popover
     */
    getComponentRootNode = (node: any) => {
        if (!node) {
            // The component is being umounted
            return;
        }

        const rootNode: HTMLElement = (ReactDOM.findDOMNode(node): any);

        if (!rootNode) {
            throw new Error(
                "Assertion error: root node should exist after mount",
            );
        }

        this.rootNode = (rootNode: HTMLElement);

        // store the list of possible focusable elements inside the popover
        this.focusableElementsInPopover = findFocusableNodes(this.rootNode);
    };

    /**
     * Triggered when the focus is set to the first sentinel.
     * This way, the focus will be redirected to the anchor element.
     */
    handleFocusPreviousFocusableElement = () => {
        if (this.props.anchorElement) {
            this.props.anchorElement.focus();
        }
    };

    /**
     * Triggered when the focus is set to the last sentinel. This way, the focus
     * will be redirected to next element after the anchor element.
     */
    handleFocusNextFocusableElement = () => {
        if (this.nextElementAfterPopover) {
            this.nextElementAfterPopover.focus();
        }
    };

    /**
     * Triggered when the focus is leaving the previous focusable element. This
     * way, the focus is redirected to the first focusable element inside the
     * popover.
     */
    handleKeydownPreviousFocusableElement = (e: KeyboardEvent) => {
        // It will try focus only if the user is pressing `tab`
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            this.focusableElementsInPopover[0].focus();
        }
    };

    /**
     * Triggered when the focus is leaving the next focusable element.
     * This way, the focus is redirected to the last focusable element inside
     * the popover.
     */
    handleKeydownNextFocusableElement = (e: KeyboardEvent) => {
        // It will try focus only if the user is pressing `Shift+tab`
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            const lastElementIndex = this.focusableElementsInPopover.length - 1;
            this.focusableElementsInPopover[lastElementIndex].focus();
        }
    };

    render() {
        return (
            <React.Fragment>
                {/* first sentinel */}
                <div
                    tabIndex="0"
                    onFocus={this.handleFocusPreviousFocusableElement}
                />
                >
                <div ref={this.getComponentRootNode}>{this.props.children}</div>
                {/* last sentinel */}
                <div
                    tabIndex="0"
                    onFocus={this.handleFocusNextFocusableElement}
                />
            </React.Fragment>
        );
    }
}
