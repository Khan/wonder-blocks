import {Temporal} from "temporal-polyfill";
import * as React from "react";

import {TemporalLocaleUtils} from "../util/temporal-locale-utils";

type SetDisplayMonthAndRefs = (month: Date | null) => void;

type Params = {
    selectedDate: Temporal.PlainDate | null | undefined;
    setCurrentDate: React.Dispatch<
        React.SetStateAction<Temporal.PlainDate | null | undefined>
    >;
    setDisplayMonthAndRefs: SetDisplayMonthAndRefs;
};

/**
 * Single effect: keeps currentDate in sync with selectedDate prop.
 * When selectedDate identity changes, also updates display month so the calendar
 * shows the right month. Uses prevSelectedDateRef so displayMonth is only
 * updated when selectedDate actually changed (not overwritten by typing or by
 * using the calendar’s previous/next month buttons).
 */
export function useSelectedDateSync({
    selectedDate,
    setCurrentDate,
    setDisplayMonthAndRefs,
}: Params): void {
    // store previous selectedDate as string (since Temporal.PlainDate doesn't have stable identity)
    const prevSelectedDateRef = React.useRef<string | null>(null);

    React.useEffect(() => {
        setCurrentDate(selectedDate);
        const key = selectedDate?.toString() ?? null;
        // Only update display month if selectedDate changed, not from typing or using previous/next month buttons.
        const willUpdateDisplayMonth = key !== prevSelectedDateRef.current;
        if (willUpdateDisplayMonth) {
            prevSelectedDateRef.current = key;
            if (selectedDate != null) {
                const jsDate =
                    TemporalLocaleUtils.temporalDateToJsDate(selectedDate);
                setDisplayMonthAndRefs(jsDate);
            }
        }
    }, [selectedDate, setCurrentDate, setDisplayMonthAndRefs]);
}
