/**
 * SPIKE (FEI-8331): `react-native` for Jest and Storybook.
 *
 * Native components render through react-native-web there. The
 * `react-native-css` native runtime calls `PlatformColor()` at import time
 * (for its default `currentColor`), which react-native-web doesn't export,
 * so we add a stand-in. Everything else is react-native-web as-is.
 */
// @ts-expect-error: react-native-web ships no types. Consumers are typed
// against `react-native` itself; this file is only swapped in by Jest/Vite.
// eslint-disable-next-line import/no-unresolved
export * from "react-native-web";

/**
 * Stand-in for RN's `PlatformColor`: returns a plain colour so the
 * `react-native-css` default `currentColor` is black, as it is in a browser.
 */
export const PlatformColor = (..._names: Array<string>): string => "black";
