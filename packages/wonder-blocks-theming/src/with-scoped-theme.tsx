import {StyleDeclaration} from "aphrodite";
import * as React from "react";

import type {ThemedStylesFn} from "./types";
import useComponentTheme from "./use-scoped-theme";

export type WithThemeProps = {
    wbThemeStyles: StyleDeclaration;
};
export type WithoutTheme<T> = Omit<T, keyof WithThemeProps>;

/**
 * A higher order component that includes the themed styles in the props of the
 * wrapped component as `wbThemeStyles`.
 */
export default function withScopedTheme<T>(
    styleSheet: ThemedStylesFn<T>,
    themeContext: React.Context<T>,
) {
    return <Props extends WithThemeProps>(
            WrappedComponent: React.ComponentType<Props>,
        ) =>
        (props: WithoutTheme<Props>) => {
            const theme = useComponentTheme(themeContext);
            // Apply the current theme to the style sheet.
            const wbThemeStyles = styleSheet(theme);

            return (
                <WrappedComponent
                    {...(props as Props)}
                    wbThemeStyles={wbThemeStyles}
                />
            );
        };
}
