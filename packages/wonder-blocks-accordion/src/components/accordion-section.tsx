import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

import {useUniqueIdWithMock, View} from "@khanacademy/wonder-blocks-core";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {Body} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import type {AccordionCornerKindType} from "./accordion";
import AccordionSectionHeader from "./accordion-section-header";

export type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

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
     * The header for this section. If a string is passed in, it will
     * automatically be given Body typography from Wonder Blocks Typography.
     */
    header: string | React.ReactElement;
    /**
     * Whether to put the caret at the start or end of the header block
     * in this section. "start" means it’s on the left of a left-to-right
     * language (and on the right of a right-to-left language), and "end"
     * means it’s on the right of a left-to-right language
     * (and on the left of a right-to-left language).
     * Defaults to "end".
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
     * within a parent Accordion component, the AccordionSection’s cornerKind
     * value is prioritized.
     */
    cornerKind?: AccordionCornerKindType;
    /**
     * Whether this section is expanded or closed.
     *
     * NOTE: This prop is NOT used when this AccordionSection is rendered
     * within an Accordion component. In that case, the Accordion component
     * manages the expanded state of the AccordionSection.
     */
    expanded?: boolean;
    /**
     * Called when the header is clicked.
     * Takes the new expanded state as an argument. This way, the function
     * returned from React.useState can be passed in directly.
     */
    onToggle?: (newExpandedState: boolean) => unknown;
    /**
     * Custom styles for the overall accordion section container.
     */
    style?: StyleType;
    /**
     * Custom styles for the header.
     */
    headerStyle?: StyleType;
    /**
     * The semantic tag for this clickable header (e.g. "h1", "h2", etc).
     * Please use this to ensure that the header is hierarchically correct.
     * Defaults to "h2".
     * */
    tag?: TagType;
    /**
     * The test ID used to locate this component in automated tests.
     */
    testId?: string;
    /**
     * The test ID used to locate this component's clickable header in
     * automated tests.
     */
    headerTestId?: string;

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
 * hidden by clicking its header. This is generally used within the Accordion
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
 *   <AccordionSection header="First section">
 *       This is the information present in the first section
 *   </AccordionSection>
 *   <AccordionSection header="Second section">
 *       This is the information present in the second section
 *   </AccordionSection>
 *   <AccordionSection header="Third section">
 *       This is the information present in the third section
 *   </AccordionSection>
 * </Accordion>
 *
 * // On its own
 * const [expanded, setExpanded] = React.useState(false);
 * <AccordionSection
 *     header="A standalone section"
 *     expanded={expanded}
 *     onToggle={setExpanded}
 * >
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
        header,
        expanded = false,
        onToggle,
        caretPosition = "end",
        cornerKind = "rounded",
        style,
        headerStyle,
        tag,
        testId,
        headerTestId,
        // Assume it's the first section and last section by default
        // in case this component is being used standalone. If it's part
        // of an accordion, these will be overridden by the Accordion
        // parent component.
        isFirstSection = true,
        isLastSection = true,
        ...ariaProps
    } = props;

    const ids = useUniqueIdWithMock();
    const sectionId = id ?? ids.get("accordion-section");
    // We need an ID for the content section so that the opener's
    // aria-controls attribute can point to it.
    const sectionContentUniqueId = ids.get("accordion-section-content");

    const sectionStyles = _generateStyles(
        cornerKind,
        isFirstSection,
        isLastSection,
    );

    const handleClick = () => {
        if (onToggle) {
            onToggle(!expanded);
        }
    };

    return (
        <View
            id={sectionId}
            style={[styles.wrapper, sectionStyles.wrapper, style]}
            testId={testId}
            {...ariaProps}
            ref={ref}
        >
            <AccordionSectionHeader
                header={header}
                caretPosition={caretPosition}
                cornerKind={cornerKind}
                expanded={expanded}
                onClick={handleClick}
                sectionContentUniqueId={sectionContentUniqueId}
                headerStyle={headerStyle}
                tag={tag}
                testId={headerTestId}
                isFirstSection={isFirstSection}
                isLastSection={isLastSection}
            />
            {/* The content is the section that expands and closes. */}
            {expanded ? (
                <View
                    id={sectionContentUniqueId}
                    style={[
                        styles.contentWrapper,
                        sectionStyles.contentWrapper,
                    ]}
                >
                    {typeof children === "string" ? (
                        <Body style={styles.stringContent}>{children}</Body>
                    ) : (
                        children
                    )}
                </View>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column",
        boxSizing: "border-box",
    },
    contentWrapper: {
        // Add a small margin to the top of the content block so that the
        // header outline doesn't overlap with the content (and the content
        // doesn't overlap with the header outline).
        marginTop: tokens.spacing.xxxxSmall_2,
    },
    stringContent: {
        padding: tokens.spacing.medium_16,
    },
});

const cornerStyles: Record<string, any> = {};

const _generateStyles = (
    cornerKind: AccordionCornerKindType,
    isFirstSection: boolean,
    isLastSection: boolean,
) => {
    const sectionType = `${cornerKind}-${isFirstSection.toString()}-${isLastSection.toString()}`;
    if (cornerStyles[sectionType]) {
        return cornerStyles[sectionType];
    }

    let wrapperStyle: StyleType = Object.freeze({});
    let contentWrapperStyle: StyleType = Object.freeze({});
    let firstSectionStyle: StyleType = Object.freeze({});
    let lastSectionStyle: StyleType = Object.freeze({});

    if (cornerKind === "square") {
        wrapperStyle = {
            border: `1px solid ${tokens.color.offBlack16}`,
            borderBottom: "none",
            borderRadius: 0,
        };

        if (isLastSection) {
            lastSectionStyle = {
                borderBottom: `1px solid ${tokens.color.offBlack16}`,
            };
        }
    }

    if (cornerKind === "rounded") {
        wrapperStyle = {
            border: `1px solid ${tokens.color.offBlack16}`,
            borderBottom: "none",
        };

        contentWrapperStyle = {
            // Give the content wrapper the same border radius as the wrapper
            // so that the content doesn't overflow out the corners. We
            // can't put `overflow: "hidden"` on the overall container
            // because it cuts off the header's focus outline.
            borderEndEndRadius: tokens.spacing.small_12,
            borderEndStartRadius: tokens.spacing.small_12,
            overflow: "hidden",
        };

        if (isFirstSection) {
            firstSectionStyle = {
                borderStartStartRadius: tokens.spacing.small_12,
                borderStartEndRadius: tokens.spacing.small_12,
            };
        }
        if (isLastSection) {
            lastSectionStyle = {
                borderBottom: `1px solid ${tokens.color.offBlack16}`,
                borderEndStartRadius: tokens.spacing.small_12,
                borderEndEndRadius: tokens.spacing.small_12,
            };
        }
    }

    if (cornerKind === "rounded-per-section") {
        wrapperStyle = {
            border: `1px solid ${tokens.color.offBlack16}`,
            borderRadius: tokens.spacing.small_12,
            marginBottom: tokens.spacing.medium_16,
        };

        contentWrapperStyle = {
            // Give the content wrapper the same border radius as the wrapper
            // so that the content doesn't overflow out the corners. We
            // can't put `overflow: "hidden"` on the overall container
            // because it cuts off the header's focus outline.
            borderEndEndRadius: tokens.spacing.small_12,
            borderEndStartRadius: tokens.spacing.small_12,
            overflow: "hidden",
        };
    }

    const newStyles: StyleDeclaration = {
        wrapper: {
            ...wrapperStyle,
            ...firstSectionStyle,
            ...lastSectionStyle,
        },
        contentWrapper: contentWrapperStyle,
    };

    cornerStyles[sectionType] = StyleSheet.create(newStyles);
    return cornerStyles[sectionType];
};

export default AccordionSection;
