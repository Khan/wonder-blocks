import * as React from "react";

export default function useScopedTheme<T>(themeContext: React.Context<T>): T {
    return React.useContext(themeContext);
}
