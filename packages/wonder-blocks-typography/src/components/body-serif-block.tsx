import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const BodySerifBlock = React.forwardRef(function BodySerifBlock(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.BodySerifBlock, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodySerifBlock;
