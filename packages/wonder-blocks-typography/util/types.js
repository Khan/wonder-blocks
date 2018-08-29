// @flow
import type {Node} from "react";
import type {
    AriaProps,
    TextTag,
    StyleType,
} from "@khanacademy/wonder-blocks-core";

// eslint-disable-next-line flowtype/require-exact-type
export type Props = {
    ...AriaProps,
    style?: StyleType,
    children?: Node,
    tag: TextTag,
};
