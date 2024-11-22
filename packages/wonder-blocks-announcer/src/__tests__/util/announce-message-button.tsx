import * as React from "react";
// TODO: fix dupMap.get is not a function issue
// import Button from "@khanacademy/wonder-blocks-button";
import {announceMessage} from "../../announce-message";
import {type AnnounceMessageProps} from "../../announce-message";

type AnnounceMessageButtonProps = {
    buttonText?: string;
} & AnnounceMessageProps;

export const AnnounceMessageButton = (props: AnnounceMessageButtonProps) => {
    const {buttonText = "Click"} = props;
    // add timeoutDelay: 0 to skip browser setTimeout in Jest tests
    return <button onClick={() => announceMessage({timeoutDelay: 0, ...props})}>
        {buttonText}
    </button>;
};
