// @flow
import * as React from "react";

import Color from "./index.js";
import ColoredTextWithBackground from "./colored-text-with-background.js";

type Props = {
    colorName: string,
    color: string,
};

const ColorWithName = ({colorName, color}: Props) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                minHeight: 40,
            }}
        >
            <div style={{width: 250, paddingRight: 10, textAlign: "right"}}>
                {colorName}:
            </div>
            <div
                style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    border: `1px solid ${Color.offBlack}`,
                }}
            />
            <ColoredTextWithBackground textColor={color} />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offWhite}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.offBlack64}
            />
            <ColoredTextWithBackground
                textColor={color}
                backgroundColor={Color.darkBlue}
            />
        </div>
    );
};

export {ColorWithName as default};
