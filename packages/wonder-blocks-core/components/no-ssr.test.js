// @flow
import * as React from "react";
import * as ReactDOMServer from "react-dom/server.js";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import NoSSR from "./no-ssr.js";

describe("NoSSR", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("calls placeholder render first, then the actual content render", async () => {
        // Arrange
        const mockPlaceholder = jest.fn(() => null);
        await new Promise((resolve) => {
            const nodes = (
                <NoSSR placeholder={mockPlaceholder}>
                    {() => {
                        resolve();
                        return null;
                    }}
                </NoSSR>
            );

            // Act
            mount(nodes);
        });

        // Assert
        // Our promise doesn't resolve until the children render, therefore
        // we don't get here until that and so if the placeholder has been
        // called, it must have been called first.
        expect(mockPlaceholder).toHaveBeenCalledTimes(1);
    });

    test("calls children render right away if a parent NoSSR component handled first render", async () => {
        // Arrange
        const mockPlaceholder = jest.fn(() => null);
        const mockPlaceholderNotCalled = jest.fn(() => null);
        await new Promise((resolve) => {
            const nodes = (
                <NoSSR placeholder={mockPlaceholder}>
                    {() => (
                        <NoSSR placeholder={mockPlaceholderNotCalled}>
                            {() => {
                                resolve();
                                return null;
                            }}
                        </NoSSR>
                    )}
                </NoSSR>
            );

            // Act
            mount(nodes);
        });

        // Assert
        // Our promise doesn't resolve until the children of our nested NoSSR
        // are rendered, therefore we don't get here until that and so if the
        // parent placeholder has been called, it must have been called first.
        // In addition, if our code is working right, the placeholder of the
        // nested component should have been skipped.
        expect(mockPlaceholder).toHaveBeenCalledTimes(1);
        expect(mockPlaceholderNotCalled).not.toHaveBeenCalled();
    });

    describe("server-side rendering", () => {
        test("server-side rendering, calls placeholder render only", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);
            const mockPlaceholder = jest.fn(() => null);

            const nodes = (
                <NoSSR placeholder={mockPlaceholder}>{mockChildren}</NoSSR>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });

        test("no placeholder returns null", () => {
            // Arrange
            const mockChildren = jest.fn(() => null);

            const nodes = <NoSSR>{mockChildren}</NoSSR>;

            // Act
            const result = ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(result).toBe("");
            expect(mockChildren).toHaveBeenCalledTimes(0);
        });
    });
});
