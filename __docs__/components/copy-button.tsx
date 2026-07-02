import * as React from "react";
import CopyIcon from "@phosphor-icons/core/bold/copy-bold.svg";
import CheckIcon from "@phosphor-icons/core/bold/check-bold.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {IconButtonProps} from "../../packages/wonder-blocks-icon-button/src/util/icon-button.types";
import {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    value: string;
    kind?: IconButtonProps["kind"];
    style?: StyleType;
};

export const CopyButton = (props: Props) => {
    const {kind = "tertiary", style} = props;
    const [showCheckmark, setShowCheckmark] = React.useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(props.value);
        // eslint-disable-next-line no-console -- intentionally log. TODO(WB-2055): Once we have toasts, we can replace this with a toast notification.
        console.log("Copied to clipboard:", props.value);
        announceMessage({message: `Copied to clipboard: ${props.value}`});

        // Temporarily show visual feedback that the copy was successful.
        setShowCheckmark(true);
        setTimeout(() => {
            setShowCheckmark(false);
        }, 3000);
    };

    return (
        <IconButton
            onClick={handleClick}
            icon={showCheckmark ? CheckIcon : CopyIcon}
            size="xsmall"
            kind={kind}
            actionType="neutral"
            aria-label={`Copy to clipboard: ${props.value}`}
            style={style}
        />
    );
};
