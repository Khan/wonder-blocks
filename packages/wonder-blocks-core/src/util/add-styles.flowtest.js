// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "./add-style.js";

const styles = StyleSheet.create({
    list: {
        padding: 8,
    },
    customList: {
        border: "solid 1px blue",
    },
});

const StyledList = addStyle("ul", styles.list);

// eslint-disable-next-line no-unused-vars
const list1 = <StyledList />;

// eslint-disable-next-line no-unused-vars
const list2 = <StyledList style={styles.customList} />;
