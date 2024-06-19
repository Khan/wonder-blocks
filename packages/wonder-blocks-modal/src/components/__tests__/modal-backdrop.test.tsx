import * as React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import ModalBackdrop from "../modal-backdrop";
import OnePaneDialog from "../one-pane-dialog";

const exampleModal = (
    <OnePaneDialog
        content={<div data-testid="example-modal-content" />}
        title="Title"
        footer={<div data-testid="example-modal-footer" />}
        testId="example-modal-test-id"
    />
);

const exampleModalWithButtons = (
    <OnePaneDialog
        content={
            <div>
                <button>first focusable button</button>
                <button />
                <button />
            </div>
        }
        title="Title"
        footer={<div data-modal-footer />}
    />
);

describe("ModalBackdrop", () => {
    test("Clicking the backdrop triggers `onCloseModal`", async () => {
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

        const backdrop = await screen.findByTestId("modal-backdrop-test-id");

        //Act
        await userEvent.click(backdrop);

        // Assert
        expect(onCloseModal).toHaveBeenCalled();
    });

    test("Clicking the modal content does not trigger `onCloseModal`", async () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        // Act
        await userEvent.click(
            await screen.findByTestId("example-modal-content"),
        );

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking and dragging into the backdrop does not close modal", async () => {
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

        const panel = await screen.findByTestId("example-modal-test-id");
        const backdrop = await screen.findByTestId("modal-backdrop-test-id");

        // Act

        // Dragging the mouse
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(panel);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(backdrop);

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking and dragging in from the backdrop does not close modal", async () => {
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

        const panel = await screen.findByTestId("example-modal-test-id");
        const backdrop = await screen.findByTestId("modal-backdrop-test-id");

        // Act

        // Dragging the mouse
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(backdrop);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(panel);

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("Clicking the modal footer does not trigger `onCloseModal`", async () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <ModalBackdrop onCloseModal={onCloseModal}>
                {exampleModal}
            </ModalBackdrop>,
        );

        // Act
        await userEvent.click(
            await screen.findByTestId("example-modal-footer"),
        );

        // Assert
        expect(onCloseModal).not.toHaveBeenCalled();
    });

    test("If initialFocusId is set and element is found, we focus that element inside the modal", async () => {
        // Arrange
        const initialFocusId = "initial-focus";

        render(
            <ModalBackdrop
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                <OnePaneDialog
                    content={
                        <div data-modal-content>
                            <input type="text" />
                            <button id="initial-focus">Initial focus</button>
                        </div>
                    }
                    title="Title"
                    footer={<div data-modal-footer />}
                />
            </ModalBackdrop>,
        );

        // Act
        const initialFocusElement = await screen.findByRole("button", {
            name: "Initial focus",
        });

        // Assert
        await waitFor(() => expect(initialFocusElement).toHaveFocus());
    });

    test("If initialFocusId is set but element is NOT found, we focus on the first focusable element instead", async () => {
        // Arrange
        // This element does not exist in the DOM
        const initialFocusId = "unknown-node";

        const {container} = render(
            <ModalBackdrop
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </ModalBackdrop>,
        );

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const initialFocusElement = container.querySelector(
            `#${initialFocusId}`,
        );

        const firstFocusableElement = await screen.findByRole("button", {
            name: "first focusable button",
        });

        // Assert
        // first we verify the element doesn't exist in the DOM
        expect(initialFocusElement).not.toBeInTheDocument();
        // verify the focus is set on the first focusable element instead
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });

    test("If no initialFocusId is set, we focus the first button in the modal", async () => {
        // Arrange
        render(
            <ModalBackdrop onCloseModal={() => {}}>
                {exampleModalWithButtons}
            </ModalBackdrop>,
        );

        // Act
        const firstFocusableElement = await screen.findByRole("button", {
            name: "first focusable button",
        });

        // Assert
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });

    test("If there are no focusable elements, we focus the Dialog instead", async () => {
        // Arrange
        render(
            <ModalBackdrop onCloseModal={() => {}}>
                {exampleModal}
            </ModalBackdrop>,
        );

        // Act
        const firstFocusableElement = await screen.findByRole("dialog");

        // Assert
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });
});
