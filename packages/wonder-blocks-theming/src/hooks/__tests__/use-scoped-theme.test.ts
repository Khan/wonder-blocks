import {renderHook} from "@testing-library/react-hooks";

import createThemeContext from "../../utils/create-theme-context";
import useScopedTheme from "../use-scoped-theme";

describe("useScopedTheme", () => {
    it("should return the theme from the context", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
                green: "#00ff00",
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        const themeContext = createThemeContext(theme);

        // Act
        const {result} = renderHook(() => useScopedTheme(themeContext));

        // Assert
        expect(result.current).toEqual(theme);
    });
});
