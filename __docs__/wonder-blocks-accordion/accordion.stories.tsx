import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

import AccordionArgtypes from "./accordion.argtypes";

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
export default {
    title: "Accordion / Accordion",
    component: Accordion,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: AccordionArgtypes,
} as Meta<typeof Accordion>;

type StoryComponentType = StoryObj<typeof Accordion>;

const exampleSections = [
    <AccordionSection header="First section">
        This is the information present in the first section
    </AccordionSection>,
    <AccordionSection header="Second section">
        This is the information present in the second section
    </AccordionSection>,
    <AccordionSection header="Third section">
        This is the information present in the third section
    </AccordionSection>,
];

/**
 * By default, an accordion has a caret at the end of the header block and
 * rounded corners.
 */
export const Default: StoryComponentType = {
    args: {
        children: exampleSections,
        caretPosition: "end",
        cornerKind: "rounded",
        allowMultipleExpanded: true,
    },
};

/**
 * An accordion allows multiple sections to be expanded at the same time
 * by default. However, if `allowMultipleExpanded` is set to `false`, only
 * one section can be expanded at a time.
 */
export const AllowMultipleExpanded: StoryComponentType = {
    render: () => (
        <View>
            <View
                style={{maxWidth: 500, marginBottom: tokens.spacing.large_24}}
            >
                <LabelLarge>Allow multiple expanded (default)</LabelLarge>
                <Accordion allowMultipleExpanded>{exampleSections}</Accordion>
            </View>
            <View style={styles.sideBySide}>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Allow only one expanded</LabelLarge>
                    <Accordion
                        allowMultipleExpanded={false}
                        cornerKind="square"
                    >
                        {exampleSections}
                    </Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Allow only one expanded</LabelLarge>
                    <Accordion
                        allowMultipleExpanded={false}
                        cornerKind="rounded"
                    >
                        {exampleSections}
                    </Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Allow only one expanded</LabelLarge>
                    <Accordion
                        allowMultipleExpanded={false}
                        cornerKind="rounded-per-section"
                    >
                        {exampleSections}
                    </Accordion>
                </View>
            </View>
        </View>
    ),
};

AllowMultipleExpanded.parameters = {
    chromatic: {
        // Disabling because this snapshot isn't helpful for visual testing.
        disableSnapshot: true,
    },
};

/**
 * An accordion can have the caret at the start or the end of the header block.
 * "start" means it’s on the left of a left-to-right language (and on the
 * right of a right-to-left language), and "end" means it’s on the right of
 * a left-to-right language (and on the left of a right-to-left language).
 *
 * If the `caretPosition` prop is specified both here in the Accordion and
 * within a child AccordionSection component, the Accordion's
 * `caretPosition` value is prioritized.
 */
export const CaretPositions: StoryComponentType = {
    render: () => {
        return (
            <View>
                {/* Left-to-right */}
                <View style={styles.sideBySide}>
                    <View style={styles.fullWidth}>
                        <LabelLarge>
                            Caret position: end, language direction: left to
                            right
                        </LabelLarge>
                        <Accordion caretPosition="end">
                            {exampleSections}
                        </Accordion>
                    </View>
                    <Strut size={tokens.spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge>
                            Caret position: start, language direction: left to
                            right
                        </LabelLarge>
                        <Accordion caretPosition="start">
                            {exampleSections}
                        </Accordion>
                    </View>
                </View>

                {/* Right-to-left */}
                <View style={[styles.sideBySide, styles.rtl]}>
                    <View style={styles.fullWidth}>
                        <LabelLarge>
                            Caret position: end, language direction: right to
                            left
                        </LabelLarge>
                        <Accordion caretPosition="end">
                            <AccordionSection header="پہلا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection header="دوسرا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection header="تیسرا حصہ">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>
                        </Accordion>
                    </View>
                    <Strut size={tokens.spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge>
                            Caret position: start, language direction: right to
                            left
                        </LabelLarge>
                        <Accordion caretPosition="start">
                            <AccordionSection header="پہلا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection header="دوسرا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection header="تیسرا حصہ">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>
                        </Accordion>
                    </View>
                </View>
            </View>
        );
    },
};

/**
 * An accordion can have different corner kinds. If `cornerKind` is `square`,
 * the corners have no border radius. If `cornerKind` is `rounded`,
 * the overall container's corners are rounded. If `cornerKind` is
 * `rounded-per-section`, each section's corners are rounded, and there is
 * vertical white space between each section.
 *
 * If `cornerKind` is specified both here in the Accordion and within
 * a child AccordionSection component, the AccordionSection’s `cornerKind`
 * value is prioritized.
 */
export const CornerKinds: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.sideBySide}>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: square</LabelLarge>
                    <Accordion cornerKind="square">{exampleSections}</Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: rounded</LabelLarge>
                    <Accordion cornerKind="rounded">
                        {exampleSections}
                    </Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: rounded-per-section</LabelLarge>
                    <Accordion cornerKind="rounded-per-section">
                        {exampleSections}
                    </Accordion>
                </View>
            </View>
        );
    },
};

/**
 * An Accordion can have an initial expanded index. If this prop is specified,
 * the AccordionSection at that index will be expanded when the Accordion
 * is first rendered. If this prop is not specified, no AccordionSections
 * will be expanded when the Accordion is first rendered. In this example,
 * the AccordionSection at index 1 (the second section) is expanded by default.
 */
export const WithInitialExpandedIndex: StoryComponentType = {
    render: () => {
        return (
            <Accordion initialExpandedIndex={1}>{exampleSections}</Accordion>
        );
    },
};

/**
 * An Accordion can be animated using the `includeAnimation` prop. This
 * animation includes the caret, the expansion/collapse, and the last
 * section's border radius. In this example, animated accordions with
 * different corner kinds are shown to demonstrate the border radius transition,
 * as well as accordions with \`allowMultipleExpanded\` set to \`false\`, and
 * an accordion with sections of different heights.
 *
 * If the user has `prefers-reduced-motion` opted in, this animation should
 * be disabled. This can be done by passing `includeAnimation={false}` to
 * the Accordion.
 *
 * If `includeAnimation` is specified both here in the Accordion
 * and within a child AccordionSection component, the Accordion's
 * `includeAnimation` value is prioritized.
 */
export const WithAnimation: StoryComponentType = {
    render: () => {
        return (
            <View>
                <View style={styles.sideBySide}>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>cornerKind: square</LabelLarge>
                        <Accordion cornerKind="square" includeAnimation={true}>
                            {exampleSections}
                        </Accordion>
                    </View>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>cornerKind: rounded</LabelLarge>
                        <Accordion cornerKind="rounded" includeAnimation={true}>
                            {exampleSections}
                        </Accordion>
                    </View>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>cornerKind: rounded-per-section</LabelLarge>
                        <Accordion
                            cornerKind="rounded-per-section"
                            includeAnimation={true}
                        >
                            {exampleSections}
                        </Accordion>
                    </View>
                </View>
                <View style={styles.sideBySide}>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>
                            cornerKind: square, allowMultipleExpanded: false
                        </LabelLarge>
                        <Accordion
                            cornerKind="square"
                            includeAnimation={true}
                            allowMultipleExpanded={false}
                        >
                            {exampleSections}
                        </Accordion>
                    </View>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>
                            cornerKind: rounded, allowMultipleExpanded: false
                        </LabelLarge>
                        <Accordion
                            cornerKind="rounded"
                            includeAnimation={true}
                            allowMultipleExpanded={false}
                        >
                            {exampleSections}
                        </Accordion>
                    </View>
                    <View style={[styles.fullWidth, styles.space]}>
                        <LabelLarge>
                            cornerKind: rounded-per-section,
                            allowMultipleExpanded: false
                        </LabelLarge>
                        <Accordion
                            cornerKind="rounded-per-section"
                            includeAnimation={true}
                            allowMultipleExpanded={false}
                        >
                            {exampleSections}
                        </Accordion>
                    </View>
                </View>
                <View style={{maxWidth: 500}}>
                    <LabelLarge>
                        With unevenly sided sections, allowMultipleExpanded:
                        false
                    </LabelLarge>
                    <Accordion
                        includeAnimation={true}
                        allowMultipleExpanded={false}
                    >
                        <AccordionSection header="First section">
                            <View
                                style={{
                                    height: 500,
                                    padding: tokens.spacing.large_24,
                                }}
                            >
                                This is the information present in the first
                                section
                            </View>
                        </AccordionSection>
                        <AccordionSection header="Second section">
                            <View
                                style={{
                                    height: 100,
                                    padding: tokens.spacing.large_24,
                                }}
                            >
                                This is the information present in the second
                                section
                            </View>
                        </AccordionSection>
                        <AccordionSection header="Second section">
                            <View
                                style={{
                                    height: 300,
                                    padding: tokens.spacing.large_24,
                                }}
                            >
                                This is the information present in the third
                                section
                            </View>
                        </AccordionSection>
                    </Accordion>
                </View>
            </View>
        );
    },
};

/**
 * An Accordion with custom styles. The custom styles in this example
 * include a pink border and extra padding.
 * Note that the Accordian's border is different than the AccordionSection
 * border styles. Passing custom styles here will not affect the sections'
 * styles. If you want to change the corner kind of a single section,
 * that can be done using the `cornerKind` prop (as demonstrated here).
 * Passing in a custom border radius to the section is NOT recommended,
 * as it would cause the header's focus outline to no longer match the section.
 */
export const WithStyle: StoryComponentType = {
    render: () => {
        const customStyles = {
            border: `2px solid ${tokens.color.pink}`,
            padding: tokens.spacing.xLarge_32,
        };

        return (
            <Accordion style={customStyles}>
                <AccordionSection
                    header="This section has a custom border radius at the top?"
                    cornerKind="square"
                >
                    Something
                </AccordionSection>
                <AccordionSection header="Just a section">
                    Something
                </AccordionSection>
            </Accordion>
        );
    },
};

/**
 * To use an Accordion with only one section, you must pass in an array
 * of one element. Another approach to displaying a single AccordionSection
 * can be to use the AccordionSection component directly (not as a child
 * of an Accordion).
 */
export const SingleSection: StoryComponentType = {
    render: () => {
        return (
            <Accordion>
                {[
                    <AccordionSection header="First section">
                        This is the information present in the first section
                    </AccordionSection>,
                ]}
            </Accordion>
        );
    },
};

SingleSection.parameters = {
    chromatic: {
        // Disabling this story because it's just a usage demo,
        // not testing anything visual.
        disableSnapshot: true,
    },
};

/**
 * This is an example of an Accordion with many sections, as well as
 * a lot of content within each section.
 */
export const LongSections: StoryComponentType = {
    name: "Long sections (performance check)",
    render: function Render() {
        const [shown, setShown] = React.useState(false);

        return (
            <View>
                <Button onClick={() => setShown(!shown)} style={styles.button}>
                    {shown ? "Hide giant Accordion" : "Show giant Accordion"}
                </Button>
                {shown && (
                    <Accordion includeAnimation={true}>
                        {Array(20).fill(
                            <AccordionSection
                                header={`This is a section with a really, really, really,
                    really, really, really, really, really, really, really,
                    really, really, really, really, really, really, really,
                    really, really, really, really, really long header`}
                            >
                                <View>
                                    <img
                                        src="/logo.svg"
                                        width="100%"
                                        alt="Wonder Blocks logo"
                                    />
                                    <Strut size={tokens.spacing.xLarge_32} />
                                    <img
                                        src="/logo.svg"
                                        width="100%"
                                        alt="Wonder Blocks logo"
                                    />
                                </View>
                            </AccordionSection>,
                        )}
                    </Accordion>
                )}
            </View>
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
        marginBottom: tokens.spacing.medium_16,
    },
});
