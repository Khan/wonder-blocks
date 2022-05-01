// @flow
import * as React from "react";
import {InterceptRequests} from "@khanacademy/wonder-blocks-data";
import type {TestHarnessAdapter} from "../types.js";

type Interceptor = React.ElementConfig<typeof InterceptRequests>["interceptor"];

type Config = Interceptor | Array<Interceptor>;

/**
 * Default configuration for the Wonder Blocks Data adapter.
 */
export const defaultConfig = ([]: Array<Interceptor>);

/**
 * Test harness adapter to mock Wonder Blocks Data usage.
 *
 * NOTE: Consumers are responsible for properly defining their intercepts.
 * This component does not validate the configuration to ensure interceptors
 * are not overriding one another.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.Node,
    config: Config,
): React.Element<any> => {
    // First we render the cache intercepts.
    let currentChildren = children;

    const interceptors = Array.isArray(config) ? config : [config];

    // Then we render the data intercepts.
    for (const interceptor of interceptors) {
        currentChildren = (
            <InterceptRequests interceptor={interceptor}>
                {currentChildren}
            </InterceptRequests>
        );
    }

    /**
     * `currentChildren` is a `React.Node` but we need it to be a
     * `React.Element<>`. Return it rendered in a fragment allows us to do
     * that.
     */
    return <>{currentChildren}</>;
};
