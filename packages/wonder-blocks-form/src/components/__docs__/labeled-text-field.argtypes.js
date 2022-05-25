// @flow

export default {
    id: {
        description: `An optional unique identifier for the TextField.
        If no id is specified, a unique id will be auto-generated.`,
        type: {required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
};
