import * as React from "react";
import {Meta} from "@storybook/react";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import packageConfig from "../../packages/wonder-blocks-labeled-field/package.json";
import ComponentInfo from "../components/component-info";
import {allModes} from "../../.storybook/modes";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ScenariosLayout} from "../components/scenarios-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {
    longText,
    longTextWithNoWordBreak,
    reallyLongText,
    reallyLongTextWithNoWordBreak,
} from "../components/text-for-testing";

export default {
    title: "Packages / LabeledField / Testing / Snapshots / LabeledField",
    tags: ["!autodocs"],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
} as Meta<typeof LabeledField>;

const scenarios = [
    {
        name: "Label only",
        props: {
            label: "Label only",
        },
    },
    {
        name: "With description",
        props: {
            label: "With description",
            description: "Description",
        },
    },
    {
        name: "With error",
        props: {
            label: "With error",
            errorMessage: "Message about the error",
            field: (
                <TextField
                    value="invalid value"
                    onChange={() => {}}
                    validate={() => "Message about the error"}
                />
            ),
        },
    },
    {
        name: "With description and error",
        props: {
            label: "With description and error",
            description: "Description",
            errorMessage: "Message about the error",
            field: (
                <TextField
                    value="invalid value"
                    onChange={() => {}}
                    validate={() => "Message about the error"}
                />
            ),
        },
    },
    {
        name: "With long text",
        props: {
            required: true,
            label: longText,
            errorMessage: longText,
            description: longText,
            field: (
                <TextField
                    value="invalid value"
                    onChange={() => {}}
                    validate={() => "Message about the error"}
                />
            ),
        },
    },
    {
        name: "With long text and no word break",
        props: {
            required: true,
            label: longTextWithNoWordBreak,
            errorMessage: longTextWithNoWordBreak,
            description: longTextWithNoWordBreak,
            field: (
                <TextField
                    value="invalid value"
                    onChange={() => {}}
                    validate={() => "Message about the error"}
                />
            ),
        },
    },
    {
        name: "All properties",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: "Message about the error",
            required: "Custom required message",
            readOnlyMessage: "Message about the read only state",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "Custom ReactNode elements",
        props: {
            label: (
                <span>
                    <b>Label</b> <i>using</i> <u>JSX</u>
                </span>
            ),
            description: (
                <span>
                    <b>Description</b> <i>using</i> <u>JSX</u>
                </span>
            ),
            field: <TextField value="" onChange={() => {}} />,
            errorMessage: (
                <span>
                    <b>Error</b> <i>using</i> <u>JSX</u>
                </span>
            ),
            readOnlyMessage: (
                <span>
                    <b>Read</b> <i>only </i> <u>message</u>
                </span>
            ),
            elementAfterFieldStart: (
                <span>
                    <b>Start</b> <i>helper</i> <u>text</u>
                </span>
            ),
            elementAfterFieldEnd: (
                <span>
                    <b>End</b> <i>helper</i> <u>text</u>
                </span>
            ),
        },
    },
    {
        name: "Custom styles",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: "Message about the error",
            required: "Custom required message",
            readOnlyMessage: "Message about the read only state",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
            styles: {
                root: {
                    padding: sizing.size_080,
                },
                label: {
                    paddingBlockEnd: sizing.size_020,
                },
                description: {
                    paddingBlockEnd: sizing.size_020,
                },
                error: {
                    paddingBlockStart: sizing.size_020,
                },
                readOnlyMessage: {
                    paddingBlockStart: sizing.size_020,
                },
                elementAfterFieldStart: {
                    paddingBlockStart: sizing.size_020,
                },
                elementAfterFieldEnd: {
                    paddingBlockStart: sizing.size_020,
                },
            },
        },
    },
    {
        name: "With disabled field",
        props: {
            field: <TextField value="" onChange={() => {}} disabled />,
            label: "Name",
            description: "Helpful description text.",
            required: true,
        },
    },
    {
        name: "With read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            required: true,
            readOnlyMessage: "Message about why it is read only",
        },
    },
    {
        name: "With long read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            required: true,
            readOnlyMessage: longText,
        },
    },
    {
        name: "With long read only message and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            required: true,
            readOnlyMessage: longTextWithNoWordBreak,
        },
    },
    {
        name: "Readonly + Error State",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: "Message about the error",
            required: "Custom required message",
            readOnlyMessage: "Message about the read only state",
        },
    },
    {
        name: "Helper text after field end with error message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: "Message about the error",
        },
    },
    {
        name: "After field end element with long error message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: reallyLongText,
        },
    },
    {
        name: "After field end element with long error message and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "Long error message and long element after field end",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "Long error message and long element after field end with no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },

    {
        name: "Helper text after field end with read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: "Message about the read only state",
        },
    },
    {
        name: "After field end element with long read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: reallyLongText,
        },
    },
    {
        name: "After field end element with long read only message and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "Long read only message and long element after field end",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "Long read only message and long element after field end with no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "Helper text before field start",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
        },
    },

    {
        name: "Helper text after field start",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldStart: "Start helper text",
        },
    },
    {
        name: "Helper text after field end",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "Helper text before and after field start and end",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "Helper text with long text",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: reallyLongText,
            elementAfterFieldStart: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "Helper text with long text and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: reallyLongTextWithNoWordBreak,
            elementAfterFieldStart: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },
];

/**
 * The following story shows what the LabeledField looks like when different
 * props are set.
 */
export const Scenarios = (args: PropsFor<typeof LabeledField>) => {
    const [textFieldValue, setTextFieldValue] = React.useState("");
    return (
        <View style={{gap: sizing.size_240}}>
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {alignItems: "stretch"}}}
            >
                {(props) => (
                    <LabeledField
                        field={
                            <TextField
                                value={textFieldValue}
                                onChange={setTextFieldValue}
                            />
                        }
                        {...props}
                    />
                )}
            </ScenariosLayout>
        </View>
    );
};
