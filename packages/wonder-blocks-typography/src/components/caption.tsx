import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const Caption = React.forwardRef(function Caption(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.Caption, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default Caption;
