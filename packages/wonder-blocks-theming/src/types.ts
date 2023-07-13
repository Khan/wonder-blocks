import {StyleDeclaration} from "aphrodite";
import theme from "./theme";

// export type ThemeContract = {
//     [key: string]: string | number | ThemeContract;
// };

export type ThemeContract = typeof theme;

export type ThemedStylesFn = (theme: ThemeContract) => StyleDeclaration;
