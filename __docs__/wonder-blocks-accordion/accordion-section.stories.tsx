import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import Button from "@khanacademy/wonder-blocks-button";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {tokens} from "@khanacademy/wonder-blocks-theming";
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
 * automatically style the header and add spacing between the header and
 * the caret. Passing in a string into the children prop will automatically
 * give the children Body typography from Wonder Blocks Typography.
 */
export const Default: StoryComponentType = {
    args: {
        children: "This is the information present in this standalone section",
        header: "Standalone section",
        caretPosition: "end",
        cornerKind: "rounded",
        expanded: false,
    },
};

/**
 * AccordionSection is a controlled component. Its `expanded` prop
 * determines whether the section is expanded or closed, and its
 * `onToggle` prop function is called when the section header is clicked.
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

        return (
            <View>
                <Button
                    onClick={() => setExpanded(!expanded)}
                    style={styles.button}
                >
                    Click me to toggle the accordion section
                </Button>
                <AccordionSection
                    expanded={expanded}
                    header="Controlled section"
                    onToggle={setExpanded}
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
 * An AccordionSection can have either a string or a React Element passed
 * in as its header. Passing in a React Element means no built in styling
 * will be applied to the header. In this example, all the header styles are
 * coming from the DetailCell component.
 */
export const ReactElementInHeader: StoryComponentType = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(false);

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
                expanded={expanded}
                onToggle={setExpanded}
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
                    title="Header for article item"
                    leftAccessory={
                        <Icon icon={icons.contentVideo} size="medium" />
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
 * the Accordion's `caretPosition` value is prioritized.
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
        margin: tokens.spacing.xSmall_8,
    },
    button: {
        width: "fit-content",
        marginBottom: tokens.spacing.large_24,
    },
});
