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
