import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

type BannerKind = "info" | "success" | "warning" | "critical";

const bannerKinds: ReadonlyArray<BannerKind> = [
    "info",
    "success",
    "warning",
    "critical",
];

export default {
    title: "Packages / Banner / Testing / Banner - Playtesting",
    component: Banner,
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

/**
 * An example for testing how screen readers announce each kind of banner when
 * it is shown. Choose a kind, then use the buttons to show or remove the
 * banner.
 */
export const ScreenReaderAnnouncements: Story = {
    render: function Render(args) {
        const [selectedKind, setSelectedKind] =
            React.useState<BannerKind>("info");
        const [shownKind, setShownKind] = React.useState<BannerKind | null>(
            null,
        );

        return (
            <View style={{gap: sizing.size_160}}>
                <LabeledField
                    label="Banner kind"
                    field={
                        <SingleSelect
                            placeholder="Choose a banner kind"
                            selectedValue={selectedKind}
                            onChange={(value) =>
                                setSelectedKind(value as BannerKind)
                            }
                        >
                            {bannerKinds.map((kind) => (
                                <OptionItem
                                    key={kind}
                                    label={kind}
                                    value={kind}
                                />
                            ))}
                        </SingleSelect>
                    }
                />
                <View style={{flexDirection: "row", gap: sizing.size_080}}>
                    <Button onClick={() => setShownKind(selectedKind)}>
                        Show banner
                    </Button>
                    <Button kind="secondary" onClick={() => setShownKind(null)}>
                        Remove banner
                    </Button>
                </View>
                {shownKind && (
                    <Banner
                        {...args}
                        // Use the kind as the key so switching kinds mounts a
                        // new banner instead of updating the existing one.
                        key={shownKind}
                        kind={shownKind}
                        text={`This is a ${shownKind} banner.`}
                    />
                )}
            </View>
        );
    },
};
