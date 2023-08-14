import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const LabelXSmall = React.forwardRef(function LabelXSmall(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.LabelXSmall, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default LabelXSmall;
