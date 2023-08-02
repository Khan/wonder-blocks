import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const LabelMedium = React.forwardRef(function LabelMedium(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.LabelMedium, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default LabelMedium;
