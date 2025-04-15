import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Pill from "../pill";

describe("Pill", () => {
    test("renders the text", async () => {
        // Arrange, Act
        render(<Pill>Hello, world!</Pill>);

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeVisible();
    });

    test("should set attributes correctly (no onClick)", async () => {
        // Arrange
        const pillRef = React.createRef<HTMLElement>();
        render(
            <Pill id="pill-id" role="radio" testId="pill-test-id" ref={pillRef}>
                Hello, world!
            </Pill>,
        );

        // Assert
        expect(pillRef.current).toHaveAttribute("id", "pill-id");
        expect(pillRef.current).toHaveAttribute("role", "radio");
        expect(pillRef.current).toHaveAttribute("data-testid", "pill-test-id");
    });

    test("should set attributes correctly (with onClick)", async () => {
        // Arrange
        const pillRef = React.createRef<HTMLElement>();
        render(
            <Pill
                id="pill-id"
                role="radio"
                aria-checked="true"
                tabIndex={0}
                testId="pill-test-id"
                onClick={() => {}}
                ref={pillRef}
            >
                Hello, world!
            </Pill>,
        );

        // Assert
        expect(pillRef.current).toHaveAttribute("id", "pill-id");
        expect(pillRef.current).toHaveAttribute("role", "radio");
        expect(pillRef.current).toHaveAttribute("data-testid", "pill-test-id");
        expect(pillRef.current).toHaveAttribute("aria-checked", "true");
        expect(pillRef.current).toHaveAttribute("tabindex", "0");
    });

    test("is Clickable if onClick is passed in (mouse click)", async () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        const pillButton = await screen.findByRole("button");
        pillButton.click();

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    test.skip("is Clickable if onClick is passed in (keyboard enter)", async () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        await userEvent.tab();
        await userEvent.keyboard("{enter}");

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    test.skip("is Clickable if onClick is passed in (keyboard space)", async () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        await userEvent.tab();
        await userEvent.keyboard("{space}");

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    test("is not Clickable if onClick is not passed in", async () => {
        // Arrange, Act
        render(<Pill>Hello, world!</Pill>);
        const pillButton = screen.queryByRole("button");

        // Assert
        expect(pillButton).not.toBeInTheDocument();
    });

    test("renders the title when a React node is passed in", async () => {
        // Arrange, Act
        render(
            <Pill>
                <span>Hello, world!</span>
            </Pill>,
        );

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
    });
});
