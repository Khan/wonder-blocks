import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function LinkTile(props: {layout: "grid" | "list"}) {
    return (
        <ComponentTile
            name="Link"
            href="/?path=/docs/packages-link--docs"
            description={`Standard link. Used to redirect to a new
                    page or a section within the same page.`}
            layout={props.layout}
        >
            <View style={styles.centerContent}>
                <Link href="#">This is a link</Link>
            </View>
        </ComponentTile>
    );
}
