import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    id?: string;
    testId?: string;
    label: React.ReactNode;
    field: React.ReactElement;
    helperTextAbove?: React.ReactNode;
    helperTextBelow?: React.ReactNode;
};
export const FlexibleLabeledField = (props: Props) => {
    const {label, field, helperTextAbove, helperTextBelow} = props;

    const fieldId = React.useId();
    const helperTextAboveId = React.useId();
    const helperTextBelowId = React.useId();
    const hasError = field.props.error;
    const isDisabled = field.props.disabled;

    function renderField() {
        return React.cloneElement(field, {
            id: fieldId,
            "aria-describedby": [helperTextAboveId, helperTextBelowId]
                .filter(Boolean)
                .join(" "),
        });
    }

    return (
        <View
            style={[
                {gap: sizing.size_080},
                isDisabled && styles.disabledStyling,
            ]}
        >
            <BodyText
                tag="label"
                size="small"
                weight="bold"
                htmlFor={fieldId}
                style={hasError ? styles.errorLabel : undefined}
            >
                {label}
            </BodyText>
            {helperTextAbove && (
                <View id={helperTextAboveId}>{helperTextAbove}</View>
            )}
            {renderField()}
            {helperTextBelow && (
                <View id={helperTextBelowId}>{helperTextBelow}</View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    errorLabel: {
        color: semanticColor.core.foreground.critical.default,
    },
    disabledStyling: {
        color: semanticColor.core.foreground.disabled.strong,
    },
});
