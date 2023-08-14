import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const Body = React.forwardRef(function Body(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text {...otherProps} tag={tag} style={[styles.Body, style]} ref={ref}>
            {children}
        </Text>
    );
});

export default Body;
