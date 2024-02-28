import {StyleDeclaration} from "aphrodite";

export type ThemedStylesFn<T extends object> = (theme: T) => StyleDeclaration;

export type SupportedThemes = "default" | "khanmigo" | "dark";
export type Themes<T extends object> = Partial<Record<SupportedThemes, T>>;
