import type {ArgTypes} from "@storybook/react";

export default {
    title: {
        description:
            "The title / main content of the cell. You can either provide a string or a Typography component. If a string is provided, typography defaults to `LabelLarge`.",
        type: {
            name: "union",
            value: [
                {name: "string"},
                {name: "other", value: "React.ReactElement<Typography>"},
            ],
            required: true,
        },
        table: {
            type: {
                summary: "TypographyText",
                detail: "string | React.Element<Typography>",
            },
        },
    },
} satisfies ArgTypes;
