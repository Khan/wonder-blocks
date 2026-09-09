/**
 * The user-facing strings that Wonder Blocks owns the wording of.
 *
 * Wonder Blocks declares its strings, it does not translate them. This file is
 * plain data with no dependency on any translation library, which is what lets
 * a consumer app pair it with whatever it already uses (Lingui, in Khan's
 * case) without Wonder Blocks knowing anything about that tooling.
 *
 * It is published as its own subpath, `@khanacademy/wonder-blocks-core/strings`,
 * so that translation tooling can import the English source without pulling in
 * React or any component code.
 *
 * There are three exports, and they are deliberately in one file so they
 * cannot drift apart:
 *
 * 1. `WonderBlocksStrings` — the type components consume, via `useWbStrings`.
 * 2. `strings` — the untranslated English source plus the context a translator
 *    needs. A consumer's build step reads this and generates the binding that
 *    produces a translated `WonderBlocksStrings`.
 * 3. `defaultStrings` — English, ready to render. This is the config context's
 *    default value, so Wonder Blocks renders correctly (in English) wherever
 *    no provider is mounted: its own Storybook, unit tests, and any app that
 *    has not adopted the provider.
 *
 * ## Adding a string
 *
 * Add the key to `WonderBlocksStrings`, the English source to `strings`, and
 * the English value to `defaultStrings`. The `satisfies` operator below makes
 * the first two mandatory and the type annotation on `defaultStrings` makes
 * the third — you cannot half-add a string.
 *
 * Keys are flat and prefixed by the component that renders them (rather than
 * nested per component) because the string extraction tooling walks a single
 * `Object.entries`. Keep the entries grouped in per-component blocks so the
 * file still reads by component.
 */

/**
 * The translated strings Wonder Blocks components read at render time.
 *
 * Every key is required. A consumer either hands the provider a complete
 * object — which is what a generated binding produces — or mounts no provider
 * at all and gets complete English from `defaultStrings`. There is no
 * per-key merging at this layer; per-instance wording is the job of a
 * component's own `labels` prop.
 */
export type WonderBlocksStrings = {
    /**
     * `Link`: the accessible name for the icon that marks a link opening in a
     * new window.
     */
    linkExternalIcon: string;
};

/**
 * The untranslated English source for every Wonder Blocks string, along with
 * the context a translator needs to translate it correctly.
 *
 * A value is one of three shapes:
 *
 * - `string` — the English message, when it needs no explanation.
 * - `{context?, message}` — a message plus a note to the translator. Use this
 *   whenever the English is ambiguous out of context; "Close" and "Filter" are
 *   a verb or a noun depending on the language.
 * - `{context?, one, other}` — a pluralized message. Interpolate with
 *   `%(name)s` placeholders; never branch on `n === 1` outside
 *   `defaultStrings`, because most languages need more than two forms.
 *
 * This is `satisfies` rather than a type annotation on purpose: it checks the
 * object against `WonderBlocksStrings` in both directions, so a key cannot
 * exist here without existing in the type, or vice versa.
 */
export const strings = {
    // Link
    linkExternalIcon: {
        context:
            "Accessible name for the icon marking a link that opens in a new window.",
        message: "Opens in a new window",
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/**
 * English strings, ready to render.
 *
 * This is the config context's default value in every environment, so Wonder
 * Blocks never crashes or renders a blank label when no provider is mounted.
 * Keep the wording in sync with `strings` above — this is the same copy, with
 * the translator metadata resolved away and `%(name)s` placeholders expressed
 * as functions.
 *
 * These messages are repeated rather than read off `strings` on purpose. A
 * reference like `strings.linkExternalIcon.message` keeps the whole `strings`
 * object — every `context` line with it — in the bundle that every consumer of
 * this package loads, because it is a runtime property lookup that the
 * minifier will not inline. It also does not extend to pluralized entries,
 * which declare a pair of messages here and a function there. `strings.test.ts`
 * checks the two for drift instead.
 */
export const defaultStrings: WonderBlocksStrings = {
    // Link
    linkExternalIcon: "Opens in a new window",
};
