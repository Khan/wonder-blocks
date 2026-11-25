import type {MiddlewareReturn, Placement} from "@floating-ui/react";

import {tallerThanViewport} from "../taller-than-viewport-middleware";

describe("tallerThanViewport", () => {
    // Runs the middleware with a reference and a floating element of the
    // given heights.
    const run = (
        placement: Placement,
        referenceHeight: number,
        floatingHeight: number,
    ) =>
        tallerThanViewport().fn({
            placement,
            initialPlacement: placement,
            x: 0,
            y: 0,
            strategy: "fixed",
            middlewareData: {},
            rects: {
                reference: {width: 100, height: referenceHeight, x: 0, y: 0},
                floating: {width: 100, height: floatingHeight, x: 0, y: 0},
            },
            elements: {
                reference: document.createElement("div"),
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

    beforeEach(() => {
        jest.spyOn(
            document.documentElement,
            "clientHeight",
            "get",
        ).mockReturnValue(500);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        // jsdom doesn't implement the visual viewport, so some tests define it.
        Reflect.deleteProperty(window, "visualViewport");
    });

    it.each(["top", "bottom-start"] as const)(
        "should report the elements as taller when they don't fit stacked (%s)",
        (placement) => {
            // Arrange
            const referenceHeight = 300;
            const floatingHeight = 300;

            // Act
            const result = run(placement, referenceHeight, floatingHeight);

            // Assert
            expect(result.data).toEqual({isTaller: true});
        },
    );

    it.each(["right", "left-end"] as const)(
        "should not report the elements as taller when they fit side by side (%s)",
        (placement) => {
            // Arrange
            const referenceHeight = 300;
            const floatingHeight = 300;

            // Act
            const result = run(placement, referenceHeight, floatingHeight);

            // Assert
            expect(result.data).toEqual({isTaller: false});
        },
    );

    it("should report the elements as taller when the taller one doesn't fit side by side", () => {
        // Arrange
        const referenceHeight = 50;
        const floatingHeight = 600;

        // Act
        const result = run("right", referenceHeight, floatingHeight);

        // Assert
        expect(result.data).toEqual({isTaller: true});
    });

    it("should measure the visual viewport when it is available", () => {
        // Arrange
        const pinchZoomedViewportHeight = 200;
        Object.defineProperty(window, "visualViewport", {
            configurable: true,
            value: {height: pinchZoomedViewportHeight},
        });

        // Act
        const result = run("right", 300, 100);

        // Assert
        expect(result.data).toEqual({isTaller: true});
    });
});
