import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const BodySerifBlock = React.forwardRef(function BodySerifBlock(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.BodySerifBlock, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodySerifBlock;
