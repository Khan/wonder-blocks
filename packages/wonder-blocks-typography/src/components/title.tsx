import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import styles from "../util/styles";

type Props = PropsFor<typeof Text>;

const Title = React.forwardRef(function Title(
    {style, children, tag = "h1", ...otherProps}: Props,
    ref,
) {
    return (
        <Text {...otherProps} tag={tag} style={[styles.Title, style]} ref={ref}>
            {children}
        </Text>
    );
});

export default Title;
