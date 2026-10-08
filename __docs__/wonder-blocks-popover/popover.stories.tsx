/* eslint-disable max-lines */

import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import packageConfig from "../../packages/wonder-blocks-popover/package.json";

import ComponentInfo from "../components/component-info";
import {reallyLongText} from "../components/text-for-testing";
import {allModes} from "../../.storybook/modes";
import PopoverArgtypes, {ContentMappings} from "./popover.argtypes";

export default {
    title: "Packages / Popover / Popover",
    component: Popover,
    argTypes: PopoverArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling most snapshots in favour of statesheet. Explicitly
            // enabling snapshots for specific stories.
            disableSnapshot: true,
        },
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as Meta<typeof Popover>;

const styles = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        height: `calc(100vh - 16px)`,
        width: "100vw",
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
    actions: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
    },
    playground: {
        border: `1px dashed ${semanticColor.core.border.neutral.subtle}`,
        marginBlockStart: sizing.size_240,
        padding: sizing.size_240,
        flexDirection: "row",
        gap: sizing.size_160,
    },
    srOnly: {
        border: 0,
        clip: "rect(0,0,0,0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
    },
});

type StoryComponentType = StoryObj<typeof Popover>;

// NOTE: Adding arg types to be able to use the union types defined by the
// component.
type PopoverArgs = Partial<typeof Popover>;

export const Default: StoryComponentType = {
    args: {
        children: <Button>Open default popover</Button>,
        content: ContentMappings.withTextOnly,
        placement: "top",
        dismissEnabled: true,
        id: "",
        initialFocusId: "",
        testId: "",
        onClose: () => {},
    } as PopoverArgs,
};

/**
 * No tail
 */
export const NoTail: StoryComponentType = {
    args: {
        children: <Button>Open popover without tail</Button>,
        content: (
            <PopoverContent
                closeButtonVisible
                title="Title"
                content="The popover content. This popover does not have a tail."
            />
        ),

        placement: "top",
        dismissEnabled: true,
        id: "",
        initialFocusId: "",
        testId: "",
        onClose: () => {},
        showTail: false,
    } as PopoverArgs,
};

/**
 * This example shows a popover adorning the same element that triggers it. This
 * is accomplished by passing a function as children and using the `open`
 * property passed it as the `onClick` handler on a button in this example.
 *
 * **NOTES:**
 * - You will always need to add a trigger element inside the Popover to control
 *   when and/or from where to open the popover dialog.
 * - For this example, if you use the `image` prop, make sure to avoid using
 *   `icon` at the same time. Doing so will throw an error.
 */
export const TriggerElement: StoryComponentType = {
    render: () => (
        <Popover
            dismissEnabled={true}
            content={
                <PopoverContent
                    closeButtonVisible
                    title="Title"
                    content="The popover content."
                    image={
                        <img
                            src="illustration.svg"
                            alt="An illustration of a person skating on a pencil"
                            width={288}
                            height={200}
                        />
                    }
                />
            }
        >
            {({open}) => <Button onClick={open}>Trigger element</Button>}
        </Popover>
    ),
};

// The custom triggers below render their own label, so they don't take
// `children`.
type CustomTriggerProps = Omit<React.ComponentProps<typeof Button>, "children">;

/**
 * A trigger that spreads the props it is given onto its element. It is a plain
 * function component, so it can't receive a ref, and `Popover` finds its
 * element in the DOM instead.
 */
function SpreadPropsTrigger(props: CustomTriggerProps) {
    return <Button {...props}>Plain function component</Button>;
}

/**
 * A trigger that forwards the ref it is given to its element, and spreads the
 * props it is given onto it too.
 */
const ForwardRefTrigger = React.forwardRef(function ForwardRefTrigger(
    props: CustomTriggerProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    return (
        <Button {...props} ref={ref}>
            forwardRef component
        </Button>
    );
});

/**
 * The trigger (`children`) is the element the popover is anchored to, so
 * `Popover` needs to know which DOM element it renders. The trigger can be any
 * component type (a host element like `<button>`, a `React.forwardRef`
 * component, a class component or a plain function component), as long as it
 * does **at least one** of the following:
 *
 * 1. **Attach the ref it is given** to its element. `Popover` only passes a ref
 *    to triggers that can receive one (host elements and `React.forwardRef`
 *    components).
 * 2. **Spread the props it is given** onto its element. `Popover` injects the
 *    `id`, `aria-controls`, `aria-expanded` and `onClick` props, plus an
 *    attribute it uses to find the element in the DOM.
 *
 * Wonder Blocks components such as `Button` and `IconButton` do both, so they
 * can be used as triggers directly.
 *
 * For custom triggers, we recommend spreading the props even if the ref is
 * forwarded: the `aria-controls` and `aria-expanded` props are needed for
 * screen readers, and the `onClick` prop is what opens the popover when
 * `children` is an element. A trigger's own `ref` keeps working, since
 * `Popover` merges it with its own instead of replacing it.
 *
 * If the trigger does neither (e.g. a function component that ignores its
 * props), the popover has nothing to anchor to, and a warning is logged in
 * development.
 *
 * **NOTE:** When the trigger renders several elements, the popover is anchored
 * to the one that receives the ref (or the props).
 */
export const CustomTriggers: StoryComponentType = {
    render: function Render() {
        return (
            <View style={[styles.row, {gap: sizing.size_160}]}>
                <Popover
                    dismissEnabled={true}
                    content={
                        <PopoverContent
                            closeButtonVisible
                            title="Plain function component"
                            content="Anchored through the props it spreads onto its element."
                        />
                    }
                >
                    <SpreadPropsTrigger />
                </Popover>
                <Popover
                    dismissEnabled={true}
                    content={
                        <PopoverContent
                            closeButtonVisible
                            title="forwardRef component"
                            content="Anchored through the ref it forwards to its element."
                        />
                    }
                >
                    <ForwardRefTrigger />
                </Popover>
            </View>
        );
    },
};

/**
 * Povoper can be closed via light dismiss. This means that the popover will be
 * closed under the following conditions:
 * - Keyboard: The user presses `Esc`.
 * - Click outside: The user clicks outside of the popover.
 * - Focus out: The user tabs before the trigger element or after the last
 *   focusable element inside the popover.
 *
 * The `dismissEnabled` prop can be used to enable or disable light dismiss
 * (default is `false`).
 */
export const DismissEnabled: StoryComponentType = {
    args: {
        dismissEnabled: true,
        children: <Button>Open popover with light dismiss</Button>,
        content: (
            <PopoverContent
                closeButtonVisible
                title="Title"
                content="The popover content. This popover has light dismiss enabled."
                actions={
                    <View style={[styles.row, {gap: sizing.size_160}]}>
                        <Button kind="tertiary" onClick={() => {}}>
                            Action 1
                        </Button>
                        <Button kind="tertiary" onClick={() => {}}>
                            Action 2
                        </Button>
                    </View>
                }
            />
        ),
    } as PopoverArgs,
};

/**
 * Sometimes you'll want to trigger a popover programmatically. This can be done
 * by setting the `opened` prop to `true`. In this situation the `Popover` is a
 * controlled component. The parent is responsible for managing the
 * opening/closing of the popover when using this prop. This means that you'll
 * also have to update `opened` to `false` in response to the `onClose` callback
 * being triggered.
 *
 * Here you can see as well how the focus is managed when a popover is opened.
 * To see more details, please check the **Accesibility section**.
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);
        return (
            <View style={[styles.row, {gap: sizing.size_320}]}>
                <Popover
                    opened={opened}
                    onClose={() => {
                        setOpened(false);
                    }}
                    content={({close}) => (
                        <PopoverContent
                            title="Controlled popover"
                            content="This popover is controlled programatically. This means that is only displayed using the `opened` prop."
                            actions={
                                <Button
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Click to close the popover
                                </Button>
                            }
                        />
                    )}
                >
                    <Button
                        onClick={() =>
                            // eslint-disable-next-line no-console
                            console.log("This is a controlled popover.")
                        }
                    >
                        Anchor element (it does not open the popover)
                    </Button>
                </Popover>

                <Button onClick={() => setOpened(true)}>
                    Outside button (click here to re-open the popover)
                </Button>
            </View>
        );
    },
};

/**
 * Sometimes you need to add actions to be able to control the popover state.
 * For this reason, you can make use of the `actions` prop:
 */
export const WithActions: StoryComponentType = {
    render: function Render() {
        const [step, setStep] = React.useState(1);
        const totalSteps = 5;

        return (
            <Popover
                content={({close}) => (
                    <PopoverContent
                        title="Popover with actions"
                        content="This example shows a popover which contains a set of actions that can be used to control the popover itself."
                        actions={
                            <View
                                style={[
                                    styles.row,
                                    styles.actions,
                                    {gap: sizing.size_160},
                                ]}
                            >
                                <BodyText weight="bold">
                                    Step {step} of {totalSteps}
                                </BodyText>
                                <Button
                                    kind="tertiary"
                                    onClick={() => {
                                        if (step < totalSteps) {
                                            setStep(step + 1);
                                        } else {
                                            close();
                                        }
                                    }}
                                >
                                    {step < totalSteps
                                        ? "Skip this step"
                                        : "Finish"}
                                </Button>
                            </View>
                        }
                    />
                )}
                placement="top"
            >
                <Button>Open popover with actions</Button>
            </Popover>
        );
    },
};

/**
 * Sometimes, you may want a specific element inside the Popover to receive
 * focus first. This can be done using the `initialFocusId` prop on the
 * `Popover` component. Just pass in the ID of the element that should receive
 * focus, and it will automatically receieve focus once the popover is
 * displayed.
 *
 * In this example, the first button would have received the focus by default,
 * but the second button receives focus instead since its ID is passed into the
 * `initialFocusId` prop.
 */
export const WithInitialFocusId: StoryComponentType = {
    name: "With initialFocusId",
    args: {
        children: (
            <Button>
                Open with initial focus on the &quot;It is focused!&quot; button
            </Button>
        ),
        content: (
            <PopoverContent
                title="
            Setting initialFocusId"
                content="The focus will be set on the second button"
                actions={
                    <View style={[styles.row, {gap: sizing.size_160}]}>
                        <Button kind="tertiary" id="popover-button-1">
                            No focus
                        </Button>
                        <Button kind="tertiary" id="popover-button-2">
                            It is focused!
                        </Button>
                    </View>
                }
            />
        ),
        placement: "top",
        dismissEnabled: true,
        initialFocusId: "popover-button-2",
    } as PopoverArgs,
};

/**
 * You can use the `closedFocusId` prop on the `Popover` component to specify
 * where to set the focus after the popover dialog has been closed. This is
 * useful for cases when you need to return the focus to a specific element.
 *
 * In this example, `closedFocusId` is set to the ID of the button labeled
 * "Focus here after close.", and it means that the focus will be set on that
 * button after the popover dialog has been closed/dismissed.
 */
export const WithClosedFocusId: StoryComponentType = {
    name: "With closedFocusId",
    render: () => (
        <View style={{gap: 20}}>
            <Button id="button-to-focus-on">Focus here after close</Button>
            <Popover
                dismissEnabled={true}
                closedFocusId="button-to-focus-on"
                content={
                    <PopoverContent
                        closeButtonVisible={true}
                        title="Returning focus to a specific element"
                        content='After dismissing the popover, the focus will be set on the button labeled "Focus here after close."'
                    />
                }
            >
                <Button>Open popover</Button>
            </Popover>
        </View>
    ),
};

/**
 * Popovers can have custom layouts. This is done by using the
 * `PopoverContentCore` component.
 *
 * _NOTE:_ If you choose to use this component, you'll have to set the
 * `aria-labelledby` and `aria-describedby` attributes manually. Make sure to
 * pass the `id` prop to the `Popover` component and use it as the value for
 * these attributes. Also, make sure to assign the `${id}-title` prop to the
 * `title` element and `${id}-content` prop to the `content` element.
 */
export const CustomPopoverContent: StoryComponentType = {
    args: {
        children: <Button>Open custom popover</Button>,
        content: ContentMappings.coreWithIcon,
        id: "custom-popover",
    } as PopoverArgs,
};

/**
 * This example shows how the focus is managed when a popover is opened. If the
 * popover is closed, the focus flows naturally. However, if the popover is
 * opened, the focus is managed internally by the `Popover` component.
 *
 * The focus is managed in the following way:
 * - When the popover is opened, the focus is set on the first focusable element
 *  inside the popover.
 * - When the popover is closed, the focus is returned to the element that
 * triggered the popover.
 * - If the popover is opened and the focus reaches the last focusable element
 * inside the popover, the next tab will set focus on the next focusable
 * element that exists after the PopoverAnchor (or trigger element).
 * - If the focus is set to the first focusable element inside the popover, the
 * next shift + tab will set focus on the PopoverAnchor element.
 * - If you have custom keyboard navigation (like with left and right arrow keys)
 * popover won't override them
 *
 * **NOTE:** You can add/remove buttons after the trigger element by using the
 * buttons at the top of the example.
 */
export const KeyboardNavigation: StoryComponentType = {
    render: function Render() {
        const [numButtonsAfter, setNumButtonsAfter] = React.useState(0);
        const [numButtonsInside, setNumButtonsInside] = React.useState(1);

        return (
            <View>
                <View style={[styles.row, {gap: sizing.size_160}]}>
                    <Button
                        kind="secondary"
                        onClick={() => {
                            setNumButtonsAfter(numButtonsAfter + 1);
                        }}
                    >
                        Add button after trigger element
                    </Button>
                    <Button
                        kind="secondary"
                        actionType="destructive"
                        onClick={() => {
                            if (numButtonsAfter > 0) {
                                setNumButtonsAfter(numButtonsAfter - 1);
                            }
                        }}
                    >
                        Remove button after trigger element
                    </Button>
                    <Button
                        kind="secondary"
                        onClick={() => {
                            setNumButtonsInside(numButtonsInside + 1);
                        }}
                    >
                        Add button inside popover
                    </Button>
                    <Button
                        kind="secondary"
                        actionType="destructive"
                        onClick={() => {
                            if (numButtonsAfter > 0) {
                                setNumButtonsInside(numButtonsInside - 1);
                            }
                        }}
                    >
                        Remove button inside popover
                    </Button>
                </View>
                <View style={styles.playground}>
                    <Button>First button</Button>
                    <Popover
                        content={({close}) => (
                            <PopoverContent
                                closeButtonVisible
                                title="Keyboard navigation"
                                content="This example shows how the focus is managed when a popover is opened."
                                actions={
                                    <View style={[styles.row, styles.actions]}>
                                        {Array.from(
                                            {length: numButtonsInside},
                                            (_, index) => (
                                                <Button
                                                    onClick={() => {}}
                                                    key={index}
                                                    kind="tertiary"
                                                >
                                                    {`Button ${index + 1}`}
                                                </Button>
                                            ),
                                        )}
                                    </View>
                                }
                            />
                        )}
                        placement="top"
                    >
                        <Button>Open popover (trigger element)</Button>
                    </Popover>
                    {Array.from({length: numButtonsAfter}, (_, index) => (
                        <Button onClick={() => {}} key={index}>
                            {`Button ${index + 1}`}
                        </Button>
                    ))}
                </View>
            </View>
        );
    },
};

/**
 * Similar example to KeyboardNavigation except this one highlights
 * how popover does not override custom keyboard interactions for
 * content inside the popover.
 *
 * NOTE: To see the arrow key navigation, add additional buttons to
 * the popover container.
 */
export const CustomKeyboardNavigation: StoryComponentType = {
    render: function Render() {
        const [numButtonsAfter, setNumButtonsAfter] = React.useState(0);
        const [numButtonsInside, setNumButtonsInside] = React.useState(1);

        const [focus, setFocus] = React.useState(0);

        /**
         * Custom function to create arrow key navigation to highlight how
         * popover won't override internal custom navigation but still ensure
         * users will focus in and out of the popover correctly.
         * @param e - onKeyDown event data.
         */
        const onArrowKeyFocus = (e: any) => {
            if (e.keyCode === 39) {
                // Right arrow
                setFocus(focus === numButtonsInside - 1 ? 0 : focus + 1);
            } else if (e.keyCode === 37) {
                // Left arrow
                setFocus(focus === 0 ? numButtonsInside - 1 : focus - 1);
            }
        };

        return (
            <View style={[{paddingBlock: "120px", paddingInline: "0"}]}>
                <View style={[styles.row, {gap: sizing.size_160}]}>
                    <Button
                        kind="secondary"
                        onClick={() => {
                            setNumButtonsAfter(numButtonsAfter + 1);
                        }}
                    >
                        Add button after trigger element
                    </Button>
                    <Button
                        kind="secondary"
                        actionType="destructive"
                        onClick={() => {
                            if (numButtonsAfter > 0) {
                                setNumButtonsAfter(numButtonsAfter - 1);
                            }
                        }}
                    >
                        Remove button after trigger element
                    </Button>
                    <Button
                        kind="secondary"
                        onClick={() => {
                            setNumButtonsInside(numButtonsInside + 1);
                        }}
                    >
                        Add button inside popover
                    </Button>
                    <Button
                        kind="secondary"
                        actionType="destructive"
                        onClick={() => {
                            if (numButtonsAfter > 0) {
                                setNumButtonsInside(numButtonsInside - 1);
                            }
                        }}
                    >
                        Remove button inside popover
                    </Button>
                </View>
                <View style={styles.playground}>
                    <Button>First button</Button>
                    <Popover
                        portal={false}
                        content={({close}) => (
                            <PopoverContent
                                closeButtonVisible
                                title="Keyboard navigation"
                                content="This example shows how the focus is managed when a popover is opened."
                                actions={
                                    <View
                                        style={[styles.row, styles.actions]}
                                        onKeyDown={onArrowKeyFocus}
                                    >
                                        {Array.from(
                                            {length: numButtonsInside},
                                            (_, index) => (
                                                <ArrowButton
                                                    onClick={() => {}}
                                                    index={index}
                                                    focus={index === focus}
                                                />
                                            ),
                                        )}
                                    </View>
                                }
                            />
                        )}
                        placement="top"
                    >
                        <Button>Open popover (trigger element)</Button>
                    </Popover>
                    {Array.from({length: numButtonsAfter}, (_, index) => (
                        <Button onClick={() => {}} key={index}>
                            {`Button ${index + 1}`}
                        </Button>
                    ))}
                </View>
            </View>
        );
    },
};

type ArrowButtonProps = {
    onClick: () => void;
    focus?: boolean;
    index: number;
};

function ArrowButton(props: ArrowButtonProps): React.ReactElement {
    const {onClick, focus, index} = props;
    const tabRef = React.useRef(null);

    React.useEffect(() => {
        if (focus) {
            /**
             * When tabs are within a WonderBlocks Popover component, the
             * manner in which the component is rendered and moved causes
             * focus to snap to the bottom of the page on first focus.
             *
             * This timeout moves around that by delaying the focus enough
             * to wait for the WonderBlock Popover to move to the correct
             * location and scroll the user to the correct location.
             * */
            if (tabRef?.current) {
                // Move element into view when it is focused
                // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
                tabRef?.current.focus();
            }
        }
    }, [focus, tabRef]);

    return (
        <Button
            onClick={onClick}
            ref={tabRef}
            key={index}
            kind="tertiary"
            tabIndex={focus ? 0 : -1}
        >
            {`Arrow Button ${index + 1}`}
        </Button>
    );
}

/**
 * Alignment example
 */
const BasePopoverExample = ({placement}: {placement: Placement}) => {
    const [opened, setOpened] = React.useState(true);
    return (
        <View style={styles.example}>
            <Popover
                placement={placement}
                opened={opened}
                onClose={() => setOpened(false)}
                content={
                    <PopoverContent
                        title="Title"
                        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                        closeButtonVisible
                    />
                }
            >
                <Button
                    onClick={() => {
                        setOpened(true);
                    }}
                >
                    {`Open popover: ${placement}`}
                </Button>
            </Popover>
        </View>
    );
};

export const PopoverAlignment: StoryComponentType = {
    render: () => (
        <View style={styles.container}>
            <BasePopoverExample placement="right" />
            <BasePopoverExample placement="bottom" />
            <BasePopoverExample placement="top" />
            <BasePopoverExample placement="left" />
        </View>
    ),
    parameters: {
        chromatic: {
            // Include snapshot for alignment examples
            disableSnapshot: false,
        },
    },
};

/**
 * Sometimes you need to change the underlining behavior to position the Popover
 * by the whole webpage (document) instead of by the viewport. This is a useful
 * tool for popovers with large content that might not fit in small screen sizes
 * or at 400% zoom. For this reason, you can make use of the \`rootBoundary\`
 * prop:
 */
export const WithDocumentRootBoundary: StoryComponentType = {
    render: () => {
        return (
            <View style={{paddingBlockEnd: "500px"}}>
                <Popover
                    rootBoundary="document"
                    dismissEnabled
                    content={() => (
                        <PopoverContent
                            closeButtonVisible
                            title="Popover with rootBoundary='document'"
                            content="This example shows a popover with the rootBoundary='document'. This means that instead of aligning the popover to the viewport, it will instead place the popover where there is room in the DOM. This is a useful tool for popovers with large content that might not fit in small screen sizes or at 400% zoom."
                        />
                    )}
                    placement="top"
                >
                    <Button>Open popover with document rootBoundary</Button>
                </Popover>
            </View>
        );
    },
};

/**
 * The popover is constrained to the space available in the viewport (or the
 * document, when using `rootBoundary="document"`). When the content doesn't
 * fit, e.g. on small screens or at high zoom levels (up to 400%), the content
 * scrolls instead of being cut off. The close button stays in place, and the
 * scrollable area becomes keyboard focusable so it can be scrolled with the
 * keyboard.
 *
 * Try this example at a small viewport size or zoom in to see the content
 * scroll.
 */
export const WithLongContent: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(true);

        return (
            <View style={styles.example}>
                <Popover
                    opened={opened}
                    onClose={() => setOpened(false)}
                    dismissEnabled
                    content={
                        <PopoverContent
                            closeButtonVisible
                            title="Popover with long content"
                            content={reallyLongText}
                            actions={
                                <Button onClick={() => setOpened(false)}>
                                    Got it
                                </Button>
                            }
                        />
                    }
                    placement="top"
                >
                    <Button onClick={() => setOpened(true)}>
                        Open popover with long content
                    </Button>
                </Popover>
            </View>
        );
    },
    parameters: {
        chromatic: {
            modes: {
                small: allModes.small,
                large: allModes.large,
            },
        },
    },
};

/**
 * With custom aria-label - overrides the default aria-labelledby
 */
export const WithCustomAriaLabel: StoryComponentType = {
    args: {
        children: <Button>Open popover</Button>,
        content: ContentMappings.withTextOnly,
        placement: "top",
        dismissEnabled: true,
        id: "",
        initialFocusId: "",
        testId: "",
        onClose: () => {},
        "aria-label": "Popover with custom aria label",
    } as PopoverArgs,
};

/**
 * With custom aria-describedby - overrides the default aria-describedby
 */
export const WithCustomAriaDescribedBy: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(false);

        return (
            <View style={styles.example}>
                <Popover
                    aria-describedby="custom-popover-description"
                    placement="bottom"
                    opened={opened}
                    onClose={() => setOpened(false)}
                    content={
                        <>
                            <Heading
                                size="large"
                                id="custom-popover-description"
                                style={styles.srOnly}
                            >
                                Hidden text that would describe the popover
                                content
                            </Heading>
                            <PopoverContent
                                title="Title"
                                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                                closeButtonVisible
                            />
                        </>
                    }
                >
                    <Button
                        onClick={() => {
                            setOpened(true);
                        }}
                    >
                        {`Open popover`}
                    </Button>
                </Popover>
            </View>
        );
    },
};

/**
 * The `titleHeadingTag` prop allows customizing the heading level used for the
 * popover title. It defaults to `"h4"`. This does not affect the visual appearance of the title.
 */
export const WithTitleHeadingTag: StoryComponentType = {
    render: function Render() {
        const [opened, setOpened] = React.useState(false);
        return (
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                content={
                    <PopoverContent
                        titleHeadingTag="h2"
                        title="Title rendered as h2"
                        content="This popover title is rendered as an h2 element instead of the default h4. This does not affect the visual appearance of the title."
                        closeButtonVisible
                    />
                }
            >
                <Button onClick={() => setOpened(true)}>
                    Open popover with h2 title
                </Button>
            </Popover>
        );
    },
};

/**
 * If the Popover is placed near the edge of the viewport, default spacing of
 * 12px is applied to provide spacing between the Popover and the viewport. This
 * spacing value can be overridden using the `viewportPadding` prop.
 *
 * Note: The `viewportPadding` prop is only applied when `rootBoundary` is
 * `viewport`.
 */
export const InCorners: StoryComponentType = {
    render: function Render(args) {
        const PopoverInCorner = () => {
            const [opened, setOpened] = React.useState(true);
            return (
                <Popover
                    {...args}
                    content={
                        <PopoverContent
                            closeButtonVisible
                            content="The default version only includes text."
                            title="A simple popover"
                        />
                    }
                    dismissEnabled
                    onClose={() => setOpened(false)}
                    opened={opened}
                >
                    <Button onClick={() => setOpened(true)}>
                        Open default popover
                    </Button>
                </Popover>
            );
        };
        return (
            <View
                style={{
                    height: "80vh",
                    width: "100vw",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <PopoverInCorner />
                    <PopoverInCorner />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <PopoverInCorner />
                    <PopoverInCorner />
                </View>
            </View>
        );
    },
    parameters: {
        layout: "fullscreen",
        chromatic: {
            // Include snapshot for corner alignment examples
            disableSnapshot: false,
        },
    },
};

/**
 * Popover by default (and for performance reasons) only updates its position
 * under the following conditions:
 *
 * 1. When the window is resized.
 * 2. When the scroll position changes.
 *
 * However, there are cases where you might want the tooltip to update its
 * position when the trigger element changes. This can be done by setting the
 * `autoUpdate` prop to `true`.
 */
export const AutoUpdate: StoryComponentType = {
    render: function Render(args) {
        const [position, setPosition] = React.useState<{
            x: number;
            y: number;
        } | null>(null);
        return (
            <View style={{position: "relative"}}>
                <Button
                    onClick={() => {
                        setPosition({
                            x: Math.floor(Math.random() * 200),
                            y: Math.floor(Math.random() * 200),
                        });
                    }}
                >
                    Click to update trigger position (randomly)
                </Button>
                <Popover
                    {...args}
                    content={
                        <PopoverContent
                            content="This is a popover that auto-updates its position when the trigger element changes."
                            title="Popover with autoUpdate=true"
                        />
                    }
                    opened={true}
                    autoUpdate={true}
                >
                    <Button
                        kind="tertiary"
                        style={
                            position && {
                                position: "absolute",
                                insetBlockStart: position.y,
                                insetInlineStart: position.x,
                            }
                        }
                    >
                        Trigger element
                    </Button>
                </Popover>
            </View>
        );
    },
};
