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
    return <button onClick={() => announceMessage(props)}>{buttonText}</button>;
};
