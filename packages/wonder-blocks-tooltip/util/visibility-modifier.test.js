// @flow
import Popper from "popper.js";
import * as Core from "@khanacademy/wonder-blocks-core";
//import isObscured from "./is-obscured.js";
import visibilityModifierDefaultConfig from "./visibility-modifier.js";
import isObscured from "./is-obscured.js";

jest.mock("@khanacademy/wonder-blocks-core");
jest.mock("./is-obscured.js");

describe("Visibility PopperJS Modifier", () => {
    test("returns an enabled modifier configuration with expected order", () => {
        // Arrange

        // Act
        const result = visibilityModifierDefaultConfig;

        // Assert
        expect(result).toMatchObject({
            enabled: true,
            fn: expect.any(Function),
            order: Popper.Defaults.modifiers.hide.order + 1,
        });
    });

    describe("#fn", () => {
        // For all these tests, we don't need real elements, just things that
        // look like real elements. We'll fake some known dimensions and verify
        // that the results return what we want.
        describe("Obscured by one or more scroll parents", () => {
            test("Obscured horizontally only, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {
                    getBoundingClientRect: () => ({
                        top: 0,
                        left: 0,
                        right: 100,
                        bottom: 100,
                    }),
                };
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {},
                    hide: false,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValue({
                    horizontal: "before",
                    vertical: "within",
                });

                // Act
                const result = visibilityModifierDefaultConfig.fn(data);

                // Assert
                expect(result.hide).toBeTruthy();
                expect(result.attributes["x-out-of-boundaries"]).toBe("");
            });

            test("Obscured vertically only, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {
                    getBoundingClientRect: () => ({
                        top: 0,
                        left: 0,
                        right: 100,
                        bottom: 100,
                    }),
                };
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {
                        "x-out-of-boundaries": "",
                    },
                    hide: true,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValue({
                    horizontal: "within",
                    vertical: "before",
                });

                // Act
                const result = visibilityModifierDefaultConfig.fn(data);

                // Assert
                expect(result.hide).toBeTruthy();
                expect(result.attributes["x-out-of-boundaries"]).toBe("");
            });

            test("Obscured totally, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {
                    getBoundingClientRect: () => ({
                        top: 0,
                        left: 0,
                        right: 100,
                        bottom: 100,
                    }),
                };
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {},
                    hide: false,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValue({
                    horizontal: "after",
                    vertical: "after",
                });

                // Act
                const result = visibilityModifierDefaultConfig.fn(data);

                // Assert
                expect(result.hide).toBeTruthy();
                expect(result.attributes["x-out-of-boundaries"]).toBe("");
            });
        });

        test("Obscured by fixed or absolute components, is not visible", () => {
            // Arrange
            const psuedoAnchorElement = {
                getBoundingClientRect: () => ({
                    top: 0,
                    left: 0,
                    right: 100,
                    bottom: 100,
                }),
            };
            const data = {
                instance: {reference: psuedoAnchorElement},
                attributes: {},
                hide: false,
            };
            // Flow doesn't know this is a jest mock $FlowFixMe
            Core.getElementIntersection.mockReturnValue({
                horizontal: "within",
                vertical: "within",
            });
            // Flow doesn't know this is a jest mock $FlowFixMe
            isObscured.mockReturnValue(true);

            // Act
            const result = visibilityModifierDefaultConfig.fn(data);

            // Assert
            expect(result.hide).toBeTruthy();
            expect(result.attributes["x-out-of-boundaries"]).toBe("");
        });

        test("Not obscured by parent nor fixed/absolute positioning", () => {
            // Arrange
            const psuedoAnchorElement = {
                getBoundingClientRect: () => ({
                    top: 0,
                    left: 0,
                    right: 100,
                    bottom: 100,
                }),
            };
            const data = {
                instance: {reference: psuedoAnchorElement},
                attributes: {
                    "x-out-of-boundaries": "",
                },
                hide: true,
            };
            // Flow doesn't know this is a jest mock $FlowFixMe
            Core.getElementIntersection.mockReturnValue({
                horizontal: "within",
                vertical: "within",
            });
            // Flow doesn't know this is a jest mock $FlowFixMe
            isObscured.mockReturnValue(false);

            // Act
            const result = visibilityModifierDefaultConfig.fn(data);

            // Assert
            expect(result.hide).toBeFalsy();
            expect(result.attributes["x-out-of-boundaries"]).toBeFalsy();
        });
    });
});
