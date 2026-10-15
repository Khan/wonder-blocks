import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
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

    it("should keep the floating element visible when focus moves between elements inside of it", async () => {
        // Arrange
        render(
            <Floating
                content={
                    <>
                        <input aria-label="Feedback" />
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
});
