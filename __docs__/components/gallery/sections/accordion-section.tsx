import * as React from "react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../component-gallery";

export default function AccordionGallerySection() {
    return (
        <RenderStateRoot>
            <HeadingLarge tag="h3" style={styles.sectionLabel}>
                Accordion
            </HeadingLarge>

            <View style={styles.section}>
                <ComponentTile
                    name="Accordion"
                    description={`An accordion displays a vertically
         stacked list of sections, each of which
         contains content that can be shown or hidden by
         clicking its header.`}
                    href="/?path=/docs/accordion-accordion--docs"
                >
                    <Accordion>
                        <AccordionSection header="First section">
                            This is the information present in the first section
                        </AccordionSection>
                        <AccordionSection header="Second section">
                            This is the information present in the second
                            section
                        </AccordionSection>
                        <AccordionSection header="Third section">
                            This is the information present in the third section
                        </AccordionSection>
                    </Accordion>
                </ComponentTile>

                <ComponentTile
                    name="AccordionSection"
                    href="/?path=/docs/accordion-accordionsection--docs"
                >
                    <AccordionSection header="Accordion Section">
                        This is an accordion section.
                    </AccordionSection>
                </ComponentTile>
            </View>
        </RenderStateRoot>
    );
}
