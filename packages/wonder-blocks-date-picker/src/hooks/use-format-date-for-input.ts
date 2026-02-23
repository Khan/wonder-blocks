import {Temporal} from "temporal-polyfill";
import * as React from "react";
import type {Locale} from "react-day-picker/locale";

import {TemporalLocaleUtils} from "../util/temporal-locale-utils";

type Params = {
    dateFormat?: string;
    locale?: Locale;
};

/**
 * Returns a stable callback that formats the current date for the input field.
 * Uses dateFormat and locale; returns "" for null/undefined date.
 */
export function useFormatDateForInput({
    dateFormat,
    locale,
}: Params): (date: Temporal.PlainDate | null | undefined) => string {
    const localeCode = locale?.code ?? "en-US";
    return React.useCallback(
        (date: Temporal.PlainDate | null | undefined): string => {
            if (date == null) {
                return "";
            }
            return TemporalLocaleUtils.formatDate(date, dateFormat, localeCode);
        },
        [dateFormat, localeCode],
    );
}
