import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const BodySerif = React.forwardRef(
    ({style, children, tag = "span", ...otherProps}: Props, ref) => {
        return (
            <Text
                {...otherProps}
                tag={tag}
                style={[styles.BodySerif, style]}
                ref={ref}
            >
                {children}
            </Text>
        );
    },
);

export default BodySerif;
