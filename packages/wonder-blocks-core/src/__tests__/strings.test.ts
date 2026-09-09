import {defaultStrings, strings} from "../strings";

import type {WonderBlocksStrings} from "../strings";

/**
 * The three shapes a `strings` entry can take.
 */
type StringSource =
    | string
    | {context?: string; message: string}
    | {context?: string; one: string; other: string};

/**
 * The English message a `strings` entry declares, or `null` for a pluralized
 * entry, which declares a pair of messages instead of one.
 */
const messageOf = (source: StringSource): string | null => {
    if (typeof source === "string") {
        return source;
    }
    return "message" in source ? source.message : null;
};

describe("strings", () => {
    // The types guarantee that `strings` and `defaultStrings` hold the same
    // keys. What no type can check is that they hold the same English, and a
    // reworded message in one but not the other would send one wording to
    // translators and a different one to everyone rendering without a
    // provider.
    const keys = Object.keys(strings) as Array<keyof WonderBlocksStrings>;
    const singularKeys = keys.filter((key) => messageOf(strings[key]) !== null);

    it.each(singularKeys)(
        "should declare the same English for %s in `defaultStrings` as in `strings`",
        (key) => {
            // Arrange
            const englishSource = messageOf(strings[key]);

            // Act
            const englishDefault = defaultStrings[key];

            // Assert
            expect(englishDefault).toBe(englishSource);
        },
    );
});
