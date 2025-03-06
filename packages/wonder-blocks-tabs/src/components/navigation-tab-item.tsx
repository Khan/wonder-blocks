import {addStyle} from "@khanacademy/wonder-blocks-core";
import {CSSProperties, StyleSheet} from "aphrodite";
import * as React from "react";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    /**
     * The contents of the NavigationTabItem (usually a Link component)
     */
    children: React.ReactElement;
};

const StyledLi = addStyle("li");

export const NavigationTabItem = (props: Props) => {
    const {children} = props;

    function renderChildren() {
        const linkProps = {
            style: [typographyStyles.Body, styles.link],
        };

        return React.cloneElement(children, linkProps);
    }

    return <StyledLi style={styles.root}>{renderChildren()}</StyledLi>;
};

const underlineStyles: CSSProperties = {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: sizing.size_050,
};

const styles = StyleSheet.create({
    root: {
        listStyle: "none",
        display: "inline-flex",
    },
    link: {
        color: semanticColor.text.primary,
        paddingBlock: sizing.size_150,
        paddingInline: 0,
        position: "relative",
        ":hover": {
            textDecoration: "none",
            [":after" as any]: {
                ...underlineStyles,
                backgroundColor:
                    semanticColor.action.primary.progressive.hover.border,
            },
        },
    },
});
