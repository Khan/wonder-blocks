import * as React from "react";
import {StyleSheet} from "aphrodite";
import externalLinkIcon from "@phosphor-icons/core/bold/arrow-square-out-bold.svg";

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {CommonTileProps} from "./types";
import {Spring} from "@khanacademy/wonder-blocks-layout";

type Props = CommonTileProps & {
    children: React.ReactNode;
    name: string;
    description?: string;
    href: string;
    rightAccessory?: React.ReactNode;
};

export default function ComponentTile(props: Props) {
    const {
        children,
        description,
        name,
        href,
        rightAccessory,
        layout,
        compactGrid,
    } = props;

    if (layout === "list") {
        return (
            <DetailCell
                title={name}
                subtitle2={description}
                leftAccessory={<PhosphorIcon icon={externalLinkIcon} />}
                rightAccessory={rightAccessory}
                href={href}
                target="_blank"
            />
        );
    }

    return (
        <View
            style={[
                styles.tile,
                compactGrid && styles.tileWithoutDetails,
                !compactGrid && styles.tileWithDetails,
            ]}
        >
            <Clickable
                href={href}
                target="_blank"
                style={styles.clickable}
                aria-label={`View ${name} component in a new tab.`}
            >
                {() => (
                    <>
                        <View
                            style={[
                                compactGrid && styles.descriptionWithoutDetails,
                                !compactGrid && styles.descriptionWithDetails,
                            ]}
                        >
                            <View style={styles.headingContainer}>
                                <HeadingSmall tag="h4">{name}</HeadingSmall>
                                <View style={styles.externalLinkIcon}>
                                    <PhosphorIcon
                                        icon={externalLinkIcon}
                                        size="small"
                                        aria-hidden="true"
                                    />
                                </View>
                                <Spring />
                                {rightAccessory}
                            </View>

                            {!compactGrid && (
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

        [mobile]: {
            width: "95%",
        },
    },
    tileWithDetails: {
        // Set the width to half the max width of the stories page content.
        width: 484,
        minHeight: 300,
    },
    tileWithoutDetails: {
        width: "auto",
        height: "auto",
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
            outline: `1px solid ${tokens.semanticColor.focus.outer}`,
        },
    },
    descriptionWithDetails: {
        padding: tokens.spacing.large_24,
    },
    descriptionWithoutDetails: {
        padding: tokens.spacing.small_12,
    },
    headingContainer: {
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
    },
    externalLinkIcon: {
        marginLeft: tokens.spacing.xSmall_8,
        marginRight: tokens.spacing.xSmall_8,
    },
});
