import * as React from "react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";

import ComponentTile from "../component-tile";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

export default function AccordionTile(props: {layout: "grid" | "list"}) {
    return (
        <RenderStateRoot>
            <ComponentTile
                name="Accordion"
                href="/?path=/docs/packages-accordion-accordion--docs"
                description={`A vertically stacked list of sections,
                        each of which contains content that can be expanded
                        or collapsed by clicking its header.`}
                layout={props.layout}
            >
                <Accordion>
                    <AccordionSection header="First section">
                        This is the information present in the first section
                    </AccordionSection>
                    <AccordionSection header="Second section">
                        This is the information present in the second section
                    </AccordionSection>
                    <AccordionSection header="Third section">
                        This is the information present in the third section
                    </AccordionSection>
                </Accordion>
            </ComponentTile>
        </RenderStateRoot>
    );
}
