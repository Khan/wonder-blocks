import * as React from "react";

import Banner from "@khanacademy/wonder-blocks-banner";

import ComponentTile from "../component-tile";
import {CommonTileProps} from "../types";

export default function BannerTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="Banner"
            href="/?path=/docs/packages-banner--docs"
            description={`Displays a prominent message and
                    related optional actions. It can be used as a way
                    of informing the user of important changes.`}
            {...props}
        >
            <Banner text="This is a banner!" layout="floating" />
        </ComponentTile>
    );
}
