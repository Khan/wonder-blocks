import {
    AllComponents,
    FloatingComponents,
    OverlayComponents,
} from "./catalog.stories";

export default {
    title: "Catalog / RTL",
    tags: ["!autodocs"],
};

export const AllComponentsRTL = {
    name: "Components / RTL",
    render: AllComponents.render,
    globals: {
        direction: "rtl",
    },
};

export const FloatingComponentsRTL = {
    name: "Floating Components / RTL",
    render: FloatingComponents.render,
    globals: {
        direction: "rtl",
    },
};

export const OverlayComponentsRTL = {
    name: "Overlay Components / RTL",
    render: OverlayComponents.render,
    globals: {
        direction: "rtl",
    },
};
