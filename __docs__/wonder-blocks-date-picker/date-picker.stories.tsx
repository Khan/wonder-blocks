import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";

import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../components/component-info";
import DatePickerArgTypes from "./date-picker.argtypes";

type StoryComponentType = StoryObj<typeof DatePicker>;

export default {
    title: "Packages / DatePicker",
    component: DatePicker,
    argTypes: DatePickerArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
} as Meta<typeof DatePicker>;

/**
 * The most basic DatePicker has simple contents as `children`.
 */
export const DefaultDatePicker: StoryComponentType = {
    render: (args) => (
        <DatePicker styles={{root: styles.datePicker}} {...args}>
            <Heading>Some Contents</Heading>
            <BodyText>This is a basic DatePicker.</BodyText>
        </DatePicker>
    ),
    parameters: {},
};

const styles = StyleSheet.create({});
