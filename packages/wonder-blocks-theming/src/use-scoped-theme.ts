import * as React from "react";

export default function useComponentTheme<T>(
    themeContext: React.Context<T>,
): T {
    return React.useContext(themeContext);
}
