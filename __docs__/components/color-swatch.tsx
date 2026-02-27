import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * A color swatch component that displays a color. Also shows a pattern
 * background when a color has transparency.
 */
export const ColorSwatch = ({backgroundColor}: {backgroundColor: string}) => {
    return (
        <View
            style={{
                backgroundImage: `radial-gradient(${semanticColor.core.foreground.neutral.subtle} ${sizing.size_010}, ${semanticColor.core.background.base.default} ${sizing.size_010})`,
                backgroundSize: `${sizing.size_200} ${sizing.size_200}`,
                boxShadow: `0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
                width: "fit-content",
            }}
        >
            <View
                style={{
                    backgroundColor: backgroundColor,
                    boxShadow: `inset 0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
                    padding: sizing.size_080,
                    width: sizing.size_800,
                    height: sizing.size_360,
                }}
            >
                &nbsp;
            </View>
        </View>
    );
};
