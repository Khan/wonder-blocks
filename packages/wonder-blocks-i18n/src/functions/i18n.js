/* eslint-disable @babel/no-invalid-this */
// @flow
/* eslint-disable eqeqeq */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
import * as React from "react";

import FakeTranslate from "./i18n-faketranslate.js";
import {getLocale} from "./get-locale.js";

type InterpolationOptions<T> = {[string]: T, ...};

type NGetOptions = {[string]: any, ...};
type PluralFormsMap = {[string]: (count: number) => boolean | number, ...};

type PluralConfigurationObject = {|
    lang: string,
    messages: Array<string>,
|};

interface ngettextOverloads {
    (
        config: PluralConfigurationObject,
        num: ?number,
        options?: NGetOptions,
    ): string;
    (
        singular: string,
        plural: string,
        num: ?number,
        options?: NGetOptions,
    ): string;
}

interface _Overloads {
    (str: string, options?: ?InterpolationOptions<?(string | number)>): string;

    (
        pluralConfig: PluralConfigurationObject,
        options?: ?InterpolationOptions<?(string | number)>,
    ): string;
}

interface internalTranslateOverloads {
    (
        str: string,
        options?: ?InterpolationOptions<?(string | number)>,
        additionalTranslation: (string) => string,
    ): string;

    (
        pluralConfig: PluralConfigurationObject,
        options?: ?InterpolationOptions<?(string | number)>,
        additionalTranslation: (string) => string,
    ): string;
}

type HandlebarsOptions = {|
    fn: (scope: any) => any,
    inverse: (scope: any) => any,
|};

const {translate: fakeTranslate} = new FakeTranslate();

// Pluralization rule should be `likeEnglish` unless specified by
// someone on the language's advocate team in the Jira ticket.

const likeEnglish = (n) => n != 1;

// sync-start:i18n-plurals 410708641 services/emails/i18n/i18n.go

// If you need to add a new locale, find the Crowdin locale code and assign it
// to a shell variable `CROWDIN_LOCALE`, and run the following:
//
//     gsutil cat $(
//         gsutil ls "gs://ka_translations_archive/$CROWDIN_LOCALE/*.tar.gz" \
//             | grep -v pofiles \
//             | tail -n 1
//     ) \
//         | tar xzf - -O 1_high_priority_platform/about.donate.po \
//         | grep '"Plural-Forms:'
//
// This grabs a tar/gzip file with the most recent set of translation files
// we've downloaded from Crowdin, and opens one of them and looks for an
// annotation that describes the plural rule in a `gettext`-specific format.
// If it prints exactly the following, use `likeEnglish` below.
//
//     "Plural-Forms: nplurals=2; plural=(n != 1);\n"
//
// If it prints anything else, use the `plural` expression, which should
// hopefully be usable in JavaScript.
//
// TODO(csilvers): auto-generate this list instead.
//
// NOTE(mdr): Disable Prettier for this object, because intl_js_test.py
//     expects it to be in a particular format.
//     prettier-ignore
const allPluralForms: PluralFormsMap = {
    "accents": likeEnglish,  // a 'fake' language
    "af": likeEnglish,
    "ar": (n) => n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5,
    "as": likeEnglish,
    "az": likeEnglish,
    "bg": likeEnglish,
    "bn": likeEnglish,
    "boxes": likeEnglish,    // a 'fake' language
    "ca": likeEnglish,
    "cs": (n) => (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2,
    "da": likeEnglish,
    "de": likeEnglish,
    "el": likeEnglish,
    "empty": likeEnglish,    // a 'fake' language
    "en": likeEnglish,
    "en-pt": likeEnglish,    // a 'fake' language, used by crowdin for JIPT
    "es": likeEnglish,
    "et": likeEnglish,
    "fa": (n) => 0,
    "fa-af": (n) => 0,
    "fi": likeEnglish,
    "fil": (n) => (n > 1),
    "fr": (n) => (n > 1),
    "fv": (n) => (n > 1),
    "gu": likeEnglish,
    "he": likeEnglish,
    "hi": likeEnglish,
    "hr": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "hu": likeEnglish,
    "hy": likeEnglish,
    "id": (n) => 0,
    "is": likeEnglish,
    "it": likeEnglish,
    "ja": (n) => 0,
    "ka": likeEnglish,
    "kk": likeEnglish,
    "km": likeEnglish,
    "kn": likeEnglish,
    "ko": (n) => 0,
    "ky": (n) => 0,
    "lol": likeEnglish,    // a 'fake' language
    "lt": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2),
    "lv": (n) => (n==0 ? 0 : n%10==1 && n%100!=11 ? 1 : 2),
    "mn": likeEnglish,
    "mr": likeEnglish,
    "ms": (n) => 0,
    "my": (n) => 0,
    "nb": likeEnglish,
    "nl": likeEnglish,
    "nn": likeEnglish,
    "or": likeEnglish,
    "pa": likeEnglish,
    "pl": (n) => (n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "pt": likeEnglish,
    "pt-pt": likeEnglish,
    "ro": (n) => (n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2),
    "ru": (n) => n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2,
    "rw": likeEnglish,
    "sgn-us": likeEnglish,
    "si": likeEnglish,
    "si-LK": likeEnglish,
    "sk": (n) => (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2,
    "sr": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "sv": likeEnglish,
    "sv-SE": likeEnglish,
    "sw": likeEnglish,
    "ta": likeEnglish,
    "te": likeEnglish,
    "th": (n) => 0,
    "tr": (n) => 0,
    "uk": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "ur": likeEnglish,
    "uz": (n) => (n > 1),
    "vi": (n) => 0,
    "xh": likeEnglish,
    "zh-hans": (n) => 0,
    "zh-hant": (n) => 0,
    "zu": likeEnglish,
};
// sync-end:i18n-plurals

type Language = $Keys<typeof allPluralForms>;

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
    options?: ?InterpolationOptions<?React.Node>,
): React.Node {
    options = options || {};

    // Split the string into its language fragments and substitutions
    const split = fakeTranslate(str).split(interpolationMarker);

    const result: {[key: string]: React.Node, ...} = {text_0: split[0]};

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
    const children: Array<React.Node> = (Object.values(result): Array<any>);

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
    additionalTranslation: (string) => string,
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
    internalTranslate(strOrPluralConfig, options, fakeTranslate);

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
    options?: ?InterpolationOptions<?React.Node>,
) => React.Node = function (str, options) {
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
export const ngettext: ngettextOverloads = (singular, plural, num, options) => {
    const {messages, lang}: PluralConfigurationObject =
        typeof singular === "object"
            ? singular
            : {
                  lang: "en",
                  // We know plural is a string if singular is not a config object
                  messages: [singular, (plural: any)],
              };

    const actualNum: number = ((typeof singular === "object"
        ? plural
        : num): any);
    const actualOptions: NGetOptions =
        ((typeof singular === "object" ? num : options): any) || {};

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
const ngetpos = function (num: number, lang?: Language) {
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
    internalTranslate(s, o, (t) => t);

/*
 * A dummy identity function, like i18n.doNotTranslate. It's used to
 * represent strings that may undergo revisions and should not be
 * translated yet.
 */
export const doNotTranslateYet: _Overloads = doNotTranslate;

/**
 * Dummy Handlebars _ function. Is a noop.
 * Should be used as: {{#_}}...{{/_}}
 * The text is extracted, at compile-time, by server-side scripts.
 * This is just used for marking up those fragments that need translation.
 * The translated text is injected at deploy-time.
 */
export const handlebarsUnderscore = function (options: HandlebarsOptions): any {
    return options.fn(this);
};

/**
 *  Mark text as not needing translation.
 *
 * This function is used to let i18nize_templates.py know that
 * everything within it does not need to be translate.
 * Should be used as: {{#i18nDoNotTranslate}}...{{/i18nDoNotTranslate}}
 * It does not need to actually do anything and hence returns the contents
 * as is.
 */
export const handlebarsDoNotTranslate = function (
    options: HandlebarsOptions,
): any {
    return options.fn(this);
};

/**
 * Handlebars ngettext function.
 * Doesn't do any translation, is used for showing the correct string
 * based upon the specified number and language.
 * All strings are extracted (at compile-time) and injected (at
 * deploy-time). By default this should be used as:
 *   {{#ngettext NUM}}singular{{else}}plural{{/ngettext}}
 * After injecting the translated strings into the page it'll read as:
 *   {{#ngettext NUM "lang" 0}}singular{{else}}plural{{/ngettext}}
 * (May depend upon the language used and how many different plural
 * forms the language has.)
 *
 * Arguments:
 *  - num: The number upon which to toggle the plural forms.
 *  - lang: The language to use as the basis for the pluralization.
 *  - pos: The expected plural form (depends upon the language)
 */
export const handlebarsNgettext = function (
    num: number,
    lang: Language,
    pos: number,
    options: HandlebarsOptions,
): any {
    // This method has two signatures:
    // (num) (the default for when the code is run in dev mode)
    // (num, lang, pos) (for when the code is run in prod mode)
    if (typeof lang !== "string") {
        options = lang;
        lang = "en";
        pos = 0;
    }

    // Add in 'num' as a magic variable.
    this.num = this.num || num;

    // If the result of the plural form function given the specified
    // number matches the expected position then we give the first
    // result, otherwise we give the inverse result.
    return ngetpos(num) === pos ? options.fn(this) : options.inverse(this);
};

/**
 * Rounds num to X places, and uses the proper decimal seperator.
 * But does *not* insert thousands separators.
 */
export const localeToFixed = function (num: number, places: number): string {
    const decimalSeperator = getDecimalSeparator();
    let langFixed = num.toFixed(places).replace(".", decimalSeperator);
    if (langFixed === "-0") {
        langFixed = "0";
    }
    return langFixed;
};

/**
 *  Get the character used for separating decimals.
 */
export const getDecimalSeparator = (): string => {
    const locale = getLocale();

    switch (locale) {
        // TODO(somewhatabstract): Remove this when Chrome supports the `ka`
        // locale properly.
        // https://github.com/formatjs/formatjs/issues/1526#issuecomment-559891201
        //
        // Supported locales in Chrome:
        // https://source.chromium.org/chromium/chromium/src/+/master:third_party/icu/scripts/chrome_ui_languages.list
        case "ka":
            return ",";

        default:
            const numberWithDecimalSeparator = 1.1;
            // TODO(FEI-3647): Update to use .formatToParts() once we no longer have to
            // support Safari 12.
            const match = new Intl.NumberFormat(getLocale())
                .format(numberWithDecimalSeparator)
                // 0x661 is ARABIC-INDIC DIGIT ONE
                // 0x6F1 is EXTENDED ARABIC-INDIC DIGIT ONE
                .match(/[^\d\u0661\u06F1]/);
            return match?.[0] ?? ".";
    }
};

if (typeof window !== "undefined") {
    // This is necessary for live-editor.  Even though live-editor defines its
    // own copy of i18n, some of the scratchpad and project feedback unit tests
    // fail when the global is removed.
    window.i18n = {
        _: _,
        ngettext: ngettext,
        i18nDoNotTranslate: doNotTranslate,
        i18nDoNotTranslateYet: doNotTranslateYet,
    };

    // TODO(csilvers): is it still necessary to make these globals?
    window.$_ = $_;
}
