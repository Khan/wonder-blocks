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
        if (
            "classes" in config &&
            config.classes != null &&
            "style" in config &&
            config.style != null
        ) {
            return config;
        }

        return {classes: [], style: config as CSSProperties};
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
            data-testid="css-adapter-container"
            className={classes.join(" ")}
            style={style}
        >
            {children}
        </div>
    );
};
