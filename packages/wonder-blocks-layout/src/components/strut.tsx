import * as React from "react";

// import {View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {css, cx} from "@/styled-system/css";
import {SystemStyleObject} from "@/styled-system/types";

type Props = {
    size: number;
    style?: StyleType;
};

/**
 * A component for inserting fixed space between components.
 *
 * Assumes parent is a View.
 */
export default class Strut extends React.Component<Props> {
    render(): React.ReactNode {
        const {size, style} = this.props;

        const rawStyle = Array.isArray(style)
            ? css(...style)
            : typeof style === "object"
            ? css(style as SystemStyleObject)
            : undefined;

        return (
            <div
                aria-hidden="true"
                className={cx(viewStyle, strutStyle, rawStyle)}
                // https://panda-css.com/docs/guides/dynamic-styling#using-token
                style={{"--strut-size": size + "px"} as React.CSSProperties}
            />
        );
    }
}

// Borrowed from View
const viewStyle = css({
    alignItems: "stretch",
    borderWidth: 0,
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    position: "relative",
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0,
});

const strutStyle = css({
    width: "var(--strut-size)",
    flexBasis: "var(--strut-size)",
    flexShrink: 0,
});
