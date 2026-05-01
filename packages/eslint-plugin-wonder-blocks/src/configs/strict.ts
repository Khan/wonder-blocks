import recommended from "./recommended";

export default {
    ...recommended,
    rules: {
        ...recommended.rules,
        "@khanacademy/wonder-blocks/no-custom-tab-role": "error",
        "@khanacademy/wonder-blocks/no-invalid-bodytext-children": "error",
        "@khanacademy/wonder-blocks/no-invalid-bodytext-parent": "error",
    },
};
