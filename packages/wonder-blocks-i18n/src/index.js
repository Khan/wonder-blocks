// @flow
export {
    _,
    $_,
    ngettext,
    doNotTranslate,
    doNotTranslateYet,
    ngetpos, // used by handlebars translation functions in webapp
} from "./functions/i18n.js";

export {localeToFixed, getDecimalSeparator} from "./functions/l10n.js";
export {getLocale, setLocale} from "./functions/locale.js";
export {I18nInlineMarkup} from "./components/i18n-inline-markup.js";
