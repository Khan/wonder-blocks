import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import styles from "./styles.module.css";

type Props = PropsFor<typeof Text>;

const Caption = React.forwardRef(function Caption(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={cx([styles.Caption, style])}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default Caption;
