// @flow
import {resizeWindow, checkQuery, matchMedia} from "./test-util.js";

describe("Test utils", () => {
    describe("resizeWindow", () => {
        it("should set the width to 1200px for large", () => {
            // Arrange
            const expectedWidth = 1200;

            // Act
            resizeWindow("large");

            // Assert
            expect(window.innerWidth).toBe(expectedWidth);
        });

        it("should set the width to 800px for medium", () => {
            // Arrange
            const expectedWidth = 800;

            // Act
            resizeWindow("medium");

            // Assert
            expect(window.innerWidth).toBe(expectedWidth);
        });

        it("should set the width to 640px for small", () => {
            // Arrange
            const expectedWidth = 640;

            // Act
            resizeWindow("small");

            // Assert
            expect(window.innerWidth).toBe(expectedWidth);
        });

        it("should dispatch a 'resize' event", async () => {
            // Arrange
            let handler;
            const promise = new Promise((resolve, reject) => {
                handler = window.addEventListener("resize", resolve);
            });

            // Act
            resizeWindow("small");
            await promise;

            // Assert
            expect(promise).resolves.toHaveProperty("type", "resize");
            window.removeEventListener("resize", handler);
        });
    });

    describe("checkQuery", () => {
        describe("(max-width: 767px)", () => {
            it("should match 700px", () => {
                // Arrange
                const width = 700;

                // Act
                const result = checkQuery("(max-width: 767px)", width);

                // Assert
                expect(result).toBe(true);
            });

            it("should not match 800px", () => {
                // Arrange
                const width = 800;

                // Act
                const result = checkQuery("(max-width: 767px)", width);

                // Assert
                expect(result).toBe(false);
            });
        });

        describe("(min-width: 768px) and (max-width: 1023px)", () => {
            it("should not match 700px", () => {
                // Arrange
                const width = 700;

                // Act
                const result = checkQuery(
                    "(min-width: 768px) and (max-width: 1023px)",
                    width,
                );

                // Assert
                expect(result).toBe(false);
            });

            it("should match 800px", () => {
                // Arrange
                const width = 800;

                // Act
                const result = checkQuery(
                    "(min-width: 768px) and (max-width: 1023px)",
                    width,
                );

                // Assert
                expect(result).toBe(true);
            });

            it("should not match 1024px", () => {
                // Arrange
                const width = 1024;

                // Act
                const result = checkQuery(
                    "(min-width: 768px) and (max-width: 1023px)",
                    width,
                );

                // Assert
                expect(result).toBe(false);
            });
        });

        describe("(min-width: 1024px)", () => {
            it("should not match 800px", () => {
                // Arrange
                const width = 800;

                // Act
                const result = checkQuery("(min-width: 1024px)", width);

                // Assert
                expect(result).toBe(false);
            });

            it("should match 1024px", () => {
                // Arrange
                const width = 1024;

                // Act
                const result = checkQuery("(min-width: 1024px)", width);

                // Assert
                expect(result).toBe(true);
            });
        });
    });

    describe("matchMedia", () => {
        describe("matches", () => {
            it("should be true when the window matches the initial value", () => {
                // Arrange
                resizeWindow("small");

                // Act
                const watcher = matchMedia("(max-width: 767px)");

                // Assert
                expect(watcher.matches).toBe(true);
            });

            it("should be false when the window doesn't match the initial value", () => {
                // Arrange
                resizeWindow("large");

                // Act
                const watcher = matchMedia("(max-width: 767px)");

                // Assert
                expect(watcher.matches).toBe(false);
            });

            it("should be true when the window matches the current value", () => {
                // Arrange
                resizeWindow("large");

                // Act
                const watcher = matchMedia("(max-width: 767px)");
                resizeWindow("small");

                // Assert
                expect(watcher.matches).toBe(true);
            });

            it("should be true when the window doesn't match the current value", () => {
                // Arrange
                resizeWindow("small");

                // Act
                const watcher = matchMedia("(max-width: 767px)");
                resizeWindow("large");

                // Assert
                expect(watcher.matches).toBe(false);
            });
        });

        describe("listeners", () => {
            test("should be called when window resizes", () => {
                // Arrange
                const listener = jest.fn();
                resizeWindow("small");
                const watcher = matchMedia("(max-width: 767px)");
                watcher.addListener(listener);

                // Act
                resizeWindow("large");

                // Assert
                expect(listener).toHaveBeenCalled();
            });

            test("should be called all listeners", () => {
                // Arrange
                const listener1 = jest.fn();
                const listener2 = jest.fn();
                resizeWindow("small");
                const watcher = matchMedia("(max-width: 767px)");
                watcher.addListener(listener1);
                watcher.addListener(listener2);

                // Act
                resizeWindow("large");

                // Assert
                expect(listener1).toHaveBeenCalled();
                expect(listener2).toHaveBeenCalled();
            });

            test("should not call a listener that's been removed", () => {
                // Arrange
                const listener = jest.fn();
                resizeWindow("small");
                const watcher = matchMedia("(max-width: 767px)");
                watcher.addListener(listener);

                // Act
                watcher.removeListener(listener);
                resizeWindow("large");

                // Assert
                expect(listener).not.toHaveBeenCalled();
            });

            test("should be passed {matches: true} when the window size matches", () => {
                // Arrange
                const listener = jest.fn();
                resizeWindow("large");
                const watcher = matchMedia("(max-width: 767px)");
                watcher.addListener(listener);

                // Act
                resizeWindow("small");

                // Assert
                expect(listener.mock.calls[0][0].matches).toBe(true);
            });

            test("should be passed {matches: false} when the window size doesn't match", () => {
                // Arrange
                const listener = jest.fn();
                resizeWindow("small");
                const watcher = matchMedia("(max-width: 767px)");
                watcher.addListener(listener);

                // Act
                resizeWindow("large");

                // Assert
                expect(listener.mock.calls[0][0].matches).toBe(false);
            });
        });
    });
});
