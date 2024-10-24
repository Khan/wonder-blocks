import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    ActionItem,
    ActionMenu,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function ActionMenuTile() {
    return (
        <ComponentTile
            name="ActionMenu"
            href="/?path=/docs/packages-dropdown-actionmenu--docs"
            description={`A dropdown menu that consists of
                        various types of items.`}
        >
            <View style={styles.centerContent}>
                <ActionMenu menuText="Action Menu">
                    <ActionItem
                        label="Profile"
                        href="http://khanacademy.org/profile"
                        target="_blank"
                        testId="profile"
                    />
                    <ActionItem
                        label="Teacher dashboard"
                        href="http://khanacademy.org/coach/dashboard"
                        testId="dashboard"
                    />
                    <ActionItem
                        label="Settings (onClick)"
                        onClick={() => {}}
                        testId="settings"
                    />
                    <ActionItem
                        label="Help"
                        disabled={true}
                        onClick={() => {}}
                        testId="help"
                    />
                    <ActionItem
                        label="Feedback"
                        disabled={true}
                        href="/feedback"
                        testId="feedback"
                    />
                    <SeparatorItem />
                    <ActionItem
                        label="Log out"
                        href="http://khanacademy.org/logout"
                        testId="logout"
                    />
                </ActionMenu>
            </View>
        </ComponentTile>
    );
}
