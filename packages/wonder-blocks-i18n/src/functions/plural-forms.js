// @flow
/* eslint-disable eqeqeq */

type PluralFormsMap = {[string]: (count: number) => boolean | number, ...};

// Pluralization rule should be `likeEnglish` unless specified by
// someone on the language's advocate team in the Jira ticket.

export const likeEnglish = (n: number): boolean => n != 1;
export const likeFrench = (n: number): boolean => n > 1;
export const likeJapanese = (n: number): number => 0;

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
export const allPluralForms: PluralFormsMap = {
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
    "fa": likeJapanese,
    "fa-af": likeJapanese,
    "fi": likeEnglish,
    "fil": likeFrench,
    "fr": likeFrench,
    "fv": likeFrench,
    "gu": likeEnglish,
    "he": likeEnglish,
    "hi": likeEnglish,
    "hr": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "hu": likeEnglish,
    "hy": likeEnglish,
    "id": likeJapanese,
    "is": likeEnglish,
    "it": likeEnglish,
    "ja": likeJapanese,
    "ka": likeEnglish,
    "kk": likeEnglish,
    "km": likeEnglish,
    "kn": likeEnglish,
    "ko": likeJapanese,
    "ky": likeJapanese,
    "lol": likeEnglish,    // a 'fake' language
    "lt": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2),
    "lv": (n) => (n==0 ? 0 : n%10==1 && n%100!=11 ? 1 : 2),
    "mn": likeEnglish,
    "mr": likeEnglish,
    "ms": likeJapanese,
    "my": likeJapanese,
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
    "th": likeJapanese,
    "tr": likeJapanese,
    "uk": (n) => (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2),
    "ur": likeEnglish,
    "uz": likeFrench,
    "vi": likeJapanese,
    "xh": likeEnglish,
    "zh-hans": likeJapanese,
    "zh-hant": likeJapanese,
    "zu": likeEnglish,
};
