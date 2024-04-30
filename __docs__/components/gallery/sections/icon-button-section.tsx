import * as React from "react";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function IconButtonSection() {
    return (
        <>
            <HeadingLarge id="icon-button" tag="h3" style={styles.sectionLabel}>
                Icon Button
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="IconButton"
                    href="/?path=/docs/packages-iconbutton--docs"
                    description="A button whose contents are an SVG image."
                >
                    <View style={styles.centerContent}>
                        <IconButton
                            icon={magnifyingGlass}
                            aria-label="search"
                            onClick={() => {}}
                        />
                    </View>
                </ComponentTile>
            </View>
        </>
    );
}
