import {
    flattenToMap,
    groups,
    renderMdx,
    toCssVar,
} from "../generate-token-docs";

describe("flattenToMap", () => {
    it("should flatten a nested object into dot-separated paths", () => {
        // Arrange
        const input = {
            a: {
                b: "one",
                c: {
                    d: 2,
                },
            },
            e: "three",
        };

        // Act
        const result = flattenToMap(input);

        // Assert
        expect(Array.from(result.entries())).toStrictEqual([
            ["a.b", "one"],
            ["a.c.d", 2],
            ["e", "three"],
        ]);
    });

    it("should return an empty map when the input is null", () => {
        // Arrange
        const input = null;

        // Act
        const result = flattenToMap(input);

        // Assert
        expect(result.size).toBe(0);
    });

    it("should return an empty map when the input is undefined", () => {
        // Arrange
        const input = undefined;

        // Act
        const result = flattenToMap(input);

        // Assert
        expect(result.size).toBe(0);
    });

    it("should return an empty map when the input is not an object", () => {
        // Arrange
        const input = "not-an-object";

        // Act
        const result = flattenToMap(input);

        // Assert
        expect(result.size).toBe(0);
    });

    it("should skip null values while keeping the rest", () => {
        // Arrange
        const input = {
            kept: "value",
            skipped: null,
            nested: {
                alsoKept: 1,
                alsoSkipped: null,
            },
        };

        // Act
        const result = flattenToMap(input);

        // Assert
        expect(Array.from(result.entries())).toStrictEqual([
            ["kept", "value"],
            ["nested.alsoKept", 1],
        ]);
    });

    it("should only record string and number leaves", () => {
        // Arrange
        const input = {
            str: "value",
            num: 42,
            bool: true,
            arr: ["a", "b"],
            fn: () => "nope",
        };

        // Act
        const result = flattenToMap(input);

        // Assert
        // Booleans and functions are dropped. Arrays are objects, so their
        // indexes become nested paths.
        expect(Array.from(result.entries())).toStrictEqual([
            ["str", "value"],
            ["num", 42],
            ["arr.0", "a"],
            ["arr.1", "b"],
        ]);
    });

    it("should apply the given prefix to the keys", () => {
        // Arrange
        const input = {a: {b: "value"}};

        // Act
        const result = flattenToMap(input, "prefix");

        // Assert
        expect(Array.from(result.entries())).toStrictEqual([
            ["prefix.a.b", "value"],
        ]);
    });

    it("should merge into the provided map instance", () => {
        // Arrange
        const existing = new Map<string, string | number>([
            ["existing", "kept"],
        ]);
        const input = {added: "value"};

        // Act
        const result = flattenToMap(input, "", existing);

        // Assert
        expect(result).toBe(existing);
        expect(Array.from(result.entries())).toStrictEqual([
            ["existing", "kept"],
            ["added", "value"],
        ]);
    });
});

describe("toCssVar", () => {
    it("should build a CSS variable name from the token group and dot path", () => {
        // Arrange
        const tokenGroup = "sizing";
        const dotPath = "size_040";

        // Act
        const result = toCssVar(tokenGroup, dotPath);

        // Assert
        expect(result).toBe("--wb-sizing-size_040");
    });

    it("should replace dots in the path with dashes", () => {
        // Arrange
        const tokenGroup = "semanticColor";
        const dotPath = "core.background.base";

        // Act
        const result = toCssVar(tokenGroup, dotPath);

        // Assert
        expect(result).toBe("--wb-semanticColor-core-background-base");
    });
});

describe("renderMdx", () => {
    it.each(groups.map((group) => [group.id, group]))(
        "should render the expected content for the %s group",
        (_id, group) => {
            // Arrange
            // Act
            const content = renderMdx(group);

            // Assert
            expect(content).toMatchSnapshot();
        },
    );
});
