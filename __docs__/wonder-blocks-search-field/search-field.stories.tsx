import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import SearchField from "@khanacademy/wonder-blocks-search-field";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";
import SearchFieldArgtypes from "./search-field.argtypes";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

/**
 * `SearchField` helps users input text to search for relevant content. It is
 * commonly used in search bars and search forms.
 *
 * Make sure to provide a label for the field. This can be done by either:
 * - (recommended) Using the **LabeledField** component to provide a label,
 * description, and/or error message for the field
 * - Using a `label` html tag with the `htmlFor` prop set to the unique id of
 * the field
 * - Using an `aria-label` attribute on the field
 * - Using an `aria-labelledby` attribute on the field
 *
 * ### Usage
 *
 * ```tsx
 * import {SearchField} from "@khanacademy/wonder-blocks-search-field";
 *
 * const [value, setValue] = React.useState("");
 *
 * const handleChange = (newValue: string) => {
 *     setValue(newValue);
 * };
 *
 * <SearchField
 *     id="some-id"
 *     value={value}
 *     onChange={handleChange}
 * />
 * ```
 */
export default {
    component: SearchField,
    title: "Packages / SearchField",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: SearchFieldArgtypes,
} as Meta<typeof SearchField>;

type StoryComponentType = StoryObj<typeof SearchField>;

const Template = (
    storyArgs: PropsFor<typeof SearchField> & {label?: string},
) => {
    const {label, ...args} = storyArgs;
    const [value, setValue] = React.useState(args?.value || "");
    const [errorMessage, setErrorMessage] = React.useState<
        string | null | undefined
    >("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View>
            <LabeledField
                label={label || "Search Field"}
                field={
                    <SearchField
                        {...args}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            action("onKeyDown")(e);
                            handleKeyDown(e);
                        }}
                        onValidate={setErrorMessage}
                    />
                }
                errorMessage={
                    errorMessage || (args.error && "Error from error prop")
                }
            />
        </View>
    );
};

/**
 * The default SearchField component, which is composed by a `TextField` with a
 * search icon on its left side and an X icon on its right side.
 */
export const Default: StoryComponentType = {
    args: {
        placeholder: "Search",
    },
    render: Template,
};

/**
 * The field can be used with the LabeledField component to provide a label,
 * description, required indicator, and/or error message for the field.
 *
 * Using the field with the LabeledField component will ensure that the field
 * has the relevant accessibility attributes set.
 */
export const WithLabeledField: StoryComponentType = {
    render: function LabeledFieldStory(args) {
        const [value, setValue] = React.useState(args.value || "");
        const [errorMessage, setErrorMessage] = React.useState<
            string | null | undefined
        >();
        return (
            <LabeledField
                label="Label"
                field={
                    <SearchField
                        {...args}
                        value={value}
                        onChange={setValue}
                        onValidate={setErrorMessage}
                    />
                }
                description="Description"
                errorMessage={errorMessage}
            />
        );
    },
    parameters: {
        chromatic: {
            // Disabling because this is for documentation purposes and is
            // covered by the LabeledField stories
            disableSnapshot: true,
        },
    },
};

/**
 * SearchField takes a `disabled` prop, which makes it unusable. Try to avoid
 * using this if possible as it is bad for accessibility.
 */
export const Disabled: StoryComponentType = {
    render: function Render() {
        const [value, setValue] = React.useState("");

        const handleChange = (newValue: string) => {
            setValue(newValue);
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>,
        ) => {
            if (event.key === "Enter") {
                event.currentTarget.blur();
            }
        };

        return (
            <SearchField
                value={value}
                placeholder="Placeholder"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={true}
            />
        );
    },
};

/**
 * SearchField takes an `autoFocus` prop, which makes it autofocus on page load.
 * Try to avoid using this if possible as it is bad for accessibility.
 *
 * Press the button to view this example. Notice that the search field
 * automatically receives focus. Upon pressing the botton, try typing and notice
 * that the text appears directly in the search field. There is another
 * focusable element present to demonstrate that focus skips that element and
 * goes straight to the search field.
 */
export const WithAutofocus: StoryComponentType = {
    render: function Render() {
        const [value, setValue] = React.useState("");
        const [showDemo, setShowDemo] = React.useState(false);

        const handleChange = (newValue: string) => {
            setValue(newValue);
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>,
        ) => {
            if (event.key === "Enter") {
                event.currentTarget.blur();
            }
        };

        const handleShowDemo = () => {
            setShowDemo(!showDemo);
        };

        const AutoFocusDemo = () => (
            <View style={{flexDirection: "row"}}>
                <Button onClick={() => {}}>Some other focusable element</Button>
                <SearchField
                    value={value}
                    placeholder="Placeholder"
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    style={{flexGrow: 1, marginLeft: spacing.small_12}}
                />
            </View>
        );

        return (
            <View>
                <LabelLarge style={{marginBottom: spacing.small_12}}>
                    Press the button to view the search field with autofocus.
                </LabelLarge>
                <Button
                    onClick={handleShowDemo}
                    style={{width: 300, marginBottom: spacing.large_24}}
                >
                    Toggle autoFocus demo
                </Button>
                {showDemo && <AutoFocusDemo />}
            </View>
        );
    },
};

/**
 * The SearchField can be put in an error state using the `error` prop.
 */
export const Error: StoryComponentType = {
    args: {
        error: true,
    },
    render: Template,
    parameters: {
        chromatic: {
            // Disabling because this is covered by the All Variants stories
            disableSnapshot: true,
        },
    },
};

/**
 * The SearchField supports `validate`, `onValidate`, and `instantValidation`
 * props.
 *
 * See docs for the TextField component for more details around validation
 * since SearchField uses TextField internally.
 */
export const Validation: StoryComponentType = {
    args: {
        validate(value) {
            if (value.length < 5) {
                return "Too short. Value should be at least 5 characters";
            }
        },
    },
    render: (args) => {
        return (
            <View style={{gap: spacing.small_12}}>
                <Template
                    {...args}
                    label="Validation on mount if there is a value"
                    value="T"
                />
                <Template
                    {...args}
                    label="Error shown immediately (instantValidation: true)"
                    instantValidation={true}
                />
                <Template
                    {...args}
                    label="Error shown onBlur (instantValidation: false)"
                    instantValidation={false}
                />
            </View>
        );
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};
