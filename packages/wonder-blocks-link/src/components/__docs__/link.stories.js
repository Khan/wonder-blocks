// @flow
import * as React from "react";
// import {StyleSheet} from "aphrodite";

// import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
// import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Form / Link",
    component: Link,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

export const Default: StoryComponentType = (args) => (
    <Link target="_blank" {...args}>
        Hello, world!
    </Link>
);

Default.args = {
    href: "/",
};
