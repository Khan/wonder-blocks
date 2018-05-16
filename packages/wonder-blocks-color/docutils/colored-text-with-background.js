// @flow
import * as React from "react";

import Color from "./../index.js";

type Props = {
    textColor: string,
    backgroundColor?: string,
};

const ColoredTextWithBackground = (props: Props) => (
    <div
        style={{
            color: props.textColor,
            backgroundColor: props.backgroundColor || Color.white,
            padding: 10,
        }}
    >
        Hello world!
    </div>
);

export {ColoredTextWithBackground as default};
