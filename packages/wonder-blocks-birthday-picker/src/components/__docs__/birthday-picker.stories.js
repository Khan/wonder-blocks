// @flow
import * as React from "react";
import {expect, jest} from "@storybook/jest";
import {userEvent, screen} from "@storybook/testing-library";

import {View} from "@khanacademy/wonder-blocks-core";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

import ArgTypes from "./birthday-picker.argtypes.js";
import BirthdayPicker from "../birthday-picker.js";

export default {
    title: "BirthdayPicker",
    component: BirthdayPicker,
    argTypes: ArgTypes,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
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
    decorators: [(Story: any): React.Node => <View>{Story()}</View>],
};

/**
 * Default BirthdayPicker example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
const Template = (args) => <BirthdayPicker {...args} />;

export const BirthdayPickerDefault: StoryComponentType = Template.bind({});
// $FlowIgnore[incompatible-use]
BirthdayPickerDefault.play = async ({args, canvasElement}) => {
    // Arrange
    await userEvent.click(screen.getByTestId("birthday-picker-month"));
    const monthOption = screen.getByRole("option", {
        name: "Jul",
    });
    await userEvent.click(monthOption, undefined, {
        skipPointerEventsCheck: true,
    });

    await userEvent.click(screen.getByTestId("birthday-picker-day"));
    const dayOption = screen.getByRole("option", {name: "5"});
    await userEvent.click(dayOption, undefined, {
        skipPointerEventsCheck: true,
    });

    await userEvent.click(screen.getByTestId("birthday-picker-year"));
    const yearOption = screen.getByRole("option", {
        name: "2021",
    });
    await userEvent.click(yearOption, undefined, {
        skipPointerEventsCheck: true,
    });

    // Act
    // Pick Another Date
    await userEvent.click(screen.getByTestId("birthday-picker-month"));
    const monthOptionNew = screen.getByRole("option", {
        name: "Aug",
    });
    await userEvent.click(monthOptionNew, undefined, {
        skipPointerEventsCheck: true,
    });

    await userEvent.click(screen.getByTestId("birthday-picker-day"));
    const dayOptionNew = screen.getByRole("option", {name: "9"});
    await userEvent.click(dayOptionNew, undefined, {
        skipPointerEventsCheck: true,
    });

    await userEvent.click(screen.getByTestId("birthday-picker-year"));
    const yearOptionNew = screen.getByRole("option", {
        name: "2020",
    });
    await userEvent.click(yearOptionNew, undefined, {
        skipPointerEventsCheck: true,
    });

    // Assert
    await expect(args.onChange).toHaveBeenLastCalledWith("2020-08-09");
};

BirthdayPickerDefault.args = {
    onChange: jest.fn().mockName("onChange"),
    defaultValue: "",
};

BirthdayPickerDefault.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

export const BirthdayPickerWithDefaultValue: StoryComponentType = Template.bind(
    {},
);

BirthdayPickerWithDefaultValue.args = {
    onChange: () => {},
    defaultValue: "2021-07-19",
};

BirthdayPickerWithDefaultValue.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
    docs: {
        storyDescription:
            "This component is empty by default, but we can pass in a defined birthday by using the `defaultValue` prop.",
    },
};

export const InvalidBirthdayPicker: StoryComponentType = Template.bind({});

InvalidBirthdayPicker.args = {
    onChange: () => {},
    defaultValue: "2030-07-19",
};

InvalidBirthdayPicker.parameters = {
    docs: {
        storyDescription:
            "In case the birthday is invalid, we display an error message indicating this problem.",
    },
};

export const BirthdayPickerWithCustomLabels: StoryComponentType = Template.bind(
    {},
);

BirthdayPickerWithCustomLabels.args = {
    onChange: () => {},
    defaultValue: "",
    labels: {
        day: "Día",
        month: "Mes",
        year: "Año",
        errorMessage: "Por favor seleccione una fecha válida.",
    },
};

BirthdayPickerWithCustomLabels.parameters = {
    docs: {
        storyDescription:
            "We can pass custom labels to the component. This can be helpful when we need to pass in translated strings. The default labels are: `Day`, `Month`, `Year` used as placeholders and 'Please select a valid birthdate.' to indicate an `errorMessage` when the validation fails. For more info about how to use this, refer to the `labels` prop in the Props table documentation above.",
    },
};

export const DisabledBirthdayPicker: StoryComponentType = Template.bind({});

DisabledBirthdayPicker.args = {
    onChange: () => {},
    disabled: true,
};

DisabledBirthdayPicker.parameters = {
    docs: {
        storyDescription:
            "A BirthdayPicker can be disabled by passing the `disabled` prop. This will disable all the dropdown controls and prevent them from being interacted with.",
    },
};

export const BirthdayPickerWithYearAndMonthOnly: StoryComponentType =
    Template.bind({});

BirthdayPickerWithYearAndMonthOnly.args = {
    monthYearOnly: true,
    onChange: (date: ?string) => {
        // eslint-disable-next-line no-console
        console.log("Date selected: ", date);
    },
};

BirthdayPickerWithYearAndMonthOnly.parameters = {
    docs: {
        storyDescription:
            "A BirthdayPicker can be configured to only show the year and month dropdowns. This can be useful when we want to display and collect a birthday that doesn't require the full DOB for privacy reasons.",
    },
};
