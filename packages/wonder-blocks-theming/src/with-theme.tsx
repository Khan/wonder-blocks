import {StyleDeclaration} from "aphrodite";
import * as React from "react";

import type {ThemeContract, ThemedStylesFn} from "./types";
import useTheme from "./use-theme";

export type WithThemeProps = {
    wbThemeStyles: StyleDeclaration;
};
export type WithoutTheme<T> = Omit<T, keyof WithThemeProps>;

/**
 * A higher order component that includes the themed styles in the props of the
 * wrapped component as `wbThemeStyles`.
 */
const withTheme =
    (styleSheet: ThemedStylesFn<ThemeContract>) =>
    <Props extends WithThemeProps>(
        WrappedComponent: React.ComponentType<Props>,
    ) =>
    (props: WithoutTheme<Props>) => {
        const theme = useTheme();

        // Apply the current theme to the style sheet.
        const wbThemeStyles = styleSheet(theme);

        return (
            <WrappedComponent
                {...(props as Props)}
                wbThemeStyles={wbThemeStyles}
            />
        );
    };

export default withTheme;
