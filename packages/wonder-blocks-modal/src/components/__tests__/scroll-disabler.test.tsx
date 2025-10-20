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

        // Set up style proxy on document.body
        Object.defineProperty(document.body, "style", {
            value: new Proxy(mockBodyStyle, {
                get: (target, prop) => target[prop as string],
                set: (target, prop, value) => {
                    target[prop as string] = value;
                    return true;
                },
            }),
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

        // Clean up document.body.style
        if (document.body) {
            Object.defineProperty(document.body, "style", {
                value: {},
                configurable: true,
            });
        }
    });

    describe("on regular browsers", () => {
        let ScrollDisabler: typeof import("../scroll-disabler").default;

        beforeEach(async () => {
            // Arrange
            Object.defineProperty(window.navigator, "userAgent", {
                value: "Mozilla/5.0 Chrome",
                configurable: true,
            });
            ScrollDisabler = (await import("../scroll-disabler")).default;
        });

        it("should disable scrolling when mounted", () => {
            // Arrange - initial state
            expect(document.body.style.overflow).toBe("");

            // Act
            render(<ScrollDisabler />);

            // Assert
            expect(document.body.style.overflow).toBe("hidden");
        });

        it("should restore scrolling when unmounted", () => {
            // Arrange
            const {unmount} = render(<ScrollDisabler />);

            // Act
            unmount();

            // Assert
            expect(document.body.style.overflow).toBe("");
        });

        describe("with multiple instances", () => {
            it("should maintain hidden overflow with two instances", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);

                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.overflow).toBe("hidden");
            });

            it("should maintain hidden overflow after first instance unmount", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);
                render(<ScrollDisabler />);

                // Act
                unmount1();

                // Assert
                expect(document.body.style.overflow).toBe("hidden");
            });

            it("should restore overflow after all instances unmount", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);
                const {unmount: unmount2} = render(<ScrollDisabler />);
                unmount1();

                // Act
                unmount2();

                // Assert
                expect(document.body.style.overflow).toBe("");
            });
        });
    });

    describe("on Safari", () => {
        let ScrollDisabler: typeof import("../scroll-disabler").default;

        beforeEach(async () => {
            // Arrange
            Object.defineProperty(window.navigator, "userAgent", {
                value: "Mozilla/5.0 (iPad;)",
                configurable: true,
            });
            ScrollDisabler = (await import("../scroll-disabler")).default;
        });

        describe("when mounted", () => {
            it("should set overflow to hidden", () => {
                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.overflow).toBe("hidden");
            });

            it("should set position to fixed", () => {
                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.position).toBe("fixed");
            });

            it("should set width to 100%", () => {
                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.width).toBe("100%");
            });

            it("should set top based on scrollY", () => {
                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.top).toBe("-100px");
            });
        });

        describe("when unmounted", () => {
            it("should restore overflow", () => {
                // Arrange
                const {unmount} = render(<ScrollDisabler />);

                // Act
                unmount();

                // Assert
                expect(document.body.style.overflow).toBe("");
            });

            it("should restore position", () => {
                // Arrange
                const {unmount} = render(<ScrollDisabler />);

                // Act
                unmount();

                // Assert
                expect(document.body.style.position).toBe("");
            });

            it("should restore width", () => {
                // Arrange
                const {unmount} = render(<ScrollDisabler />);

                // Act
                unmount();

                // Assert
                expect(document.body.style.width).toBe("");
            });

            it("should restore top", () => {
                // Arrange
                const {unmount} = render(<ScrollDisabler />);

                // Act
                unmount();

                // Assert
                expect(document.body.style.top).toBe("");
            });

            it("should restore scroll position", () => {
                // Arrange
                const {unmount} = render(<ScrollDisabler />);

                // Act
                unmount();

                // Assert
                expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
            });
        });

        describe("with multiple instances", () => {
            it("should maintain fixed position with two instances", () => {
                // Arrange
                render(<ScrollDisabler />);

                // Act
                render(<ScrollDisabler />);

                // Assert
                expect(document.body.style.position).toBe("fixed");
            });

            it("should maintain fixed position after first instance unmount", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);
                render(<ScrollDisabler />);

                // Act
                unmount1();

                // Assert
                expect(document.body.style.position).toBe("fixed");
            });

            it("should restore position after all instances unmount", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);
                const {unmount: unmount2} = render(<ScrollDisabler />);
                unmount1();

                // Act
                unmount2();

                // Assert
                expect(document.body.style.position).toBe("");
            });

            it("should restore scroll position after all instances unmount", () => {
                // Arrange
                const {unmount: unmount1} = render(<ScrollDisabler />);
                const {unmount: unmount2} = render(<ScrollDisabler />);
                unmount1();

                // Act
                unmount2();

                // Assert
                expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
            });
        });
    });

    it("should throw error if document.body is not available", async () => {
        // First import the component while React is still properly set up
        const ScrollDisabler = (await import("../scroll-disabler")).default;

        // Create a container for RTL
        const container = document.createElement("div");
        document.body.appendChild(container);

        // Save original body
        const originalBody = document.body;

        // Suppress console.error for the expected error
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        // Now we can safely modify document.body
        Object.defineProperty(document, "body", {
            value: null,
            configurable: true,
        });

        try {
            // The error should happen during the useEffect callback
            const {unmount} = render(<ScrollDisabler />, {container});
            unmount();
            throw new Error("Expected an error but none was thrown");
        } catch (e: unknown) {
            if (e instanceof Error) {
                expect(e.message).toBe("couldn't find document.body");
            } else {
                throw e;
            }
        }

        consoleSpy.mockRestore();

        // Restore document.body
        Object.defineProperty(document, "body", {
            value: originalBody,
            configurable: true,
        });
    });
});
