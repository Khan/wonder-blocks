// @flow
import type {Node} from "react";
import type {AriaProps, TextTag} from "wonder-blocks-core";

// TODO(kevinb): fix style type after upgrading flow
export type Props = AriaProps & {
    style?: any,
    children?: Node,
    id?: string,
    tag: TextTag,
};
