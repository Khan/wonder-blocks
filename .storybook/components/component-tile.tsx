import * as React from "react";
import {StyleSheet} from "aphrodite";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {Body, HeadingMedium} from "@khanacademy/wonder-blocks-typography";

type Props = {
    children: React.ReactNode;
    name: string;
    description?: string;
    href: string;
};

export default function ComponentTile(props: Props) {
    const {children, description, name, href} = props;
    return (
        <Clickable href={href} target="_blank" style={styles.tile}>
            {() => (
                <>
                    <View style={styles.description}>
                        <HeadingMedium tag="h3" style={styles.name}>
                            {name}
                        </HeadingMedium>
                        <Body>{description}</Body>
                    </View>
                    <View style={styles.componentView}>{children}</View>
                </>
            )}
        </Clickable>
    );
}

const styles = StyleSheet.create({
    tile: {
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${tokens.color.offBlack16}`,
        borderRadius: tokens.spacing.small_12,
        margin: tokens.spacing.xSmall_8,
        // Set the width to half the max width of the stories page content.
        width: 484,
        minHeight: 300,
        overflow: "hidden",
        backgroundColor: tokens.color.offWhite,

        ":hover": {
            outline: `1px solid ${tokens.color.blue}`,
            border: `1px solid ${tokens.color.blue}`,
        },
    },
    description: {
        padding: tokens.spacing.large_24,
    },
    name: {
        marginBottom: tokens.spacing.small_12,
    },
    componentView: {
        flexDirection: "column",
        justifyContent: "center",
        padding: tokens.spacing.large_24,
        borderTop: `1px solid ${tokens.color.offBlack16}`,
        borderRadius: tokens.spacing.small_12,
        backgroundColor: tokens.color.white,
        flexGrow: 1,
    },
});
