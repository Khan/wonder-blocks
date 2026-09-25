/**
 * SPIKE (FEI-8331): stand-in for `react-native-reanimated`.
 *
 * The `react-native-css` native runtime `require()`s Reanimated for
 * `transition` / `animation` support. The call is lazy at runtime, but
 * bundlers (Vite here, Metro in the app) resolve it at build time, so the
 * module has to exist. Our build strips `transition`, so these must never
 * actually be called.
 */
const unsupported = (): never => {
    throw new Error(
        "react-native-reanimated isn't installed; CSS transitions/animations " +
            "aren't supported (see wonder-blocks-native/build/compile-css.ts).",
    );
};

export const createAnimatedComponent = unsupported;
export const cubicBezier = unsupported;
