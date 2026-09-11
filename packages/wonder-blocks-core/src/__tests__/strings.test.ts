import {defaultEnStrings, strings} from "../strings";

import type {WonderBlocksStrings} from "../strings";

type StringSource =
    | string
    | {context?: string; message: string}
    | {context?: string; one: string; other: string};

/** Null for a plural entry, which declares two messages rather than one. */
const messageOf = (source: StringSource): string | null => {
    if (typeof source === "string") {
        return source;
    }
    return "message" in source ? source.message : null;
};

describe("strings", () => {
    // The types already guarantee the same keys in both objects; only the
    // wording can drift, and a reword in one would send translators one string
    // and everyone rendering without a provider another.
    const keys = Object.keys(strings) as Array<keyof WonderBlocksStrings>;
    const singularKeys = keys.filter((key) => messageOf(strings[key]) !== null);

    it.each(singularKeys)(
        "should declare the same English for %s in `defaultEnStrings` as in `strings`",
        (key) => {
            // Arrange
            const englishSource = messageOf(strings[key]);

            // Act
            const englishDefault = defaultEnStrings[key];

            // Assert
            expect(englishDefault).toBe(englishSource);
        },
    );
});
