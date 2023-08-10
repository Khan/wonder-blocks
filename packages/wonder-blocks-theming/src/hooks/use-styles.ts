import * as React from "react";
import {StyleDeclaration, StyleSheet} from "aphrodite";

import {ThemedStylesFn} from "../types";

/**
 * A hook that that applies styles based on a given theme.
 *
 * @param styles The styles to use.
 * @param theme The theme to be passed to the styles.
 * @returns The styleSheet object.
 */
export default function useStyles<T>(
    styles: ThemedStylesFn<T>,
    theme: T,
): StyleDeclaration {
    const styleSheet = React.useMemo(() => {
        return StyleSheet.create(styles(theme));
    }, [styles, theme]);

    return styleSheet;
}
