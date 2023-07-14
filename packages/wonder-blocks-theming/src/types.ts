import {StyleDeclaration} from "aphrodite";
import theme from "./theme";

export type ThemeContract = typeof theme;

export type ThemedStylesFn<T> = (theme: T) => StyleDeclaration;
