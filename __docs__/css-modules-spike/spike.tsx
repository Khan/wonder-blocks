import * as React from "react";

import styles from "./spike.module.css";

type Props = {
    label: string;
    badge?: string;
};

/**
 * Phase 0 spike component — not part of the public Wonder Blocks API.
 *
 * Exists only to validate the CSS Modules + PostCSS pipeline:
 *   - imports a `*.module.css` file and uses the returned classnames object
 *   - exercises a cross-package `@import` and `@mixin` from
 *     `@khanacademy/wonder-blocks-styles`
 *   - reads token CSS variables from `@khanacademy/wonder-blocks-tokens`
 *
 * Delete once Phase 1 migrates the first real component to CSS Modules.
 */
export function Spike({label, badge}: Props): React.ReactElement {
    return (
        <button type="button" className={styles.root}>
            <span>{label}</span>
            {badge ? <span className={styles.pill}>{badge}</span> : null}
        </button>
    );
}
