// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";
import {render, screen, fireEvent} from "@testing-library/react";

import ModalBackdrop from "../modal-backdrop.js";
import OnePaneDialog from "../one-pane-dialog.js";

import {unmountAll} from "../../../../../utils/testing/enzyme-shim.js";
import {getElementAttachedToDocument} from "../../../../../utils/testing/get-element-attached-to-document.js";

const wait = (duration: number = 0) =>
    new Promise((resolve, reject) => setTimeout(resolve, duration));

const exampleModal = (
    <OnePaneDialog
        content={<div data-modal-content />}
        title="Title"
        footer={<div data-modal-footer />}
        testId="example-modal-test-id"
    />
);

const exampleModalWithButtons = (
    <OnePaneDialog
        content={
            <div>
                <button data-button-id="1" data-first-button />
                <button data-button-id="2" />
                <button data-button-id="3" />
            </div>
        }
        title="Title"
        footer={<div data-modal-footer />}
    />
);

describe("ModalBackdrop", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        unmountAll();
        if (document.body) {
            document.body.innerHTML = "";
        }
    });

    test("Clicking the backdrop triggers `onCloseModal`", () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <ModalBackdrop
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </ModalBackdrop>,
        );

        const backdrop = screen.getByTestId("modal-backdrop-test-id");

        //Act

        // Simulate click
        //
        // The component looks for mouseup and mousedown instead of just click
        // on the backdrop to make sure the user didn't drag into or out from
        // the modal panel.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(backdrop);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(backdrop);

        // Assert
        expect(onCloseModal).toHaveBeenCalled();
    });

    test("Clicking the modal content does not trigger `onCloseModal`", () => {
        const onCloseModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        wrapper.find("[data-modal-content]").simulate("click");
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking and dragging into the backdrop does not close modal", () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <ModalBackdrop
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </ModalBackdrop>,
        );

        const panel = screen.getByTestId("example-modal-test-id");
        const backdrop = screen.getByTestId("modal-backdrop-test-id");

        // Act

        // Dragging the mouse
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(panel);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(backdrop);

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking and dragging in from the backdrop does not close modal", () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <ModalBackdrop
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </ModalBackdrop>,
        );

        const panel = screen.getByTestId("example-modal-test-id");
        const backdrop = screen.getByTestId("modal-backdrop-test-id");

        // Act

        // Dragging the mouse
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(backdrop);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(panel);

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking the modal footer does not trigger `onCloseModal`", () => {
        const onCloseModal = jest.fn();

        // We use `mount` instead of `shallow` here, because the component's
        // click handler expects actual DOM events.
        const wrapper = mount(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        wrapper.find("[data-modal-footer]").simulate("click");
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("If initialFocusId is set and element is found, we focus that element inside the modal", async () => {
        // Arrange
        // We need the elements in the DOM document, it seems, for this test
        // to work. Changing to testing-library will likely fix this.
        // Then we can remove the lint suppression.
        const attachElement = getElementAttachedToDocument("container");
        const initialFocusId = "initial-focus";

        const wrapper = mount(
            <ModalBackdrop
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                <OnePaneDialog
                    content={
                        <div data-modal-content>
                            <input type="text" />
                            <button id="initial-focus" />
                        </div>
                    }
                    title="Title"
                    footer={<div data-modal-footer />}
                />
            </ModalBackdrop>,
            {attachTo: attachElement},
        );

        // Act
        await wait(); // wait for styles to be applied
        const initialFocusElement = wrapper.find(`#${initialFocusId}`);

        // Assert
        // first we verify the element exists in the DOM
        expect(initialFocusElement).toHaveLength(1);

        // verify the focus is set on the correct element
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(initialFocusElement.getDOMNode());
    });

    test("If initialFocusId is set but element is NOT found, we focus on the first focusable element instead", async () => {
        // Arrange
        // We need the elements in the DOM document, it seems, for this test
        // to work. Changing to testing-library will likely fix this.
        // Then we can remove the lint suppression.
        const attachElement = getElementAttachedToDocument("container");
        const initialFocusId = "initial-focus";
        const firstFocusableElement = "[data-first-button]";

        const wrapper = mount(
            <ModalBackdrop
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </ModalBackdrop>,
            {attachTo: attachElement},
        );

        // Act
        await wait(); // wait for styles to be applied
        const initialFocusElement = wrapper.find(`#${initialFocusId}`);

        // Assert
        // first we verify the element doesn't exist in the DOM
        expect(initialFocusElement).toHaveLength(0);
        // verify the focus is set on the first focusable element instead
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(
            wrapper.find(firstFocusableElement).getDOMNode(),
        );
    });

    test("If no initialFocusId is set, we focus the first button in the modal", async () => {
        // Arrange
        // We need the elements in the DOM document, it seems, for this test
        // to work. Changing to testing-library will likely fix this.
        // Then we can remove the lint suppression.
        const attachElement = getElementAttachedToDocument("container");
        const wrapper = mount(
            <ModalBackdrop onCloseModal={() => {}}>
                {exampleModalWithButtons}
            </ModalBackdrop>,
            {attachTo: attachElement},
        );

        // Act
        await wait(); // wait for styles to be applied
        const focusableElement = wrapper
            .find("[data-first-button]")
            .getDOMNode();

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(focusableElement);
    });

    test("If there are no focusable elements, we focus the Dialog instead", async () => {
        // Arrange
        // We need the elements in the DOM document, it seems, for this test
        // to work. Changing to testing-library will likely fix this.
        // Then we can remove the lint suppression.
        const attachElement = getElementAttachedToDocument("container");
        const wrapper = mount(
            <ModalBackdrop onCloseModal={() => {}}>
                {exampleModal}
            </ModalBackdrop>,
            {attachTo: attachElement},
        );

        // Act
        await wait(); // wait for styles to be applied
        const focusableElement = wrapper
            .find('div[role="dialog"]')
            .getDOMNode();

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(focusableElement);
    });
});
