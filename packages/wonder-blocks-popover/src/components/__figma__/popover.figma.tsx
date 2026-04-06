import * as React from "react";
import {figma} from "@figma/code-connect";
import Popover from "../popover";
import PopoverContent from "../popover-content";

/*
NOTE: The example function returns a string that is never rendered/parsed.
To appease the linter, we define placeholder constants for external dependencies.
*/
const IMAGE = <img src="" alt="" />;
// Placeholder for @khanacademy/wonder-blocks-button
const Button = ({children, ...props}: any) => (
    <button {...props}>{children}</button>
);

figma.connect(
    Popover,
    "https://www.figma.com/design/EuFu0U7gqc1koXm8ZhlOLp/%E2%9A%A1%EF%B8%8F-Components?node-id=8781%3A11148",
    {
        props: {
            // Map Figma direction booleans to inverted WB placement
            // Cascades through: Up→bottom, Down→top, Left→right, Right→left
            placement: figma.boolean("Up", {
                true: "bottom",
                false: figma.boolean("Down", {
                    true: "top",
                    false: figma.boolean("Left", {
                        true: "right",
                        false: figma.boolean("Right", {
                            true: "left",
                        }),
                    }),
                }),
            }),
            showTail: figma.enum("Arrows", {
                True: true,
                False: false,
            }),
            hasImage: figma.boolean("Image"),
            imageAlignment: figma.enum("Image Alignment", {
                Top: "top",
                Bottom: "bottom",
            }),
            textProps: figma.nestedProps("Text", {
                title: figma.textContent("Title"),
                description: figma.textContent("Description"),
            }),
            progressProps: figma.nestedProps("Text", {
                progress: figma.boolean("Progress"),
            }),
        },
        example: (props) => (
            // The Popover component wraps a trigger element and displays content on interaction.
            <Popover
                placement={props.placement}
                showTail={props.showTail}
                content={
                    <PopoverContent
                        title={props.textProps.title}
                        content={props.textProps.description}
                        closeButtonVisible={true}
                        image={IMAGE} // Include if props.hasImage is true
                        imageAlignment={props.imageAlignment}
                        actions={
                            // Only add `actions` attr if props.hasActions==true
                            // Include buttons exactly as show in design.
                            // There could be other elements, e.g. if progressProps.progress==true we would show steps
                            // A common example:
                            <>
                                <Button kind="tertiary">Cancel</Button>
                                <Button kind="primary">Confirm</Button>
                            </>
                        }
                    />
                }
            >
                {({open}) => (
                    // Replace with the actual trigger element from your implementation
                    <Button onClick={open}>Open Popover</Button>
                )}
            </Popover>
        ),
    },
);
