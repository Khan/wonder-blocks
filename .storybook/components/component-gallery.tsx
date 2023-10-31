import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import Banner from "@khanacademy/wonder-blocks-banner";
import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";

import ComponentTile from "./component-tile";

export default function ComponentGallery() {
    return (
        <RenderStateRoot>
            <View style={styles.container}>
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
                    name="Banner"
                    description={`A banner displays a prominent message
                        and related optional actions. It can be used as
                        a way of informing the user of important changes.
                        Typically, it is displayed toward the top of the
                        screen.`}
                    href="/?path=/docs/banner--docs"
                >
                    <Banner text="This is a banner!" layout="floating" />
                </ComponentTile>

                <ComponentTile
                    name="Birthday Picker"
                    description={`Birthday Picker is similar to a datepicker,
                    but specifically for birthdates. It is composed of a set
                    of dropdowns for month, day, and year.`}
                    href="/?path=/docs/birthdaypicker--docs"
                >
                    <BirthdayPicker onChange={() => {}} />
                </ComponentTile>
            </View>
        </RenderStateRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
