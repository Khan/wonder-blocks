/**
 * SPIKE: Happo visual regression testing (ADR #998). Not meant to merge.
 *
 * Run by the `Happo (spike)` workflow (`.github/workflows/happo-spike.yml`).
 * Story config is mapped from `parameters.chromatic` in
 * `.storybook/happo.tsx`.
 *
 * See https://github.com/happo/docs/blob/main/docs/configuration.md
 */
import {defineConfig} from "happo";

import {happoTargets} from "./.storybook/happo-targets";

export default defineConfig({
    // Never commit these: they come from the `HAPPO_API_KEY` and
    // `HAPPO_API_SECRET` GitHub Actions secrets.
    apiKey: process.env.HAPPO_API_KEY,
    apiSecret: process.env.HAPPO_API_SECRET,

    // One Chrome target per viewport, so snapshot counts (and cost) compare
    // one-to-one with Chromatic and the Argos spike. Stories only render in
    // the targets their `chromatic.modes` ask for; most only render in
    // `chrome` (1200×900).
    //
    // Not added on purpose (each one is a full extra set of snapshots):
    // `firefox`, `safari`, `edge`, `ios-safari`, `ipad-safari` and
    // `accessibility`.
    targets: Object.fromEntries(
        Object.entries(happoTargets).map(([name, {width, height}]) => [
            name,
            {type: "chrome" as const, viewport: `${width}x${height}`},
        ]),
    ),

    integration: {
        type: "storybook",
        configDir: ".storybook",
    },
});
