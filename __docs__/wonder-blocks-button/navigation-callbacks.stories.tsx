import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {CompatRouter, Route, Routes} from "react-router-dom-v5-compat";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";

import {styles} from "./button.stories";

const BeforeNavCallbacks = () => (
    <MemoryRouter>
        <CompatRouter>
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
                <Routes>
                    <Route
                        path="/foo"
                        element={<View id="foo">Hello, world!</View>}
                    />
                </Routes>
            </View>
        </CompatRouter>
    </MemoryRouter>
);

const SafeWithNavCallbacks = () => (
    <MemoryRouter>
        <CompatRouter>
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
                <Routes>
                    <Route
                        path="/foo"
                        element={<View id="foo">Hello, world!</View>}
                    />
                </Routes>
            </View>
        </CompatRouter>
    </MemoryRouter>
);

export default {
    title: "Packages / Button / Guides / Navigation Callbacks",
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
