import * as React from "react";
import {render} from "@testing-library/react";

describe("ScrollDisabler", () => {
    // Store original window and document properties
    const originalUserAgent = window.navigator.userAgent;
    const originalScrollY = window.scrollY;
    const originalScrollTo = window.scrollTo;

    // Mock body styles
    let mockBodyStyle: {[key: string]: string};

    beforeEach(() => {
        // Reset module imports to clear static variables
        jest.resetModules();

        // Mock body styles
        mockBodyStyle = {
            overflow: "",
            position: "",
            width: "",
            top: "",
        };

        // Mock document.body
        Object.defineProperty(document, "body", {
            value: {
                style: new Proxy(mockBodyStyle, {
                    get: (target, prop) => target[prop as string],
                    set: (target, prop, value) => {
                        target[prop as string] = value;
                        return true;
                    },
                }),
            },
            configurable: true,
        });

        // Mock window.scrollY
        Object.defineProperty(window, "scrollY", {
            value: 100,
            configurable: true,
        });

        // Mock window.scrollTo
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        // Restore original properties
        Object.defineProperty(window.navigator, "userAgent", {
            value: originalUserAgent,
            configurable: true,
        });
        Object.defineProperty(window, "scrollY", {
            value: originalScrollY,
            configurable: true,
        });
        window.scrollTo = originalScrollTo;
    });

    describe("on regular browsers", () => {
        let ScrollDisabler: typeof import("../scroll-disabler").default;

        beforeEach(async () => {
            // Mock non-Safari user agent
            Object.defineProperty(window.navigator, "userAgent", {
                value: "Mozilla/5.0 Chrome",
                configurable: true,
            });

            // Import the component after mocking user agent
            ScrollDisabler = (await import("../scroll-disabler")).default;
        });

        it("should disable scrolling when mounted", () => {
            render(<ScrollDisabler />);
            expect(document.body.style.overflow).toBe("hidden");
        });

        it("should restore scrolling when unmounted", () => {
            const {unmount} = render(<ScrollDisabler />);
            unmount();
            expect(document.body.style.overflow).toBe("");
        });

        it("should handle multiple instances", () => {
            const {unmount: unmount1} = render(<ScrollDisabler />);
            const {unmount: unmount2} = render(<ScrollDisabler />);

            // First instance mounted
            expect(document.body.style.overflow).toBe("hidden");

            // Unmount first instance
            unmount1();
            expect(document.body.style.overflow).toBe("hidden");

            // Unmount second instance
            unmount2();
            expect(document.body.style.overflow).toBe("");
        });
    });

    describe("on Safari", () => {
        let ScrollDisabler: typeof import("../scroll-disabler").default;

        beforeEach(async () => {
            // Mock Safari user agent
            Object.defineProperty(window.navigator, "userAgent", {
                value: "Mozilla/5.0 (iPad;)",
                configurable: true,
            });

            // Import the component after mocking user agent
            ScrollDisabler = (await import("../scroll-disabler")).default;
        });

        it("should apply Safari-specific styles when mounted", () => {
            render(<ScrollDisabler />);
            expect(document.body.style.overflow).toBe("hidden");
            expect(document.body.style.position).toBe("fixed");
            expect(document.body.style.width).toBe("100%");
            expect(document.body.style.top).toBe("-100px"); // Based on mocked scrollY
        });

        it("should restore Safari-specific styles when unmounted", () => {
            const {unmount} = render(<ScrollDisabler />);
            unmount();

            expect(document.body.style.overflow).toBe("");
            expect(document.body.style.position).toBe("");
            expect(document.body.style.width).toBe("");
            expect(document.body.style.top).toBe("");
            expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
        });

        it("should handle multiple instances with Safari styles", () => {
            const {unmount: unmount1} = render(<ScrollDisabler />);
            const {unmount: unmount2} = render(<ScrollDisabler />);

            // First instance mounted
            expect(document.body.style.position).toBe("fixed");

            // Unmount first instance
            unmount1();
            expect(document.body.style.position).toBe("fixed");

            // Unmount second instance
            unmount2();
            expect(document.body.style.position).toBe("");
            expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
        });
    });

    it("should throw error if document.body is not available", async () => {
        // Mock document.body as undefined
        Object.defineProperty(document, "body", {
            value: undefined,
            configurable: true,
        });

        const ScrollDisabler = (await import("../scroll-disabler")).default;

        // Suppress console.error for the expected error
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        expect(() => {
            render(<ScrollDisabler />);
        }).toThrow("couldn't find document.body");

        consoleSpy.mockRestore();
    });
});
