import * as React from "react";
import {StyleDeclaration, StyleSheet} from "aphrodite";
import {ThemeContext} from "./theme-context";
import useTheme from "./use-theme";
import {ThemeContract} from "./types";

/**
 * A hook that applies styles based on the current theme.
 */
export default function useStyles(
    styles: (theme: ThemeContract) => StyleDeclaration,
) {
    const theme = useTheme();

    const styleSheet = React.useMemo(() => {
        return StyleSheet.create(styles(theme));
    }, [styles, theme]);

    return styleSheet;
}
