import * as React from "react";
import {render, screen} from "@testing-library/react";

import Pill from "../pill";

describe("Pill", () => {
    test("renders the text", () => {
        // Arrange, Act
        render(<Pill>Hello, world!</Pill>);

        // Assert
        expect(screen.getByText("Hello, world!")).toBeVisible();
    });

    test("should set attributes correctly (no onClick)", () => {
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
        expect(pillRef.current).toHaveAttribute("data-test-id", "pill-test-id");
    });

    test("should set attributes correctly (with onClick)", () => {
        // Arrange
        const pillRef = React.createRef<HTMLElement>();
        render(
            <Pill
                id="pill-id"
                role="radio"
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
        expect(pillRef.current).toHaveAttribute("data-test-id", "pill-test-id");
    });

    test("is Clickable if onClick is passed in", () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        const pillButton = screen.getByRole("button");
        pillButton.click();

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    test("is not Clickable if onClick is not passed in", () => {
        // Arrange, Act
        render(<Pill>Hello, world!</Pill>);
        const pillButton = screen.queryByRole("button");

        // Assert
        expect(pillButton).not.toBeInTheDocument();
    });
});
