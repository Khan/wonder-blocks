import ClickableBehavior from "../../components/clickable-behavior";
import getClickableBehavior from "../get-clickable-behavior";

describe("getClickableBehavior", () => {
    test("Without href, returns ClickableBehavior", () => {
        // Arrange
        const url = undefined;
        const skipClientNav = undefined;
        const router = undefined;
        const expectation = ClickableBehavior;

        // Act
        const result = getClickableBehavior(url, skipClientNav, router);

        // Assert
        expect(result).toBe(expectation);
    });

    describe("with href", () => {
        test("External URL, returns ClickableBehavior", () => {
            // Arrange
            const url = "http://google.com";
            const skipClientNav = undefined;
            const inRouterContext = true;
            const expectation = ClickableBehavior;

            // Act
            const result = getClickableBehavior(
                url,
                skipClientNav,
                inRouterContext,
            );

            // Assert
            expect(result).toBe(expectation);
        });

        describe("Internal URL", () => {
            describe("skipClientNav is undefined", () => {
                test("No router, returns ClickableBehavior", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const skipClientNav = undefined;
                    const inRouterContext = false;
                    const expectation = ClickableBehavior;

                    // Act
                    const result = getClickableBehavior(
                        url,
                        skipClientNav,
                        inRouterContext,
                    );

                    // Assert
                    expect(result).toBe(expectation);
                });

                test("Router, returns ClickableBehaviorWithRouter", () => {
                    // Arrange
                    const url = "/prep/lsat";
                    const skipClientNav = undefined;
                    const inRouterContext = true;
                    const expectation = "withRouter(ClickableBehavior)";

                    // Act
                    const result = getClickableBehavior(
                        url,
                        skipClientNav,
                        inRouterContext,
                    );

                    // Assert
                    expect((result as any).displayName).toBe(expectation);
                });
            });

            test("skipClientNav is false, returns ClickableBehaviorWithRouter", () => {
                // Arrange
                const url = "/prep/lsat";
                const skipClientNav = false;
                const inRouterContext = true;
                const expectation = "withRouter(ClickableBehavior)";

                // Act
                const result = getClickableBehavior(
                    url,
                    skipClientNav,
                    inRouterContext,
                );

                // Assert
                expect((result as any).displayName).toBe(expectation);
            });

            test("skipClientNav is true, returns ClickableBehavior", () => {
                // Arrange
                const url = "/prep/lsat";
                const skipClientNav = true;
                const inRouterContext = true;
                const expectation = ClickableBehavior;

                // Act
                const result = getClickableBehavior(
                    url,
                    skipClientNav,
                    inRouterContext,
                );

                // Assert
                expect(result).toBe(expectation);
            });
        });
    });
});
