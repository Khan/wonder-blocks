import recommended from "./recommended";

export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        ...recommended.rules,
    },
};
