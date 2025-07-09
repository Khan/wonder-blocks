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
            elementBeforeFieldStart: (
                <span>
                    <b>Start</b> <i>helper</i> <u>text</u>
                </span>
            ),
            elementBeforeFieldEnd: (
                <span>
                    <b>End</b> <i>helper</i> <u>text</u>
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
            elementBeforeFieldStart: "Start helper text",
            elementBeforeFieldEnd: "End helper text",
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
                elementBeforeFieldStart: {
                    paddingBlockEnd: sizing.size_020,
                },
                elementBeforeFieldEnd: {
                    paddingBlockEnd: sizing.size_020,
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
        name: "elementAfterFieldEnd with errorMessage",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: "Message about the error",
        },
    },
    {
        name: "elementAfterFieldEnd with long errorMessage",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: reallyLongText,
        },
    },
    {
        name: "elementAfterFieldEnd with long errorMessage and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            errorMessage: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "Long elementAfterFieldEnd and long errorMssage",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "Long elementAfterFieldEnd and long errorMssage with no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },

    {
        name: "elementAfterFieldEnd with readOnlyMessage",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: "Message about the read only state",
        },
    },
    {
        name: "elementAfterFieldEnd with long readOnlyMessage",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: reallyLongText,
        },
    },
    {
        name: "elementAfterFieldEnd with long readOnlyMessage and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            elementAfterFieldEnd: "End Helper Text",
            readOnlyMessage: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "Long readOnlyMessage and long elementAfterFieldEnd",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "Long readOnlyMessage and long elementAfterFieldEnd with no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "elementBeforeFieldStart",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
        },
    },
    {
        name: "elementBeforeFieldEnd",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldEnd: "End helper text",
        },
    },
    {
        name: "elementAfterFieldStart",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldStart: "Start helper text",
        },
    },
    {
        name: "elementAfterFieldEnd",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "All helper text",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
            elementBeforeFieldEnd: "End helper text",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "All helper text with long text",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: reallyLongText,
            elementBeforeFieldEnd: reallyLongText,
            elementAfterFieldStart: reallyLongText,
            elementAfterFieldEnd: reallyLongText,
        },
    },
    {
        name: "All helper text with long text and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: reallyLongTextWithNoWordBreak,
            elementBeforeFieldEnd: reallyLongTextWithNoWordBreak,
            elementAfterFieldStart: reallyLongTextWithNoWordBreak,
            elementAfterFieldEnd: reallyLongTextWithNoWordBreak,
        },
    },
    {
        name: "All helper text with field in disabled state",
        props: {
            field: <TextField value="" onChange={() => {}} disabled={true} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
            elementBeforeFieldEnd: "End helper text",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
        },
    },
    {
        name: "All helper text with field in error state",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            elementBeforeFieldStart: "Start helper text",
            elementBeforeFieldEnd: "End helper text",
            elementAfterFieldStart: "Start helper text",
            elementAfterFieldEnd: "End helper text",
            errorMessage: "Message about the error",
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
