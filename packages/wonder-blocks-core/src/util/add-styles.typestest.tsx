import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "./add-style";

const styles = StyleSheet.create({
    list: {
        padding: 8,
    },
    customList: {
        border: "solid 1px blue",
    },
});

const StyledUl = addStyle("ul", styles.list);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list1 = <StyledUl />;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list2 = <StyledUl style={styles.customList} />;
