import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {MemoryRouter, Route, Switch} from "react-router-dom";
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import expectRenderError from "../../../../../utils/testing/expect-render-error";
import {IconButton} from "../icon-button";

describe("IconButton", () => {
    const {location} = window;

    beforeAll(() => {
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn()};
    });

    afterAll(() => {
        window.location = location;
    });

    test("render a span containing the reference to the icon", async () => {
        // Arrange

        // Act
        render(
            <IconButton
                icon={magnifyingGlassIcon}
                aria-label="search"
                onClick={() => {}}
                testId="icon-button"
            />,
        );

        const icon = await screen.findByLabelText("search");

        // Assert
        expect(icon.innerHTML).toEqual(expect.stringContaining("mask-image"));
    });

    test("throw an error for if light and not primary", async () => {
        expectRenderError(
            <IconButton
                icon={magnifyingGlassIcon}
                aria-label="search"
                kind="secondary"
                light={true}
                onClick={() => void 0}
            />,
            "Light is only supported for primary IconButtons",
        );
    });

    test("client-side navigation", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <div>
                    <IconButton
                        icon={magnifyingGlassIcon}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                    />
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <IconButton
                        icon={magnifyingGlassIcon}
                        aria-label="search"
                        testId="icon-button"
                        href="/unknown"
                    />
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <IconButton
                        icon={magnifyingGlassIcon}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                        skipClientNav
                    />
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
                <div>
                    <IconButton
                        icon={magnifyingGlassIcon}
                        aria-label="search"
                        testId="icon-button"
                        href="/foo"
                        disabled={true}
                    />
                    <Switch>
                        <Route path="/foo">
                            <div id="foo">Hello, world!</div>
                        </Route>
                    </Switch>
                </div>
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
            <IconButton
                icon={magnifyingGlassIcon}
                aria-label="search"
                testId="icon-button"
                onClick={onClickMock}
                disabled={true}
            />,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(onClickMock).not.toBeCalled();
    });

    it("sets the 'id' prop on the underlying element", async () => {
        // Arrange
        render(
            <IconButton
                icon={magnifyingGlassIcon}
                aria-label="search"
                id="icon-button"
            />,
        );

        // Act
        const button = await screen.findByRole("button");

        // Assert
        expect(button).toHaveAttribute("id", "icon-button");
    });

    it("sets the 'target' prop on the underlying element", async () => {
        // Arrange
        render(
            <IconButton
                icon={magnifyingGlassIcon}
                href="https://www.khanacademy.org"
                target="_blank"
            />,
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
                <IconButton icon={magnifyingGlassIcon} href="#" />,
            </MemoryRouter>,
        );

        // Act
        const link = await screen.findByRole("link");

        // Assert
        expect(link.tagName).toBe("A");
    });

    describe("onClick", () => {
        it("should trigger using the mouse", async () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <IconButton
                    icon={magnifyingGlassIcon}
                    aria-label="search"
                    onClick={onClickMock}
                    testId="icon-button"
                />,
            );

            // Act
            // Press the button.
            await userEvent.click(await screen.findByRole("button"));

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("should trigger by pressing {Space}", async () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <IconButton
                    icon={magnifyingGlassIcon}
                    aria-label="search"
                    onClick={onClickMock}
                    testId="icon-button"
                />,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("button");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: "Space",
                code: "Space",
                charCode: 32,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                key: "Space",
                code: "Space",
                charCode: 32,
            });

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("should trigger by pressing {Enter}", async () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <IconButton
                    icon={magnifyingGlassIcon}
                    aria-label="search"
                    onClick={onClickMock}
                    testId="icon-button"
                />,
            );

            // Act
            // Press the button.
            const button = await screen.findByRole("button");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: "Enter",
                code: "Enter",
                charCode: 13,
            });
            // NOTE: We need to trigger multiple events to simulate the browser
            // behavior of pressing Enter on a button. By default, browsers will
            // trigger a click event on keyDown, but we need to trigger it on
            // keyUp.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                key: "Enter",
                code: "Enter",
                charCode: 13,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                key: "Enter",
                code: "Enter",
                charCode: 13,
            });

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });
    });

    describe("type", () => {
        it("should set type attribute to 'button' by default", async () => {
            // Arrange
            render(<IconButton icon={magnifyingGlassIcon} />);

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
                    <IconButton icon={magnifyingGlassIcon} type="submit" />
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
                    <IconButton icon={magnifyingGlassIcon} type="submit" />
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
            render(<IconButton icon={magnifyingGlassIcon} type="submit" />);

            // Act
            expect(async () => {
                // Assert
                await userEvent.click(await screen.findByRole("button"));
            }).not.toThrow();
        });
    });
});
