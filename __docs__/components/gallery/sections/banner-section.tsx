import * as React from "react";

import Banner from "@khanacademy/wonder-blocks-banner";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    return (
        <>
            <HeadingLarge id="banner" tag="h3" style={styles.sectionLabel}>
                Banner
            </HeadingLarge>
            <ComponentTile
                name="Banner"
                href="/?path=/docs/banner--docs"
                description={`Displays a prominent message and
                    related optional actions. It can be used as a way
                    of informing the user of important changes.`}
            >
                <Banner text="This is a banner!" layout="floating" />
            </ComponentTile>
        </>
    );
}
