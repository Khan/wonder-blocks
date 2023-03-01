import * as React from "react";

import type {CSSProperties} from "aphrodite";

import type {TestHarnessAdapter} from "../types";

type Config =
    | string
    | Array<string>
    | CSSProperties
    | {
          classes: Array<string>;
          style: CSSProperties;
      };

// The default configuration is to omit this adapter.
export const defaultConfig: Config | null | undefined = null;

const normalizeConfig = (
    config: Config,
): {
    classes: Array<string>;
    style: CSSProperties;
} => {
    if (typeof config === "string") {
        return {classes: [config], style: {} as Partial<CSSProperties>};
    }

    if (Array.isArray(config)) {
        return {classes: config, style: {} as Partial<CSSProperties>};
    }

    if (typeof config === "object") {
        if (config.classes != null && config.style != null) {
            // @ts-expect-error: This is a heuristic check and by nature isn't perfect.
            // So we have to tell TypeScript to just accept it.
            return config;
        }

        // Again, since the previous check is heuristic, so is this outcome
        // and so we still have to assure TypeScript everything is OK.
        return {classes: [], style: config};
    }

    throw new Error(`Invalid config: ${config}`);
};

/**
 * Test harness adapter for adding CSS to the harnessed component wrapper.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.ReactNode,
    config: Config,
): React.ReactElement<any> => {
    const {classes, style} = normalizeConfig(config);
    return (
        <div
            data-test-id="css-adapter-container"
            className={classes.join(" ")}
            style={style}
        >
            {children}
        </div>
    );
};
