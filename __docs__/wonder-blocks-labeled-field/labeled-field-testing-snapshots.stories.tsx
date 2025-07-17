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
            contextLabel: "Context label",
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
            additionalHelperMessage: "Additional helper message",
            readOnlyMessage: "Read only message",
            contextLabel: "Context label",
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
            additionalHelperMessage: (
                <span>
                    <b>Additional</b> <i>helper</i> <u>message</u>
                </span>
            ),
            contextLabel: (
                <span>
                    <b>Context</b> <i>label</i> <u>example</u>
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
            readOnlyMessage: "Message about the read only state",
            additionalHelperMessage: "Additional helper message",
            contextLabel: "Context label",
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
                additionalHelperMessage: {
                    paddingBlockStart: sizing.size_020,
                },
                contextLabel: {
                    paddingInlineEnd: sizing.size_200,
                },
            },
        },
    },
    {
        name: "With disabled field",
        props: {
            field: <TextField value="Value" onChange={() => {}} disabled />,
            label: "Name",
            description: "Helpful description text.",
            additionalHelperMessage: "Additional helper message",
            contextLabel: "Context label",
        },
    },
    {
        name: "All properties disabled",
        props: {
            field: <TextField value="Value" onChange={() => {}} disabled />,
            label: "Name",
            description: "Helpful description text.",
            errorMessage: "Message about the error",
            additionalHelperMessage: "Additional helper message",
            readOnlyMessage: "Read only message",
            contextLabel: "Context label",
        },
    },
    {
        name: "All properties disabled without error",
        props: {
            field: <TextField value="Value" onChange={() => {}} disabled />,
            label: "Name",
            description: "Helpful description text.",
            additionalHelperMessage: "Additional helper message",
            readOnlyMessage: "Read only message",
            contextLabel: "Context label",
        },
    },
    {
        name: "With read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: "Message about why it is read only",
        },
    },
    {
        name: "With long read only message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
            readOnlyMessage: longText,
        },
    },
    {
        name: "With long read only message and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            description: "Helpful description text.",
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
            readOnlyMessage: "Message about the read only state",
        },
    },
    {
        name: "Additional helper message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            additionalHelperMessage: "Additional helper message",
        },
    },
    {
        name: "Long additional helper message",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            additionalHelperMessage: longText,
        },
    },
    {
        name: "Long additional helper message and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            additionalHelperMessage: longTextWithNoWordBreak,
        },
    },
    {
        name: "With context label",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            contextLabel: "Context label",
        },
    },
    {
        name: "With long label and long context label",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: longText,
            contextLabel: longText,
        },
    },
    {
        name: "With long label and long context label and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: longTextWithNoWordBreak,
            contextLabel: longTextWithNoWordBreak,
        },
    },
    {
        name: "With long label and short context label",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: longText,
            contextLabel: "Context",
        },
    },
    {
        name: "With long label with no word break and short context label",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: longTextWithNoWordBreak,
            contextLabel: "Context",
        },
    },
    {
        name: "With short label and long context label",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            contextLabel: longText,
        },
    },
    {
        name: "With short label and long context label and no word break",
        props: {
            field: <TextField value="" onChange={() => {}} />,
            label: "Name",
            contextLabel: longTextWithNoWordBreak,
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
        <View>
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
