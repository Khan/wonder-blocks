// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {findFocusableNodes} from "../util/util.js";

type Props = {|
    /**
     * The container to apply the initial focus
     */
    children: React.Element<any>,
    /**
     * The selector for the element that will be focused when the component shows.
     * When not set, the first tabbable element within the component will be used.
     */
    initialFocusId?: string,
|};

/**
 * This component finds which element (from within the children) needs to
 * receive focus. After that, the children is rendered with the focus assigned.
 */
export default class InitialFocus extends React.Component<Props> {
    componentDidMount() {
        const node: HTMLElement = (ReactDOM.findDOMNode(this): any);

        if (!node) {
            return;
        }

        // try to focus on the first focussable element
        this.setInitialFocusableElement(node);
    }

    /**
     * Gets the focusable element and applies focus to it
     */
    setInitialFocusableElement = (node: HTMLElement) => {
        const firstFocusableElement =
            // 1. try to get element specified by the user
            this.maybeGetInitialFocusElement(node) ||
            // 2. get first occurence from list of focusable elements
            this.maybeGetFirstFocusableElement(node) ||
            // 3. get the container itself
            this.getContainerElement(node);

        // focus on the element
        firstFocusableElement.focus();
    };

    /**
     * Returns an element specified by the user
     */
    maybeGetInitialFocusElement(node: HTMLElement): HTMLElement | null {
        const {initialFocusId} = this.props;

        if (!initialFocusId) {
            return null;
        }

        return (ReactDOM.findDOMNode(
            node.querySelector(`#${initialFocusId}`),
        ): any);
    }

    /**
     * Returns the first focusable element found inside the children
     */
    maybeGetFirstFocusableElement(node: HTMLElement): HTMLElement | null {
        // get a collection of elements that can be focused
        const focusableElements = findFocusableNodes(node);

        if (!focusableElements.length) {
            return null;
        }

        // if found, return the first focusable element
        return focusableElements[0];
    }

    /**
     * Returns the container element
     *
     * If no focusable elements are found, the component container itself will
     * receive focus.
     */
    getContainerElement(node: HTMLElement): HTMLElement {
        // add tabIndex to make the container focusable
        node.tabIndex = -1;

        return node;
    }

    render() {
        return this.props.children;
    }
}
