// @flow
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import NoSSR from "./no-ssr.js";

describe("NoSSR", () => {
    beforeEach(() => {
        unmountAll();
    });

    test("renders a placeholder first, then the actual content", (done) => {
        // Arrange
        const mockPlaceholder = jest.fn(() => null);

        const arrangeAct = (assert) => {
            const nodes = (
                <NoSSR placeholder={mockPlaceholder}>
                    {() => {
                        assert();
                        return null;
                    }}
                </NoSSR>
            );

            // Act
            mount(nodes);
        };

        const assert = () => {
            // Assert
            // This was called from within the NoSSR children render prop.
            // Therefore, if the placeholder has been called, it must have
            // been called first.
            expect(mockPlaceholder).toHaveBeenCalledTimes(1);
            done();
        };

        arrangeAct(assert);
    });

    describe("server-side rendering", () => {
        test("server-side rendering, renders placeholder only", () => {
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
