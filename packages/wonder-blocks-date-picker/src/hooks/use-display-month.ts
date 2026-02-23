import * as React from "react";
import {Temporal} from "temporal-polyfill";

import {TemporalLocaleUtils} from "../util/temporal-locale-utils";

type SetDisplayMonthAndRefs = (month: Date | null) => void;

type Params = {
    /** Initial display month when selectedDate is set; used for sync when selectedDate changes. */
    selectedDate: Temporal.PlainDate | null | undefined;
};

/**
 * Manages which month the calendar overlay shows: state, refs for synchronous
 * reads (open/close/first render), and input-driven month when user is typing.
 * Exposes setDisplayMonthAndRefs for open/close/input/day-click to call.
 * Big but cohesive; open/close/input/day-click refactor to call this API.
 */
export function useDisplayMonth({selectedDate}: Params): {
    displayMonth: Date | undefined;
    setDisplayMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
    displayMonthRef: React.MutableRefObject<Date | undefined>;
    inputDrivenMonthRef: React.MutableRefObject<Date | null>;
    setDisplayMonthAndRefs: SetDisplayMonthAndRefs;
} {
    const initialMonth = React.useMemo(
        () =>
            selectedDate != null
                ? TemporalLocaleUtils.temporalDateToJsDate(selectedDate)
                : undefined,
        [selectedDate],
    );

    const [displayMonth, setDisplayMonth] = React.useState<Date | undefined>(
        initialMonth,
    );

    const displayMonthRef = React.useRef<Date | undefined>(undefined);
    const inputDrivenMonthRef = React.useRef<Date | null>(null);

    const setDisplayMonthAndRefs = React.useCallback<SetDisplayMonthAndRefs>(
        (month) => {
            if (month !== null) {
                displayMonthRef.current = month;
                setDisplayMonth(month);
            } else {
                if (displayMonthRef.current != null) {
                    setDisplayMonth(displayMonthRef.current);
                }
                displayMonthRef.current = undefined;
            }
        },
        [],
    );

    return {
        displayMonth,
        setDisplayMonth,
        displayMonthRef,
        inputDrivenMonthRef,
        setDisplayMonthAndRefs,
    };
}
