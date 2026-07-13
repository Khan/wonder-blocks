import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "./body-monospace.module.css";

type Props = PropsFor<typeof Text>;

const BodyMonospace = React.forwardRef(function BodyMonospace(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={[styles.bodyMonospace, style]}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default BodyMonospace;
