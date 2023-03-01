/* eslint-disable @babel/no-invalid-this */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
import * as React from "react";

import FakeTranslate from "./i18n-faketranslate";
import {allPluralForms} from "./plural-forms";

type InterpolationOptions<T> = {
    [key: string]: T;
};

type NGetOptions = {
    [key: string]: any;
};

type PluralConfigurationObject = {
    lang: string;
    messages: Array<string>;
};

interface ngettextOverloads {
    (
        config: PluralConfigurationObject,
        num?: number | null | undefined,
        options?: NGetOptions,
    ): string;
    (
        singular: string,
        plural: string,
        num?: number | null | undefined,
        options?: NGetOptions,
    ): string;
}

interface _Overloads {
    (
        str: string,
        options?:
            | InterpolationOptions<string | number | null | undefined>
            | null
            | undefined,
    ): string;
    (
        pluralConfig: PluralConfigurationObject,
        options?:
            | InterpolationOptions<string | number | null | undefined>
            | null
            | undefined,
    ): string;
}

interface internalTranslateOverloads {
    (
        str: string,
        options:
            | InterpolationOptions<string | number | null | undefined>
            | null
            | undefined,
        additionalTranslation: (arg1: string) => string,
    ): string;
    (
        pluralConfig: PluralConfigurationObject,
        options:
            | InterpolationOptions<string | number | null | undefined>
            | null
            | undefined,
        additionalTranslation: (arg1: string) => string,
    ): string;
}

const {translate: fakeTranslate} = new FakeTranslate();

type Language = keyof typeof allPluralForms;

const interpolationMarker = /%\(([\w_]+)\)s/g;
/**
 * Performs sprintf-like %(name)s replacement on str, and returns a React
 * fragment of the string interleaved with those replacements. The replacements
 * can be any valid React node including strings and numbers.
 *
 * For example:
 *  interpolateStringToFragment("test", {}) ->
 *      test
 *  interpolateStringToFragment("test %(num)s", {num: 5}) ->
 *      test 5
 *  interpolateStringToFragment("test %(num)s", {num: <Count />}) ->
 *      test <Count />
 */
const interpolateStringToFragment = function (
    str: string,
    options?: InterpolationOptions<React.ReactNode | null | undefined> | null,
): React.ReactNode {
    options = options || {};

    // Split the string into its language fragments and substitutions
    const split = fakeTranslate(str).split(interpolationMarker);

    const result: {
        [key: string]: React.ReactNode;
    } = {text_0: split[0]};

    // Replace the substitutions with the appropriate option
    for (let i = 1; i < split.length; i += 2) {
        const key = split[i];
        let replaceWith = options[key];
        if (replaceWith === undefined) {
            replaceWith = `%(${key})s`;
        }

        // We prefix each substitution key with a number that increments each
        // time it's used, so "test %(num)s %(fruit)s and %(num)s again" turns
        // into an object with keys:
        // [text_0, 0_num, text_2, 0_fruit, text_4, 1_num, text_6]
        // This is better than just using the array index in the case that we
        // switch between two translated strings with the same variables.
        // Admittedly, an edge case.
        let j = 0;
        while (`${j}_${key}` in result) {
            j++;
        }
        result[`${j}_${key}`] = replaceWith;
        // Because the regex has one capturing group, the `split` array always
        // has an odd number of elements, so this always stays in bounds.
        result[`text_${i + 1}`] = split[i + 1];
    }

    if (Object.keys(result).length === 1 && result.text_0) {
        return result.text_0;
    }

    // We have to cast the result to any here before then back to React.Node
    // because Object.values is typed as returning Array<mixed> and flow is
    // not happy about `mixed` being turned into React$Element and a couple
    // of other subtypes of React.Node. However, we know this is an array of
    // React.Node so rather than lose all typing and ignoring the error, we
    // do a little casting to any and then to React.Node.
    const children: Array<React.ReactNode> = Object.values(
        result,
    ) as Array<any>;

    // NOTE: We need to use createElement here because
    // <React.Fragment>{Object.values(result)}</React.Fragment>
    // triggers the following error:
    //      Warning: Each child in an array or iterator should have a
    //      unique "key" prop.
    return React.createElement(React.Fragment, {}, ...children);
};

/**
 * This is the real worker for handling substitution and fake translation.
 */
const internalTranslate: internalTranslateOverloads = (
    strOrPluralConfig,
    options,
    additionalTranslation: (arg1: string) => string,
) => {
    // Sometimes we're given an argument that's meant for ngettext().  This
    // happens if the same string is used in both i18n._() and i18n.ngettext()
    // (.g. a = i18n._(foo); b = i18n.ngettext("foo", "bar", count);
    // In such cases, only the plural form ends up in the .po file, and
    // then it gets sent to us for the i18n._() case too.  No problem, though:
    // we'll just take the singular arg.
    if (typeof strOrPluralConfig === "object" && strOrPluralConfig.messages) {
        strOrPluralConfig = strOrPluralConfig.messages[0];
    }

    // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string | PluralConfigurationObject' is not assignable to parameter of type 'string'.
    const translated = additionalTranslation(strOrPluralConfig);
    // Options are optional, if we don't have any, just return the string.
    if (options == null) {
        return translated;
    }

    // Otherwise, let's see if our string has anything to be replaced.
    return translated.replace(interpolationMarker, (match, key) => {
        const replaceWith = options[key];
        return replaceWith != null ? String(replaceWith) : match;
    });
};

/**
 * Simple i18n method with sprintf-like %(name)s replacement
 * To be used like so:
 *   i18n._("Some string")
 *   i18n._("Hello %(name)s", {name: "John"})
 */
export const _: _Overloads = (strOrPluralConfig, options) =>
    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
    internalTranslate(strOrPluralConfig, options, fakeTranslate);

/**
 * i18n method that supports sprintf-like %(name)s replacement for React nodes
 * as well as strings. To be used like so:
 *   i18n._(
 *       "Look at this flashing text!: %(node)s",
 *       {node: <blink>Ahh my eyes!</blink>}
 *   )
 */
// @ts-expect-error [FEI-5019] - TS2322 - Type '(str: string, options: InterpolationOptions<ReactNode> | null | undefined) => ReactNode' is not assignable to type '(str: string, options?: InterpolationOptions<ReactNode> | null | undefined) => ReactElement<any, string | JSXElementConstructor<any>>'.
export const $_: (
    str: string,
    options?:
        | InterpolationOptions<React.ReactNode | null | undefined>
        | null
        | undefined,
) => React.ReactElement = function (str, options) {
    return interpolateStringToFragment(str, options);
};

/**
 * Simple ngettext method with sprintf-like %(name)s replacement
 * To be used like so:
 *   i18n.ngettext("Singular", "Plural", 3)
 *   i18n.ngettext("%(num)s Cat", "%(num)s Cats", 3)
 *   i18n.ngettext(
 *           "%(num)s %(type)s Cat",
 *           "%(num)s %(type)s Cats",
 *           3, {type: "Calico"})
 *
 * This method is also meant to be used when injecting for other
 * non-English languages, like so (taking an array of plural messages,
 * which varies based upon the language):
 *   i18n.ngettext({
 *     lang: "ja",
 *     messages: ["%(num)s 猫 %(username)s"]
 *   }, 3, {username: "John"});
 *
 * Note: the "singular variant" of a string isn't always associated with a
 * quantity of 1 in all languages, so do not hardcode one into the variant.
 * French uses it for 0 and 1. In Japanese, if the number of results is 100
 * (or any number) we'd be showing "1 結果" regardless of the number.
 * In Russian, any number ending in 1 (e.g. 21, 61) uses singular form.
 * You should instead still parameterize the number.
 */
// @ts-expect-error [FEI-5019] - TS2322 - Type '(singular: string, plural: string, num: number | null | undefined, options: NGetOptions | undefined) => string' is not assignable to type 'ngettextOverloads'.
export const ngettext: ngettextOverloads = (singular, plural, num, options) => {
    const {messages, lang}: PluralConfigurationObject =
        typeof singular === "object"
            ? singular
            : {
                  lang: "en",
                  // We know plural is a string if singular is not a config object
                  messages: [singular, plural as any],
              };

    const actualNum: number =
        typeof singular === "object" ? plural : (num as any);
    const actualOptions: NGetOptions =
        (typeof singular === "object" ? num : (options as any)) || {};

    // Get the translated string
    const idx = ngetpos(actualNum, lang);

    // The common (non-error) case is messages[idx].
    const translation = idx < messages.length ? messages[idx] : "";

    // Get the options to substitute into the string.
    // We automatically add in the 'magic' option-variable 'num'.
    actualOptions.num = actualOptions.num || actualNum;

    // Then pass into i18n._ for the actual substitution
    return _(translation, actualOptions);
};

/*
 * Return the ngettext position that matches the given number and lang.
 *
 * Arguments:
 *  - num: The number upon which to toggle the plural forms.
 *  - lang: The language to use as the basis for the pluralization.
 */
export const ngetpos = function (num: number, lang?: Language): number {
    const pluralForm = (lang && allPluralForms[lang]) || allPluralForms["en"];
    const pos = pluralForm(num);
    // Map true to 1 and false to 0, keep any numeric return value the same.
    return pos === true ? 1 : pos ? pos : 0;
};

/*
 * A dummy identity function.  It's used as a signal to automatic
 * translation-identification tools that they shouldn't mark this
 * text up to be translated, even though it looks like
 * natural-language text.  (And likewise, a signal to linters that
 * they shouldn't complain that this text isn't translated.)
 * Use it like so: 'tag.author = i18n.doNotTranslate("Jim");'
 */
export const doNotTranslate: _Overloads = (s, o) =>
    // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
    internalTranslate(s, o, (t) => t);

/*
 * A dummy identity function, like i18n.doNotTranslate. It's used to
 * represent strings that may undergo revisions and should not be
 * translated yet.
 */
export const doNotTranslateYet: _Overloads = doNotTranslate;
