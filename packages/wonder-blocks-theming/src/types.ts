import {StyleDeclaration} from "aphrodite";

export type ThemedStylesFn<T> = (theme: T) => StyleDeclaration;

export type SupportedThemes = "default" | "khanmigo";
export type Themes<T> = Partial<Record<SupportedThemes, T>>;
