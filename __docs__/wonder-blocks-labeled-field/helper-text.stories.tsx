import * as React from "react";
import {Meta} from "@storybook/react";
import CookieIcon from "@phosphor-icons/core/regular/cookie.svg";
import {HelperText} from "../../packages/wonder-blocks-labeled-field/src/components/helper-text";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-labeled-field/package.json";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ErrorHelperText} from "../../packages/wonder-blocks-labeled-field/src/components/error-helper-text";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {ReadOnlyHelperText} from "../../packages/wonder-blocks-labeled-field/src/components/read-only-helper-text";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

export default {
    title: "Packages / LabeledField / HelperText",
    component: HelperText,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling snapshots for all stories by default because the testing
            // snapshots cover the different scenarios
            disableSnapshot: true,
        },
    },
} as Meta<typeof HelperText>;

export const Default = {
    render: (args: PropsFor<typeof HelperText>) => {
        return (
            <View style={{gap: sizing.size_160}}>
                <HelperText message="Custom Helper text" />
                <HelperText
                    message="Custom helper text with icon"
                    icon={<PhosphorIcon icon={CookieIcon} />}
                />
                <ErrorHelperText message="Error helper text" show={true} />
                <ReadOnlyHelperText message="Read only helper text" />
            </View>
        );
    },
};
