/**
 * Vite (used by Storybook's builder) exposes `STORYBOOK_`-prefixed environment
 * variables to preview/browser code via `import.meta.env`. We declare only the
 * variables we actually read so TypeScript recognizes them, without pulling in
 * the full `vite/client` types (which would add ambient asset-module
 * declarations that overlap with types/assets.d.ts).
 */
interface ImportMetaEnv {
    /**
     * When set to the string "true", disables Chromatic snapshots for all
     * stories (see `.storybook/preview.tsx`). The draft-PR Chromatic workflow
     * sets this so Storybook is still published to Chromatic for preview
     * without consuming snapshot quota. Full snapshots run on ready-for-review
     * PRs and via the `/chromatic` PR comment.
     */
    readonly STORYBOOK_CHROMATIC_DISABLE_SNAPSHOTS?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
