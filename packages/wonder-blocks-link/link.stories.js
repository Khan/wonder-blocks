// @flow
import React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";

import Link from "./components/link.js";

export default {
    title: "Link",
};

export const basicLinks = () => (
    <View>
        <Body>
            <Link href="#nonexistent-link">Primary link</Link>
            <Link href="#nonexistent-link" kind="secondary">
                Secondary link
            </Link>
        </Body>
    </View>
);

export const darkLink = () => (
    <View style={{backgroundColor: Color.darkBlue}}>
        <Body>
            <Link href="#nonexistent-link" light={true}>
                Primary link
            </Link>
        </Body>
    </View>
);

darkLink.story = {
    parameters: {
        backgrounds: [{name: "darkBlue", value: Color.darkBlue, default: true}],
    },
};

export const linksWithCarets = () => (
    <View>
        <Body>
            <Link href="#nonexistent-link" caret={true}>
                Link with caret.
            </Link>
            <View style={{fontSize: 30}}>
                <Link href="#nonexistent-link" caret={true}>
                    Large link with caret.
                </Link>
            </View>
        </Body>
    </View>
);
