import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconButtonUnstyled} from "../icon-button-unstyled";

describe("IconButtonUnstyled", () => {
    beforeAll(() => {
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    afterAll(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '(url: string | URL) => void'.
        window.location.assign.mockClear();
    });

    test("render a span containing the reference to the icon", async () => {
        // Arrange

        // Act
        render(
            <IconButtonUnstyled
                aria-label="search"
                onClick={() => {}}
                testId="icon-button"
            >
                <PhosphorIcon icon={magnifyingGlassIcon} />
            </IconButtonUnstyled>,
        );

        const icon = await screen.findByLabelText("search");

        // Assert
        expect(icon.innerHTML).toEqual(expect.stringContaining("mask-image"));
    });

    test("client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <IconButtonUnstyled
                            aria-label="search"
                            testId="icon-button"
                            href="/foo"
                        >
                            <PhosphorIcon icon={magnifyingGlassIcon} />
                        </IconButtonUnstyled>
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
        await userEvent.click(await screen.findByRole("link"));

        // Assert
        expect(await screen.findByText("Hello, world!")).toBeInTheDocument();
    });

    test("client-side navigation with unknown URL fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <IconButtonUnstyled
                            aria-label="search"
                            testId="icon-button"
                            href="/unknown"
                        >
                            <PhosphorIcon icon={magnifyingGlassIcon} />
                        </IconButtonUnstyled>
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
        await userEvent.click(await screen.findByRole("link"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <IconButtonUnstyled
                            aria-label="search"
                            testId="icon-button"
                            href="/foo"
                            skipClientNav
                        >
                            <PhosphorIcon icon={magnifyingGlassIcon} />
                        </IconButtonUnstyled>
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
        await userEvent.click(await screen.findByRole("link"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", async () => {
        render(
            <MemoryRouter>
                <CompatRouter>
                    <div>
                        <IconButtonUnstyled
                            aria-label="search"
                            testId="icon-button"
                            href="/foo"
                            disabled={true}
                        >
                            <PhosphorIcon icon={magnifyingGlassIcon} />
                        </IconButtonUnstyled>
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
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow press/click when disabled is set", async () => {
        // Arrange
        const onClickMock = jest.fn();
        render(
            <IconButtonUnstyled
                aria-label="search"
                testId="icon-button"
                onClick={onClickMock}
                disabled={true}
            >
                <PhosphorIcon icon={magnifyingGlassIcon} />
            </IconButtonUnstyled>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(onClickMock).not.toBeCalled();
    });

    it("sets the 'id' prop on the underlying element", async () => {
        // Arrange
        render(
            <IconButtonUnstyled aria-label="search" id="icon-button">
                <PhosphorIcon icon={magnifyingGlassIcon} />
            </IconButtonUnstyled>,
        );

        // Act
        const button = await screen.findByRole("button");

        // Assert
        expect(button).toHaveAttribute("id", "icon-button");
    });

    it("sets the 'target' prop on the underlying element", async () => {
        // Arrange
        render(
            <IconButtonUnstyled
                href="https://www.khanacademy.org"
                target="_blank"
            >
                <PhosphorIcon icon={magnifyingGlassIcon} />
            </IconButtonUnstyled>,
        );

        // Act
        const link = await screen.findByRole("link");
        await userEvent.click(link);

        // Assert
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("renders an <a> if the href is '#'", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <CompatRouter>
                    <IconButtonUnstyled href="#">
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>
                    ,
                </CompatRouter>
            </MemoryRouter>,
        );

        // Act
        const link = await screen.findByRole("link");

        // Assert
        expect(link.tagName).toBe("A");
    });

    it("should trigger onClick using the mouse", async () => {
        // Arrange
        const onClickMock = jest.fn();

        render(
            <IconButtonUnstyled
                aria-label="search"
                onClick={onClickMock}
                testId="icon-button"
            >
                <PhosphorIcon icon={magnifyingGlassIcon} />
            </IconButtonUnstyled>,
        );

        // Act
        // Press the button.
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    describe("Keyboard Navigation", () => {
        describe.each([
            {key: "Enter", label: "Enter"},
            {key: " ", label: "Space"},
        ])("$label key", ({key}) => {
            it("should trigger onClick", () => {
                // Arrange
                const onClickMock = jest.fn();

                render(
                    <IconButtonUnstyled
                        aria-label="search"
                        onClick={onClickMock}
                        testId="icon-button"
                    >
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
                );

                // Act
                // Press the button.
                const button = screen.getByRole("button");
                // NOTE: we need to use fireEvent here because await userEvent doesn't
                // support keyUp/Down events and we use these handlers to override
                // the default behavior of the button.
                // eslint-disable-next-line testing-library/prefer-user-event
                fireEvent.keyDown(button, {
                    key,
                });
                // eslint-disable-next-line testing-library/prefer-user-event
                fireEvent.keyUp(button, {
                    key,
                });

                // Assert
                expect(onClickMock).toHaveBeenCalledTimes(1);
            });

            it("should call onPress=true when the button is pressed", () => {
                // Arrange
                const onPressMock = jest.fn();

                render(
                    <IconButtonUnstyled
                        aria-label="search"
                        onPress={onPressMock}
                        testId="icon-button"
                    >
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
                );

                // Act
                // Press the button.
                const button = screen.getByRole("button");
                // NOTE: we need to use fireEvent here because await userEvent doesn't
                // support keyUp/Down events and we use these handlers to override
                // the default behavior of the button.
                // eslint-disable-next-line testing-library/prefer-user-event
                fireEvent.keyDown(button, {
                    key,
                });

                // Assert
                expect(onPressMock).toHaveBeenCalledWith(true);
            });

            it("should call onPress=false when the button is released", () => {
                // Arrange
                const onPressMock = jest.fn();

                render(
                    <IconButtonUnstyled
                        aria-label="search"
                        onPress={onPressMock}
                        testId="icon-button"
                    >
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
                );

                // Act
                // Press the button.
                const button = screen.getByRole("button");
                // NOTE: we need to use fireEvent here because await userEvent doesn't
                // support keyUp/Down events and we use these handlers to override
                // the default behavior of the button.
                // eslint-disable-next-line testing-library/prefer-user-event
                fireEvent.keyDown(button, {
                    key,
                });
                // eslint-disable-next-line testing-library/prefer-user-event
                fireEvent.keyUp(button, {
                    key,
                });

                // Assert
                expect(onPressMock).toHaveBeenLastCalledWith(false);
            });
        });
    });

    describe("type", () => {
        it("should set type attribute to 'button' by default", async () => {
            // Arrange
            render(
                <IconButtonUnstyled>
                    <PhosphorIcon icon={magnifyingGlassIcon} />
                </IconButtonUnstyled>,
            );

            // Act
            const button = await screen.findByRole("button");

            // Assert
            expect(button).toHaveAttribute("type", "button");
        });

        it("should submit button within form via click", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <IconButtonUnstyled type="submit">
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.click(button);

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        it("should submit button within form via keyboard", async () => {
            // Arrange
            const submitFnMock = jest.fn();
            render(
                <form onSubmit={submitFnMock}>
                    <IconButtonUnstyled type="submit">
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>
                </form>,
            );

            // Act
            const button = await screen.findByRole("button");
            await userEvent.type(button, "{enter}");

            // Assert
            expect(submitFnMock).toHaveBeenCalled();
        });

        it("should submit button doesn't break if it's not in a form", async () => {
            // Arrange
            render(
                <IconButtonUnstyled type="submit">
                    <PhosphorIcon icon={magnifyingGlassIcon} />
                </IconButtonUnstyled>,
            );

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
                    <IconButtonUnstyled aria-label="Search">
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria-disabled when the disabled prop is set", () => {
                // Arrange
                render(
                    <IconButtonUnstyled
                        aria-label="Search"
                        disabled={true}
                        onClick={() => {}}
                    >
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
                );

                // Act
                const iconButton = screen.getByRole("button");

                // Assert
                expect(iconButton).toHaveAttribute("aria-disabled", "true");
            });

            it("should set aria props on the root element", () => {
                // Arrange
                const ariaDescribedBy = "aria-describedby-value";
                render(
                    <IconButtonUnstyled
                        aria-describedby={ariaDescribedBy}
                        disabled={true}
                        onClick={() => {}}
                    >
                        <PhosphorIcon icon={magnifyingGlassIcon} />
                    </IconButtonUnstyled>,
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
