// @flow
import {queryMatchesSize} from "./util.js";

describe("queryMatchesSize", () => {
    describe("all", () => {
        // Arrange
        const query = "all";

        it("should match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });
    });

    describe("mdOrLarger", () => {
        // Arrange
        const query = "mdOrLarger";

        it("should not match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });

        it("should match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });
    });

    describe("mdOrSmaller", () => {
        // Arrange
        const query = "mdOrSmaller";

        it("should match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should not match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });
    });

    describe("small", () => {
        // Arrange
        const query = "small";

        it("should match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should not match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });

        it("should not match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });
    });

    describe("medium", () => {
        // Arrange
        const query = "medium";

        it("should not match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });

        it("should match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should not match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });
    });

    describe("large", () => {
        // Arrange
        const query = "small";

        it("should not match small", () => {
            // Arrange
            const size = "small";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(true);
        });

        it("should not match medium", () => {
            // Arrange
            const size = "medium";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });

        it("should not match large", () => {
            // Arrange
            const size = "large";

            // Act
            const actualResult = queryMatchesSize(query, size);

            // Assert
            expect(actualResult).toBe(false);
        });
    });

    // TODO(WEB-531): figure out how to add $FlowIgnore without breaking things
    // it("should throw on invalid query", () => {
    //     // $FlowIgnore: this should be caught by flow, but we're testing it anyways
    //     expect(() => queryMatchesSize("foobar", "small")).toThrow();
    // });
});
