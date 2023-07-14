import * as React from "react";
import {
    createTheme,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import brandTheme from "./brand";

// Define the themes that will be available to the consumer(s).
const themes = {
    default: defaultTheme,
    brand: brandTheme,
};

export const ButtonThemeContext = createTheme(themes.default);

// Infer the type of the theme from the default theme.
// NOTE: Any other theme created should be compatible with this type.
export type ButtonThemeContract = typeof defaultTheme;

type Props = {
    children: React.ReactNode;
};

export default function ThemedButton({children}: Props) {
    const currentTheme = React.useContext(ThemeSwitcherContext);
    const theme = themes[currentTheme as keyof typeof themes] ?? themes.default;

    return (
        <ButtonThemeContext.Provider value={theme}>
            {children}
        </ButtonThemeContext.Provider>
    );
}
