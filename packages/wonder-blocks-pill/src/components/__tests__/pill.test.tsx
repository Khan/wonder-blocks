import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as tokens from "@khanacademy/wonder-blocks-tokens";

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

    test("is Clickable if onClick is passed in (mouse click)", () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        const pillButton = screen.getByRole("button");
        pillButton.click();

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    test("is Clickable if onClick is passed in (keyboard enter)", () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        userEvent.tab();
        userEvent.keyboard("{enter}");

        // Assert
        expect(clickSpy).toHaveBeenCalled();
    });

    test("is Clickable if onClick is passed in (keyboard space)", () => {
        // Arrange
        const clickSpy = jest.fn();

        // Act
        render(<Pill onClick={clickSpy}>Hello, world!</Pill>);
        userEvent.tab();
        userEvent.keyboard("{space}");

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

    test("renders the title when a string is passed in (small)", () => {
        // Arrange, Act
        render(
            <Pill size="small" testId="pill-test-id">
                Hello, world!
            </Pill>,
        );
        const pill = screen.getByTestId("pill-test-id");

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        // Font size should be at least 14px for accessibility.
        expect(pill).toHaveStyle({
            fontSize: 14,
        });
    });

    test("renders the title when a string is passed in (large)", () => {
        // Arrange, Act
        render(
            <Pill size="large" testId="pill-test-id">
                Hello, world!
            </Pill>,
        );
        const pill = screen.getByTestId("pill-test-id");

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        expect(pill).toHaveStyle({fontSize: 16});
    });

    test("renders the title when a React node is passed in", () => {
        // Arrange, Act
        render(
            <Pill>
                <span>Hello, world!</span>
            </Pill>,
        );

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });

    test.each`
        kind             | color
        ${"neutral"}     | ${tokens.color.offBlack8}
        ${"accent"}      | ${tokens.color.blue}
        ${"info"}        | ${tokens.color.fadedBlue16}
        ${"success"}     | ${tokens.color.fadedGreen16}
        ${"warning"}     | ${tokens.color.fadedGold16}
        ${"critical"}    | ${tokens.color.fadedRed16}
        ${"transparent"} | ${"transparent"}
    `(
        "renders the correct background color for $kind kind",
        ({kind, color}) => {
            // Arrange, Act
            render(
                <Pill kind={kind} testId="pill-test-id">
                    Hello, world!
                </Pill>,
            );

            const pill = screen.getByTestId("pill-test-id");

            // Assert
            expect(pill).toHaveStyle({
                backgroundColor: color,
            });
        },
    );
});
