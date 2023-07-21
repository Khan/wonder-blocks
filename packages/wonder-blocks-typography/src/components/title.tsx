import * as React from "react";
import {Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

import type {Props} from "../util/types";

const Title = React.forwardRef(
    ({style, children, tag = "h1", ...otherProps}: Props, ref) => {
        return (
            <Text
                {...otherProps}
                tag={tag}
                style={[styles.Title, style]}
                ref={ref}
            >
                {children}
            </Text>
        );
    },
);

export default Title;
