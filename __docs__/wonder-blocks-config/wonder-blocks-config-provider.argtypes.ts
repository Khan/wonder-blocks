import type {ArgTypes} from "@storybook/react-vite";

export default {
    i18n: {
        control: {type: "object"},
        table: {
            type: {
                summary: "I18nConfig",
                detail: `{
    // The translated strings that Wonder Blocks components render.
    strings: WonderBlocksStrings;
    // The locale \`strings\` are translated into.
    locale: string;
}`,
            },
        },
    },
    children: {
        control: false,
        table: {
            type: {summary: "React.ReactNode"},
        },
    },
} satisfies ArgTypes;
