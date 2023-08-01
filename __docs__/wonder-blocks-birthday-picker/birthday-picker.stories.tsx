import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";

import packageConfig from "../../packages/wonder-blocks-birthday-picker/package.json";
import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";

import ComponentInfo from "../../.storybook/components/component-info";

import ArgTypes from "./birthday-picker.argtypes";

type StoryComponentType = StoryObj<typeof BirthdayPicker>;

const meta: Meta<typeof BirthdayPicker> = {
    title: "BirthdayPicker",
    component: BirthdayPicker,
    argTypes: ArgTypes,
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
};

export default meta;

/**
 * Default BirthdayPicker example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
export const BirthdayPickerDefault: StoryComponentType = {
    args: {
        onChange: () => {},
        defaultValue: "",
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const BirthdayPickerWithDefaultValue: StoryComponentType = {
    args: {
        onChange: () => {},
        defaultValue: "2021-07-19",
    },
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
        docs: {
            description: {
                story: "This component is empty by default, but we can pass in a defined birthday by using the `defaultValue` prop.",
            },
        },
    },
};

export const InvalidBirthdayPicker: StoryComponentType = {
    args: {
        onChange: () => {},
        defaultValue: "2030-07-19",
    },
    parameters: {
        docs: {
            description: {
                story: "In case the birthday is invalid, we display an error message indicating this problem.",
            },
        },
    },
};

export const BirthdayPickerWithCustomLabels: StoryComponentType = {
    args: {
        onChange: () => {},
        defaultValue: "",
        labels: {
            day: "Día",
            month: "Mes",
            year: "Año",
            errorMessage: "Por favor seleccione una fecha válida.",
        },
    },
    parameters: {
        docs: {
            description: {
                story: "We can pass custom labels to the component. This can be helpful when we need to pass in translated strings. The default labels are: `Day`, `Month`, `Year` used as placeholders and 'Please select a valid birthdate.' to indicate an `errorMessage` when the validation fails. For more info about how to use this, refer to the `labels` prop in the Props table documentation above.",
            },
        },
    },
};

export const DisabledBirthdayPicker: StoryComponentType = {
    args: {
        onChange: () => {},
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: "A BirthdayPicker can be disabled by passing the `disabled` prop. This will disable all the dropdown controls and prevent them from being interacted with.",
            },
        },
    },
};

export const BirthdayPickerWithYearAndMonthOnly: StoryComponentType = {
    args: {
        monthYearOnly: true,
        onChange: (date?: string | null) => {
            // eslint-disable-next-line no-console
            console.log("Date selected: ", date);
        },
    },
    parameters: {
        docs: {
            description: {
                story: "A BirthdayPicker can be configured to only show the year and month dropdowns. This can be useful when we want to display and collect a birthday that doesn't require the full DOB for privacy reasons.",
            },
        },
    },
};
