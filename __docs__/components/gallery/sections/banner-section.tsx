import * as React from "react";

import Banner from "@khanacademy/wonder-blocks-banner";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Banner
            </HeadingLarge>
            <ComponentTile name="Banner" href="/?path=/docs/banner--docs">
                <Banner text="This is a banner!" layout="floating" />
            </ComponentTile>
        </>
    );
}
