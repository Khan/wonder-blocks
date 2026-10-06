import type {MiddlewareReturn} from "@floating-ui/react";

import {rtlMirror} from "../rtl-mirror-middleware";

describe("rtlMirror", () => {
    // Helper function to create a reference element with optional RTL container
    const createReferenceElement = (isRTL: boolean) => {
        const reference = document.createElement("div");
        if (isRTL) {
            const container = document.createElement("div");
            container.setAttribute("dir", "rtl");
            container.appendChild(reference);
            // Append to document so closest() works
            document.body.appendChild(container);
        } else {
            document.body.appendChild(reference);
        }
        return reference;
    };

    afterEach(() => {
        // Clean up DOM after each test
        document.body.innerHTML = "";
    });

    it("should swap 'left' to 'right' when in RTL mode", () => {
        // Arrange
        const reference = createReferenceElement(true);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "left",
            // Mock minimal state required by middleware
            initialPlacement: "left",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({
            reset: {
                placement: "right",
            },
        });
    });

    it("should swap 'right' to 'left' when in RTL mode", () => {
        // Arrange
        const reference = createReferenceElement(true);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "right",
            // Mock minimal state required by middleware
            initialPlacement: "right",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({
            reset: {
                placement: "left",
            },
        });
    });

    it("should not change placement when in RTL mode but placement is top", () => {
        // Arrange
        const reference = createReferenceElement(true);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "top",
            // Mock minimal state required by middleware
            initialPlacement: "top",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({});
    });

    it("should not change placement when in LTR mode", () => {
        // Arrange
        const reference = createReferenceElement(false);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "left",
            // Mock minimal state required by middleware
            initialPlacement: "left",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({});
    });

    it("should swap 'left-start' to 'right-start' in RTL", () => {
        // Arrange
        const reference = createReferenceElement(true);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "left-start",
            // Mock minimal state required by middleware
            initialPlacement: "left-start",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({
            reset: {
                placement: "right-start",
            },
        });
    });

    it("should swap 'right-end' to 'left-end' in RTL", () => {
        // Arrange
        const reference = createReferenceElement(true);
        const middleware = rtlMirror();

        // Act
        const result = middleware.fn({
            placement: "right-end",
            // Mock minimal state required by middleware
            initialPlacement: "right-end",
            x: 0,
            y: 0,
            strategy: "absolute",
            middlewareData: {},
            rects: {
                reference: {
                    width: 100,
                    height: 50,
                    x: 0,
                    y: 0,
                },
                floating: {
                    width: 200,
                    height: 100,
                    x: 0,
                    y: 0,
                },
            },
            elements: {
                reference,
                floating: document.createElement("div"),
            },
            platform: {
                getElementRects: jest.fn(),
                getDimensions: jest.fn(),
                getClippingRect: jest.fn(),
            },
        }) as MiddlewareReturn;

        // Assert
        expect(result).toMatchObject({
            reset: {
                placement: "left-end",
            },
        });
    });
});
