import * as React from "react";
import {Meta} from "@storybook/react";
import {HelperText} from "../../packages/wonder-blocks-labeled-field/src/components/helper-text";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-labeled-field/package.json";
import {View} from "@khanacademy/wonder-blocks-core";
import {ErrorHelperText} from "../../packages/wonder-blocks-labeled-field/src/components/error-helper-text";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {ReadOnlyHelperText} from "../../packages/wonder-blocks-labeled-field/src/components/read-only-helper-text";
import {FlexibleLabeledField} from "../../packages/wonder-blocks-labeled-field/src/components/flexible-labeled-field";
import TextField from "../../packages/wonder-blocks-form/src/components/text-field";

export default {
    title: "Packages / LabeledField / FlexibleLabeledFieldTesting",
    component: FlexibleLabeledField,
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
} as Meta<typeof FlexibleLabeledField>;

export const Props = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} />,
        helperTextAbove: <HelperText message="Helper text above" />,
        helperTextBelow: <HelperText message="Helper text below" />,
    },
};
/**
 * If the field has error=true, we change the label styling to red
 */
export const ErrorMessage = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} error={true} />, // <-- NOTE: need to explicitly pass in error={true}
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: <ErrorHelperText message="Helper text" show={true} />, // <-- NOTE: ErrorHelperText has a mandatory show prop so that even when it is not visible, the aria-live region can still be there. This is needed for it work more nicely with SRs
    },
};

export const ReadOnlyMessage = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} readOnly={true} />, // <-- NOTE:need to explicitly pass in readOnly={true}
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: <ReadOnlyHelperText message="Helper text" />,
    },
};

export const AnyMessageBelow = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} />,
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: <HelperText message="Helper text under field" />,
    },
};

export const HelperTextInCorners = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} />,
        helperTextAbove: (
            <View
                style={{flexDirection: "row", justifyContent: "space-between"}}
            >
                <HelperText message="Above start helper text" />
                <HelperText message="Above end helper text" />
            </View>
        ),
        helperTextBelow: (
            <View
                style={{flexDirection: "row", justifyContent: "space-between"}}
            >
                <HelperText message="Below start helper text" />
                <HelperText message="Below end helper text" />
            </View>
        ),
    },
};

export const ErrorAndBelowDescription = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} error={true} />,
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: (
            <View style={{gap: sizing.size_040}}>
                <HelperText message="Helper text under field" />
                <ErrorHelperText message="Error helper text" show={true} />
            </View>
        ),
    },
};

export const ErrorAndBelowDescriptionWithCount = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} error={true} />,
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: (
            <View
                style={{flexDirection: "row", justifyContent: "space-between"}}
            >
                <View style={{gap: sizing.size_040}}>
                    <HelperText message="Helper text under field" />
                    <ErrorHelperText message="Error helper text" show={true} />
                </View>
                {/* NOTE:If we want this to be red when there is an error, consumers will have to do this manually. Unless we make all helper text red if there's an error */}
                <HelperText message="1/3" />
            </View>
        ),
    },
};

export const DisabledStyling = {
    args: {
        label: "Label",
        field: <TextField value="Value" onChange={() => {}} disabled={true} />,
        helperTextAbove: <HelperText message="Helper text" />,
        helperTextBelow: (
            <View
                style={{flexDirection: "row", justifyContent: "space-between"}}
            >
                <View style={{gap: sizing.size_040}}>
                    <HelperText message="Helper text under field" />
                    <ErrorHelperText message="Error helper text" show={true} />
                </View>
                <HelperText message="1/3" />
            </View>
        ),
    },
};
