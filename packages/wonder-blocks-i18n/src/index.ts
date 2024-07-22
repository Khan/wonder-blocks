export {
    _,
    $_,
    ngettext,
    doNotTranslate,
    doNotTranslateYet, // used by handlebars translation functions in webapp
    ngetpos,
} from "./functions/i18n";
export {loadTranslations, clearTranslations} from "./functions/i18n-store";

export {localeToFixed, getDecimalSeparator} from "./functions/l10n";
export {getLocale, setLocale} from "./functions/locale";
export {I18nInlineMarkup} from "./components/i18n-inline-markup";
