import * as React from "react";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Placeholder} from "../components/placeholder";
import {Tabs} from "@khanacademy/wonder-blocks-tabs";

export const generateTabs = (
    count: number,
    tabContent: string = "Tab",
    withIcons: boolean = false,
) => {
    return new Array(count).fill(0).map((_, index) => ({
        label: (
            <View
                style={{
                    gap: sizing.size_080,
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                {withIcons && <PhosphorIcon icon={IconMappings.cookie} />}
                {`${tabContent} ${index + 1}`}
                {withIcons && <PhosphorIcon icon={IconMappings.iceCream} />}
            </View>
        ),
        id: `tab-${index + 1}`,
        panel: <Placeholder>Tab contents {index + 1}</Placeholder>,
    }));
};

export function ControlledTabs(
    props: Omit<
        PropsFor<typeof Tabs>,
        "onTabSelected" | "aria-labelledby" | "aria-label"
    >,
) {
    const [selectedTabId, setSelectedTabId] = React.useState(
        props.selectedTabId,
    );

    return (
        <Tabs
            {...props}
            aria-label="Controlled tabs"
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
            tabs={props.tabs}
        />
    );
}
