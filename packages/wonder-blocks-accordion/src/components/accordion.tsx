import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import AccordionSection from "./accordion-section";

const StyledUnorderedList = addStyle("ul");

export type AccordionCornerKindType =
    | "square"
    | "rounded"
    | "rounded-per-section";

type Props = AriaProps & {
    /**
     * The unique identifier for the accordion.
     */
    id?: string;
    /**
     * The AccordionSection components to display within this Accordion.
     */
    children: Array<
        React.ReactElement<React.ComponentProps<typeof AccordionSection>>
    >;
    /**
     * The index of the AccordionSection that should be expanded when the
     * Accordion is first rendered. If not specified, no AccordionSections
     * will be expanded when the Accordion is first rendered.
     */
    initialExpandedIndex?: number;
    /**
     * Whether multiple AccordionSections can be expanded at the same time.
     * If not specified, multiple AccordionSections can be expanded at a time.
     */
    allowMultipleExpanded?: boolean;
    /**
     * Whether to put the caret at the start or end of the header block
     * in this section. "start" means it’s on the left of a left-to-right
     * language (and on the right of a right-to-left language), and "end"
     * means it’s on the right of a left-to-right language
     * (and on the left of a right-to-left language).
     * Defaults to "end".
     *
     * If this prop is specified both here in the Accordion and within
     * a child AccordionSection component, the Accordion’s caretPosition
     * value is prioritized.
     */
    caretPosition?: "start" | "end";
    /**
     * The preset styles for the corners of this accordion.
     * `square` - corners have no border radius.
     * `rounded` - the overall container's corners are rounded.
     * `rounded-per-section` - each section's corners are rounded,
     * and there is vertical white space between each section.
     *
     * If this prop is specified both here in the Accordion and within
     * a child AccordionSection component, the AccordionSection’s cornerKind
     * value is prioritized.
     */
    cornerKind?: AccordionCornerKindType;
    /**
     * Whether to include animation on the header. This should be false
     * if the user has `prefers-reduced-motion` opted in. Defaults to false.
     *
     * If this prop is specified both here in the Accordion and within
     * a child AccordionSection component, the Accordion’s animated
     * value is prioritized.
     */
    animated?: boolean;
    /**
     * Custom styles for the overall accordion container.
     */
    style?: StyleType;
};

/**
 * An accordion displays a vertically stacked list of sections, each of which
 * contains content that can be shown or hidden by clicking its header.
 *
 * The Wonder Blocks Accordion component is a styled wrapper for a list of
 * AccordionSection components. It also wraps the AccordionSection
 * components in list items.
 *
 * ### Usage
 *
 * ```jsx
 * import {
 *      Accordion,
 *      AccordionSection
 * } from "@khanacademy/wonder-blocks-accordion";
 *
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
 * ```
 */
const Accordion = React.forwardRef(function Accordion(
    props: Props,
    ref: React.ForwardedRef<HTMLUListElement>,
) {
    const {
        children,
        id,
        initialExpandedIndex,
        allowMultipleExpanded = true,
        caretPosition,
        cornerKind = "rounded",
        animated,
        style,
        ...ariaProps
    } = props;

    // Starting array for the initial expanded state of each section.
    const startingArray = Array(children.length).fill(false);
    // If initialExpandedIndex is specified, we want to open that section.
    if (initialExpandedIndex !== undefined) {
        startingArray[initialExpandedIndex] = true;
    }
    const [sectionsOpened, setSectionsOpened] = React.useState(startingArray);

    // Setting up focus state and refs for keyboard navigation.
    const [currentlyFocusedSection, setCurrentlyFocusedSection] =
        React.useState(0);
    const childRefs = Array(children.length).fill(null);

    const handleSectionClick = (
        index: number,
        childOnToggle?: (newExpandedState: boolean) => unknown,
    ) => {
        // If allowMultipleExpanded is false, we want to close all other
        // sections when one is opened.
        const newSectionsOpened = allowMultipleExpanded
            ? [...sectionsOpened]
            : Array(children.length).fill(false);
        const newOpenedValueAtIndex = !sectionsOpened[index];

        newSectionsOpened[index] = newOpenedValueAtIndex;
        setSectionsOpened(newSectionsOpened);

        // Keep track of the currently focused section for keyboard navigation.
        setCurrentlyFocusedSection(index);

        if (childOnToggle) {
            childOnToggle(newOpenedValueAtIndex);
        }
    };

    /**
     * Set focus on the section that was selected.
     *
     * NOTE: It may seem like we should filter out non-collapsible sections
     * here as they are effectively disabled. However, we should keep these
     * disabled sections in the focus order as they'd receive focus anyway
     * with `aria-disabled` and visually impaired users should still know
     * they are there. Screenreaders will read them out as disabled, the
     * status will still be clear to users.
     */
    const handleSectionFocus = (index: number) => {
        setCurrentlyFocusedSection(index);
    };

    /** Keyboard navigation for keys: ArrowUp, ArrowDown, Home, and End.
     *
     * Note that we don't have to use `setCurrentlyFocusedSection` in this
     * function because the focus is handled by the browser + the
     * section's onFocus handler (the `handleSectionFocus` function above).
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            // ArrowUp focuses on the previous section.
            case "ArrowUp":
                // Get the previous section, or cycle to last section if
                // the first section is currently focused.
                const previousSectionIndex =
                    (currentlyFocusedSection + children.length - 1) %
                    children.length;
                const previousChildRef = childRefs[previousSectionIndex];
                previousChildRef.current.focus();

                break;
            // ArrowDown focuses on the next section.
            case "ArrowDown":
                // Get the next section, or cycle to first section if
                // the last section is currently focused.
                const nextSectionIndex =
                    (currentlyFocusedSection + 1) % children.length;
                const nextChildRef = childRefs[nextSectionIndex];
                nextChildRef.current.focus();

                break;
            // Home focuses on the first section.
            case "Home":
                const firstChildRef = childRefs[0];
                firstChildRef.current.focus();
                break;
            // End focuses on the last section.
            case "End":
                const lastChildRef = childRefs[children.length - 1];
                lastChildRef.current.focus();
                break;
        }
    };

    return (
        <StyledUnorderedList
            style={[styles.wrapper, style]}
            onKeyDown={handleKeyDown}
            {...ariaProps}
            ref={ref}
        >
            {children.map((child, index) => {
                const {
                    caretPosition: childCaretPosition,
                    cornerKind: childCornerKind,
                    onToggle: childOnToggle,
                    animated: childanimated,
                } = child.props;

                // Create a ref for each child AccordionSection to
                // be able to focus on them with keyboard navigation.
                const childRef = React.createRef<HTMLButtonElement>();
                childRefs[index] = childRef;

                const isFirstChild = index === 0;
                const isLastChild = index === children.length - 1;

                return (
                    // If the AccordionSections are rendered within the
                    // Accordion, they are part of a list, so they should
                    // be list items.
                    <li key={index} id={id}>
                        {React.cloneElement(child, {
                            // Prioritize the Accordion's caretPosition
                            caretPosition: caretPosition ?? childCaretPosition,
                            // Prioritize the AccordionSection's cornerKind
                            cornerKind: childCornerKind ?? cornerKind,
                            // Don't use the AccordionSection's expanded prop
                            // when it's rendered within Accordion.
                            expanded: sectionsOpened[index],
                            // Prioritize the Accordion's animated
                            animated: animated ?? childanimated,
                            onToggle: () =>
                                handleSectionClick(index, childOnToggle),
                            onFocus: () => handleSectionFocus(index),
                            isFirstSection: isFirstChild,
                            isLastSection: isLastChild,
                            ref: childRef,
                        })}
                    </li>
                );
            })}
        </StyledUnorderedList>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        boxSizing: "border-box",
        listStyle: "none",
        // Reset the default padding for lists.
        padding: 0,
        width: "100%",
    },
});

export default Accordion;
