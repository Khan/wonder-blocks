// @flow

const interpolationMarker = /%\(([\w_]+)\)s/g;

/**
 * Simple i18n method with sprintf-like %(name)s replacement
 * To be used like so:
 *   i18n._("Some string")
 *   i18n._("Hello %(name)s", {name: "John"})
 */
const _ = (
    str: string | {messages: Array<string>},
    options?: {[key: string]: string | number},
) => {
    // Sometimes we're given an argument that's meant for ngettext().  This
    // happens if the same string is used in both i18n._() and i18n.ngettext()
    // (.g. a = i18n._(foo); b = i18n.ngettext("foo", "bar", count);
    // In such cases, only the plural form ends up in the .po file, and
    // then it gets sent to us for the i18n._() case too.  No problem, though:
    // we'll just take the singular arg.
    if (typeof str === "object" && str.messages) {
        str = str.messages[0];
    }

    return str.replace(interpolationMarker, (match, key) => {
        if (options && options.hasOwnProperty(key)) {
            const replaceWith = options[key];
            return replaceWith === undefined ? match : String(replaceWith);
        }

        return match;
    });
};

// The plural language strings for all the languages we have
// listed in crowdin.  The values here need to match what crowdin
// uses (sometimes different platforms use different plural forms,
// for ambiguous languages like Turkish).  I got it by running
//    deploy/download_i18n.py -s
// and looking a the .po files in all.zip.  Each .po file has a
// header line that say something like:
//    "Plural-Forms: nplurals=2; plural=(n != 1);\n"
// which I copied in here with the following changes:
//    1) I only take the 'plural=' section, which I wrapped in a function
//    2) Changed 'or' to '||'
// These functions return either true or false or a number.  We map
// true to 1 and false to 0 below, to always get a number out of this.

const likeEnglish = (n) => n !== 1;

const allPluralForms = {
    accents: likeEnglish, // a 'fake' language
    af: likeEnglish,
    ar: (n) =>
        n === 0
            ? 0
            : n === 1
                ? 1
                : n === 2
                    ? 2
                    : n % 100 >= 3 && n % 100 <= 10
                        ? 3
                        : n % 100 >= 11 && n % 100 <= 99
                            ? 4
                            : 5,
    az: likeEnglish,
    bg: likeEnglish,
    bn: likeEnglish,
    boxes: likeEnglish, // a 'fake' language
    ca: likeEnglish,
    cs: (n) => (n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2),
    da: likeEnglish,
    de: likeEnglish,
    el: likeEnglish,
    empty: likeEnglish, // a 'fake' language
    en: likeEnglish,
    "en-pt": likeEnglish, // a 'fake' language, used by crowdin for JIPT
    es: likeEnglish,
    et: likeEnglish,
    fa: (n) => 0,
    "fa-af": (n) => 0,
    fi: likeEnglish,
    fil: (n) => n > 1,
    fr: (n) => n > 1,
    gu: likeEnglish,
    he: likeEnglish,
    hi: likeEnglish,
    hr: (n) =>
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    hu: likeEnglish,
    hy: likeEnglish,
    id: (n) => 0,
    it: likeEnglish,
    ja: (n) => 0,
    ka: likeEnglish,
    kn: likeEnglish,
    ko: (n) => 0,
    ky: (n) => 0,
    lol: likeEnglish, // a 'fake' language
    lt: (n) =>
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    lv: (n) => (n === 0 ? 0 : n % 10 === 1 && n % 100 !== 11 ? 1 : 2),
    mn: likeEnglish,
    ms: (n) => 0,
    my: (n) => 0,
    nb: likeEnglish,
    nl: likeEnglish,
    nn: likeEnglish,
    or: likeEnglish,
    pl: (n) =>
        n === 1
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    pt: likeEnglish,
    "pt-pt": likeEnglish,
    ro: (n) => (n === 1 ? 0 : n === 0 || (n % 100 > 0 && n % 100 < 20) ? 1 : 2),
    ru: (n) =>
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    si: likeEnglish,
    "si-LK": likeEnglish,
    sk: (n) => (n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2),
    sr: (n) =>
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    sv: likeEnglish,
    "sv-SE": likeEnglish,
    sw: likeEnglish,
    ta: likeEnglish,
    te: likeEnglish,
    th: (n) => 0,
    tr: (n) => 0,
    uk: (n) =>
        n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2,
    ur: likeEnglish,
    uz: (n) => n > 1,
    vi: (n) => 0,
    xh: likeEnglish,
    "zh-hans": (n) => 0,
    "zh-hant": (n) => 0,
    zu: likeEnglish,
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
type Plurals = {|
    lang: string,
    messages: Array<string>,
|};

type Options = {|
    [key: string]: string | number,
|};

const ngettext = (
    singular: string | Plurals,
    plural: number | string,
    num: number | Options,
    options?: Options,
): string => {
    // Fall back to the default lang
    let lang;
    let messages;

    // If the first argument is an object then we're receiving a plural
    // configuration object
    if (
        typeof singular === "object" &&
        typeof num === "object" &&
        typeof plural === "number"
    ) {
        lang = singular.lang;
        messages = singular.messages;
        // We only have a messages object no plural string
        // thus we need to shift all the arguments over by one.
        options = num;
        num = plural;
    } else {
        lang = "en"; // We're using text written into the source code
        messages = [singular, plural];
    }

    if (typeof num === "number") {
        // Get the translated string
        const idx = ngetpos(num, lang);
        let translation = "";

        if (idx < messages.length) {
            // the common (non-error) case
            translation = String(messages[idx]);
        }

        // Get the options to substitute into the string.
        // We automatically add in the 'magic' option-variable 'num'.
        const _options = options || {};
        _options.num = String(_options.num || num);

        // Then pass into i18n._ for the actual substitution
        return _(translation, _options);
    }

    if (typeof singular === "string") {
        return singular;
    }

    return "";
};

/*
* Return the ngettext position that matches the given number and locale.
*
* Arguments:
*  - num: The number upon which to toggle the plural forms.
*  - lang: The language to use as the basis for the pluralization.
*/
const ngetpos = (num: number, lang: string) => {
    const pluralForm = allPluralForms[lang] || allPluralForms["en"];
    const pos = pluralForm(num);
    // Map true to 1 and false to 0, keep any numeric return value the same.
    return pos === true ? 1 : pos ? pos : 0;
};

export default {_, ngettext};
