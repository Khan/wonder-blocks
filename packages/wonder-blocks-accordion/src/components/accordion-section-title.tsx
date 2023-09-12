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
    title: string | React.ReactElement;
    caretPosition: "start" | "end";
    isOpen: boolean;
    onClick: () => void;
    sectionContentUniqueId: string;
    titleStyle?: StyleType;
};

const AccordionSectionTitle = (props: Props) => {
    const {
        title,
        caretPosition,
        isOpen,
        onClick,
        sectionContentUniqueId,
        titleStyle,
    } = props;

    const titleIsString = typeof title === "string";

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
