// @flow
import UniqueIDFactory from "./unique-id-factory";

describe("UniqueIDFactory", () => {
    describe("#constructor", () => {
        test("no scope, should not throw", () => {
            // Arrange

            // Act
            const underTest = () => new UniqueIDFactory();

            // Assert
            expect(underTest).not.toThrow();
        });

        test("valid scope, should not throw", () => {
            // Arrange
            const scope = "this-is-a-scope";

            // Act
            const underTest = () => new UniqueIDFactory(scope);

            // Assert
            expect(underTest).not.toThrow();
        });

        test("whitespace in scope, throws", () => {
            // Arrange
            const scope = "not valid scope";

            // Act
            const underTest = () => new UniqueIDFactory(scope);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("whitespace only scope, throws", () => {
            // Arrange
            const scope = "     ";

            // Act
            const underTest = () => new UniqueIDFactory(scope);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("special characters in scope, throws", () => {
            // Arrange
            const scope = "invalid$%^&*(";

            // Act
            const underTest = () => new UniqueIDFactory(scope);

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });
    });

    describe("#get", () => {
        test("should return an identifier", () => {
            // Arrange
            const factory = new UniqueIDFactory();

            // Act
            const actual = factory.get("mynamedid");

            // Assert
            expect(typeof actual).toBe("string");
        });

        test("should return an identifier with the factory name", () => {
            // Arrange
            const name = "factory-for-testing";
            const factory = new UniqueIDFactory(name);
            const expected = /^uid-factory-for-testing.*/g;

            // Act
            const actual = factory.get("anotherid");

            // Assert
            expect(actual).toMatch(expected);
        });

        test("should throw on invalid key", () => {
            // Arrange
            const factory = new UniqueIDFactory();

            // Act
            const underTest = () => factory.get("IN*89098 08a7 jhufs");

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        test("should normalize key to lowercase", () => {
            // Arrange
            const factory = new UniqueIDFactory();
            const expected = /.*this-id-please/g;

            // Act
            const actual = factory.get("ThiS-ID-PLEASE");

            // Assert
            expect(actual).toMatch(expected);
        });

        test("should normalize factory name to lowercase", () => {
            // Arrange
            const name = "FACTory-NamE";
            const factory = new UniqueIDFactory(name);
            const expected = /.*factory-name.*/g;

            // Act
            const actual = factory.get("anotherid");

            // Assert
            expect(actual).toMatch(expected);
        });

        test("should return unique identifiers", () => {
            // Arrange
            const factory = new UniqueIDFactory();
            const id1 = factory.get("first");

            // Act
            const id2 = factory.get("second");

            // Assert
            expect(id2).not.toEqual(id1);
        });

        test("should return the same identifier for the same key", () => {
            // Arrange
            const factory = new UniqueIDFactory();

            // Generate some ids either side of our test case.
            // Just to validate that we're not benefiting from some
            // "only id requested" side-effect.
            factory.get("before");
            const expected = factory.get("name");
            factory.get("after");

            // Act
            const actual = factory.get("name");

            // Assert
            expect(actual).toBe(expected);
        });

        test("should return unique identifiers across factories", () => {
            // Arrange
            const factory1 = new UniqueIDFactory();
            const factory2 = new UniqueIDFactory();

            // Act
            const id1 = factory1.get("testname");
            const id2 = factory2.get("testname");

            // Assert
            expect(id2).not.toEqual(id1);
        });
    });
});
