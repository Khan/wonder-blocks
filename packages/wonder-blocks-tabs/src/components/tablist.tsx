import {addStyle} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    children: React.ReactElement | Array<React.ReactElement>;
};

const StyledDiv = addStyle("div");

export const Tablist = React.forwardRef(function Tablist(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {children} = props;
    return (
        <StyledDiv role="tablist" style={styles.tablist} ref={ref}>
            {children}
        </StyledDiv>
    );
});

const styles = StyleSheet.create({
    tablist: {
        display: "flex",
        gap: sizing.size_200,
    },
});
