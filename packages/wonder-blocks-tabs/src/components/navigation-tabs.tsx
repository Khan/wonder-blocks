import {addStyle} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    /**
     * The NavigationTabItem components to render.
     */
    children: React.ReactElement | Array<React.ReactElement>;
};

const StyledUl = addStyle("ul");

export const NavigationTabs = (props: Props) => {
    const {children} = props;
    return (
        <nav>
            <StyledUl style={styles.list}>{children}</StyledUl>
        </nav>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 0,
        margin: 0,
        display: "flex",
        gap: sizing.size_200,
    },
});
