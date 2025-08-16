import * as React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import DrawerBackdrop from "../drawer-backdrop";
import FlexibleDialog from "../flexible-dialog";

const exampleModal = (
    <FlexibleDialog
        content={<div data-testid="example-modal-content" />}
        title="Title"
        testId="example-modal-test-id"
    />
);

const exampleModalWithButtons = (
    <FlexibleDialog
        content={
            <div>
                <button>first focusable button</button>
                <button />
                <button />
            </div>
        }
        title="Title"
    />
);

describe("DrawerBackdrop", () => {
    test("Clicking the backdrop triggers `onCloseModal`", async () => {
        // Arrange
        const onCloseModal = jest.fn();

        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </DrawerBackdrop>,
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
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={onCloseModal}
            >
                {exampleModal}
            </DrawerBackdrop>,
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
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </DrawerBackdrop>,
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
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={onCloseModal}
                testId="modal-backdrop-test-id"
            >
                {exampleModal}
            </DrawerBackdrop>,
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

    test("If initialFocusId is set and element is found, we focus that element inside the modal", async () => {
        // Arrange
        const initialFocusId = "initial-focus";

        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                <FlexibleDialog
                    content={
                        <div data-modal-content>
                            <input type="text" />
                            <button id="initial-focus">Initial focus</button>
                        </div>
                    }
                    title="Title"
                />
            </DrawerBackdrop>,
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
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                initialFocusId={initialFocusId}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </DrawerBackdrop>,
        );

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const initialFocusElement = container.querySelector(
            `#${initialFocusId}`,
        );

        const firstFocusableElement = await screen.findByRole("button", {
            name: "Close modal",
        });

        // Assert
        // first we verify the element doesn't exist in the DOM
        expect(initialFocusElement).not.toBeInTheDocument();
        // verify the focus is set on the first focusable element instead
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });

    test("If no initialFocusId is set, we focus the dismiss button in the modal", async () => {
        // Arrange
        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </DrawerBackdrop>,
        );

        // Act
        const firstFocusableElement = await screen.findByRole("button", {
            name: "Close modal",
        });

        // Assert
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });

    test("If there are no focusable elements, we focus the Dialog instead", async () => {
        // Arrange
        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={() => {}}
            >
                <FlexibleDialog
                    content={<div data-testid="example-modal-content" />}
                    title="Title"
                    testId="example-modal-test-id"
                    // Ensure that there are no focusable elements
                    closeButtonVisible={false}
                />
            </DrawerBackdrop>,
        );

        // Act
        const firstFocusableElement = await screen.findByRole("dialog");

        // Assert
        await waitFor(() => expect(firstFocusableElement).toHaveFocus());
    });

    test("When not animated, it focuses the close button immediately", async () => {
        // Arrange
        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={false}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </DrawerBackdrop>,
        );

        // Act
        const closeButton = await screen.findByRole("button", {
            name: "Close modal",
        });

        // Assert - focus happens on next tick (timeout 0)
        await waitFor(() => expect(closeButton).toHaveFocus());
    });

    test("When animated, it focuses the close button after timingDuration", async () => {
        // Arrange
        jest.useFakeTimers();
        const customTimingDuration = 500;

        render(
            <DrawerBackdrop
                alignment="inlineStart"
                animated={true}
                timingDuration={customTimingDuration}
                onCloseModal={() => {}}
            >
                {exampleModalWithButtons}
            </DrawerBackdrop>,
        );

        // Act
        const closeButton = await screen.findByRole("button", {
            name: "Close modal",
        });

        // Should not be focused immediately
        expect(closeButton).not.toHaveFocus();

        // Advance timers to just before the duration
        jest.advanceTimersByTime(customTimingDuration - 1);
        expect(closeButton).not.toHaveFocus();

        // Advance the remaining time
        jest.advanceTimersByTime(1);

        // Assert
        expect(closeButton).toHaveFocus();

        jest.useRealTimers();
    });
});
