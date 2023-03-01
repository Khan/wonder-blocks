import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {MemoryRouter, Route, Switch} from "react-router-dom";
import {icons} from "@khanacademy/wonder-blocks-icon";

import expectRenderError from "../../../../../utils/testing/expect-render-error";
import IconButton from "../icon-button";

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

    test("render an icon", () => {
        // Arrange

        // Act
        render(
            <IconButton
                icon={icons.search}
                aria-label="search"
                onClick={() => {}}
                testId="icon-button"
            />,
        );

        const icon = screen.getByLabelText("search");

        // Assert
        expect(icon.innerHTML).toEqual(expect.stringContaining("<svg"));
    });

    test("throw an error for if light and not primary", () => {
        expectRenderError(
            <IconButton
                icon={icons.search}
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
                        icon={icons.search}
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
                        icon={icons.search}
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
                        icon={icons.search}
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
                        icon={icons.search}
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
});
