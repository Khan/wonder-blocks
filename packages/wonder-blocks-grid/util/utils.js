// @flow
import type {StyleType} from "@khanacademy/wonder-blocks-core";

export const flexBasis = (size: number | string): StyleType => {
    return {
        MsFlexBasis: size,
        MsFlexPreferredSize: size,
        WebkitFlexBasis: size,
        flexBasis: size,
    };
};
