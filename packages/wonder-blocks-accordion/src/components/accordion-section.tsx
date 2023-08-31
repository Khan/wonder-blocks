import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {fade, mix} from "@khanacademy/wonder-blocks-color";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

type TitleProps = {
    // Whether this section is open.
    isOpen: boolean;
    // The function to call when the title is clicked.
    onClick: () => void;
    //The unique identifier for the content section.
    sectionId: string;
    //The title for this section.
    title: string | React.ReactNode;
};

type Props = AriaProps & {
    /**
     * The unique identifier for the accordion section.
     */
    id?: string;
    /**
     * The content to display when this section is shown. If a string is
     * passed in, it will automatically be given Body typography from
     * Wonder Blocks Typography.
     */
    children: string | React.ReactElement;
    /**
     * The title for this section. If a string is passed in, it will
     * automatically be given Body typography from Wonder Blocks Typography.
     */
    title: string | React.ReactElement;
    /**
     * Whether this section should be open on initial load.
     * Defaults to false.
     */
    initialIsOpen?: boolean;
    /**
     * Custom styles for the overall accordion section container.
     */
    style?: StyleType;
};

/**
 * The clickable title for an AccordionSection.
 */
const AccordionTitle = ({isOpen, onClick, sectionId, title}: TitleProps) => {
    return (
        <Clickable
            aria-expanded={isOpen}
            aria-controls={sectionId}
            onClick={onClick}
            style={[styles.titleWrapper, isOpen && styles.titleWrapperOpen]}
        >
            {() => (
                <>
                    <View style={styles.titleContent}>
                        {typeof title === "string" ? (
                            <Body>{title}</Body>
                        ) : (
                            title
                        )}
                    </View>
                    <Icon
                        icon={icons.caretDown}
                        color={Color.offBlack64}
                        style={isOpen && styles.iconOpen}
                    />
                </>
            )}
        </Clickable>
    );
};

/**
 * An AccordionSection displays a section of content that can be shown or
 * hidden by clicking its title. This is generally used within the Accordion
 * component, but it can also be used on its own if you need only
 * collapsible section.
 *
 * ### Usage
 *
 * ```jsx
 * import {
 *      Accordion,
 *      AccordionSection
 * } from "@khanacademy/wonder-blocks-accordion";
 *
 * // Within an Accordion
 * <Accordion>
 *   <AccordionSection title="First section">
 *       This is the information present in the first section
 *   </AccordionSection>,
 *   <AccordionSection title="Second section">
 *       This is the information present in the second section
 *   </AccordionSection>,
 *   <AccordionSection title="Third section">
 *       This is the information present in the third section
 *   </AccordionSection>
 * </Accordion>
 *
 * // On its own
 * <AccordionSection title="A standalone section">
 *    This is the information present in the standalone section
 * </AccordionSection>
 * ```
 */
const AccordionSection = React.forwardRef(function AccordionSection(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
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
        <UniqueIDProvider mockOnFirstRender={true} scope="switch">
            {(ids) => {
                // We need an ID for the content section so that the opener's
                // aria-controls attribute can point to it.
                const sectionContentUniqueId = ids.get(
                    "accordion-section-content",
                );
                return (
                    <View
                        id={id}
                        style={[styles.wrapper, style]}
                        {...ariaProps}
                        ref={ref}
                    >
                        <AccordionTitle
                            isOpen={isOpen}
                            onClick={handleClick}
                            sectionId={sectionContentUniqueId}
                            title={title}
                        />
                        {isOpen ? (
                            <View
                                id={sectionContentUniqueId}
                                style={styles.contentWrapper}
                            >
                                {typeof children === "string" ? (
                                    <Body>{children}</Body>
                                ) : (
                                    children
                                )}
                            </View>
                        ) : null}
                    </View>
                );
            }}
        </UniqueIDProvider>
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
        marginBottom: Spacing.xSmall_8,
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
