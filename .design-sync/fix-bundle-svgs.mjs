// Post-build pass: base64-encode raw SVG data URLs baked into _ds_bundle.js.
//
// The converter's main bundle (lib/bundle.mjs, app-contract — not forkable) loads
// `.svg` with esbuild's `dataurl` loader, which emits `data:image/svg+xml,<svg ...>`
// with raw `<`, spaces, and `"`. Fine for `<img src>`, but Wonder Blocks components
// (PhosphorIcon, Checkbox check, DueBadge clock, dropdown carets, …) inject the icon
// via Aphrodite as an UNQUOTED CSS `url(...)` mask — the raw chars break the rule and
// the browser drops the mask, so every baked-in icon renders as a solid square.
// Base64 has no CSS-breaking chars. Run this after every package-build / driver build,
// before validate/compare/upload. (The story-preview side is fixed separately in the
// story-imports fork.) See .design-sync/NOTES.md.
import {readFileSync, writeFileSync, existsSync} from "node:fs";
import {createHash} from "node:crypto";
import {dirname, join} from "node:path";

const file = process.argv[2] || "ds-bundle/_ds_bundle.js";
let src = readFileSync(file, "utf8");
let count = 0;

// Match single- or double-quoted JS string literals whose value is an svg data URL.
src = src.replace(
    /(['"])data:image\/svg\+xml,((?:\\.|(?!\1)[^\\])*)\1/g,
    (match, quote, body) => {
        let inner = "data:image/svg+xml," + body;
        // Normalize JS escapes to get the real string value.
        if (quote === "'") {
            inner = inner.replace(/\\'/g, "'").replace(/(?<!\\)"/g, '\\"');
        }
        let value;
        try {
            value = JSON.parse('"' + inner + '"');
        } catch {
            return match; // leave anything we can't safely parse
        }
        if (value.startsWith("data:image/svg+xml;base64,")) return match;
        const svg = value.slice("data:image/svg+xml,".length);
        const b64 = Buffer.from(svg, "utf8").toString("base64");
        count++;
        return quote + "data:image/svg+xml;base64," + b64 + quote;
    },
);

writeFileSync(file, src);

// The main-bundle body changed, so refresh _ds_sync.json's bundleSha12 (the only
// anchor field derived from _ds_bundle.js's bytes; renderHashes/styleSha/sourceHashes
// hash previews/CSS/header and are untouched). Otherwise validate fails
// "_ds_sync.json is stale (bundleSha mismatch)".
if (count > 0) {
    const anchorPath = join(dirname(file), "_ds_sync.json");
    if (existsSync(anchorPath)) {
        const anchor = JSON.parse(readFileSync(anchorPath, "utf8"));
        anchor.bundleSha12 = createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 12);
        writeFileSync(anchorPath, JSON.stringify(anchor, null, 2) + "\n");
        console.error(`fix-bundle-svgs: updated _ds_sync.json bundleSha12 → ${anchor.bundleSha12}`);
    }
}
console.error(`fix-bundle-svgs: base64-encoded ${count} SVG data URL(s) in ${file}`);
