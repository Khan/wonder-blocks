// @flow
import {Errors} from "@khanacademy/wonder-stuff-core";

export const GqlErrors = Object.freeze({
    ...Errors,
    Network: "Network",
    Parse: "Parse",
    BadResponse: "BadResponse",
    ErrorResult: "ErrorResult",
});
