import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Form / Overview", // Named the same as overiew docs to hide it from the sidebar
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            // Disabling because this is used for documentation purposes
            disableSnapshot: true,
        },
    },
    tags: [
        "!dev", // Hide individual stories from sidebar so they are only shown in the docs page.
    ],
};

/**
 * An example of a form field label using Wonder Blocks components `LabelMedium`
 * and `TextArea`.
 */
export const FormLabelExample = () => {
    const [value, setValue] = React.useState("");
    return (
        <View style={styles.container}>
            <LabelMedium tag="label" htmlFor="description-field">
                Description
            </LabelMedium>
            <TextArea
                value={value}
                onChange={(value) => setValue(value)}
                id="description-field"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.xSmall_8,
    },
});
