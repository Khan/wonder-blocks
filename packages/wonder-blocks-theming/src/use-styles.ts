import * as React from "react";
import {StyleSheet} from "aphrodite";
// import useTheme from "./use-theme";
import {ThemedStylesFn} from "./types";

/**
 * A hook that applies styles based on the current theme.
 */
export default function useStyles<T>(styles: ThemedStylesFn<T>, theme: T) {
    const styleSheet = React.useMemo(() => {
        return StyleSheet.create(styles(theme));
    }, [styles, theme]);

    return styleSheet;
}
