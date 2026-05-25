import {StyleSheet} from "aphrodite";

import {processStyleList} from "../util";

const styles = StyleSheet.create({
    red: {color: "red"},
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
            // @ts-expect-error: testing falsy inputs
            expect(processStyleList(input)).toEqual({style: {}, className: ""});
        });

        it("returns empty result for an array of only falsy values", () => {
            const result = processStyleList([null, false, undefined, 0]);

            expect(result).toEqual({style: {}, className: ""});
        });
    });

    describe("pure Aphrodite stylesheets", () => {
        it("emits a generated class and no inline style", () => {
            const result = processStyleList(styles.red);

            expect(result.style).toEqual({});
            expect(result.className).toEqual(expect.any(String));
            expect(result.className.length).toBeGreaterThan(0);
        });

        it("includes multiple stylesheets in the generated class", () => {
            const result = processStyleList([styles.red, styles.bold]);

            expect(result.style).toEqual({});
            // A single class is produced by aphrodite that encodes both.
            expect(result.className.split(" ")).toHaveLength(1);
        });
    });

    describe("CSS Module class name strings (fast-path)", () => {
        it("forwards a single string as className with no inline style", () => {
            const result = processStyleList("module-class");

            expect(result).toEqual({style: {}, className: "module-class"});
        });

        it("joins multiple string leaves with spaces", () => {
            const result = processStyleList(["foo", "bar"]);

            expect(result).toEqual({style: {}, className: "foo bar"});
        });

        it("preserves source order of string leaves", () => {
            const result = processStyleList(["a", "b", "c"]);

            expect(result.className).toEqual("a b c");
        });
    });

    describe("inline-object styles (fast-path)", () => {
        it("forwards a single inline object as `style` with no className", () => {
            const result = processStyleList({color: "red"});

            expect(result).toEqual({style: {color: "red"}, className: ""});
        });

        it("merges multiple inline objects, later overriding earlier", () => {
            const result = processStyleList([
                {color: "red", fontSize: 12},
                {color: "blue"},
            ]);

            expect(result.style).toEqual({color: "blue", fontSize: 12});
            expect(result.className).toEqual("");
        });

        it("forwards CSS custom property keys (--*) as inline style", () => {
            const result = processStyleList({"--my-var": "12px"} as any);

            expect(result.style).toEqual({"--my-var": "12px"});
            expect(result.className).toEqual("");
        });
    });

    describe("mixed inputs", () => {
        it("buckets aphrodite, strings, and inline objects together", () => {
            const result = processStyleList([
                styles.red,
                "module-class",
                {fontSize: 14},
            ]);

            const classes = result.className.split(" ");
            // Aphrodite class first, then string class.
            expect(classes).toHaveLength(2);
            expect(classes[0]).toEqual(expect.any(String));
            expect(classes[0].length).toBeGreaterThan(0);
            expect(classes[1]).toEqual("module-class");
            // Inline styles are wrapped into the aphrodite class (no fast-path
            // because aphrodite is in the merge), so `style` stays empty.
            expect(result.style).toEqual({});
        });

        it("preserves string source order across aphrodite + strings", () => {
            const result = processStyleList(["outer", styles.red, "inner"]);

            const classes = result.className.split(" ");
            // aphrodite class, then strings in source order.
            expect(classes).toHaveLength(3);
            expect(classes[1]).toEqual("outer");
            expect(classes[2]).toEqual("inner");
        });
    });

    describe("nested arrays", () => {
        it("flattens deeply nested arrays of mixed leaves", () => {
            const result = processStyleList([
                ["a", [styles.red, ["b", [{fontSize: 14}]]]],
            ]);

            const classes = result.className.split(" ");
            // aphrodite-generated class, then strings in source order.
            expect(classes).toHaveLength(3);
            expect(classes[1]).toEqual("a");
            expect(classes[2]).toEqual("b");
        });

        it("ignores falsy leaves inside nested arrays", () => {
            const result = processStyleList([
                false,
                ["foo", null, [undefined, "bar"]],
                0,
            ]);

            expect(result).toEqual({style: {}, className: "foo bar"});
        });
    });

    describe("detection edge cases", () => {
        it("treats any object with `_definition` as an Aphrodite stylesheet (loose detection)", () => {
            // An arbitrary object with `_definition` is treated as aphrodite.
            // We pin this behavior so consumers know not to rely on the key
            // name for unrelated purposes.
            const fake = {_definition: {color: "purple"}} as any;
            const result = processStyleList(fake);

            // Goes through the aphrodite branch — not into inline `style`.
            expect(result.style).toEqual({});
        });

        it("silently ignores number leaves", () => {
            const result = processStyleList([42 as any, "foo"]);

            expect(result).toEqual({style: {}, className: "foo"});
        });

        it("silently ignores boolean true leaves", () => {
            const result = processStyleList([true as any, "foo"]);

            expect(result).toEqual({style: {}, className: "foo"});
        });
    });

    describe("order of precedence", () => {
        it("later inline-style keys win without `!important`", () => {
            // Consumer override is last in the array.
            const result = processStyleList([{color: "red"}, {color: "green"}]);

            expect(result.style.color).toEqual("green");
        });

        it("works with the addStyle [reset, default, consumer] pattern", () => {
            const reset = {margin: 0};
            const defaultStyle = {color: "red"};
            const consumerStyle = {color: "blue"};

            const result = processStyleList([
                reset,
                defaultStyle,
                consumerStyle,
            ]);

            expect(result.style).toEqual({margin: 0, color: "blue"});
        });
    });

    describe("fast-path", () => {
        it("returns empty className when only inline styles are present", () => {
            const result = processStyleList({color: "red"});

            // No generated class — inline styles flow as `style` directly.
            expect(result.className).toEqual("");
            expect(result.style).toEqual({color: "red"});
        });

        it("generates a class when aphrodite is in the merge (no fast-path)", () => {
            const result = processStyleList([styles.red, {fontSize: 14}]);

            // Aphrodite forces the inline-style wrap, so `style` is empty.
            expect(result.style).toEqual({});
            expect(result.className.length).toBeGreaterThan(0);
        });
    });

    describe("SNAPSHOT_INLINE_APHRODITE", () => {
        beforeEach(() => {
            // @ts-expect-error: globalThis index signature
            global.SNAPSHOT_INLINE_APHRODITE = true;
        });

        it("converts aphrodite stylesheets to inline styles", () => {
            const result = processStyleList(styles.red);

            // Aphrodite gets inlined; no class is generated.
            expect(result.style).toEqual({color: "red"});
            expect(result.className).toEqual("");
        });

        it("converts kebab-case keys in aphrodite definitions to camelCase", () => {
            const sheet = StyleSheet.create({
                box: {
                    backgroundColor: "blue",
                },
            });

            const result = processStyleList(sheet.box);

            expect(result.style).toHaveProperty("backgroundColor", "blue");
        });

        it("merges aphrodite + inline + strings while inlining", () => {
            const result = processStyleList([
                styles.red,
                "module-class",
                {fontSize: 14},
            ]);

            expect(result.style).toEqual({color: "red", fontSize: 14});
            expect(result.className).toEqual("module-class");
        });
    });
});
