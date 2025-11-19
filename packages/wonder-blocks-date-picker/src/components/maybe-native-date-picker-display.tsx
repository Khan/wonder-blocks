import {t} from "@lingui/core/macro";
import {css, StyleSheet, type CSSProperties} from "aphrodite";
import moment from "moment";
import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

import DatePickerInput from "./date-picker-input";

// NOTE(juan): This is one of the Day/Date picker variants so we won't probably
// need this on load. Also, we could refactor this component after verifying
// that we can get rid of the renderDatePicker() function.
const DatePicker = React.lazy(
    () => import("./date-picker-do-we-need-this.jsx"),
);

interface Props {
    // Styles for the date picker container.
    style?: CSSProperties;
    dateFormat?: Array<string> | string;
    maxDate?: moment.Moment | null | undefined;
    minDate?: moment.Moment | null | undefined;
    nativePicker?: boolean;
    selectedDate?: moment.Moment | null | undefined;
    disabled?: boolean;
    id?: string;
    // When the selected date changes, this callback yields a Moment object for
    // midnight on the selected date, set to the user's local time zone.
    updateDate: (arg1?: moment.Moment | null | undefined) => any;
    /**
     * The placeholder assigned to the date field
     */
    placeholder?: string;
    /**
     * The aria-label to be used for the date picker.
     */
    inputAriaLabel?: string;
}

const MaybeNativeDayPickerDisplay = (props: Props) => {
    const {
        style,
        dateFormat,
        maxDate,
        minDate,
        nativePicker,
        selectedDate,
        disabled,
        id,
        updateDate,
        placeholder,
        inputAriaLabel,
        ...restProps
    } = props;

    const [currentEditValue, setCurrentEditValue] = React.useState<
        moment.Moment | null | undefined
    >(selectedDate);

    React.useEffect(() => {
        setCurrentEditValue(selectedDate);
    }, [selectedDate]);

    const getDateAsJsDate = (date?: moment.Moment | null): undefined | Date => {
        return (date && moment(date).toDate()) || undefined;
    };

    const updateDateNative = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): any => {
        const rawDate = event.target.valueAsDate;
        const date = moment({
            year: rawDate?.getUTCFullYear(),
            month: rawDate?.getUTCMonth(),
            date: rawDate?.getUTCDate(),
        });
        updateDate(date);
    };

    const renderNativeDatePicker = (): React.ReactNode => {
        // Note that YYYY-MM-DD is the internal format for the native
        // datepicker, but may not be the way it is actually displayed to
        // the user.
        const nativeDateFormat = "YYYY-MM-DD";

        // NOTE: We force locale to be set in English to avoid having issues
        // with languages that don't support the default format.
        return (
            <View style={[styles.datepickerContainer, style]}>
                <input
                    className={css(
                        typographyStyles.LabelMedium,
                        styles.datepicker,
                        styles.datepickerInner,
                        disabled
                            ? styles.datepickerDisabled
                            : styles.datepickerEnabled,
                    )}
                    type="date"
                    min={minDate?.locale("en").format(nativeDateFormat)}
                    max={maxDate?.locale("en").format(nativeDateFormat)}
                    onChange={updateDateNative}
                    value={selectedDate?.locale("en").format(nativeDateFormat)}
                    disabled={disabled}
                    id={id}
                    aria-label={inputAriaLabel ?? t`Choose or enter a date`}
                />
            </View>
        );
    };

    const renderDatePicker = (): React.ReactNode => {
        const selectedJsDate = getDateAsJsDate(currentEditValue);

        return (
            <React.Suspense
                fallback={
                    <DatePickerInput
                        value={selectedJsDate && selectedJsDate.toString()}
                        disabled={true}
                        id={id}
                        dateFormat={dateFormat}
                        placeholder={placeholder}
                    />
                }
            >
                <DatePicker
                    {...restProps}
                    style={style}
                    dateFormat={dateFormat}
                    maxDate={maxDate}
                    minDate={minDate}
                    selectedDate={selectedDate}
                    disabled={disabled}
                    id={id}
                    updateDate={updateDate}
                    placeholder={placeholder}
                    inputAriaLabel={inputAriaLabel}
                />
            </React.Suspense>
        );
    };

    if (nativePicker) {
        return renderNativeDatePicker();
    }

    return renderDatePicker();
};

export default MaybeNativeDayPickerDisplay;

const styles = StyleSheet.create({
    datepickerContainer: {
        width: 225,
        height: 40,
    },
    datepickerInner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        lineHeight: "inherit",
        outline: "none",
        borderStyle: "solid",
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: sizing.size_040,
        borderWidth: 1,
        padding: 1,
        paddingInlineStart: sizing.size_120,
        zIndex: "auto",
    },
    datepickerDisabled: {
        backgroundColor: semanticColor.input.disabled.background,
        color: semanticColor.input.disabled.foreground,
        border: `1px solid ${semanticColor.input.disabled.border}`,
    },
    datepickerEnabled: {
        backgroundColor: semanticColor.core.background.base.default,
        color: "inherit",
        [":focus-within" as any]: {
            borderColor: semanticColor.core.border.instructive.default,
            borderWidth: 2,
            padding: 0,
            paddingLeft: `calc(${sizing.size_120} - ${sizing.size_010})`,
        },

        [":hover"]: {
            borderColor: semanticColor.core.border.instructive.default,
            borderWidth: 2,
            padding: 0,
            paddingLeft: `calc(${sizing.size_120} - ${sizing.size_010})`,
        },

        [":active"]: {
            background: semanticColor.core.background.instructive.subtle,
            borderColor: semanticColor.core.border.instructive.strong,
        },
    },
    datepicker: {
        // 40px (container) - 2*2px (borders)
        height: `calc(${sizing.size_400} - 2*${sizing.size_020})`,
        padding: 0,
        minInlineSize: 0,
        lineHeight: "inherit",
        border: "none",
        color: "inherit",
        background: "inherit",
        // If we allow the background color to be inherited and the container's
        // background color has opacity, the two will overlap and be darker
        // than intended.
        backgroundColor: "transparent",
        outline: "none",
    },
});
