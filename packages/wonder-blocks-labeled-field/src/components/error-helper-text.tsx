import * as React from "react";
import WarningCircle from "@phosphor-icons/core/bold/warning-circle-bold.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {HelperText} from "./helper-text";
import theme from "../theme";

type Props = {
    message?: React.ReactNode;
    id?: string;
    testId?: string;
    show: boolean;
    iconAriaLabel?: string;
};

export const ErrorHelperText = (props: Props) => {
    const {message, id, testId, show, iconAriaLabel = "Error: "} = props;

    return (
        <HelperText
            id={id}
            testId={testId}
            styles={{root: {color: theme.error.color.foreground}}}
            message={show && message}
            icon={
                show && (
                    <PhosphorIcon
                        icon={WarningCircle}
                        aria-label={iconAriaLabel}
                    />
                )
            }
            // We use aria-live="assertive" for the error so that it is
            // immediately announced and the user can address the issue
            // before submitting the form. We use aria-live=assertive
            // instead of role=alert because Safari + VoiceOver would
            // not read out the error when focused on if the element
            // referenced by the aria-describedby had role="alert".
            aria-live="assertive"
            // We add aria-atomic=true so that any updates to the error
            // is announced
            aria-atomic="true"
        />
    );
};
