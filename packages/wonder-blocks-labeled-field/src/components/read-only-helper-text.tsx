import * as React from "react";
import LockIcon from "@phosphor-icons/core/bold/lock-bold.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {HelperText} from "./helper-text";

type Props = {
    message: React.ReactNode;
    iconAriaLabel?: string;
};

export const ReadOnlyHelperText = (props: Props) => {
    const {message, iconAriaLabel} = props;

    return (
        <HelperText
            message={message}
            icon={
                <PhosphorIcon
                    icon={LockIcon}
                    aria-label={iconAriaLabel}
                    color={semanticColor.core.foreground.neutral.subtle}
                />
            }
        />
    );
};
