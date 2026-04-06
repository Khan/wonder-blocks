import * as React from "react";
import {figma} from "@figma/code-connect";
import {Tabs} from "../tabs";

const TAB_CONTENT_COMPONENT_1 = React.Fragment;
const TAB_CONTENT_COMPONENT_2 = React.Fragment;
const TAB_ID_1 = "";
const TAB_ID_2 = "";
const ARIA_LABEL = "";
const SHOULD_ANIMATE = false;

figma.connect(
    Tabs,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=2156%3A77",
    {
        props: {
            // The number of tabs in the Figma component (2-6)
            tabName1: figma.textContent("Tab 1"),
            tabName2: figma.textContent("Tab 2"),
            tabCount: figma.enum("Tabs", {
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
            }),
        },
        example: (props: any) => {
            return (
                /* if we're flipping between content in page, use Tabs. If navigating between pages, use NavigationTabs. If unclear ASK ME TO CLARIFY!*/
                <Tabs
                    tabs={[
                        {
                            id: TAB_ID_1, // relevant ID
                            label: props.tabName1, // label should be i10n with t`${props.tabName1}`
                            panel: TAB_CONTENT_COMPONENT_1, // string or React component to display–if complex split out content panels as their own components
                        },
                        {
                            id: TAB_ID_2,
                            label: props.tabName2,
                            panel: TAB_CONTENT_COMPONENT_2,
                        },
                        // ... as many tabs as needed (reference props.tabCount)
                    ]}
                    selectedTabId={TAB_ID_1} // Defaults to first tab selected unless specified
                    onTabSelected={(id) => {
                        /* Handle tab selection */
                    }}
                    animated={SHOULD_ANIMATE} // Defaults to false. Utilize "usePrefersReducedMotion" hook
                    aria-label={ARIA_LABEL} // if Figma shows a visible label, use `aria-labelledby={LABEL_ID}` instead
                />
            );
        },
    },
);
