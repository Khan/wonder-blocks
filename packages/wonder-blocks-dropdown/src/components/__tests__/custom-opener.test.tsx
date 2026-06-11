import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {CustomOpener} from "../custom-opener";

describe("CustomOpener", () => {
    it("should forward the ref to the button element", () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(<CustomOpener ref={ref}>Open</CustomOpener>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    describe("Props", () => {
        it("should render as a button", () => {
            // Arrange
            // Act
            render(<CustomOpener>Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("should always render with type=button", () => {
            // Arrange
            // Act
            render(<CustomOpener>Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "type",
                "button",
            );
        });

        it("should set data-testid from the testId prop", () => {
            // Arrange
            // Act
            render(<CustomOpener testId="my-opener">Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "data-testid",
                "my-opener",
            );
        });

        it("should pass additional props through to the button element", () => {
            // Arrange
            // Act
            render(
                <CustomOpener aria-expanded="true" aria-controls="menu-id">
                    Open
                </CustomOpener>,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-expanded",
                "true",
            );
        });
    });

    describe("disabled prop", () => {
        it("should set aria-disabled when disabled is true", () => {
            // Arrange
            // Act
            render(<CustomOpener disabled={true}>Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-disabled",
                "true",
            );
        });

        it("should not set aria-disabled when disabled is false", () => {
            // Arrange
            // Act
            render(<CustomOpener disabled={false}>Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).not.toHaveAttribute(
                "aria-disabled",
            );
        });

        it("should not set the native disabled attribute when disabled is true", () => {
            // Arrange
            // Act
            render(<CustomOpener disabled={true}>Open</CustomOpener>);

            // Assert
            expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
        });

        it("should allow an explicit aria-disabled prop to override the disabled prop", () => {
            // Arrange
            // This simulates DropdownOpener injecting aria-disabled for
            // readOnly state, where aria-disabled is true but disabled is false.
            // Act
            render(
                <CustomOpener disabled={false} aria-disabled={true}>
                    Open
                </CustomOpener>,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-disabled",
                "true",
            );
        });
    });

    describe("Event Handlers", () => {
        it("should call onClick when clicked", async () => {
            // Arrange
            const handleClick = jest.fn();
            render(<CustomOpener onClick={handleClick}>Open</CustomOpener>);

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("should not call onClick when disabled", async () => {
            // Arrange
            const handleClick = jest.fn();
            render(
                <CustomOpener onClick={handleClick} disabled={true}>
                    Open
                </CustomOpener>,
            );

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("should call onBlur when the button loses focus", async () => {
            // Arrange
            const handleBlur = jest.fn();
            render(<CustomOpener onBlur={handleBlur}>Open</CustomOpener>);
            await userEvent.tab(); // focus the button

            // Act
            await userEvent.tab(); // move focus away

            // Assert
            expect(handleBlur).toHaveBeenCalledTimes(1);
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no accessibility violations", async () => {
                // Arrange
                const {container} = render(
                    <CustomOpener>Open dropdown</CustomOpener>,
                );

                // Act
                // Use real timers for jest-axe — fake timers cause it to timeout
                // https://github.com/dequelabs/axe-core/issues/3055
                jest.useRealTimers();

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no accessibility violations when disabled", async () => {
                // Arrange
                const {container} = render(
                    <CustomOpener disabled={true}>Open dropdown</CustomOpener>,
                );

                // Act
                // Use real timers for jest-axe — fake timers cause it to timeout
                // https://github.com/dequelabs/axe-core/issues/3055
                jest.useRealTimers();

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("Focus", () => {
            it("should be focusable via keyboard", async () => {
                // Arrange
                render(<CustomOpener>Open</CustomOpener>);

                // Act
                await userEvent.tab();

                // Assert
                expect(screen.getByRole("button")).toHaveFocus();
            });

            it("should remain focusable when disabled", async () => {
                // Arrange
                // aria-disabled keeps the element in the tab order, unlike
                // the native disabled attribute which removes it.
                render(<CustomOpener disabled={true}>Open</CustomOpener>);

                // Act
                await userEvent.tab();

                // Assert
                expect(screen.getByRole("button")).toHaveFocus();
            });
        });

        describe("Keyboard Interactions", () => {
            it("should call onClick when Enter is pressed", async () => {
                // Arrange
                const handleClick = jest.fn();
                render(<CustomOpener onClick={handleClick}>Open</CustomOpener>);
                await userEvent.tab();

                // Act
                await userEvent.keyboard("{Enter}");

                // Assert
                expect(handleClick).toHaveBeenCalledTimes(1);
            });

            it("should call onClick when Space is pressed", async () => {
                // Arrange
                const handleClick = jest.fn();
                render(<CustomOpener onClick={handleClick}>Open</CustomOpener>);
                await userEvent.tab();

                // Act
                await userEvent.keyboard(" ");

                // Assert
                expect(handleClick).toHaveBeenCalledTimes(1);
            });
        });
    });
});
