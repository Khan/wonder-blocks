import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const BodySerif = React.forwardRef(function BodySerif(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
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
});

export default BodySerif;
