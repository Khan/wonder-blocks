// @flow
import type TextTag from "wonder-blocks-core";

// TODO(kevinb): fix style type after upgrading flow
export type Props = {
    style?: any,
    children?: string,
};

export type HeadingProps = Props & {
    tag: TextTag,
}
