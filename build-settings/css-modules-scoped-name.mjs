import * as crypto from "crypto";
import * as path from "path";

// Shared `generateScopedName` for CSS Modules. Used by Rollup
// (`rollup-plugin-styler`, build-time) and Vite (`css.modules`, Storybook /
// dev) so a given `.module.css` file produces the same hashed class name
// in both pipelines. Drift would mean Storybook and the published `dist`
// reference different selectors for the same source.
export const generateScopedName = (local, file, css) => {
    const {base, name} = path.parse(file);
    // `path.parse("icon.module.css").name` is `"icon.module"`; strip the
    // `.module` suffix so selectors read as `wb-<component>-<local>-<hash>`
    // (an embedded dot would otherwise render as a compound class anyway).
    const safeName = name.replace(/\.module$/, "");
    const hash = crypto
        .createHash("sha256")
        .update(`${base}:${css}`)
        .digest("hex")
        .slice(0, 8);
    return `wb-${safeName}-${local}-${hash}`;
};
