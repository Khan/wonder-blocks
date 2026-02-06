import {AllComponents} from "./catalog.stories";

export default {
    title: "Catalog / States",
    tags: ["!autodocs"],
};

export const AllComponentsHover = {
    name: "Components / Hover",
    render: AllComponents.render,
    parameters: {
        pseudo: {
            hover: true,
        },
    },
};

export const AllComponentsFocus = {
    name: "Components / Focus",
    render: AllComponents.render,
    parameters: {
        pseudo: {
            focusVisible: true,
        },
    },
};

export const AllComponentsPress = {
    name: "Components / Press",
    render: AllComponents.render,
    parameters: {
        pseudo: {
            active: true,
        },
    },
};
