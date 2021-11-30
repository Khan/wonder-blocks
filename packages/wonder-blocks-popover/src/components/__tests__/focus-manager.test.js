// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import FocusManager from "../focus-manager.js";
import {findFocusableNodes} from "../../util/util.js";

import {unmountAll} from "../../../../../utils/testing/enzyme-shim.js";
import {getElementAttachedToDocument} from "../../../../../utils/testing/get-element-attached-to-document.js";

describe("FocusManager", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        unmountAll();
        if (document.body) {
            document.body.innerHTML = "";
        }
    });

    it("should focus on the first focusable element inside the popover", async () => {
        // Arrange
        // We need the elements in the DOM document for the focus() calls to
        // work.
        const containerDiv = getElementAttachedToDocument("container");
        const focusManagerDiv = getElementAttachedToDocument("focusManagerDiv");

        const ref = await new Promise((resolve) => {
            const nodes = (
                <div ref={resolve}>
                    <button data-anchor />
                    <button data-next />
                </div>
            );
            mount(nodes, {attachTo: containerDiv});
        });
        const domNode = ((ReactDOM.findDOMNode(ref): any): HTMLElement);

        // mock focusable elements in document
        global.document.querySelectorAll = jest
            .fn()
            .mockImplementation(() => findFocusableNodes(domNode));

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = ((domNode.querySelector(
            "[data-anchor]",
        ): any): HTMLElement);

        const wrapper = mount(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button data-tab-index="0" />
                    <button data-tab-index="1" />
                    <button data-tab-index="2" />
                </div>
            </FocusManager>,
            {attachTo: focusManagerDiv},
        );

        // Act
        // focus on the previous element before the popover (anchor element)
        anchorElementNode.focus();
        // press `tab` to focus on the next element
        const event = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: false,
        });
        anchorElementNode.dispatchEvent(event);

        const firstFocusableElementInside = wrapper
            .find('[data-tab-index="0"]')
            .getDOMNode();

        // Assert
        expect(document.activeElement).toBe(firstFocusableElementInside);
    });

    it("should focus on the last focusable element inside the popover", async () => {
        // Arrange
        // We need the elements in the DOM document for the focus() calls to
        // work.
        const containerDiv = getElementAttachedToDocument("container");
        const focusManagerDiv = getElementAttachedToDocument("focusManagerDiv");

        const ref = await new Promise((resolve) => {
            const nodes = (
                <div ref={resolve}>
                    <button data-anchor />
                    <button data-next />
                </div>
            );
            mount(nodes, {attachTo: containerDiv});
        });
        const domNode = ((ReactDOM.findDOMNode(ref): any): HTMLElement);

        // mock focusable elements in document
        global.document.querySelectorAll = jest
            .fn()
            .mockImplementation(() => findFocusableNodes(domNode));

        // get the anchor reference to be able pass it to the FocusManager
        const anchorElementNode = ((domNode.querySelector(
            "[data-anchor]",
        ): any): HTMLElement);

        const wrapper = mount(
            <FocusManager anchorElement={anchorElementNode}>
                <div>
                    <button data-tab-index="0" />
                    <button data-tab-index="1" />
                    <button data-tab-index="2" />
                </div>
            </FocusManager>,
            {attachTo: focusManagerDiv},
        );

        // Act

        // find previous focusable element outside the popover
        const nextFocusableElementOutside = ((domNode.querySelector(
            "[data-next]",
        ): any): HTMLElement);

        // focus on the next element after the popover
        nextFocusableElementOutside.focus();
        // press `Shift+tab` to focus on the previous element
        const event = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: true,
        });
        nextFocusableElementOutside.dispatchEvent(event);

        const lastFocusableElementInside = wrapper
            .find('[data-tab-index="2"]')
            .getDOMNode();

        // Assert
        expect(document.activeElement).toBe(lastFocusableElementInside);
    });
});
