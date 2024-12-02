/**
 * Functions for storing and retrieving translations.
 *
 * The i18n store is a simple cache that stores translations for a given locale.
 */
import FakeTranslate from "./i18n-faketranslate";
import {getLocale} from "./locale";
import {allPluralForms} from "./plural-forms";
import {PluralConfigurationObject} from "./types";

type Language = keyof typeof allPluralForms;

// The cache of strings that have been translated, by locale.
const localeMessageStore = new Map<
    string,
    // Singular strings are stored as a string, plural strings are stored as
    // an arrays of strings.
    Record<string, string | Array<string>>
>();

// Create a fake translate object to use if we can't find a translation.
const {translate: fakeTranslate} = new FakeTranslate();

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

/**
 * Get the translation for a given id and locale.
 *
 * @param id the id of the string to translate
 * @param locale the locale to translate to
 * @returns the translated string, or null if no translation is found
 */
const getTranslationFromStore = (id: string, locale: string) => {
    // See if we have a cache for the locale.
    const messageCache = localeMessageStore.get(locale);

    if (!messageCache) {
        return null;
    }

    // See if we have a cached message for the id.
    const cachedMessage = messageCache[id];

    if (!cachedMessage) {
        return null;
    }

    // We found the translated string (or strings) so we can return it.
    return cachedMessage;
};

/**
 * Get the translation for a given message. If no translation is found, attempt
 * to get the translation using FakeTranslate. If that fails, return the message.
 *
 * @param strOrPluralConfig the id of the string to translate, or a plural
 * configuration object
 * @returns the translated string
 */
export const getSingularTranslation = (
    strOrPluralConfig: string | PluralConfigurationObject,
) => {
    // Sometimes we're given an argument that's meant for ngettext().  This
    // happens if the same string is used in both i18n._() and i18n.ngettext()
    // (.g. a = i18n._(foo); b = i18n.ngettext("foo", "bar", count);
    // In such cases, only the plural form ends up in the .po file, and
    // then it gets sent to us for the i18n._() case too.  No problem, though:
    // we'll just take the singular arg.
    const id =
        typeof strOrPluralConfig === "string"
            ? strOrPluralConfig
            : strOrPluralConfig.messages[0];

    // We try to find the translation in the cache.
    const message = getTranslationFromStore(id, getLocale());

    // We found the translation so we can return it.
    // We need to make sure that we only return the first message, in the case
    // where there is a plural form for the same message.
    if (message) {
        return Array.isArray(message) ? message[0] : message;
    }

    // Otherwise, there's no translation, so we try to do fake translation.
    return fakeTranslate(id);
};

/**
 * Get the plural translation for a given plural configuration object.
 *
 * @param pluralConfig the plural configuration object
 * @param idx the index of the plural form to use
 * @returns the translated string
 */
export const getPluralTranslation = (
    pluralConfig: PluralConfigurationObject,
    num: number,
) => {
    const {lang, messages} = pluralConfig;

    // We try to find the translation in the cache.
    const translatedMessages = getTranslationFromStore(
        messages[0],
        getLocale(),
    );

    // We found the translation so we can return the right plural form.
    if (translatedMessages) {
        if (!Array.isArray(translatedMessages)) {
            // NOTE(john): This should never happen, but we should handle it
            // just in case.
            return translatedMessages;
        }
        // Get the translated string
        const idx = ngetpos(num, getLocale());
        return translatedMessages[idx];
    }

    // Otherwise, there's no translation, so we try to do fake translation.
    const idx = ngetpos(num, lang);
    return fakeTranslate(messages[idx]);
};

/**
 * Load locale data into the cache.
 *
 * @param locale the locale to load data for
 * @param data the id-message pairs to load
 */
export const loadTranslations = (
    locale: string,
    data: Record<string, string | Array<string>>,
) => {
    const messageCache = localeMessageStore.get(locale);
    localeMessageStore.set(locale, {...messageCache, ...data});
};

/**
 * Clear locale data from the cache.
 *
 * @param locale the locale to clear data for
 */
export const clearTranslations = (locale: string) => {
    localeMessageStore.delete(locale);
};
