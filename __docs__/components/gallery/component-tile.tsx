import * as React from "react";
import {StyleSheet} from "aphrodite";
import externalLinkIcon from "@phosphor-icons/core/bold/arrow-square-out-bold.svg";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
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
            <Clickable
                href={href}
                target="_blank"
                style={styles.clickable}
                aria-label={`View ${name} component in a new tab.`}
            >
                {() => (
                    <>
                        <View style={styles.description}>
                            <View style={styles.headingContainer}>
                                <HeadingMedium tag="h4">{name}</HeadingMedium>
                                <View style={styles.externalLinkIcon}>
                                    <PhosphorIcon
                                        icon={externalLinkIcon}
                                        size="small"
                                        aria-hidden="true"
                                    />
                                </View>
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

const mobile = "@media (max-width: 1023px)";

const styles = StyleSheet.create({
    tile: {
        display: "flex",
        flexDirection: "column",
        margin: tokens.spacing.xSmall_8,
        // Set the width to half the max width of the stories page content.
        width: 484,
        minHeight: 300,

        [mobile]: {
            width: "95%",
        },
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
    headingContainer: {
        width: "fit-content",
        flexDirection: "row",
        alignItems: "center",
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

        [mobile]: {
            overflowX: "scroll",
        },
    },
    externalLinkIcon: {
        marginLeft: tokens.spacing.xSmall_8,
    },
});
