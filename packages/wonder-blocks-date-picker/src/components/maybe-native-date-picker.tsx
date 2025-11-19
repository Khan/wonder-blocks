/**
 * TODO(jeff): See what the new picker looks like on iOS to see if it works
 * better or if we still need the native fallback.
 * The react datepicker we used was pretty unusable on iOS, so this datepicker
 * falls back on an <input type="date"> for devices that support touch input
 * and also support this type of input. Since we've moved to a new day picker
 * we should see if this is still the case.
 */
import {t} from "@lingui/core/macro";
import type {CSSProperties} from "aphrodite";
import type moment from "moment";
import * as React from "react";

import MaybeNativeDayPickerDisplay from "./maybe-native-date-picker-display";

interface MaybeNativeDatePickerProps {
    // Styles for the date picker container.
    style?: CSSProperties;
    dateFormat?: string;
    maxDate?: moment.Moment | null;
    minDate?: moment.Moment | null;
    selectedDate?: moment.Moment | null;
    disabled?: boolean;
    id?: string;
    // When the selected date changes, this callback yields a Moment object for
    // midnight on the selected date, set to the user's local time zone.
    updateDate: (arg1?: moment.Moment | null) => any;
    /**
     * The placeholder assigned to the date field
     */
    placeholder?: string;
    /**
     * The aria-label to be used for the date picker.
     */
    inputAriaLabel?: string;
}

/**
 * Date picker component that uses native picker if available.
 */
const MaybeNativeDatePicker = (props: MaybeNativeDatePickerProps) => {
    const {
        minDate,
        maxDate,
        selectedDate,
        style,
        dateFormat,
        disabled,
        id,
        placeholder,
        updateDate,
        inputAriaLabel,
    } = props;

    // Does the current browser support <input type="date">?
    // (This is based on the check that comes with Modernizr.)
    const supportsDateInput = React.useCallback(() => {
        const el = document.createElement("input");
        el.setAttribute("type", "date");
        // On unsupported platforms, the type ends up as 'text'.
        return el.type === "date";
    }, []);

    const useNativePicker = React.useCallback(() => {
        return (
            !!(typeof window !== "undefined" && "ontouchstart" in window) &&
            supportsDateInput()
        );
    }, [supportsDateInput]);

    const validateAndUpdate = React.useCallback(
        (newDate?: moment.Moment | null) => {
            if (
                minDate &&
                newDate &&
                newDate.isBefore(minDate.startOf("day"))
            ) {
                /* eslint-disable-next-line no-alert
                   --
                   We really should have a different UX for this but this
                   is what we have.
                 */
                alert(
                    t`Selected date cannot be before ${minDate.format("MMMM D, YYYY")}`,
                );
                return;
            }

            if (maxDate && newDate && newDate.isAfter(maxDate.endOf("day"))) {
                /* eslint-disable-next-line no-alert
                   --
                   We really should have a different UX for this but this
                   is what we have.
                 */
                alert(
                    t`Selected date cannot be after ${maxDate.format("MMMM D, YYYY")}`,
                );
                return;
            }

            updateDate(newDate ?? null);
        },
        [minDate, maxDate, updateDate],
    );

    return (
        <MaybeNativeDayPickerDisplay
            nativePicker={useNativePicker()}
            dateFormat={
                dateFormat
                    ? dateFormat
                    : [
                          "dddd, MMM D, YYYY",
                          "dddd, MMMM D, YYYY",
                          "MMMM D, YYYY",
                          "M/D/YYYY",
                          "M-D-YYYY",
                      ]
            }
            minDate={minDate}
            maxDate={maxDate}
            placeholder={placeholder}
            selectedDate={selectedDate}
            updateDate={validateAndUpdate}
            style={style}
            disabled={disabled}
            id={id}
            inputAriaLabel={inputAriaLabel ?? t`Choose or enter a date`}
        />
    );
};

export default MaybeNativeDatePicker;
