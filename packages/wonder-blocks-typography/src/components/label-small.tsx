import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const LabelSmall = React.forwardRef(function LabelSmall(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.LabelSmall, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default LabelSmall;
