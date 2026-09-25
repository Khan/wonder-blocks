/**
 * SPIKE (FEI-8331): empty module.
 *
 * `react-native-css/native` imports `./react-native-css-metro-override`,
 * which throws a "setup error" on purpose unless the bundler replaces it
 * (its `withReactNativeCSS` Metro wrapper resolves it to an empty file).
 * We don't use that wrapper, so every bundler that loads the native runtime
 * (Vite for Storybook here, Metro in the app) needs to do the same.
 */
export {};
