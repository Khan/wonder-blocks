import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import AccordionSectionTitle from "./accordion-section-title";

type CornerKindType = "square" | "rounded" | "rounded-per-section";

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
     * Whether to put the caret at the start (the left side in left-to-right
     * languages) or end (the right side in right-to-left languages) of the
     * title block in this section. Defaults to "end".
     *
     * If this prop is specified both here in the AccordionSection and
     * within a parent Accordion component, the Accordion’s caretPosition
     * value is prioritized.
     */
    caretPosition?: "start" | "end";
    /**
     * The preset styles for the corners of this accordion.
     * `square` - corners have no border radius.
     * `rounded` - the overall container's corners are rounded.
     * `rounded-per-section` - each section's corners are rounded, and there
     * is white space between each section.
     *
     * If this prop is specified both here in the AccordionSection and
     * within a parent Accordion component, the Accordion’s cornerKind
     * value is prioritized.
     */
    cornerKind?: CornerKindType;
    /**
     * Whether this section is initially open or closed. Defaults to false.
     */
    initialIsOpen?: boolean;
    /**
     * Called when the title is clicked.
     */
    onTitleClick?: () => void;
    /**
     * Custom styles for the overall accordion section container.
     */
    style?: StyleType;
    /**
     * Custom styles for the title.
     */
    titleStyle?: StyleType;

    /**
     * Whether this section is the first section in the accordion.
     * For internal use only.
     * @ignore
     */
    isFirstSection?: boolean;
    /**
     * Whether this section is the last section in the accordion.
     * For internal use only.
     * @ignore
     */
    isLastSection?: boolean;
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
        onTitleClick,
        caretPosition = "end",
        cornerKind = "rounded",
        style,
        titleStyle,
        isFirstSection = false,
        isLastSection = false,
        ...ariaProps
    } = props;

    const [isOpen, setIsOpen] = React.useState(initialIsOpen);

    const handleClick = () => {
        setIsOpen(!isOpen);
        if (onTitleClick) {
            onTitleClick();
        }
    };

    const sectionStyles = _generateStyles(
        cornerKind,
        isFirstSection,
        isLastSection,
    );

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
                        style={[styles.wrapper, sectionStyles.wrapper, style]}
                        {...ariaProps}
                        ref={ref}
                    >
                        <AccordionSectionTitle
                            title={title}
                            caretPosition={caretPosition}
                            isOpen={isOpen}
                            onClick={handleClick}
                            sectionContentUniqueId={sectionContentUniqueId}
                            titleStyle={titleStyle}
                        />
                        {/* The content is the section that
                        opens and closes. */}
                        {isOpen ? (
                            <View
                                id={sectionContentUniqueId}
                                style={styles.contentWrapper}
                            >
                                {typeof children === "string" ? (
                                    <Body style={styles.stringContent}>
                                        {children}
                                    </Body>
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

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
    },
    stringContent: {
        padding: Spacing.medium_16,
    },
});

const cornerStyles: Record<string, any> = {};

const _generateStyles = (
    cornerKind: CornerKindType,
    isFirstSection: boolean,
    isLastSection: boolean,
) => {
    const sectionType = `${cornerKind}-${isFirstSection.toString()}-${isLastSection.toString()}`;
    if (cornerStyles[sectionType]) {
        return cornerStyles[sectionType];
    }

    let wrapperStyle: StyleType = Object.freeze({});
    let firstSectionStyle: StyleType = Object.freeze({});
    let lastSectionStyle: StyleType = Object.freeze({});

    if (cornerKind === "square") {
        wrapperStyle = {
            border: `1px solid ${Color.offBlack16}`,
            borderBottom: "none",
            borderRadius: 0,
        };

        if (isLastSection) {
            lastSectionStyle = {
                borderBottom: `1px solid ${Color.offBlack16}`,
            };
        }
    }

    if (cornerKind === "rounded") {
        wrapperStyle = {
            border: `1px solid ${Color.offBlack16}`,
            borderBottom: "none",
        };

        if (isFirstSection) {
            firstSectionStyle = {
                borderStartStartRadius: Spacing.small_12,
                borderStartEndRadius: Spacing.small_12,
            };
        }
        if (isLastSection) {
            lastSectionStyle = {
                borderBottom: `1px solid ${Color.offBlack16}`,
                borderEndStartRadius: Spacing.small_12,
                borderEndEndRadius: Spacing.small_12,
            };
        }
    }

    if (cornerKind === "rounded-per-section") {
        wrapperStyle = {
            border: `1px solid ${Color.offBlack16}`,
            borderRadius: Spacing.small_12,
            marginBottom: Spacing.medium_16,
        };
    }

    const newStyles: StyleDeclaration = {
        wrapper: {
            ...wrapperStyle,
            ...firstSectionStyle,
            ...lastSectionStyle,
        },
    };

    cornerStyles[sectionType] = StyleSheet.create(newStyles);
    return cornerStyles[sectionType];
};

export default AccordionSection;
