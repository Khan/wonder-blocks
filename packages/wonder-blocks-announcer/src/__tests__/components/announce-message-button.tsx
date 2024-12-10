import * as React from "react";
import {announceMessage} from "../../announce-message";
import {type AnnounceMessageProps} from "../../announce-message";

type AnnounceMessageButtonProps = {
    buttonText?: string;
} & AnnounceMessageProps;

export const AnnounceMessageButton = (props: AnnounceMessageButtonProps) => {
    const {buttonText = "Click"} = props;
    return <button onClick={() => announceMessage(props)}>{buttonText}</button>;
};
