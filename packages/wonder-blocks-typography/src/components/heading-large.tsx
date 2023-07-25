import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const HeadingLarge = React.forwardRef(
    ({style, children, tag = "h2", ...otherProps}: Props, ref) => {
        return (
            <Text
                {...otherProps}
                tag={tag}
                style={[styles.HeadingLarge, style]}
                ref={ref}
            >
                {children}
            </Text>
        );
    },
);

export default HeadingLarge;
