// @flow
import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import ClickableBehavior from "../components/clickable-behavior.js";
import getClickableBehavior from "./get-clickable-behavior";

describe("getClickableBehavior", () => {
    test("Without href, returns ClickableBehavior", () => {
        // Arrange
        const url = undefined;
        const clientNav = undefined;
        const router = undefined;
        const expectation = ClickableBehavior;

        // Act
        const result = getClickableBehavior(url, clientNav, router);

        // Assert
        expect(result).toBe(expectation);
    });

    describe("with href", () => {
        test("External URL, returns ClickableBehavior", () => {
            // Arrange
            const url = "http://google.com";
            const clientNav = undefined;
            const router = <MemoryRouter />;
            const expectation = ClickableBehavior;

            // Act
            const result = getClickableBehavior(url, clientNav, router);

            // Assert
            expect(result).toBe(expectation);
        });

        describe("Internal URL", () => {
            describe("Client navigation is undefined", () => {
                test("No router, returns ClickableBehavior", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const clientNav = undefined;
                    const router = undefined;
                    const expectation = ClickableBehavior;

                    // Act
                    const result = getClickableBehavior(url, clientNav, router);

                    // Assert
                    expect(result).toBe(expectation);
                });

                test("Router, returns ClickableBehaviorWithRouter", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const clientNav = undefined;
                    const router = <MemoryRouter history={[]} />;
                    const expectation = "withRouter(ClickableBehavior)";

                    // Act
                    const result = getClickableBehavior(url, clientNav, router);

                    // Assert
                    expect(result.displayName).toBe(expectation);
                });
            });

            test("Client navigation is false, returns ClickableBehavior", () => {
                // Arrange
                const url = "/prep/lsat";
                const clientNav = false;
                const router = <MemoryRouter />;
                const expectation = ClickableBehavior;

                // Act
                const result = getClickableBehavior(url, clientNav, router);

                // Assert
                expect(result).toBe(expectation);
            });

            test("Client navigation is true, returns ClickableBehaviorWithRouter", () => {
                // Arrange
                const url = "/prep/lsat";
                const clientNav = true;
                const router = undefined;
                const expectation = "withRouter(ClickableBehavior)";

                // Act
                const result = getClickableBehavior(url, clientNav, router);

                // Assert
                expect(result.displayName).toBe(expectation);
            });
        });
    });
});
