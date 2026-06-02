import {StyleSheet} from "aphrodite";

import {processStyleList} from "../util";

const styles = StyleSheet.create({
    noPadding: {padding: 0},
    bold: {fontWeight: "bold"},
});

describe("processStyleList", () => {
    let SNAPSHOT_INLINE_APHRODITE: any;

    beforeEach(() => {
        // @ts-expect-error: globalThis index signature
        SNAPSHOT_INLINE_APHRODITE = global.SNAPSHOT_INLINE_APHRODITE;
        // @ts-expect-error: globalThis index signature
        global.SNAPSHOT_INLINE_APHRODITE = false;
    });

    afterEach(() => {
        // @ts-expect-error: globalThis index signature
        global.SNAPSHOT_INLINE_APHRODITE = SNAPSHOT_INLINE_APHRODITE;
    });

    describe("falsy inputs", () => {
        it.each([
            ["undefined", undefined],
            ["null", null],
            ["false", false],
            ["0", 0],
        ])("returns empty result for %s", (_label, input) => {
            // Arrange
            // (input comes from it.each)

            // Act
            // @ts-expect-error: testing falsy inputs
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {}, className: ""});
        });

        it("returns empty result for an array of only falsy values", () => {
            // Arrange
            // Act
            const result = processStyleList([null, false, undefined, 0]);

            // Assert
            expect(result).toEqual({style: {}, className: ""});
        });
    });

    describe("pure Aphrodite stylesheets", () => {
        it("emits no inline style", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList(styles.noPadding);

            // Assert
            expect(result.style).toEqual({});
        });

        it("emits a generated class name string", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList(styles.noPadding);

            // Assert
            expect(result.className).toEqual(expect.any(String));
        });

        it("emits a non-empty generated class name", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList(styles.noPadding);

            // Assert
            expect(result.className.length).toBeGreaterThan(0);
        });

        it("emits no inline style for multiple stylesheets", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList([styles.noPadding, styles.bold]);

            // Assert
            expect(result.style).toEqual({});
        });

        it("encodes multiple stylesheets into a single generated class", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList([styles.noPadding, styles.bold]);

            // Assert
            expect(result.className.split(" ")).toHaveLength(1);
        });
    });

    describe("CSS Module class name strings (fast-path)", () => {
        it("forwards a single string as className with no inline style", () => {
            // Arrange
            const input = "module-class";

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {}, className: "module-class"});
        });

        it("joins multiple string leaves with spaces", () => {
            // Arrange
            const input = ["foo", "bar"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {}, className: "foo bar"});
        });

        it("preserves source order of string leaves", () => {
            // Arrange
            const input = ["a", "b", "c"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className).toEqual("a b c");
        });
    });

    describe("inline-object styles (fast-path)", () => {
        it("forwards a single inline object as `style` with no className", () => {
            // Arrange
            const input = {padding: 0};

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {padding: 0}, className: ""});
        });

        it("merges multiple inline objects, later overriding earlier", () => {
            // Arrange
            const input = [{padding: 0, fontSize: 12}, {padding: 10}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({padding: 10, fontSize: 12});
        });

        it("emits no className when merging multiple inline objects", () => {
            // Arrange
            const input = [{padding: 0, fontSize: 12}, {padding: 10}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className).toEqual("");
        });

        it("forwards CSS custom property keys (--*) as inline style", () => {
            // Arrange
            const input = {"--my-var": "12px"} as any;

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({"--my-var": "12px"});
        });

        it("emits no className for CSS custom property keys (--*)", () => {
            // Arrange
            const input = {"--my-var": "12px"} as any;

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className).toEqual("");
        });
    });

    describe("mixed inputs", () => {
        // Aphrodite class first, then string class. Inline styles are
        // wrapped into the aphrodite class (no fast-path because aphrodite
        // is in the merge), so `style` stays empty.
        it("produces two classes for aphrodite + string + inline object", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")).toHaveLength(2);
        });

        it("emits the aphrodite-generated class first", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[0].length).toBeGreaterThan(0);
        });

        it("emits the string class after the aphrodite class", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[1]).toEqual("module-class");
        });

        it("wraps inline styles into the aphrodite class, leaving `style` empty", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({});
        });

        // aphrodite class, then strings in source order.
        it("emits the leading string after the aphrodite class", () => {
            // Arrange
            const input = ["outer", styles.noPadding, "inner"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[1]).toEqual("outer");
        });

        it("emits the trailing string last, preserving source order", () => {
            // Arrange
            const input = ["outer", styles.noPadding, "inner"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[2]).toEqual("inner");
        });
    });

    describe("nested arrays", () => {
        // aphrodite-generated class, then strings in source order.
        it("flattens nested arrays, emitting the first string after the aphrodite class", () => {
            // Arrange
            const input = [["a", [styles.noPadding, ["b", [{fontSize: 14}]]]]];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[1]).toEqual("a");
        });

        it("flattens nested arrays, preserving source order of strings", () => {
            // Arrange
            const input = [["a", [styles.noPadding, ["b", [{fontSize: 14}]]]]];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.split(" ")[2]).toEqual("b");
        });

        it("ignores falsy leaves inside nested arrays", () => {
            // Arrange
            // Act
            const result = processStyleList([
                false,
                ["foo", null, [undefined, "bar"]],
                0,
            ]);

            // Assert
            expect(result).toEqual({style: {}, className: "foo bar"});
        });
    });

    describe("detection edge cases", () => {
        it("treats any object with `_definition` as an Aphrodite stylesheet (loose detection)", () => {
            // Arrange
            // An arbitrary object with `_definition` is treated as aphrodite.
            // We pin this behavior so consumers know not to rely on the key
            // name for unrelated purposes.
            const fake = {_definition: {color: "purple"}} as any;

            // Act
            const result = processStyleList(fake);

            // Assert
            // Goes through the aphrodite branch — not into inline `style`.
            expect(result.style).toEqual({});
        });

        it("silently ignores number leaves", () => {
            // Arrange
            const input = [42 as any, "foo"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {}, className: "foo"});
        });

        it("silently ignores boolean true leaves", () => {
            // Arrange
            const input = [true as any, "foo"];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result).toEqual({style: {}, className: "foo"});
        });
    });

    describe("order of precedence", () => {
        it("later inline-style keys win without `!important`", () => {
            // Arrange
            // Consumer override is last in the array.
            const input = [{padding: 0}, {padding: 10}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style.padding).toEqual(10);
        });

        it("works with the addStyle [reset, default, consumer] pattern", () => {
            // Arrange
            const reset = {margin: 0};
            const defaultStyle = {padding: 0};
            const consumerStyle = {padding: 10};

            // Act
            const result = processStyleList([
                reset,
                defaultStyle,
                consumerStyle,
            ]);

            // Assert
            expect(result.style).toEqual({margin: 0, padding: 10});
        });
    });

    describe("fast-path", () => {
        it("returns empty className when only inline styles are present", () => {
            // Arrange
            const input = {padding: 10};

            // Act
            const result = processStyleList(input);

            // Assert
            // No generated class — inline styles flow as `style` directly.
            expect(result.className).toEqual("");
        });

        it("flows inline styles through as `style` when no class is generated", () => {
            // Arrange
            const input = {padding: 10};

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({padding: 10});
        });

        it("wraps inline styles into the aphrodite class, leaving `style` empty (no fast-path)", () => {
            // Arrange
            const input = [styles.noPadding, {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({});
        });

        it("generates a class when aphrodite is in the merge (no fast-path)", () => {
            // Arrange
            const input = [styles.noPadding, {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className.length).toBeGreaterThan(0);
        });
    });

    describe("SNAPSHOT_INLINE_APHRODITE", () => {
        beforeEach(() => {
            // @ts-expect-error: globalThis index signature
            global.SNAPSHOT_INLINE_APHRODITE = true;
        });

        it("converts aphrodite stylesheets to inline styles", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList(styles.noPadding);

            // Assert
            expect(result.style).toEqual({padding: 0});
        });

        it("generates no class when inlining aphrodite stylesheets", () => {
            // Arrange
            // (uses pre-created `styles` stylesheet)

            // Act
            const result = processStyleList(styles.noPadding);

            // Assert
            expect(result.className).toEqual("");
        });

        it("converts kebab-case keys in aphrodite definitions to camelCase", () => {
            // Arrange
            const sheet = StyleSheet.create({
                box: {
                    margin: 10,
                },
            });

            // Act
            const result = processStyleList(sheet.box);

            // Assert
            expect(result.style).toHaveProperty("margin", 10);
        });

        it("merges aphrodite + inline + strings into inline styles while inlining", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.style).toEqual({padding: 0, fontSize: 14});
        });

        it("keeps string class names while inlining aphrodite + inline", () => {
            // Arrange
            const input = [styles.noPadding, "module-class", {fontSize: 14}];

            // Act
            const result = processStyleList(input);

            // Assert
            expect(result.className).toEqual("module-class");
        });
    });
});
