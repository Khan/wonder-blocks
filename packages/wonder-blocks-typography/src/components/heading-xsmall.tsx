import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const HeadingXSmall = React.forwardRef(
    ({style, children, tag = "h4", ...otherProps}: Props, ref) => {
        return (
            <Text
                {...otherProps}
                tag={tag}
                style={[styles.HeadingXSmall, style]}
                ref={ref}
            >
                {children}
            </Text>
        );
    },
);

export default HeadingXSmall;
