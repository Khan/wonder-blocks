import * as React from "react";
import CopyIcon from "@phosphor-icons/core/bold/copy-bold.svg";
import CheckIcon from "@phosphor-icons/core/bold/check-bold.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";

type Props = {
    value: string;
};

export const CopyButton = (props: Props) => {
    const [showCheckmark, setShowCheckmark] = React.useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(props.value);
        // eslint-disable-next-line no-console -- intentionally log. Once we have toasts, we can replace this with a toast notification.
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
            kind="tertiary"
            actionType="neutral"
            aria-label={`Copy to clipboard: ${props.value}`}
        />
    );
};
