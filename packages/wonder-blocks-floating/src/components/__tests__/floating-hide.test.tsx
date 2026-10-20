import * as React from "react";
import * as ReactDOM from "react-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Floating from "../floating";

// jsdom doesn't do layout, so we mock the `hide` middleware to report the
// reference element as hidden (e.g. scrolled out of view, or covered by the
// virtual keyboard on mobile devices).
jest.mock("@floating-ui/react", () => {
    const actual = jest.requireActual("@floating-ui/react");
    return {
        ...actual,
        hide: () => ({
            name: "hide",
            fn: () => ({data: {referenceHidden: true}}),
        }),
    };
});

describe("Floating (hide)", () => {
    it("should hide the floating element when the reference element is hidden", async () => {
        // Arrange
        render(
            <Floating
                content="Floating content"
                open={true}
                focusManagerEnabled={false}
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        const floating = screen.getByText("Floating content");

        // Assert
        await waitFor(() => {
            expect(floating).toHaveStyle({visibility: "hidden"});
        });
    });

    it("should keep the floating element visible while it contains the focused element", async () => {
        // Arrange
        render(
            <Floating
                content={<input aria-label="Feedback" />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "visible",
            });
        });
    });

    it("should hide the floating element again when focus moves out of it", async () => {
        // Arrange
        render(
            <Floating
                content={<input aria-label="Feedback" />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Trigger"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });

    it("should keep the floating element visible when focus moves between text fields inside of it", async () => {
        // Arrange
        render(
            <Floating
                content={
                    <>
                        <input aria-label="Name" />
                        <textarea aria-label="Feedback" />
                    </>
                }
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );
        await userEvent.click(screen.getByRole("textbox", {name: "Name"}));

        // Act
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "visible",
            });
        });
    });

    it("should hide the floating element when an element that isn't a text field has focus", async () => {
        // Arrange
        render(
            <Floating
                content={<button>Submit</button>}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Submit"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });

    it("should hide the floating element when the focused text field is removed", async () => {
        // Arrange
        const {rerender} = render(
            <Floating
                content={<input aria-label="Feedback" />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Act
        rerender(
            <Floating
                content="Thanks for your feedback!"
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });

    it("should keep the floating element visible when focus moves from a text field to a button inside of it", async () => {
        // Arrange
        render(
            <Floating
                content={
                    <>
                        <textarea aria-label="Feedback" />
                        <button>Submit</button>
                    </>
                }
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Submit"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "visible",
            });
        });
    });

    it("should keep the floating element visible when pressing a button inside of it moves focus to nothing", async () => {
        // Arrange
        render(
            <Floating
                content={
                    <>
                        <textarea aria-label="Feedback" />
                        <button>Submit</button>
                    </>
                }
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );
        const textArea = screen.getByRole("textbox", {name: "Feedback"});
        await userEvent.click(textArea);

        // Act
        // Some browsers (e.g. Safari) don't focus buttons when they're
        // clicked, so the text field loses focus without a related target.
        // NOTE: userEvent would also move focus to the button (like Chrome
        // does), so we fire the events directly.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.pointerDown(screen.getByRole("button", {name: "Submit"}));
        fireEvent.focusOut(textArea, {relatedTarget: null});

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "visible",
            });
        });
    });

    it("should hide the floating element when a read-only text field has focus", async () => {
        // Arrange
        render(
            <Floating
                content={<input aria-label="Share link" readOnly={true} />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        await userEvent.click(
            screen.getByRole("textbox", {name: "Share link"}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });

    it("should hide the floating element when a text field marked as disabled with aria-disabled has focus", async () => {
        // Arrange
        render(
            <Floating
                content={<input aria-label="Feedback" aria-disabled={true} />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        await userEvent.click(screen.getByRole("textbox", {name: "Feedback"}));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });

    it("should hide the floating element when a text field in portaled content has focus", async () => {
        // Arrange
        const PortaledField = () =>
            ReactDOM.createPortal(
                <input aria-label="Nested field" />,
                document.body,
            );
        render(
            <Floating
                content={<PortaledField />}
                open={true}
                focusManagerEnabled={false}
                testId="floating"
            >
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        await userEvent.click(
            screen.getByRole("textbox", {name: "Nested field"}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("floating")).toHaveStyle({
                visibility: "hidden",
            });
        });
    });
});
