// @flow
import type {Node} from "react";
import type {AriaProps, TextTag} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// TODO(kevinb): fix style type after upgrading flow
export type Props = AriaProps & {
    style?: StyleType,
    children?: Node,
    id?: string,
    tag: TextTag,
};
