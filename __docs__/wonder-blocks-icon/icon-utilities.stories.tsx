import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {useSvgAttributes} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Icon / Icon Utilities",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Snapshots are not needed for utility examples
            disableSnapshot: true,
        },
    },
} as Meta;

type StoryComponentType = StoryObj;

export const UseSvgAttributesWithLabel: StoryComponentType = {
    name: "useSvgAttributes (with label)",
    args: {},
    render: function Example() {
        const attributes = useSvgAttributes({
            "aria-label": "Example label for icon",
        });

        action("attributes")(attributes);
        return (
            <svg
                {...attributes}
                style={{
                    width: sizing.size_320,
                    height: sizing.size_320,
                }}
                viewBox="0 0 256 256"
                fill={semanticColor.icon.primary}
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Crown</title>
                <path d="M256 77.7348C256 69.003 244.93 65.24 239.609 72.1631L193.306 132.406C189.414 137.467 181.665 137.085 178.293 131.663L135.762 63.3127C132.186 57.5624 123.814 57.5625 120.238 63.3127L77.7083 131.663C74.3356 137.085 66.5871 137.467 62.6964 132.406L16.3919 72.1626C11.0705 65.2396 0 69.0026 0 77.7344V178.837C0 188.936 8.18688 197.122 18.2857 197.122H237.714C247.813 197.122 256 188.936 256 178.837V77.7348Z" />
            </svg>
        );
    },
};

export const UseSvgAttributesWithNoLabel: StoryComponentType = {
    name: "useSvgAttributes (with no label)",
    args: {},
    render: function Example() {
        const attributes = useSvgAttributes({});

        action("attributes")(attributes);
        return (
            <svg
                {...attributes}
                style={{
                    width: sizing.size_320,
                    height: sizing.size_320,
                }}
                viewBox="0 0 256 256"
                fill={semanticColor.icon.primary}
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Crown</title>
                <path d="M256 77.7348C256 69.003 244.93 65.24 239.609 72.1631L193.306 132.406C189.414 137.467 181.665 137.085 178.293 131.663L135.762 63.3127C132.186 57.5624 123.814 57.5625 120.238 63.3127L77.7083 131.663C74.3356 137.085 66.5871 137.467 62.6964 132.406L16.3919 72.1626C11.0705 65.2396 0 69.0026 0 77.7344V178.837C0 188.936 8.18688 197.122 18.2857 197.122H237.714C247.813 197.122 256 188.936 256 178.837V77.7348Z" />
            </svg>
        );
    },
};
