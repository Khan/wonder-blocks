import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import SearchField from "@khanacademy/wonder-blocks-search-field";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";
import SearchFieldArgtypes from "./search-field.argtypes";
import {Strut} from "@khanacademy/wonder-blocks-layout";

/**
 * `SearchField` helps users input text to search for relevant content. It is
 * commonly used in search bars and search forms.
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

const Template = (args: PropsFor<typeof SearchField>) => {
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
            {(errorMessage || args.error) && (
                <>
                    <Strut size={spacing.xSmall_8} />
                    <LabelSmall style={styles.errorMessage}>
                        {errorMessage || "Error from error prop"}
                    </LabelSmall>
                </>
            )}
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
 * SearchField takes a `light` prop, which gives it an extra white ring on focus
 * to make it visible against a dark background.
 */
export const Light: StoryComponentType = {
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
            <View style={styles.darkBackground}>
                <SearchField
                    value={value}
                    placeholder="Placeholder"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    light={true}
                />
            </View>
        );
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
                <LabelSmall htmlFor="instant-validation-true">
                    Validation on mount if there is a value
                </LabelSmall>
                <Template {...args} id="instant-validation-true" value="T" />
                <LabelSmall htmlFor="instant-validation-true">
                    Error shown immediately (instantValidation: true)
                </LabelSmall>
                <Template
                    {...args}
                    id="instant-validation-true"
                    instantValidation={true}
                />
                <LabelSmall htmlFor="instant-validation-false">
                    Error shown onBlur (instantValidation: false)
                </LabelSmall>
                <Template
                    {...args}
                    id="instant-validation-false"
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

const styles = StyleSheet.create({
    darkBackground: {
        background: color.darkBlue,
        padding: spacing.medium_16,
    },
    errorMessage: {
        color: color.red,
        paddingLeft: spacing.xxxSmall_4,
    },
});
