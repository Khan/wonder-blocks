import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

import ComponentTile from "../component-tile";

export default function PopoverTile() {
    const [opened, setOpened] = React.useState(true);

    return (
        <ComponentTile
            name="Popover"
            href="/?path=/docs/packages-popover-popover--docs"
            description={`Provides additional information that is
                    related to a particular element and/or content.
                    Must be dismissed by clicking an element.`}
        >
            <View
                // Add an artificial height to the view so that the popover
                // doesn't overlap the description text.
                style={{height: 120}}
            />
            <Popover
                opened={opened}
                onClose={() => {
                    setOpened(false);
                }}
                content={({close}) => (
                    <PopoverContent
                        title="Hello!"
                        content="This is a popover."
                        closeButtonVisible={true}
                    />
                )}
            >
                <Button
                    // eslint-disable-next-line no-console
                    onClick={() => setOpened(true)}
                >
                    Open popover
                </Button>
            </Popover>
        </ComponentTile>
    );
}
