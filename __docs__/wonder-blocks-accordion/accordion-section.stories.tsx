import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import Button from "@khanacademy/wonder-blocks-button";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-accordion/package.json";

import AccordionSectionArgtypes from "./accordion-section.argtypes";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

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
export default {
    title: "Accordion / AccordionSection",
    component: AccordionSection,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: AccordionSectionArgtypes,
} as Meta<typeof AccordionSection>;

type StoryComponentType = StoryObj<typeof AccordionSection>;

/**
 * By default, an AccordionSection is an uncontrolled component. To make it
 * a controlled component, pass in BOTH the `expanded` prop and the `onToggle`
 * prop. See more in the [Controlled](#controlled) and
 * [Uncontrolled](#uncontrolled) examples below.
 *
 * Visually by default, an AccordionSection has a caret at the end of the
 * header block and rounded corners. Passing in a string into the header
 * prop will automatically style the header and add spacing between the
 * header and the caret. Passing in a string into the children prop will
 * automatically give the children Body typography from Wonder Blocks
 * Typography.
 */
export const Default: StoryComponentType = {
    args: {
        children: "This is the information present in this standalone section",
        header: "Standalone section",
        caretPosition: "end",
        cornerKind: "rounded",
        collapsible: true,
        expanded: false,
    },
};

/**
 * AccordionSection is a controlled component if the `expanded` and
 * `onToggle` props are passed in. The `expanded` prop determines whether
 * the section is expanded or closed, and the `onToggle` prop function is
 * called when the section header is clicked, and is generally used to
 * set the `expanded` state outside where this section is used.
 *
 * Here is an example of how to set this up. The `expanded` prop is
 * initially set to `false` and is toggled by the `handleToggle`
 * function. The `handleToggle` function is passed into the `onToggle`
 * prop of the AccordionSection. The `handleToggle` function is also
 * called when the button is clicked.
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(false);

        const handleToggle = () => {
            // eslint-disable-next-line no-console
            console.log("Click! This function is being called!");
            setExpanded(!expanded);
        };

        return (
            <View>
                <Button
                    onClick={() => setExpanded(!expanded)}
                    style={styles.button}
                >
                    Click me to toggle the accordion section
                </Button>
                <LabelLarge style={styles.space}>
                    {`Expanded state: ${expanded}`}
                </LabelLarge>
                <AccordionSection
                    expanded={expanded}
                    header="Controlled section"
                    onToggle={handleToggle}
                >
                    This is the information present in this controlled section
                </AccordionSection>
            </View>
        );
    },
};

Controlled.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * AccordionSection is an uncontrolled component when the `expanded` prop
 * is not passed in or the `onToggle` prop is not passed in. In this case,
 * the AccordionSection will manage its own state. If the `onToggle` prop
 * is passed in (and `expanded` is not), the `onToggle` function will be
 * called; this is to ensure that any functions depending on the title click
 * will still work (e.g. analytics). If the `expanded` prop is passed in
 * (and `onToggle` is not), this `expanded` prop will be used to determine
 * whether the section is expanded at first.
 *
 * In this example, you can see that there is no explicit state management
 * (as opposed to the [Controlled](#controlled) example above).
 * The AccordionSection manages its own state, but the `onToggle` prop
 * function is still called when the section header is clicked.
 */
export const Uncontrolled: StoryComponentType = {
    render: function Render() {
        return (
            <AccordionSection
                header="Uncontrolled section"
                onToggle={() =>
                    // eslint-disable-next-line no-console
                    console.log("Click! This function is being called!")
                }
            >
                This is the information present in this uncontrolled section
            </AccordionSection>
        );
    },
};

Uncontrolled.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * An AccordionSection can have either a string or a React Element passed
 * in as its header. Passing in a React Element means no built in styling
 * will be applied to the header.
 *
 * The first example here shows how a DetailCell can be used as the header.
 * The second example shows how a custom header can be created - note that
 * in this example, a smaller window size will cause the header text to
 * truncate with ellipses.
 */
export const ReactElementInHeader: StoryComponentType = {
    render: function Render() {
        return (
            <View>
                <AccordionSection
                    header={
                        <DetailCell
                            title="Header for article item"
                            leftAccessory={
                                <PhosphorIcon
                                    icon={IconMappings.playCircle}
                                    size="medium"
                                />
                            }
                            horizontalRule="none"
                        />
                    }
                >
                    This is the information present in the first section
                </AccordionSection>
                <Strut size={tokens.spacing.xLarge_32} />
                {/* The following AccordionSection is implemented
                the same way as the CourseAccordion in the LearnableNodeSidebar
                that can be found on Khan Academy. It should truncate the
                text with ellipses when the window size is small.*/}
                <AccordionSection
                    header={
                        <View
                            style={{
                                flexDirection: "row",
                                margin: tokens.spacing.medium_16,
                            }}
                        >
                            <View
                                style={{
                                    backgroundSize: "contain",
                                    borderRadius: "8px",
                                    height: 40,
                                    marginRight: tokens.spacing.small_12,
                                    minWidth: 40,
                                    padding: tokens.spacing.xSmall_8,
                                    width: 40,
                                }}
                            >
                                <PhosphorIcon
                                    aria-hidden="true"
                                    icon={magnifyingGlass}
                                    size="medium"
                                    style={styles.icon}
                                />
                            </View>
                            <HeadingSmall
                                // Setting the tag to span here to override
                                // HeadingSmall's heading level since h2 is already
                                // set on the AccordionSection's clickable header.
                                // This way we can avoid redundancy in the a11y tree.
                                tag="span"
                                style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    alignSelf: "center",
                                }}
                            >
                                World History Project - Origins to the Present
                                (Example of a long title)
                            </HeadingSmall>
                        </View>
                    }
                >
                    This is the information present in the second section
                </AccordionSection>
            </View>
        );
    },
};

/**
 * An AccordionSection can have either a string or a React Element passed
 * in as its children. Passing in a React Element means no built in styling
 * will be applied to the children. In this example, all the children styles
 * are coming from the DetailCell component, including the horizontal line
 * between the header and the content (added as a borderTop on the DetailCell).
 *
 * Note that if the AccordionSection
 * has a `cornerKind` of `"rounded"` or `"rounded-per-section"`, the child
 * React Element will have its corners cut off.
 */
export const ReactElementInChildren: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);

        return (
            <AccordionSection
                header="First section"
                expanded={expanded}
                onToggle={setExpanded}
            >
                <DetailCell
                    title="Child article item"
                    leftAccessory={
                        <PhosphorIcon
                            icon={IconMappings.playCircle}
                            size="medium"
                        />
                    }
                    horizontalRule="none"
                    style={{
                        borderTop: `1px solid ${tokens.color.offBlack16}`,
                    }}
                />
            </AccordionSection>
        );
    },
};

/**
 * An AccordionSection can have the caret at the start or the end of the
 * header block. "start" means it’s on the left of a left-to-right language
 * (and on the right of a right-to-left language), and "end" means it’s on
 * the right of a left-to-right language (and on the left of a right-to-left
 * language).
 *
 * If the `caretPosition` prop is specified both here in the
 * AccordionSection and within the parent Accordion component,
 * the AccordionSection's `caretPosition` value is prioritized.
 */
export const CaretPositions: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(Array(4).fill(false));

        const handleToggle = (index: number) => {
            const newExpanded = [...expanded];
            newExpanded[index] = !newExpanded[index];
            setExpanded(newExpanded);
        };

        return (
            <View>
                {/* Left-to-right */}
                <View style={styles.sideBySide}>
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: end, language direction: left to
                            right
                        </LabelLarge>
                        <AccordionSection
                            caretPosition="end"
                            header="Header"
                            expanded={expanded[0]}
                            onToggle={() => handleToggle(0)}
                        >
                            Something
                        </AccordionSection>
                    </View>
                    <Strut size={tokens.spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: start, language direction: left to
                            right
                        </LabelLarge>
                        <AccordionSection
                            caretPosition="start"
                            header="Header"
                            expanded={expanded[1]}
                            onToggle={() => handleToggle(1)}
                        >
                            Something
                        </AccordionSection>
                    </View>
                </View>
                <Strut size={tokens.spacing.xLarge_32} />
                {/* Right-to-left */}
                <View style={[styles.sideBySide, styles.rtl]}>
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: end, language direction: right to
                            left
                        </LabelLarge>
                        <AccordionSection
                            caretPosition="end"
                            header="ہیڈر"
                            expanded={expanded[2]}
                            onToggle={() => handleToggle(2)}
                        >
                            کچھ
                        </AccordionSection>
                    </View>
                    <Strut size={tokens.spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: start, language direction: right to
                            left
                        </LabelLarge>
                        <AccordionSection
                            caretPosition="start"
                            header="ہیڈر"
                            expanded={expanded[3]}
                            onToggle={() => handleToggle(3)}
                        >
                            کچھ
                        </AccordionSection>
                    </View>
                </View>
            </View>
        );
    },
};

/**
 * An AccordionSection can have different corner kinds. If `cornerKind` is
 * `square`, the corners have no border radius. If `cornerKind` is `rounded`,
 * the corners are rounded. If `cornerKind` is `rounded-per-section`,
 * the corners are rounded and there is a bottom margin.
 *
 * If `cornerKind` is specified both here in the AccordionSection and
 * within a parent Accordion component, the AccordionSection’s `cornerKind
 * value is prioritized.
 */
export const CornerKinds: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(Array(4).fill(false));

        const handleToggle = (index: number) => {
            const newExpanded = [...expanded];
            newExpanded[index] = !newExpanded[index];
            setExpanded(newExpanded);
        };

        return (
            <View style={styles.sideBySide}>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge style={styles.space}>
                        Corner kind: square
                    </LabelLarge>
                    <AccordionSection
                        cornerKind="square"
                        header="Header"
                        expanded={expanded[0]}
                        onToggle={() => handleToggle(0)}
                    >
                        Something
                    </AccordionSection>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge style={styles.space}>
                        Corner kind: rounded
                    </LabelLarge>
                    <AccordionSection
                        cornerKind="rounded"
                        header="Header"
                        expanded={expanded[1]}
                        onToggle={() => handleToggle(1)}
                    >
                        Something
                    </AccordionSection>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge style={styles.space}>
                        Corner kind: rounded-per-section
                    </LabelLarge>
                    <AccordionSection
                        cornerKind="rounded-per-section"
                        header="Header"
                        expanded={expanded[2]}
                        onToggle={() => handleToggle(2)}
                    >
                        Something
                    </AccordionSection>
                </View>
            </View>
        );
    },
};

/**
 * An AccordionSection can have its `collapsible` prop set to false.
 * This means that the section's header will not be clickable, and the
 * section will always be expanded.
 *
 * NOTE: It is recommended to only use this prop when the AccordionSection
 * is used on its own, not within an Accordion.
 */
export const NotCollapsible: StoryComponentType = {
    render: () => (
        <AccordionSection
            header="This section is not collapsible"
            collapsible={false}
        >
            Something
        </AccordionSection>
    ),
};

/**
 * An AccordionSection can be animated using the `animated` prop.
 * This animation includes the caret, the expansion/collapse, and the
 * border radius.
 *
 * If the user has `prefers-reduced-motion` opted in, this animation should
 * be disabled. This can be done by passing `animated={false}` to
 * the AccordionSection.
 *
 * If `animated` is specified both here in the AccordionSection
 * and within a parent Accordion component, the AccordionSection's
 * `animated` value is prioritized.
 *
 * **NOTE: HEIGHT ANIMATIONS ARE INHERENTLY NOT PERFORMANT.** USING ANIMATIONS
 * *WILL* DECREASE PERFORMANCE. It is recommended that animations be used
 * sparingly for this reason, and only on lighter accordions.
 */
export const WithAnimation: StoryComponentType = {
    render: () => {
        return (
            <AccordionSection header="This section is animated" animated={true}>
                Something
            </AccordionSection>
        );
    },
};

WithAnimation.parameters = {
    chromatic: {
        // Disabling because we cannot visually test this in chromatic.
        disableSnapshot: true,
    },
};

/**
 * An AccordionSection can have custom styles passed in. In this example,
 * the AccordionSection has a gray background and a border, as well as
 * extra margin.
 */
export const WithStyle: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);

        const customStyles = {
            backgroundColor: tokens.color.offBlack8,
            margin: tokens.spacing.large_24,
            outline: `2px solid ${tokens.color.offBlack32}`,
        };

        return (
            <AccordionSection
                header="Section with style"
                style={customStyles}
                expanded={expanded}
                onToggle={setExpanded}
            >
                I have a gray background!
            </AccordionSection>
        );
    },
};

/**
 * An AccordionSection can have custom styles passed in for the header.
 * In this example, the header has a gray background.
 */
export const WithHeaderStyle: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(false);

        const headerStyle = {
            backgroundColor: tokens.color.offBlack8,
        };

        return (
            <AccordionSection
                header="Section with style"
                headerStyle={headerStyle}
                expanded={expanded}
                onToggle={setExpanded}
            >
                I have a gray background!
            </AccordionSection>
        );
    },
};

/**
 * An AccordionSection can be given a semantic tag to apply to its header.
 * This is h2 by default, but it should be changed to match the
 * hierarchy of the page for accessibility!!!
 *
 * In this example, the AccordionSection has an h3 tag, so the header
 * will show up as an h3 in the DOM.
 */
export const WithTag: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(false);

        return (
            <AccordionSection
                header="h3 section"
                tag="h3"
                expanded={expanded}
                onToggle={setExpanded}
            >
                I am an h3!
            </AccordionSection>
        );
    },
};

const mobile = "@media (max-width: 1023px)";

const styles = StyleSheet.create({
    sideBySide: {
        flexDirection: "row",

        [mobile]: {
            flexDirection: "column",
        },
    },
    fullWidth: {
        width: "100%",
    },
    rtl: {
        direction: "rtl",
    },
    space: {
        margin: tokens.spacing.xSmall_8,
    },
    button: {
        width: "fit-content",
        marginBottom: tokens.spacing.large_24,
    },
});
