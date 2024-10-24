import * as React from "react";

import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";

import ComponentTile from "../component-tile";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

export default function ActionSectionTile() {
    return (
        <RenderStateRoot>
            <ComponentTile
                name="AccordionSection"
                href="/?path=/docs/packages-accordion-accordionsection--docs"
                description={`A single collapsible section within
                        an accordion. It can be used by itself or within
                        an accordion.`}
            >
                <AccordionSection header="Accordion Section">
                    This is an accordion section.
                </AccordionSection>
            </ComponentTile>
        </RenderStateRoot>
    );
}
