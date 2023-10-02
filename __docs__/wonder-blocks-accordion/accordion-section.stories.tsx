import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

import AccordionSectionArgtypes from "./accordion-section.argtypes";

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
 * By default, an AccordionSection has a caret at the end of the header block
 * and rounded corners. Passing in a string into the header prop will
 * automatically give the header Body typography from Wonder Blocks Typography
 * and spacing between the header and the caret. Passing in a string into the
 * children prop will also automatically give the children Body typography from
 * Wonder Blocks Typography.
 */
export const Default: StoryComponentType = {
    args: {
        children: "This is the information present in this standalone section",
        header: "Standalone section",
        caretPosition: "end",
        cornerKind: "rounded",
    },
};

/**
 * An AccordionSection can have either a string or a React Element passed
 * in as its header. Passing in a React Element means no built in styling
 * will be applied to the header. In this example, all the header styles are
 * coming from the DetailCell component.
 */
export const ReactElementInHeader: StoryComponentType = {
    render: () => {
        return (
            <AccordionSection
                header={
                    <DetailCell
                        title="Header for article item"
                        leftAccessory={
                            <Icon icon={icons.contentVideo} size="medium" />
                        }
                        horizontalRule="none"
                    />
                }
            >
                This is the information present in the first section
            </AccordionSection>
        );
    },
};

/**
 * An AccordionSection can have either a string or a React Element passed
 * in as its children. Passing in a React Element means no built in styling
 * will be applied to the children. In this example, all the children styles
 * are coming from the DetailCell component, including the horitzontal line
 * between the header and the content (added as a borderTop on the DetailCell).
 *
 * Note that if the AccordionSection
 * has a `cornerKind` of `"rounded"` or `"rounded-per-section"`, the child
 * React Element will have its corners cut off.
 */
export const ReactElementInChildren: StoryComponentType = {
    render: () => {
        return (
            <AccordionSection header="First section">
                <DetailCell
                    title="Header for article item"
                    leftAccessory={
                        <Icon icon={icons.contentVideo} size="medium" />
                    }
                    horizontalRule="none"
                    style={{
                        borderTop: `1px solid ${Color.offBlack16}`,
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
 * the Accordion's `caretPosition` value is prioritized.
 */
export const CaretPositions: StoryComponentType = {
    render: () => {
        return (
            <View>
                {/* Left-to-right */}
                <View style={styles.sideBySide}>
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: end, language direction: left to
                            right
                        </LabelLarge>
                        <AccordionSection caretPosition="end" header="Header">
                            Something
                        </AccordionSection>
                    </View>
                    <Strut size={Spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: start, language direction: left to
                            right
                        </LabelLarge>
                        <AccordionSection caretPosition="start" header="Header">
                            Something
                        </AccordionSection>
                    </View>
                </View>
                <Strut size={Spacing.xLarge_32} />
                {/* Right-to-left */}
                <View style={[styles.sideBySide, styles.rtl]}>
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: end, language direction: right to
                            left
                        </LabelLarge>
                        <AccordionSection caretPosition="end" header="ہیڈر">
                            کچھ
                        </AccordionSection>
                    </View>
                    <Strut size={Spacing.xLarge_32} />
                    <View style={styles.fullWidth}>
                        <LabelLarge style={styles.space}>
                            Caret position: start, language direction: right to
                            left
                        </LabelLarge>
                        <AccordionSection caretPosition="start" header="ہیڈر">
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
    render: () => {
        return (
            <View style={styles.sideBySide}>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge style={styles.space}>
                        Corner kind: square
                    </LabelLarge>
                    <AccordionSection cornerKind="square" header="Header">
                        Something
                    </AccordionSection>
                </View>
                <View style={[styles.fullWidth, styles.space]}>
                    <LabelLarge style={styles.space}>
                        Corner kind: rounded
                    </LabelLarge>
                    <AccordionSection cornerKind="rounded" header="Header">
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
                    >
                        Something
                    </AccordionSection>
                </View>
            </View>
        );
    },
};

/**
 * An AccordionSection can be expanded or closed by default. If `expanded`
 * is `true`, the section will be expanded by default.
 */
export const WithExpanded: StoryComponentType = {
    render: () => {
        return (
            <Accordion>
                <AccordionSection expanded={false} header="expanded false">
                    {"I'm closed at first."}
                </AccordionSection>
                <AccordionSection expanded={true} header="expanded true">
                    {"I'm already expanded!"}
                </AccordionSection>
            </Accordion>
        );
    },
};

/**
 * An AccordionSection can have custom styles passed in. In this example,
 * the AccordionSection has a gray background and a border, as well as
 * extra margin.
 */
export const WithStyle: StoryComponentType = {
    render: () => {
        const customStyles = {
            backgroundColor: Color.offBlack8,
            margin: Spacing.large_24,
            outline: `2px solid ${Color.offBlack32}`,
        };
        return (
            <AccordionSection header="Section with style" style={customStyles}>
                {"I have a gray background!"}
            </AccordionSection>
        );
    },
};

/**
 * An AccordionSection can have custom styles passed in for the header.
 * In this example, the header has a gray background.
 */
export const WithHeaderStyle: StoryComponentType = {
    render: () => {
        const headerStyle = {
            backgroundColor: Color.offBlack8,
        };
        return (
            <AccordionSection
                header="Section with style"
                headerStyle={headerStyle}
            >
                {"I have a gray background!"}
            </AccordionSection>
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
