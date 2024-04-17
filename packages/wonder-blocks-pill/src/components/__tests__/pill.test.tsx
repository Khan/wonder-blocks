import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import * as tokens from "@khanacademy/wonder-blocks-tokens";

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

    test("renders the title when a string is passed in (small)", async () => {
        // Arrange, Act
        render(
            <Pill size="small" testId="pill-test-id">
                Hello, world!
            </Pill>,
        );
        const pill = await screen.findByTestId("pill-test-id");

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
        // Font size should be at least 14px for accessibility.
        expect(pill).toHaveStyle({
            fontSize: 14,
        });
    });

    test("renders the title when a string is passed in (large)", async () => {
        // Arrange, Act
        render(
            <Pill size="large" testId="pill-test-id">
                Hello, world!
            </Pill>,
        );
        const pill = await screen.findByTestId("pill-test-id");

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
        expect(pill).toHaveStyle({fontSize: 16});
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
        async ({kind, color}) => {
            // Arrange, Act
            render(
                <Pill kind={kind} testId="pill-test-id">
                    Hello, world!
                </Pill>,
            );

            const pill = await screen.findByTestId("pill-test-id");

            // Assert
            expect(pill).toHaveStyle({
                backgroundColor: color,
            });
        },
    );
});
