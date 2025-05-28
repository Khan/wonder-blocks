/**
 * Test for Wonder Blocks ButtonUnstyled component.
 *
 * The test for buttons with icons are in a separate file
 * (button-with-icon.test.tsx) since this one is already too long.
 */
import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {ButtonUnstyled} from "../button-unstyled";

describe("ButtonUnstyled", () => {
    test("client-side navigation with unknown URL fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <ButtonUnstyled href="/unknown">
                            Click me!
                        </ButtonUnstyled>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <ButtonUnstyled href="/foo" skipClientNav>
                            Click me!
                        </ButtonUnstyled>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <ButtonUnstyled href="/foo" disabled={true}>
                            Click me!
                        </ButtonUnstyled>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("don't call beforeNav when href and disabled are both set", async () => {
        // Arrange
        const beforeNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <ButtonUnstyled
                            href="/foo"
                            disabled={true}
                            beforeNav={beforeNavMock}
                        >
                            Click me!
                        </ButtonUnstyled>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(beforeNavMock).not.toHaveBeenCalled();
    });

    test("don't call safeWithNav when href and disabled are both set", async () => {
        // Arrange
        const safeWithNavMock = jest.fn();
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <ButtonUnstyled
                            href="/foo"
                            disabled={true}
                            safeWithNav={safeWithNavMock}
                        >
                            Click me!
                        </ButtonUnstyled>
                        <Routes>
                            <Route
                                path="/foo"
                                element={<div id="foo">Hello, world!</div>}
                            />
                        </Routes>
                    </div>
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole("button");
        await userEvent.click(button);

        // Assert
        expect(safeWithNavMock).not.toHaveBeenCalled();
    });

    it("should set attribute on the underlying button", async () => {
        // Arrange

        // Act
        render(
            <ButtonUnstyled id="foo" onClick={() => {}}>
                Click me!
            </ButtonUnstyled>,
        );

        // Assert
        expect(await screen.findByRole("button")).toHaveAttribute("id", "foo");
    });

    it("should set attribute on the underlying link", async () => {
        // Arrange

        // Act
        render(
            <ButtonUnstyled id="foo" href="/bar">
                Click me!
            </ButtonUnstyled>,
        );

        // Assert
        expect(await screen.findByRole("button")).toHaveAttribute(
            "href",
            "/bar",
        );
    });

    describe("button focus", () => {
        test("primary button can have focus", async () => {
            // Arrange
            render(
                <ButtonUnstyled testId={"button-focus-test"}>
                    Label
                </ButtonUnstyled>,
            );

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });

        test("primary button can have focus when disabled", async () => {
            // Arrange
            render(
                <ButtonUnstyled disabled={true} testId={"button-focus-test"}>
                    Label
                </ButtonUnstyled>,
            );

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });

        test("tertiary button can have focus when disabled", async () => {
            // Arrange
            render(
                <ButtonUnstyled
                    disabled={true}
                    testId={"button-focus-test"}
                    kind="tertiary"
                >
                    Label
                </ButtonUnstyled>,
            );

            // Act
            const button = await screen.findByTestId("button-focus-test");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });
    });

    describe("type='submit'", () => {
        test("submit button within form via click", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <ButtonUnstyled type="submit">Click me!</ButtonUnstyled>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.click(button);

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button within form via keyboard", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <ButtonUnstyled type="submit">Click me!</ButtonUnstyled>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        test("submit button doesn't break if it's not in a form", async () => {
            // Arrange
            render(<ButtonUnstyled type="submit">Click me!</ButtonUnstyled>);

            // Act
            expect(async () => {
                // Assert
                await userEvent.click(await screen.findByRole("button"));
            }).not.toThrow();
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <ButtonUnstyled onClick={() => {}}>Label</ButtonUnstyled>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria-disabled when the disabled prop is set", () => {
                // Arrange
                render(<ButtonUnstyled disabled={true}>Label</ButtonUnstyled>);

                // Act
                const iconButton = screen.getByRole("button");

                // Assert
                expect(iconButton).toHaveAttribute("aria-disabled", "true");
            });

            it("should set aria props on the root element", () => {
                // Arrange
                const ariaDescribedBy = "aria-describedby-value";
                render(
                    <ButtonUnstyled
                        aria-describedby={ariaDescribedBy}
                        disabled={true}
                        onClick={() => {}}
                    >
                        Label
                    </ButtonUnstyled>,
                );

                // Act
                const button = screen.getByRole("button");

                // Assert
                expect(button).toHaveAttribute(
                    "aria-describedby",
                    ariaDescribedBy,
                );
            });
        });
    });
});
