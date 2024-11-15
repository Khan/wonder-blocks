import * as React from "react";
// TODO: fix dupMap.get is not a function issue
// import Button from "@khanacademy/wonder-blocks-button";
import {sendMessage, type SendMessageProps} from "../index";

type SendMessageButtonProps = {
    buttonText?: string;
} & SendMessageProps;

export const SendMessageButton = (props: SendMessageButtonProps) => {
    const {buttonText = "Click"} = props;
    return <button onClick={() => sendMessage(props)}>{buttonText}</button>;
};
