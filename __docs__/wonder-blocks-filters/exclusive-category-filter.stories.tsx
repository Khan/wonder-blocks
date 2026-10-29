import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {action} from "storybook/actions";
import {StyleSheet} from "aphrodite";

import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    ExclusiveCategoryFilter,
    ExclusiveCategoryFilterOption,
} from "@khanacademy/wonder-blocks-filters";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-filters/package.json";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import argTypes from "./exclusive-category-filter.argtypes";

const subjectOptions: ReadonlyArray<ExclusiveCategoryFilterOption> = [
    {value: "all", label: "All"},
    {value: "math", label: "Math"},
    {value: "science", label: "Science"},
    {value: "reading", label: "Reading & vocab"},
];

type StoryComponentType = StoryObj<typeof ExclusiveCategoryFilter>;

/**
 * A controlled wrapper so the stories respond to clicks and arrow keys.
 */
function ControlledFilter(
    args: React.ComponentProps<typeof ExclusiveCategoryFilter>,
) {
    const [selectedValue, setSelectedValue] = React.useState(
        args.selectedValue,
    );

    return (
        <ExclusiveCategoryFilter
            {...args}
            selectedValue={selectedValue}
            onChange={(value) => {
                setSelectedValue(value);
                args.onChange(value);
            }}
        />
    );
}

export default {
    title: "Packages / Filters / ExclusiveCategoryFilter",
    component: ExclusiveCategoryFilter,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    args: {
        label: "Filter by subject",
        options: subjectOptions,
        selectedValue: "all",
        onChange: action("onChange"),
    },
    argTypes,
    render: ControlledFilter,
} as Meta<typeof ExclusiveCategoryFilter>;

/**
 * `ExclusiveCategoryFilter` narrows a list or grid by one category at a time.
 * Exactly one option is always selected, so sets usually start with an "All"
 * option.
 *
 * Use the arrow keys to move between options: focus and selection move
 * together. The component is controlled: keep the selected value in state
 * and update it in `onChange`.
 */
export const Default: StoryComponentType = {};

/**
 * Options can show an icon before the label with `startIcon`.
 *
 * - A Phosphor icon asset is rendered as a decorative icon.
 * - An icon element (`PhosphorIcon` or `Icon`) is rendered as passed. Give it
 *   an `aria-label` when it adds meaning the label doesn't; it then becomes
 *   part of the option's accessible name.
 */
export const WithIcons: StoryComponentType = {
    args: {
        label: "Filter tools by category",
        options: [
            {value: "all", label: "All", startIcon: IconMappings.cookie},
            {
                value: "favorites",
                label: "Tools",
                startIcon: (
                    <PhosphorIcon
                        icon={IconMappings.iceCream}
                        aria-label="Favorite"
                    />
                ),
            },
            {value: "plan", label: "Plan"},
            {value: "create", label: "Create"},
        ],
    },
    parameters: {
        chromatic: {
            // Icons are covered by the snapshot state sheet.
            disableSnapshot: true,
        },
    },
};

/**
 * Options wrap onto more lines when there isn't enough horizontal space.
 * There is no horizontal scrolling.
 */
export const Wrapping: StoryComponentType = {
    args: {
        label: "Filter activities by category",
        options: [
            {value: "all", label: "All"},
            {value: "general", label: "General"},
            {value: "grammar", label: "Grammar & writing"},
            {value: "reading", label: "Reading & vocab"},
            {value: "math", label: "Math"},
            {value: "science", label: "Science"},
            {value: "social", label: "Social studies"},
            {value: "career", label: "College & career"},
        ],
    },
    decorators: [
        (Story) => (
            <View style={styles.narrow}>
                <Story />
            </View>
        ),
    ],
};

type Activity = {id: string; title: string; subject: string};

const activities: ReadonlyArray<Activity> = [
    {id: "1", title: "Fractions practice", subject: "math"},
    {id: "2", title: "Photosynthesis quiz", subject: "science"},
    {id: "3", title: "Vocabulary builder", subject: "reading"},
    {id: "4", title: "Linear equations", subject: "math"},
    {id: "5", title: "States of matter", subject: "science"},
];

const filterActivities = (subject: string) =>
    activities.filter(
        (activity) => subject === "all" || activity.subject === subject,
    );

/**
 * Focus stays on the filter after a change, so screen reader users need to
 * hear that the results changed. The consumer announces the new results with
 * `announceMessage` from `@khanacademy/wonder-blocks-announcer`.
 *
 * The announcement is debounced so arrowing across several options only reads
 * the final result. Render the results right after the filter so `Tab` leads
 * to them.
 */
export const AnnouncingResults: StoryComponentType = {
    render: function Render(args) {
        const [subject, setSubject] = React.useState("all");
        const visible = filterActivities(subject);

        const handleChange = (value: string) => {
            setSubject(value);
            args.onChange(value);
            announceMessage({
                message: `Showing ${filterActivities(value).length} activities`,
                debounceThreshold: 500,
            });
        };

        return (
            <View style={styles.example}>
                <ExclusiveCategoryFilter
                    {...args}
                    selectedValue={subject}
                    onChange={handleChange}
                />
                <View tag="ul" style={styles.list}>
                    {visible.map((activity) => (
                        <BodyText tag="li" key={activity.id}>
                            {activity.title}
                        </BodyText>
                    ))}
                </View>
            </View>
        );
    },
    args: {
        options: subjectOptions.slice(0, 4),
    },
    parameters: {
        chromatic: {
            // This story demonstrates behavior, not visuals.
            disableSnapshot: true,
        },
    },
};

/**
 * Counts can be included in the label text. They are read as written.
 */
export const CountsInLabels: StoryComponentType = {
    args: {
        options: [
            {value: "all", label: "All (12)"},
            {value: "math", label: "Math (5)"},
            {value: "science", label: "Science (4)"},
            {value: "reading", label: "Reading & vocab (3)"},
        ],
    },
    parameters: {
        chromatic: {
            // Visually the same as the Default story.
            disableSnapshot: true,
        },
    },
};

/**
 * When `selectedValue` doesn't match any option, the first option is selected
 * by default. `onChange` is not called in that case.
 */
export const UnknownSelectedValue: StoryComponentType = {
    args: {
        selectedValue: "unknown",
    },
    parameters: {
        chromatic: {
            // Visually the same as the Default story.
            disableSnapshot: true,
        },
    },
};

const styles = StyleSheet.create({
    narrow: {
        maxInlineSize: 360,
    },
    example: {
        gap: sizing.size_160,
    },
    list: {
        margin: 0,
        paddingInlineStart: sizing.size_200,
    },
});
