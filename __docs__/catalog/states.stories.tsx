import {themeModes} from "../../.storybook/modes";
import {ComponentList} from "./catalog-component-info";
import {
    buttonComponents,
    feedbackComponents,
    inputComponents,
    layoutBlocksComponents,
    navigationAndMenuComponents,
} from "./components-config";

export default {
    title: "Catalog / States",
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: themeModes,
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Ignoring color contrast violations at this level, this
                        // is covered at the component level
                        id: "color-contrast",
                        enabled: false,
                    },
                    {
                        // Ignore unique landmark violation since structures are
                        // often reused to show variants / props combinations
                        id: "landmark-unique",
                        enabled: false,
                    },
                    {
                        // Ignore aria-valid-attr-value violations at this level,
                        // this is covered at the component level
                        id: "aria-valid-attr-value",
                        enabled: false,
                    },
                    {
                        // Ignore label violations at this level,
                        // this is covered at the component level
                        id: "label",
                        enabled: false,
                    },
                ],
            },
        },
    },
};

const interactiveComponents = [
    ...buttonComponents,
    ...inputComponents,
    ...feedbackComponents,
    ...navigationAndMenuComponents,
    ...layoutBlocksComponents,
];

export const Hover = {
    render: ComponentList,
    parameters: {
        pseudo: {
            hover: true,
        },
    },
    args: {
        components: interactiveComponents,
    },
};

export const Focus = {
    render: ComponentList,
    parameters: {
        pseudo: {
            focusVisible: true,
        },
    },
    args: {
        components: interactiveComponents,
    },
};

export const Press = {
    render: ComponentList,
    parameters: {
        pseudo: {
            active: true,
        },
    },
    args: {
        components: interactiveComponents,
    },
};
