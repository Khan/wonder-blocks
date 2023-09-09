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

const defaultSections = [
    <AccordionSection title="First section">
        This is the information present in the first section
    </AccordionSection>,
    <AccordionSection title="Second section">
        This is the information present in the second section
    </AccordionSection>,
    <AccordionSection title="Third section">
        This is the information present in the third section
    </AccordionSection>,
];

export const Default: StoryComponentType = {
    args: {
        children: defaultSections,
    },
};

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
                            {defaultSections}
                        </Accordion>
                    </View>
                    <Strut size={Spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge>
                            Caret position: start, language direction: left to
                            right
                        </LabelLarge>
                        <Accordion caretPosition="start">
                            {defaultSections}
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
                            <AccordionSection title="پہلا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection title="دوسرا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection title="تیسرا حصہ">
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
                            <AccordionSection title="پہلا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection title="دوسرا سیکشن">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>

                            <AccordionSection title="تیسرا حصہ">
                                یہ کچھ معلومات ہے۔
                            </AccordionSection>
                        </Accordion>
                    </View>
                </View>
            </View>
        );
    },
};

export const CornerKinds: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.sideBySide}>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: square</LabelLarge>
                    <Accordion cornerKind="square">{defaultSections}</Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: rounded</LabelLarge>
                    <Accordion cornerKind="rounded">
                        {defaultSections}
                    </Accordion>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge>Corner kind: rounded-per-section</LabelLarge>
                    <Accordion cornerKind="rounded-per-section">
                        {defaultSections}
                    </Accordion>
                </View>
            </View>
        );
    },
};

/**
 * An Accordion with custom styles. The custom styles in this example
 * include a pink border, larger border radius, and extra padding.
 */
export const WithStyle: StoryComponentType = {
    render: () => {
        const customStyles = {
            border: `2px solid ${Color.pink}`,
            borderRadius: Spacing.large_24,
            padding: Spacing.xLarge_32,
        };

        return <Accordion style={customStyles}>{defaultSections}</Accordion>;
    },
};

// Nested Accordions

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
