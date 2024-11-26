/* eslint-disable @babel/no-invalid-this */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
import * as React from "react";

import {allPluralForms} from "./plural-forms";
import {getLocale} from "./locale";
import {PluralConfigurationObject} from "./types";
import {getPluralTranslation, getSingularTranslation} from "./i18n-store";

type InterpolationOptions<T> = {
    [key: string]: T;
};

type NGetOptions = {
    [key: string]: any;
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
    const split = getSingularTranslation(str).split(interpolationMarker);

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
    // because Object.values is typed as returning Array<unknown> and TypeScript
    // is not happy about `unknown` being turned into React.ReactElement and a couple
    // of other subtypes of React.ReactNode. However, we know this is an array of
    // React.Node so rather than lose all typing and ignoring the error, we
    // do a little casting to any and then to React.ReactNode.
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
 * Handle string interpolation (for plain strings, not React fragments).
 */
const interpolateString = (
    message: string,
    options:
        | InterpolationOptions<string | number | null | undefined>
        | null
        | undefined,
) => {
    // Options are optional, if we don't have any, just return the string.
    if (options == null) {
        return message;
    }

    // Otherwise, let's see if our string has anything to be replaced.
    return message.replace(interpolationMarker, (match, key) => {
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
export const _: _Overloads = (strOrPluralConfig, options) => {
    const message = getSingularTranslation(strOrPluralConfig);
    return interpolateString(message, options);
};

/**
 * i18n method that supports sprintf-like %(name)s replacement for React nodes
 * as well as strings. To be used like so:
 *   i18n._(
 *       "Look at this flashing text!: %(node)s",
 *       {node: <blink>Ahh my eyes!</blink>}
 *   )
 */
export const $_: (
    str: string,
    options?:
        | InterpolationOptions<React.ReactNode | null | undefined>
        | null
        | undefined,
) => React.ReactNode = function (str, options) {
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
export const ngettext: ngettextOverloads = (
    singular: string | PluralConfigurationObject,
    plural?: string | number | null | undefined,
    num?: number | null | undefined | NGetOptions,
    options?: NGetOptions,
) => {
    const pluralConfObj: PluralConfigurationObject =
        typeof singular === "object"
            ? singular
            : {
                  lang: getLocale(),
                  // We know plural is a string if singular is not a config object
                  messages: [singular, plural as any],
              };

    const actualNum: number =
        typeof singular === "object" ? plural : (num as any);
    const actualOptions: NGetOptions =
        (typeof singular === "object" ? num : (options as any)) || {};

    // Get the translated string
    const idx = ngetpos(actualNum, pluralConfObj.lang);

    // The common (non-error) case is messages[idx].
    const translation = getPluralTranslation(pluralConfObj, idx);

    // Get the options to substitute into the string.
    // We automatically add in the 'magic' option-variable 'num'.
    actualOptions.num = formatNumber(actualNum);

    // Then do the actual substitution
    return interpolateString(translation, actualOptions);
};

/**
 * Format a number to a string using the current locale.
 * This is a thin wrapper around Intl.NumberFormat.
 *
 * @param num the number to format to a string
 * @returns a formatted number string
 */
const formatNumber = (num: number): string => {
    return Intl.NumberFormat(getLocale()).format(num);
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
export const doNotTranslate: _Overloads = (strOrPluralConfig, options) => {
    const id =
        typeof strOrPluralConfig === "string"
            ? strOrPluralConfig
            : strOrPluralConfig.messages[0];
    return interpolateString(id, options);
};

/*
 * A dummy identity function, like i18n.doNotTranslate. It's used to
 * represent strings that may undergo revisions and should not be
 * translated yet.
 */
export const doNotTranslateYet: _Overloads = doNotTranslate;
