import type {Config} from "stylelint";

import recommended from "./recommended";

const strict: Config = {
    ...recommended,
    rules: {
        ...recommended.rules,
    },
};

export default strict;
