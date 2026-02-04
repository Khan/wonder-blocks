import * as React from "react";
import {figma} from "@figma/code-connect";
import Switch from "../switch";

const SWITCH_ID = "";
const ARIA_LABEL = "";
const ARIA_LABELED_BY = "";
const ARIA_DESCRIBED_BY = "";
const ONCHANGE = () => {};

figma.connect(
    Switch,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=2048%3A6",
    {
        props: {
            // Properties from nested "Switch" component instance
            switchProps: figma.nestedProps("Switch", {
                checked: figma.enum("On", {
                    true: true,
                    false: false,
                }),
                disabled: figma.boolean("Disabled"),
            }),
            // Properties from nested "Label" component instance
            labelProps: figma.nestedProps("Label", {
                label: figma.textContent("Label"),
                // The Label component also has a "State" property that maps to disabled
                disabled: figma.enum("State", {
                    Active: false,
                    Disabled: true,
                }),
            }),
            // Top-level properties
            visibleLabel: figma.boolean("Visible Label"),
        },
        example: (props: any) => (
            // If props.visibleLabel==true, pair with a WB Typography component mapping labelledby and htmlFor by id
            <Switch
                id={SWITCH_ID} // If props.visibleLabel==true, add id for a11y pairing with a label element
                checked={props.switchProps.checked}
                disabled={props.switchProps.disabled} // Only include attr if disabled==true
                aria-label={ARIA_LABEL} // Only if there is no visibleLabel–look for a a11y annotation
                aria-labelledby={ARIA_LABELED_BY} // Only if visibleLabel, use the id of the label element, otherwise don't include attr
                aria-describedby={ARIA_DESCRIBED_BY} // Only if there is a description–look for a a11y annotation
                onChange={ONCHANGE}
            />
        ),
    },
);
