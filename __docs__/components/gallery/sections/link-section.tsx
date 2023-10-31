import * as React from "react";

import Link from "@khanacademy/wonder-blocks-link";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function LinkSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Link
            </HeadingLarge>

            <ComponentTile name="Link" href="/?path=/docs/link--docs">
                <Link href="#">This is a link</Link>
            </ComponentTile>
        </>
    );
}
