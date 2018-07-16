// @flow
import Popper from "popper.js";
import * as Core from "@khanacademy/wonder-blocks-core";
import visibilityModifierDefaultConfig from "./visibility-modifier.js";
import isObscured from "./is-obscured.js";

jest.mock("./is-obscured.js");
jest.mock("@khanacademy/wonder-blocks-core");

describe("Visibility PopperJS Modifier", () => {
    beforeEach(() => {
        // Flow doesn't know this is a jest mock $FlowFixMe
        Core.getElementIntersection.mockClear();
    });

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
        describe("obscured by one or more scroll parents", () => {
            test("obscured horizontally only, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {};
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {},
                    hide: false,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValueOnce({
                    horizontal: "before",
                    vertical: "within",
                });

                // Act
                const result = visibilityModifierDefaultConfig.fn(data);

                // Assert
                expect(result.hide).toBeTruthy();
                expect(result.attributes["x-out-of-boundaries"]).toBe("");
            });

            test("obscured vertically only, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {};
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {
                        "x-out-of-boundaries": "",
                    },
                    hide: true,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValueOnce({
                    horizontal: "within",
                    vertical: "before",
                });

                // Act
                const result = visibilityModifierDefaultConfig.fn(data);

                // Assert
                expect(result.hide).toBeTruthy();
                expect(result.attributes["x-out-of-boundaries"]).toBe("");
            });

            test("obscured totally, is not visible", () => {
                // Arrange
                const psuedoAnchorElement = {};
                const data = {
                    instance: {reference: psuedoAnchorElement},
                    attributes: {},
                    hide: false,
                };
                // Flow doesn't know this is a jest mock $FlowFixMe
                Core.getElementIntersection.mockReturnValueOnce({
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

        test("obscured by fixed or absolute components, is not visible", () => {
            // Arrange
            const psuedoAnchorElement = {};
            const data = {
                instance: {reference: psuedoAnchorElement},
                attributes: {},
                hide: false,
            };

            // Here we are setting things up so that none of our scroll parents
            // are hiding our anchor element, but some fixed or absolute thing
            // is hiding the anchor element. This simulates a situation where
            // some fixed/absolute/sticky thing is covering our anchor even
            // though it would overwise be visible within its scroll parents.

            // Flow doesn't know this is a jest mock $FlowFixMe
            Core.getElementIntersection.mockReturnValueOnce({
                horizontal: "within",
                vertical: "within",
            });
            // Flow doesn't know this is a jest mock $FlowFixMe
            isObscured.mockReturnValueOnce(true);

            // Act
            const result = visibilityModifierDefaultConfig.fn(data);

            // Assert
            expect(result.hide).toBeTruthy();
            expect(result.attributes["x-out-of-boundaries"]).toBe("");
        });

        test("not obscured by parent nor fixed/absolute positioning", () => {
            // Arrange
            const psuedoAnchorElement = {};
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
