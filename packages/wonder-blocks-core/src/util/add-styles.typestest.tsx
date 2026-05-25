import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "./add-style";

const styles = StyleSheet.create({
    list: {
        padding: 8,
    },
    customList: {
        // eslint-disable-next-line @khanacademy/wonder-blocks/no-hardcoded-color
        border: "solid 1px blue",
    },
});

const StyledUl = addStyle("ul", styles.list);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list1 = <StyledUl />;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list2 = <StyledUl style={styles.customList} />;

// Widened StyleType: a single CSS Module class name string is accepted.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list3 = <StyledUl style="module-class" />;

// Widened StyleType: a nested array of mixed leaves is accepted.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list4 = (
    <StyledUl
        style={[
            styles.customList,
            "module-class",
            false && "skipped",
            {color: "red"},
            ["nested", styles.list],
        ]}
    />
);

// `addStyle` itself accepts the widened type as its default style.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledSection = addStyle("section", "default-module-class");
