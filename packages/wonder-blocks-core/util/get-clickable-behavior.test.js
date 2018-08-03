// @flow
import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import ClickableBehavior from "../components/clickable-behavior.js";
import getClickableBehavior from "./get-clickable-behavior";

describe("getClickableBehavior", () => {
    test("Without href, returns ClickableBehavior", () => {
        // Arrange
        const url = undefined;
        const directNav = undefined;
        const router = undefined;
        const expectation = ClickableBehavior;

        // Act
        const result = getClickableBehavior(url, directNav, router);

        // Assert
        expect(result).toBe(expectation);
    });

    describe("with href", () => {
        test("External URL, returns ClickableBehavior", () => {
            // Arrange
            const url = "http://google.com";
            const directNav = undefined;
            const router = <MemoryRouter />;
            const expectation = ClickableBehavior;

            // Act
            const result = getClickableBehavior(url, directNav, router);

            // Assert
            expect(result).toBe(expectation);
        });

        describe("Internal URL", () => {
            describe("Direct navigation is undefined", () => {
                test("No router, returns ClickableBehavior", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const directNav = undefined;
                    const router = undefined;
                    const expectation = ClickableBehavior;

                    // Act
                    const result = getClickableBehavior(url, directNav, router);

                    // Assert
                    expect(result).toBe(expectation);
                });

                test("Router, returns ClickableBehaviorWithRouter", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const directNav = undefined;
                    const router = <MemoryRouter />;
                    const expectation = "withRouter(ClickableBehavior)";

                    // Act
                    const result = getClickableBehavior(url, directNav, router);

                    // Assert
                    expect(result.displayName).toBe(expectation);
                });
            });

            test("Direct navigation is false, returns ClickableBehaviorWithRouter", () => {
                // Arrange
                const url = "/prep/lsat";
                const directNav = false;
                const router = <MemoryRouter />;
                const expectation = "withRouter(ClickableBehavior)";

                // Act
                const result = getClickableBehavior(url, directNav, router);

                // Assert
                expect(result.displayName).toBe(expectation);
            });

            test("Direct navigation is true, returns ClickableBehavior", () => {
                // Arrange
                const url = "/prep/lsat";
                const directNav = true;
                const router = <MemoryRouter />;
                const expectation = ClickableBehavior;

                // Act
                const result = getClickableBehavior(url, directNav, router);

                // Assert
                expect(result).toBe(expectation);
            });
        });
    });
});
