import * as React from "react";

import styles from "./spike.module.css";

type Props = {
    label: string;
    badge?: string;
    /**
     * Render the control with the cross-package `--wb-action-inverse` mixin
     * applied, sitting on a dark backdrop. Used to prove the multi-state
     * action mixin expands (WB-2327, Phase 3).
     */
    inverse?: boolean;
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
export function Spike({label, badge, inverse}: Props): React.ReactElement {
    if (inverse) {
        return (
            <div className={styles.inverseBackdrop}>
                <button type="button" className={styles.inverse}>
                    <span>{label}</span>
                    {badge ? (
                        <span className={styles.pill}>{badge}</span>
                    ) : null}
                </button>
            </div>
        );
    }

    return (
        <button type="button" className={styles.root}>
            <span>{label}</span>
            {badge ? <span className={styles.pill}>{badge}</span> : null}
        </button>
    );
}
