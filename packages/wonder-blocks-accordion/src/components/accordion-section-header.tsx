import * as React from "react";
import {StyleSheet} from "aphrodite";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import type {AccordionCornerKindType} from "./accordion";
import {getRoundedValuesForHeader} from "../utils";

type Props = {
    // Header content.
    header: string | React.ReactElement;
    // Whether the caret shows up at the start or end of the header block.
    caretPosition: "start" | "end";
    // Corner roundedness type.
    cornerKind: AccordionCornerKindType;
    // Whether the section is expanded or not.
    expanded: boolean;
    // Called on header click.
    onClick?: () => void;
    // The ID for the content that the header's `aria-controls` should
    // point to.
    sectionContentUniqueId: string;
    // Custom styles for the header container.
    headerStyle?: StyleType;
    // The semantic tag for this clickable header (e.g. "h1", "h2", etc.)
    // Please use this to ensure that the header is hierarchically correct.
    tag?: string;
    // Whether this section is the first section in the accordion.
    // For internal use only.
    isFirstSection: boolean;
    // Whether this section is the last section in the accordion.
    // For internal use only.
    isLastSection: boolean;
};

const AccordionSectionHeader = (props: Props) => {
    const {
        header,
        caretPosition,
        cornerKind,
        expanded,
        onClick,
        sectionContentUniqueId,
        headerStyle,
        tag,
        isFirstSection,
        isLastSection,
    } = props;

    const headerIsString = typeof header === "string";

    const {roundedTop, roundedBottom} = getRoundedValuesForHeader(
        cornerKind,
        isFirstSection,
        isLastSection,
        expanded,
    );

    return (
        <HeadingSmall tag={tag} style={styles.heading}>
            <Clickable
                aria-expanded={expanded}
                aria-controls={sectionContentUniqueId}
                onClick={onClick}
                style={[
                    styles.headerWrapper,
                    caretPosition === "start" && styles.headerWrapperCaretStart,
                    roundedTop && styles.roundedTop,
                    roundedBottom && styles.roundedBottom,
                    headerStyle,
                ]}
            >
                {() => (
                    <>
                        <View
                            style={[
                                styles.headerContent,
                                headerIsString && styles.headerString,
                            ]}
                        >
                            {headerIsString ? (
                                <View
                                    style={[
                                        caretPosition === "end"
                                            ? styles.headerStringCaretEnd
                                            : styles.headerStringCaretStart,
                                    ]}
                                >
                                    {header}
                                </View>
                            ) : (
                                header
                            )}
                        </View>
                        <PhosphorIcon
                            icon={caretDown}
                            color={Color.offBlack64}
                            size="small"
                            style={[
                                caretPosition === "start"
                                    ? styles.iconStart
                                    : styles.iconEnd,
                                expanded && styles.iconExpanded,
                            ]}
                        />
                    </>
                )}
            </Clickable>
        </HeadingSmall>
    );
};

const activeBlue = mix(Color.offBlack32, Color.blue);
// The AccordionSection border radius for rounded corners is 12px.
// If we set the inner radius to the same value, there ends up being
// a 1px gap between the border and the outline. To fix this, we
// subtract 1 from the border radius.
const INNER_BORDER_RADIUS = Spacing.small_12 - 1;

const styles = StyleSheet.create({
    heading: {
        marginTop: 0,
    },
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        minWidth: "auto",
        width: "100%",

        ":active": {
            outline: `2px solid ${activeBlue}`,
        },
        ":focus-visible": {
            outline: `2px solid ${Color.blue}`,
        },
        ":hover": {
            outline: `2px solid ${Color.blue}`,
        },
    },
    headerWrapperCaretStart: {
        flexDirection: "row-reverse",
    },
    // Even though the border radius is already set on the AccordionSection,
    // the hover/focus outline is on the header. We need to have the same
    // border radius here to round out the outline so it looks right over
    // the border.
    roundedTop: {
        borderStartStartRadius: INNER_BORDER_RADIUS,
        borderStartEndRadius: INNER_BORDER_RADIUS,
    },
    roundedBottom: {
        borderEndStartRadius: INNER_BORDER_RADIUS,
        borderEndEndRadius: INNER_BORDER_RADIUS,
    },
    headerContent: {
        flexGrow: 1,
        textAlign: "start",
    },
    headerString: {
        paddingTop: Spacing.medium_16,
        paddingBottom: Spacing.medium_16,
    },
    headerStringCaretEnd: {
        paddingInlineEnd: Spacing.small_12,
        paddingInlineStart: Spacing.medium_16,
    },
    headerStringCaretStart: {
        paddingInlineEnd: Spacing.medium_16,
        paddingInlineStart: Spacing.small_12,
    },
    iconExpanded: {
        // Turn the caret upside down
        transform: "rotate(180deg)",
    },
    iconStart: {
        marginInlineStart: Spacing.medium_16,
    },
    iconEnd: {
        marginInlineEnd: Spacing.medium_16,
    },
});

export default AccordionSectionHeader;
