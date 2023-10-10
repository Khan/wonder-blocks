import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

import AccordionArgtypes from "./accordion.argtypes";

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
export const AllowMultipleExpanded = {
    render: () => (
        <View style={styles.sideBySide}>
            <View style={[styles.fullWidth, styles.space]}>
                <LabelLarge>Allow multiple expanded</LabelLarge>
                <Accordion allowMultipleExpanded>{exampleSections}</Accordion>
            </View>
            <View style={[styles.fullWidth, styles.space]}>
                <LabelLarge>Allow only one expanded</LabelLarge>
                <Accordion allowMultipleExpanded={false}>
                    {exampleSections}
                </Accordion>
            </View>
        </View>
    ),
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
                    <Strut size={Spacing.xLarge_32} />
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
                    <Strut size={Spacing.xLarge_32} />
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
            border: `2px solid ${Color.pink}`,
            padding: Spacing.xLarge_32,
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
 * An Accordion can be given a semantic tag to apply to the header of each
 * section. This is h2 by default, but it should be changed to match the
 * hierarchy of the page for accessibility!!!
 *
 * If this prop is specified both here in the Accordion and within
 * a child AccordionSection component, the AccordionSection's tag
 * value is prioritized.
 *
 * In this example, the accordion has been given an h3 tag, and the last
 * section has been given an h4 tag. This means the first two sections
 * will be h3s, and the last section will be an h4. This is apparent in
 * the DOM.
 */
export const WithTag: StoryComponentType = {
    render: () => {
        return (
            <Accordion tag="h3">
                <AccordionSection header="This is an h3">
                    Something
                </AccordionSection>
                <AccordionSection header="This is also an h3">
                    Something
                </AccordionSection>
                <AccordionSection header="This is actually an h4" tag="h4">
                    Something
                </AccordionSection>
            </Accordion>
        );
    },
};

/**
 * To use an Accordion with only one section, you must pass in an array
 * of one element.
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

const styles = StyleSheet.create({
    sideBySide: {
        flexDirection: "row",
    },
    fullWidth: {
        width: "100%",
    },
    rtl: {
        direction: "rtl",
    },
    space: {
        margin: Spacing.xSmall_8,
    },
});