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
    // Title content.
    title: string | React.ReactElement;
    // Whether the caret shows up at the start or end of the title block.
    caretPosition: "start" | "end";
    // Corner roundedness type.
    cornerKind: "square" | "rounded" | "rounded-per-section";
    // Whether the section is open or not.
    isOpen: boolean;
    // Called on title click.
    onClick: () => void;
    // The ID for the content that the title's `aria-controls` should
    // point to.
    sectionContentUniqueId: string;
    // Custom styles for the title container.
    titleStyle?: StyleType;
    // Whether this section is the first section in the accordion.
    // For internal use only.
    isFirstSection: boolean;
    // Whether this section is the last section in the accordion.
    // For internal use only.
    isLastSection: boolean;
};

const AccordionSectionTitle = (props: Props) => {
    const {
        title,
        caretPosition,
        cornerKind,
        isOpen,
        onClick,
        sectionContentUniqueId,
        titleStyle,
        isFirstSection,
        isLastSection,
    } = props;

    const titleIsString = typeof title === "string";

    // Only round out the top corners if the section is the first section
    // and if the cornerKind is rounded.
    const roundedTop: boolean =
        cornerKind === "rounded-per-section" ||
        (cornerKind === "rounded" && isFirstSection);
    // Only round out the bottom corners if the section is the last section,
    // the cornerKind is rounded, and the section is open.
    const roundedBottom: boolean =
        (cornerKind === "rounded-per-section" && !isOpen) ||
        (cornerKind === "rounded" && isLastSection && !isOpen);

    return (
        <Clickable
            /* The opener is the clickable title that opens
            and closes the section. */
            aria-expanded={isOpen}
            aria-controls={sectionContentUniqueId}
            onClick={onClick}
            style={[
                styles.titleWrapper,
                isOpen && styles.titleWrapperOpen,
                caretPosition === "start" && styles.titleWrapperCaretStart,
                roundedTop && styles.roundedTop,
                roundedBottom && styles.roundedBottom,
                titleStyle,
            ]}
        >
            {() => (
                <>
                    <View
                        style={[
                            styles.titleContent,
                            titleIsString && styles.titleString,
                        ]}
                    >
                        {titleIsString ? (
                            <Body
                                style={[
                                    caretPosition === "end"
                                        ? styles.titleStringCaretEnd
                                        : styles.titleStringCaretStart,
                                ]}
                            >
                                {title}
                            </Body>
                        ) : (
                            title
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

const styles = StyleSheet.create({
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

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
    titleWrapperCaretStart: {
        flexDirection: "row-reverse",
    },
    // Even though the border radius is already set on the AccordionSection,
    // the hover/focus outline is on the title. We need to have the same
    // border radius here to round out the outline so it looks right over
    // the border.
    roundedTop: {
        borderStartStartRadius: Spacing.small_12,
        borderStartEndRadius: Spacing.small_12,
    },
    roundedBottom: {
        borderEndStartRadius: Spacing.small_12,
        borderEndEndRadius: Spacing.small_12,
    },
    titleContent: {
        flexGrow: 1,
        textAlign: "start",
    },
    titleString: {
        paddingTop: Spacing.medium_16,
        paddingBottom: Spacing.medium_16,
    },
    titleStringCaretEnd: {
        paddingInlineEnd: Spacing.small_12,
        paddingInlineStart: Spacing.medium_16,
    },
    titleStringCaretStart: {
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

export default AccordionSectionTitle;
