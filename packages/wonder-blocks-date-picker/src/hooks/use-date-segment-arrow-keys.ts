import * as React from "react";

import {adjustDateSegment} from "../util/adjust-date-segment";
import {findSegmentAtOffset} from "../util/find-segment-at-offset";
import {getDateSegments} from "../util/get-date-segments";
import {TemporalLocaleUtils} from "../util/temporal-locale-utils";

type Params = {
    value: string | null | undefined;
    dateFormat?: string;
    locale: string;
    parseDate?: (
        value: string | Date,
        format: string | null | undefined,
        locale?: string | null | undefined,
    ) => Date | null | undefined;
    handleChange: (newValue: string) => void;
    innerRef: React.RefObject<HTMLInputElement | null>;
};

/**
 * Let ArrowUp/ArrowDown increment/decrement the day/month/year segment the
 * caret is currently in, matching native `<input type="date">`/`type="time"`
 * behavior. Only handles numeric date formats (see `getDateSegments`) and
 * only when the current value is already a fully valid, parseable date.
 *
 * @param params.value - The current text shown in the input.
 * @param params.dateFormat - The `dateFormat` prop value used to render `value`.
 * @param params.locale - The locale used to render `value`.
 * @param params.parseDate - Parses `value` into a `Date`, same as the parent
 * `DatePicker`'s `parseDate` prop.
 * @param params.handleChange - Called with the newly formatted value, same
 * as if the user had typed it.
 * @param params.innerRef - A ref to the underlying `<input>`, used to
 * reposition the caret after an edit.
 * @returns A keydown handler that returns `true` if it handled the key (the
 * caller should stop there) or `false` otherwise.
 */
export function useDateSegmentArrowKeys({
    value,
    dateFormat,
    locale,
    parseDate,
    handleChange,
    innerRef,
}: Params): (e: React.KeyboardEvent<HTMLInputElement>) => boolean {
    const pendingSelectionRef = React.useRef<[number, number] | null>(null);

    React.useEffect(() => {
        if (pendingSelectionRef.current && innerRef.current) {
            const [start, end] = pendingSelectionRef.current;
            innerRef.current.setSelectionRange(start, end);
            pendingSelectionRef.current = null;
        }
    }, [value, innerRef]);

    return React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): boolean => {
            if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                return false;
            }
            if (!value || !parseDate) {
                return false;
            }

            const jsDate = parseDate(value, dateFormat, locale);
            if (!jsDate) {
                return false;
            }

            const segments = getDateSegments(value, dateFormat, locale);
            if (!segments) {
                return false;
            }

            const offset = e.currentTarget.selectionStart ?? 0;
            const segment = findSegmentAtOffset(segments, offset);
            if (!segment) {
                return false;
            }

            const currentDate =
                TemporalLocaleUtils.jsDateToTemporalDate(jsDate);
            const delta = e.key === "ArrowUp" ? 1 : -1;
            const adjustedDate = adjustDateSegment(
                currentDate,
                segment.type,
                delta,
            );
            const newValue = TemporalLocaleUtils.formatDate(
                adjustedDate,
                dateFormat,
                locale,
            );

            const newSegments = getDateSegments(newValue, dateFormat, locale);
            const newSegment = newSegments?.find(
                (s) => s.type === segment.type,
            );
            pendingSelectionRef.current = newSegment
                ? [newSegment.start, newSegment.end]
                : null;

            e.preventDefault();
            handleChange(newValue);
            return true;
        },
        [value, dateFormat, locale, parseDate, handleChange],
    );
}
