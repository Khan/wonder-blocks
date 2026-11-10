import type {Config} from "stylelint";

import {getRuleName} from "../utils/rule-name";

const recommended: Config = {
    plugins: ["@khanacademy/stylelint-plugin-wonder-blocks"],
    rules: {
        [getRuleName("prefer-semantic-color-over-graphics-palette")]: true,
    },
};

export default recommended;
