// @flow
import type {AriaProps, TextTag} from "wonder-blocks-core";

// TODO(kevinb): fix style type after upgrading flow
export type Props = AriaProps & {
    style?: any,
    children?: string,
    id?: string,
    tag: TextTag,
};
