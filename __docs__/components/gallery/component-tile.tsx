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
        <View style={styles.tile}>
            <Clickable href={href} target="_blank" style={styles.clickable}>
                {() => (
                    <>
                        <View style={styles.description}>
                            <View style={styles.name}>
                                <HeadingMedium tag="h4">{name}</HeadingMedium>
                            </View>
                            {description && (
                                <Body style={styles.descriptionText}>
                                    {description}
                                </Body>
                            )}
                        </View>
                    </>
                )}
            </Clickable>
            <View style={styles.componentView}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        display: "flex",
        flexDirection: "column",
        margin: tokens.spacing.xSmall_8,
        // Set the width to half the max width of the stories page content.
        width: 484,
        minHeight: 300,
    },
    clickable: {
        backgroundColor: tokens.color.offWhite,
        border: `1px solid ${tokens.color.offBlack16}`,
        borderStartStartRadius: tokens.spacing.small_12,
        borderStartEndRadius: tokens.spacing.small_12,

        ":hover": {
            border: `1px solid ${tokens.color.blue}`,
            outline: `1px solid ${tokens.color.blue}`,
        },

        ":focus": {
            border: `1px solid ${tokens.color.blue}`,
            outline: `1px solid ${tokens.color.blue}`,
        },
    },
    description: {
        padding: tokens.spacing.large_24,
    },
    name: {
        width: "fit-content",
    },
    descriptionText: {
        marginTop: tokens.spacing.small_12,
    },
    componentView: {
        flexDirection: "column",
        justifyContent: "center",
        padding: tokens.spacing.large_24,
        border: `1px solid ${tokens.color.offBlack16}`,
        borderTop: "none",
        borderEndStartRadius: tokens.spacing.small_12,
        borderEndEndRadius: tokens.spacing.small_12,
        flexGrow: 1,
    },
});
