import * as React from "react";
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color, {mix} from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    // Header content.
    header: string | React.ReactElement;
    // Whether the caret shows up at the start or end of the header block.
    caretPosition: "start" | "end";
    // Corner roundedness type.
    cornerKind: "square" | "rounded" | "rounded-per-section";
    // Whether the section is open or not.
    isOpen: boolean;
    // Called on header click.
    onClick: () => void;
    // The ID for the content that the header's `aria-controls` should
    // point to.
    sectionContentUniqueId: string;
    // Custom styles for the header container.
    headerStyle?: StyleType;
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
        isOpen,
        onClick,
        sectionContentUniqueId,
        headerStyle,
        isFirstSection,
        isLastSection,
    } = props;

    const headerIsString = typeof header === "string";

    // Conditions in which the top and bottom corners should be rounded.
    const roundedTop: boolean =
        cornerKind === "rounded-per-section" ||
        (cornerKind === "rounded" && isFirstSection);
    const roundedBottom: boolean =
        // If it's open, the content section opens under the header so the
        // header corners shouldn't be round anymore - the content gains
        // the rounded corners instead.
        (cornerKind === "rounded-per-section" && !isOpen) ||
        (cornerKind === "rounded" && isLastSection && !isOpen);

    return (
        <Clickable
            aria-expanded={isOpen}
            aria-controls={sectionContentUniqueId}
            onClick={onClick}
            style={[
                styles.headerWrapper,
                isOpen && styles.headerWrapperOpen,
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
                            <Body
                                style={[
                                    caretPosition === "end"
                                        ? styles.headerStringCaretEnd
                                        : styles.headerStringCaretStart,
                                ]}
                            >
                                {header}
                            </Body>
                        ) : (
                            header
                        )}
                    </View>
                    <Icon
                        icon={icons.caretDown}
                        color={Color.offBlack64}
                        style={[
                            caretPosition === "start"
                                ? styles.iconStart
                                : styles.iconEnd,
                            isOpen && styles.iconOpen,
                        ]}
                    />
                </>
            )}
        </Clickable>
    );
};

const activeBlue = mix(Color.offBlack32, Color.blue);
// The AccordionSection border radius for rounded corners is 12px.
// If we set the inner radius to the same value, there ends up being
// a 1px gap between the border and the outline. To fix this, we
// subtract 1 from the border radius.
const INNER_BORDER_RADIUS = Spacing.small_12 - 1;

const styles = StyleSheet.create({
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",

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
    iconOpen: {
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
