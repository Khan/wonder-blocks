import * as React from "react";

import {useDirectionDetection} from "@khanacademy/wonder-blocks-core";

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
 * ArrowUp/ArrowDown increment/decrement the day/month/year segment under the
 * caret; ArrowLeft/ArrowRight move the selection to the adjacent segment.
 * Matches native `<input type="date">`/`type="time">` behavior. Only handles
 * numeric date formats (see `getDateSegments`). ArrowUp/ArrowDown also
 * require the current value to be a valid, parseable date.
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
    const isRtl = useDirectionDetection(innerRef) === "rtl";

    React.useEffect(() => {
        if (pendingSelectionRef.current && innerRef.current) {
            const [start, end] = pendingSelectionRef.current;
            innerRef.current.setSelectionRange(start, end);
            pendingSelectionRef.current = null;
        }
    }, [value, innerRef]);

    return React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): boolean => {
            const key = e.key;
            const isVerticalKey = key === "ArrowUp" || key === "ArrowDown";
            const isHorizontalKey = key === "ArrowLeft" || key === "ArrowRight";
            if (!isVerticalKey && !isHorizontalKey) {
                return false;
            }
            if (!value) {
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

            if (isHorizontalKey) {
                // ArrowRight moves toward the next segment in LTR, the
                // previous one in RTL.
                const movesToNextSegment = isRtl
                    ? key === "ArrowLeft"
                    : key === "ArrowRight";
                const currentIndex = segments.indexOf(segment);
                // Clamp at the first/last segment instead of falling
                // through to native caret movement, which is unreliable
                // for a segmented, non-prose value.
                const targetSegment =
                    segments[currentIndex + (movesToNextSegment ? 1 : -1)] ??
                    segment;
                e.preventDefault();
                innerRef.current?.setSelectionRange(
                    targetSegment.start,
                    targetSegment.end,
                );
                return true;
            }

            if (!parseDate) {
                return false;
            }
            const jsDate = parseDate(value, dateFormat, locale);
            if (!jsDate) {
                return false;
            }

            const currentDate =
                TemporalLocaleUtils.jsDateToTemporalDate(jsDate);
            const delta = key === "ArrowUp" ? 1 : -1;
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
        [value, dateFormat, locale, parseDate, handleChange, isRtl, innerRef],
    );
}
