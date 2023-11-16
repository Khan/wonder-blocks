import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    test("render a span containing the reference to the icon", () => {
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

        const icon = screen.getByLabelText("search");

        // Assert
        expect(icon.innerHTML).toEqual(expect.stringContaining("mask-image"));
    });

    test("throw an error for if light and not primary", () => {
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

    test("client-side navigation", () => {
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
        userEvent.click(screen.getByRole("link"));

        // Assert
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });

    test("client-side navigation with unknown URL fails", () => {
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
        userEvent.click(screen.getByRole("link"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("client-side navigation with `skipClientNav` set to `true` fails", () => {
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
        userEvent.click(screen.getByRole("link"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow navigation when href and disabled are both set", () => {
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
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });

    test("disallow press/click when disabled is set", () => {
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
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(onClickMock).not.toBeCalled();
    });

    it("sets the 'target' prop on the underlying element", () => {
        // Arrange
        render(
            <IconButton
                icon={magnifyingGlassIcon}
                href="https://www.khanacademy.org"
                target="_blank"
            />,
        );

        // Act
        const link = screen.getByRole("link");
        userEvent.click(link);

        // Assert
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("renders an <a> if the href is '#'", () => {
        // Arrange
        render(
            <MemoryRouter>
                <IconButton icon={magnifyingGlassIcon} href="#" />,
            </MemoryRouter>,
        );

        // Act
        const link = screen.getByRole("link");

        // Assert
        expect(link.tagName).toBe("A");
    });
});
