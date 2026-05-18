import * as React from "react";
import Button from "@khanacademy/wonder-blocks-button";
import {announceMessage} from "../../announce-message";
import {type AnnounceMessageProps} from "../../announce-message";

type AnnounceMessageButtonProps = {
    buttonText?: string;
} & AnnounceMessageProps;

export const AnnounceMessageButton = (props: AnnounceMessageButtonProps) => {
    const {buttonText = "Click"} = props;
    const announceProps = {
        initialTimeout: 0,
        ...props,
    };
    return (
        <Button onClick={() => announceMessage(announceProps)}>
            {buttonText}
        </Button>
    );
};
