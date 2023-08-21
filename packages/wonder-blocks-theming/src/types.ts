import {StyleDeclaration} from "aphrodite";

export type ThemedStylesFn<T> = (theme: T) => StyleDeclaration;
