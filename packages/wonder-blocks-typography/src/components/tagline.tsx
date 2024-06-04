import * as React from "react";
import {PropsFor, Text} from "@khanacademy/wonder-blocks-core";

import {cx} from "class-variance-authority";
import styles from "./styles.module.css";

type Props = PropsFor<typeof Text>;

const Tagline = React.forwardRef(function Tagline(
    {style, children, tag = "span", ...otherProps}: Props,
    ref,
) {
    return (
        <Text
            {...otherProps}
            tag={tag}
            style={cx([styles.Tagline, style])}
            ref={ref}
        >
            {children}
        </Text>
    );
});

export default Tagline;
