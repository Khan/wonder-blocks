import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

type TitleProps = {
    isOpen: boolean;
    title: string | React.ReactNode;
};

type Props = AriaProps & {
    /**
     * The unique identifier for the accordion section.
     */
    id?: string;
    children: string | React.ReactElement;
    title: string | React.ReactElement;
    initialIsOpen?: boolean;
    style?: StyleType;
};

const AccordionTitle = ({isOpen, title}: TitleProps) => {
    return (
        <>
            <View style={styles.titleContent}>
                {typeof title === "string" ? <Body>{title}</Body> : title}
            </View>
            <Icon
                icon={icons.caretDown}
                color={Color.offBlack64}
                style={isOpen && styles.iconOpen}
            />
        </>
    );
};

const AccordionSection = React.forwardRef(function AccordionSection(
    props: Props,
    ref: React.ForwardedRef<HTMLLIElement>,
) {
    const {
        children,
        id,
        title,
        initialIsOpen = false,
        style,
        ...ariaProps
    } = props;
    const [isOpen, setIsOpen] = React.useState(initialIsOpen);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View id={id} style={[styles.wrapper, style]} {...ariaProps} ref={ref}>
            <Clickable
                onClick={handleClick}
                style={[styles.titleWrapper, isOpen && styles.titleWrapperOpen]}
            >
                {() => <AccordionTitle isOpen={isOpen} title={title} />}
            </Clickable>
            {isOpen ? (
                <View style={styles.contentWrapper}>
                    {typeof children === "string" ? (
                        <Body>{children}</Body>
                    ) : (
                        children
                    )}
                </View>
            ) : null}
        </View>
    );
});

// Same as the Banner blue after factoring in opacity
const backgroundBlue = mix(fade(Color.blue, 0.08), Color.white);
const fadedBlue = mix(fade(Color.blue, 0.16), Color.white);

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
    },
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        padding: Spacing.xSmall_8,
        alignItems: "center",
        backgroundColor: backgroundBlue,
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,

        ":hover": {
            border: `1px solid ${Color.blue}`,
        },
        ":active": {
            backgroundColor: fadedBlue,
            outline: "none",
            border: `1px solid ${Color.blue}`,
        },
        ":focus-visible": {
            // Reset the default thick blue outline
            outline: "none",
            border: `1px solid ${Color.blue}`,
        },
    },
    titleWrapperOpen: {
        // We want the title to be seamless with the content when
        // the accordion section is open, so we remove the border
        // radius on the bottom.
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
    },
    titleContent: {
        flexGrow: 1,
        textAlign: "start",
    },
    contentWrapper: {
        border: `1px solid ${Color.offBlack16}`,
        borderTop: "none",
        // Only the bottom corners should be rounded.
        borderEndEndRadius: Spacing.xxxSmall_4,
        borderEndStartRadius: Spacing.xxxSmall_4,
        padding: Spacing.xSmall_8,
    },
    iconOpen: {
        transform: "rotate(180deg)",
    },
});

export default AccordionSection;
