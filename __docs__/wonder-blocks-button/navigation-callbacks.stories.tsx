import * as React from "react";
import {MemoryRouter, Route, Switch} from "react-router-dom";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

import {styles} from "./button.stories";

const BeforeNavCallbacks = () => (
    <MemoryRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, client-side nav
            </Button>
            <Button
                href="/foo"
                style={styles.button}
                skipClientNav={true}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, server-side nav
            </Button>
            <Button
                href="https://google.com"
                style={styles.button}
                skipClientNav={true}
                beforeNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                beforeNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

const SafeWithNavCallbacks = () => (
    <MemoryRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, client-side nav
            </Button>
            <Button
                href="/foo"
                style={styles.button}
                skipClientNav={true}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, server-side nav
            </Button>
            <Button
                href="https://google.com"
                style={styles.button}
                skipClientNav={true}
                safeWithNav={() =>
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 1000);
                    })
                }
            >
                safeWithNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>
);

export default {
    title: "Button / Navigation Callbacks",
    component: Button,

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const BeforeNavCallbacks_ = {
    render: BeforeNavCallbacks.bind({}),
    name: "beforeNav Callbacks",
};

export const SafeWithNavCallbacks_ = {
    render: SafeWithNavCallbacks.bind({}),
    name: "safeWithNav Callbacks",
};
