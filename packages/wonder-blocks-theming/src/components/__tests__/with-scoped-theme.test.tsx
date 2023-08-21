import * as React from "react";
import {render, screen} from "@testing-library/react";

import {View} from "@khanacademy/wonder-blocks-core";

import createThemeContext from "../../utils/create-theme-context";
import withScopedTheme, {WithThemeProps} from "../with-scoped-theme";
import {ThemedStylesFn} from "../../types";

describe("withScopedTheme", () => {
    it("should return the theme from the context", () => {
        // Arrange
        const theme = {
            color: {
                bg: {primary: "#0000f0"},
                text: {primary: "#00ff00"},
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        type ThemeContract = typeof theme;

        function ThemedComponent(props: WithThemeProps) {
            const {wbThemeStyles} = props;

            return <View style={wbThemeStyles.wrapper}>This is themed!</View>;
        }

        const styles: ThemedStylesFn<ThemeContract> = (theme) => ({
            wrapper: {
                background: theme.color.bg.primary,
                color: theme.color.text.primary,
            },
        });

        const themeContext = createThemeContext(theme);

        // Act
        const TestComponent = withScopedTheme(
            styles,
            themeContext,
        )(ThemedComponent);

        render(<TestComponent />);

        // Assert
        expect(screen.getByText("This is themed!")).toHaveStyle(
            "background: #0000f0",
        );
    });
});
