// Post-build pass: inject the Wonder Blocks base reset into the styles.css closure.
//
// Copies .design-sync/base-reset.css → ds-bundle/base.css and prepends an
// `@import "./base.css";` to ds-bundle/styles.css (FIRST, so `html { font-size:
// 62.5% }` is in effect before tokens/components). Then refreshes the anchor's
// styleSha so the next re-sync's diff is accurate. Run after package-build (and
// after fix-bundle-svgs). Idempotent. See .design-sync/NOTES.md.
import {readFileSync, writeFileSync, copyFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";

const out = process.argv[2] || "ds-bundle";
const src = process.argv[3] || ".design-sync/base-reset.css";

copyFileSync(src, join(out, "base.css"));

const stylesPath = join(out, "styles.css");
let styles = readFileSync(stylesPath, "utf8");
const importLine = '@import "./base.css";';
if (!styles.includes(importLine)) {
    styles = importLine + "\n" + styles;
    writeFileSync(stylesPath, styles);
    console.error(`inject-base-css: prepended ${importLine} to styles.css`);
} else {
    console.error("inject-base-css: base.css @import already present");
}

// Refresh anchor styleSha (styles.css closure changed). Storybook shape hashes
// styles without the bundle body (includeBundleBody:false), matching package-build.
try {
    const {styleShaFor} = await import(resolve(".ds-sync/lib/sync-hashes.mjs"));
    const anchorPath = join(out, "_ds_sync.json");
    const anchor = JSON.parse(readFileSync(anchorPath, "utf8"));
    anchor.styleSha = styleShaFor(out, {includeBundleBody: anchor.shape !== "storybook"});
    writeFileSync(anchorPath, JSON.stringify(anchor, null, 2) + "\n");
    console.error(`inject-base-css: updated _ds_sync.json styleSha → ${anchor.styleSha}`);
} catch (e) {
    console.error(`inject-base-css: could not refresh styleSha (${String(e.message ?? e).split("\n")[0]}) — next re-sync will re-ship styling, harmless`);
}
