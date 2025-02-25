import * as React from "react";
import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";
import {Test} from "../../packages/wonder-blocks-tabs/src/index";

export default {
    title: "Packages / Tabs",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export const Default = () => {
    return <Test />;
};
