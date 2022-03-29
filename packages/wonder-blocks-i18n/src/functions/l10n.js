// @flow
import {getLocale} from "./locale.js";

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
