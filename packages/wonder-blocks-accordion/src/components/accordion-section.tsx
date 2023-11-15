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
     * Whether this section is collapsible. If false, the header will not be
     * clickable, and the section will stay expanded at all times.
     */
    collapsible?: boolean;
    /**
     * Whether this section is expanded or closed.
     *
     * NOTE: This prop is NOT used when this AccordionSection is rendered
     * within an Accordion component. In that case, the Accordion component
     * manages the expanded state of the AccordionSection.
     */
    expanded?: boolean;
    /**
     * Whether to include animation on the header. This should be false
     * if the user has `prefers-reduced-motion` opted in. Defaults to false.
     *
     * If this prop is specified both here in the AccordionSection and
     * within a parent Accordion component, the Accordion’s animated
     * value is prioritized.
     */
    animated?: boolean;
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
    /**
     * Whether this section should have role="region". True by default.
     * According to W3, the panel container should have role region except
     * when there are more than six panels in an accordion, in which case
     * we should set this prop to false.
     * For internal use only.
     * @ignore
     */
    isRegion?: boolean;
    /**
     * Called when the header is focused.
     * For internal use only.
     * @ignore
     */
    onFocus?: () => void;
};

/**
 * An AccordionSection displays a section of content that can be shown or
 * hidden by clicking its header. This is generally used within the Accordion
 * component, but it can also be used on its own if you need only one
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
 * // On its own, controlled
 * const [expanded, setExpanded] = React.useState(false);
 * <AccordionSection
 *     header="A standalone section"
 *     expanded={expanded}
 *     onToggle={setExpanded}
 * >
 *    This is the information present in the standalone section
 * </AccordionSection>
 *
 * // On its own, uncontrolled
 * <AccordionSection header="A standalone section">
 *   This is the information present in the standalone section
 * </AccordionSection>
 * ```
 */
const AccordionSection = React.forwardRef(function AccordionSection(
    props: Props,
    // Using a button ref here beacuse the ref is pointing to the
    // section header, which is a button.
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const {
        children,
        id,
        header,
        collapsible,
        expanded,
        animated = false,
        onToggle,
        onFocus,
        caretPosition = "end",
        cornerKind = "rounded",
        style,
        headerStyle,
        tag,
        testId,
        // Assume it's the first section and last section by default
        // in case this component is being used standalone. If it's part
        // of an accordion, these will be overridden by the Accordion
        // parent component.
        isFirstSection = true,
        isLastSection = true,
        // Assume it's a region by default. Override this to be false
        // if we know there are more than six panels in an accordion.
        isRegion = true,
        ...ariaProps
    } = props;

    const [internalExpanded, setInternalExpanded] = React.useState(
        expanded ?? false,
    );

    const controlledMode = expanded !== undefined && onToggle;

    const ids = useUniqueIdWithMock();
    const sectionId = id ?? ids.get("accordion-section");
    // We need an ID for the header so that the content section's
    // aria-labelledby attribute can point to it.
    const headerId = id ? `${id}-header` : ids.get("accordion-section-header");
    // We need an ID for the content section so that the opener's
    // aria-controls attribute can point to it.
    const sectionContentUniqueId = ids.get("accordion-section-content");

    const sectionStyles = _generateStyles(
        cornerKind,
        isFirstSection,
        isLastSection,
    );

    const handleClick = () => {
        // Controlled mode
        if (controlledMode) {
            onToggle(!expanded);
        } else {
            // Uncontrolled mode
            setInternalExpanded(!internalExpanded);
            if (onToggle) {
                onToggle(!internalExpanded);
            }
        }
    };

    let expandedState;
    if (collapsible === false) {
        // If the section is disabled (not collapsible), it should
        // always be expanded.
        expandedState = true;
        // If the expanded prop is undefined, we're in uncontrolled mode and
        // should use the internal state to determine the expanded state.
        // Otherwise, we're in controlled mode and should use the expanded prop
        // that's passed in to determine the expanded state.
    } else {
        expandedState = controlledMode ? expanded : internalExpanded;
    }

    return (
        <View
            id={sectionId}
            style={[
                styles.wrapper,
                animated && styles.wrapperWithAnimation,
                sectionStyles.wrapper,
                expandedState
                    ? styles.wrapperExpanded
                    : styles.wrapperCollapsed,
                style,
            ]}
            testId={testId}
            {...ariaProps}
        >
            <AccordionSectionHeader
                id={headerId}
                header={header}
                caretPosition={caretPosition}
                cornerKind={cornerKind}
                collapsible={collapsible}
                expanded={expandedState}
                animated={animated}
                onClick={handleClick}
                onFocus={onFocus}
                sectionContentUniqueId={sectionContentUniqueId}
                headerStyle={headerStyle}
                tag={tag}
                testId={testId}
                isFirstSection={isFirstSection}
                isLastSection={isLastSection}
                ref={ref}
            />
            <View
                id={sectionContentUniqueId}
                role={isRegion ? "region" : undefined}
                aria-labelledby={headerId}
                style={[
                    styles.contentWrapper,
                    expandedState
                        ? styles.contentWrapperExpanded
                        : styles.conentWrapperCollapsed,
                    sectionStyles.contentWrapper,
                ]}
                testId={testId ? `${testId}-content-panel` : undefined}
            >
                {typeof children === "string" ? (
                    <Body style={styles.stringContent}>{children}</Body>
                ) : (
                    children
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        // Use grid layout for clean animations.
        display: "grid",
        boxSizing: "border-box",
    },
    wrapperWithAnimation: {
        transition: "grid-template-rows 300ms",
    },
    wrapperCollapsed: {
        gridTemplateRows: "min-content 0fr",
    },
    wrapperExpanded: {
        gridTemplateRows: "min-content 1fr",
    },
    contentWrapper: {
        overflow: "hidden",
    },
    conentWrapperCollapsed: {
        // Make sure screen readers don't read the content when it's
        // collapsed.
        visibility: "hidden",
    },
    contentWrapperExpanded: {
        visibility: "visible",
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
