import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    children: React.ReactNode;
};

/**
 * Component that renders a placeholder block. It is useful for visualizing
 * layouts.
 */
export const Placeholder = (props: Props) => {
    const {children} = props;
    return (
        <View
            style={{
                backgroundColor: semanticColor.surface.secondary,
                padding: sizing.size_120,
                margin: sizing.size_010,
                border: `${border.width.thin}px dashed ${semanticColor.border.neutral.subtle}`,
                width: "100%",
                alignItems: "center",
            }}
        >
            {children}
        </View>
    );
};
