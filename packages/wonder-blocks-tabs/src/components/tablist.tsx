import {addStyle} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    /**
     * The contents of the tablist.
     */
    children: React.ReactNode;
};

const StyledDiv = addStyle("div");

/**
 * A component that has `role="tablist"` and is used to group tab elements.
 */
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
