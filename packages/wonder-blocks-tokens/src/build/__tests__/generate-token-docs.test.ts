import {
    flattenToMap,
    groups,
    renderMdx,
    renderSimpleTable,
    renderThemedTable,
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

describe("renderThemedTable", () => {
    it("should render a row per token with a value column per theme", () => {
        // Arrange
        const getTokens = jest
            .fn()
            .mockReturnValueOnce({foo: "default-foo", bar: "default-bar"})
            .mockReturnValueOnce({foo: "tb-foo", bar: "tb-bar"});
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "demo",
            description: "",
            includeCssVar: true,
            getTokens,
        } as const;

        // Act
        const result = renderThemedTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | CSS Variable | Default | Thunderblocks |",
                "| --- | --- | --- | --- |",
                "| `demo.foo` | `--wb-demo-foo` | `default-foo` | `tb-foo` |",
                "| `demo.bar` | `--wb-demo-bar` | `default-bar` | `tb-bar` |",
            ].join("\n"),
        );
    });

    it("should omit the CSS Variable column when includeCssVar is false", () => {
        // Arrange
        const getTokens = jest
            .fn()
            .mockReturnValueOnce({foo: "default-foo"})
            .mockReturnValueOnce({foo: "tb-foo"});
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "demo",
            description: "",
            includeCssVar: false,
            getTokens,
        } as const;

        // Act
        const result = renderThemedTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | Default | Thunderblocks |",
                "| --- | --- | --- |",
                "| `demo.foo` | `default-foo` | `tb-foo` |",
            ].join("\n"),
        );
    });

    it("should render `—` for tokens missing from a theme", () => {
        // Arrange
        const getTokens = jest
            .fn()
            .mockReturnValueOnce({shared: "default", onlyDefault: "d"})
            .mockReturnValueOnce({shared: "tb", onlyTb: "t"});
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "demo",
            description: "",
            includeCssVar: false,
            getTokens,
        } as const;

        // Act
        const result = renderThemedTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | Default | Thunderblocks |",
                "| --- | --- | --- |",
                "| `demo.shared` | `default` | `tb` |",
                "| `demo.onlyDefault` | `d` | — |",
                "| `demo.onlyTb` | — | `t` |",
            ].join("\n"),
        );
    });

    it("should flatten nested token objects into dot paths", () => {
        // Arrange
        const getTokens = jest
            .fn()
            .mockReturnValueOnce({color: {bg: "white"}})
            .mockReturnValueOnce({color: {bg: "black"}});
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "semanticColor",
            description: "",
            includeCssVar: true,
            getTokens,
        } as const;

        // Act
        const result = renderThemedTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | CSS Variable | Default | Thunderblocks |",
                "| --- | --- | --- | --- |",
                "| `semanticColor.color.bg` | `--wb-semanticColor-color-bg` | `white` | `black` |",
            ].join("\n"),
        );
    });
});

describe("renderSimpleTable", () => {
    it("should render a row per token with a single value column", () => {
        // Arrange
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "demo",
            description: "",
            includeCssVar: true,
            tokens: {foo: "one", bar: 2},
        } as const;

        // Act
        const result = renderSimpleTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | CSS Variable | Value |",
                "| --- | --- | --- |",
                "| `demo.foo` | `--wb-demo-foo` | `one` |",
                "| `demo.bar` | `--wb-demo-bar` | `2` |",
            ].join("\n"),
        );
    });

    it("should omit the CSS Variable column when includeCssVar is false", () => {
        // Arrange
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "demo",
            description: "",
            includeCssVar: false,
            tokens: {foo: "one"},
        } as const;

        // Act
        const result = renderSimpleTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | Value |",
                "| --- | --- |",
                "| `demo.foo` | `one` |",
            ].join("\n"),
        );
    });

    it("should flatten nested token objects into dot paths", () => {
        // Arrange
        const group = {
            id: "demo",
            title: "Demo",
            heading: "Demo",
            tokenPrefix: "breakpoint",
            description: "",
            includeCssVar: false,
            tokens: {width: {smMin: 568, mdMin: 682}},
        } as const;

        // Act
        const result = renderSimpleTable(group);

        // Assert
        expect(result).toBe(
            [
                "| Token | Value |",
                "| --- | --- |",
                "| `breakpoint.width.smMin` | `568` |",
                "| `breakpoint.width.mdMin` | `682` |",
            ].join("\n"),
        );
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
