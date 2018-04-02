// @flow
import React from "react";
import {storiesOf} from "@storybook/react";

import Color from "./index.js";


const ColoredTextWithBackground = ({textColor, backgroundColor}: {
    textColor: string,
    backgroundColor?: string,
}) => <div style={{
    color: textColor,
    backgroundColor: backgroundColor || Color.white,
    padding: 10,
}}>
    Hello world!
</div>;

const ColorWithName = ({colorName, color}: {
    colorName: string,
    color: string,
}) => {
    return <div
    style={{
        display: "flex",
        alignItems: "center",
        height: 40,
    }}
>
    <div style={{width: 100}}>{colorName}:</div>
    <div style={{
        backgroundColor: color,
        width: 30,
        height: 30,
        marginRight: 10,
    }} />
    <ColoredTextWithBackground textColor={color}/>
    <ColoredTextWithBackground textColor={color} backgroundColor={Color.offWhite} />
    <ColoredTextWithBackground textColor={color} backgroundColor={Color.offBlack64} />
    <ColoredTextWithBackground textColor={color} backgroundColor={Color.darkBlue} />
</div>};

storiesOf("Color", module)
    .addWithJSX("All colors", () =>
        <div>
            {
                Object.keys(Color).map((colorName, idx) =>
                    <ColorWithName
                        key={idx}
                        color={Color[colorName]}
                        colorName={colorName}
                    />)
            }
        </div>);
