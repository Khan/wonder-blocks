A popover is a transient view that shows on a content screen commonly displayed
when a user clicks on a control button or within a defined area. It can also
appear programmatically, meaning that will be cases where there is no need of
user interactions to shows the popover. It is commonly used to display
additional information or actions.

## Examples

### Example: Opening a popover using a trigger element

This example shows a popover adorning the same element that triggers it. This
is accomplished by passing a function as children and using the `open` property
passed it as the `onClick` handler on a button in this example.

**NOTES:**
- You will always need to add a trigger element inside the Popover to
control when and/or from where to open the popover dialog.
- For this example, if you use the `image` prop, make sure to avoid using `icon`
  and/or `emphasized` at the same time. Doing so will throw an error.
- This example uses the `dismissEnabled` prop. This means that the user
can close the Popover by pressing `esc` or clicking in the trigger element.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <Popover
        dismissEnabled
        onClose={()=> console.log('popover closed!')}
        content={
            <PopoverContent
                closeButtonVisible
                title="Title"
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                image={<img src="/illustration.svg" width={288} height={200} />}
            />
        }
    >
        {({open}) => (
            <Button onClick={open}>Open default popover</Button>
        )}
    </Popover>
</View>
```

### Example: Opening a popover programmatically

Sometimes you'll want to trigger a popover programmatically. This can be done by
setting the `opened` prop to `true`. In this situation the `Popover` is a
controlled component. The parent is responsible for managing the opening/closing
of the popover when using this prop. This means that you'll also have to update
`opened` to false in response to the onClose callback being triggered.

Here you can see as well how the focus is managed when a popover is opened. To see more
details, please check the **Accesibility section**.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";

const customIcon = {
    small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
};

const styles = StyleSheet.create({
    example: {
        paddingTop: Spacing.medium_16 * 15
    },
    customPopover: {
        maxWidth: Spacing.medium_16 * 25,
        width: Spacing.medium_16 * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small_12}px 0`
    },
    action: {
        backgroundColor: "transparent",
        border: "none",
        color: Color.white,
        cursor: "pointer",
        margin: Spacing.small_12,
        padding: Spacing.xxSmall_6,
        alignItems: "center",
        justifyContent: "center"
    },
});

const CustomButton = addStyle('button');

class ControlledPopover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpened: true
        };
    }

    render() {
        return (
            <View style={[styles.row]}>
                <Popover
                    opened={this.state.popoverOpened}
                    onClose={()=> {
                        console.log('popover closed!');
                        this.setState({popoverOpened: false});
                    }}
                    content={({close}) =>
                        <PopoverContentCore
                            color="darkBlue"
                            style={styles.customPopover}
                        >
                            <View>
                                <HeadingSmall>Custom popover title</HeadingSmall>
                                <View style={styles.row}>
                                    <CustomButton style={styles.action} onClick={close}  id="btn-1">
                                        <Icon
                                            icon={customIcon}
                                            color={Color.gold}
                                            size="large"
                                        />
                                        <LabelLarge>Option 1</LabelLarge>
                                    </CustomButton>
                                    <CustomButton style={styles.action} onClick={close} id="btn-2">
                                        <Icon
                                            icon={customIcon}
                                            color={Color.green}
                                            size="large"
                                        />
                                        <LabelLarge>Option 2</LabelLarge>
                                    </CustomButton>
                                    <CustomButton style={styles.action} onClick={close} id="btn-3">
                                        <Icon
                                            icon={customIcon}
                                            color={Color.blue}
                                            size="large"
                                        />
                                        <LabelLarge>Option 3</LabelLarge>
                                    </CustomButton>
                                </View>
                            </View>
                        </PopoverContentCore>
                    }
                >
                    <Button onClick={() => console.log('This is a controlled popover.')}>
                        Anchor element (it doesn't open the popover)
                    </Button>
                </Popover>
                <Strut size={Spacing.xLarge_32} />
                <Button onClick={() => this.setState({popoverOpened: true})}>
                    Outside button (click here to re-open the popover)
                </Button>
            </View>
        );
    }
}

<View style={[styles.row, styles.example]}>
    <ControlledPopover />
</View>
```

## Variants

### Example: Text-only popover (with emphasis and actions)

This example shows the default popover variant. By default, it only includes
`title` and `content`, but you can add more optional props, such as
`emphasized`, `closeButtonVisible` and `actions`.

**NOTE:** If you use `actions`, you can use it with the following alternatives:
1) Passing a Node that contains the actions to be run. In this case, you'll
   need to manage the internal logic of each action.
2) Passing a function as children and using the `close` property passed it as
   the `onClick` handler on each action inside this example.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    },
    row: {
        flexDirection: "row"
    }
});

<View style={styles.example}>
    <Popover
        placement="top"
        onClose={()=> console.log('popover closed!')}
        initialFocusId="initial-focus"
        content={
            <PopoverContent
                title="Title"
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                emphasized
                actions={({close}) => (
                    <View style={styles.row}>
                        <Button onClick={close} light={true} kind="secondary">
                            Previous
                        </Button>
                        <Strut size={Spacing.medium_16} />
                        <Button onClick={close} light={true} kind="primary" id="initial-focus">
                            Next
                        </Button>
                    </View>
                )}
            />
        }
    >
        <Button onClick={() => console.log('Custom click')}>Open emphasized popover</Button>
    </Popover>
</View>
```

### Example: Icon Popover

Decorate the popover with an illustrated icon. In order to use this variant, you
will need to set the `icon` prop inside the `PopoverContent`.

**NOTE:** When using this variant, make sure to avoid using `image` and/or
  `emphasized` at the same time. Doing so will throw an error.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <Popover
        placement="top"
        content={
            <PopoverContent
                title="Title"
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                icon="/logo.svg"
                closeButtonVisible
            />
        }
    >
        <Button>Open icon popover</Button>
    </Popover>
</View>
```

### Example: PopoverContent with illustration

This example shows a way to call attention to the popover using a full-bleed
illustration. In order to use this variant correctly, you will need to set the
`icon` prop inside the `PopoverContent`. Also, make sure to add a defined size
to the image.

**NOTE:** When using this variant, make sure to avoid using `icon` and/or
  `emphasized` at the same time. Doing so will throw an error.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <Popover
        placement="top"
        onClose={()=> console.log('popover closed!')}
        content={
            <PopoverContent
                title="Title"
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                image={<img src="/illustration.svg" width={288} height={200} />}
                closeButtonVisible
            />
        }
    >
        <Button>Open illustration popover</Button>
    </Popover>
</View>
```

## Accessibility

The Popover component should follow these guidelines:

**Trigger Element:**

- It should have a role of button (e.g. `<button>`).
- When the content is visible, it's recommended to set
  [aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) to true.
  When content is hidden,
  [aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) is set to
  false.
- It should reference the content using the
  [aria-controls](https://www.w3.org/TR/wai-aria-1.1/#aria-controls) attribute.

**Popover Dialog:**

The popover component will populate the
[aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
attribute automatically, unless the user sets an `id` prop inside the Popover
instance. Internally, it will be set on the trigger element.

### Keyboard Interaction

#### Initial focus

**NOTE:** This only applies when the popover is opened by clicking on a trigger
element.

When a popover is opened via a button, focus moves to an element inside the
Popover. The initial focus placement depends on the following scenarios:

1. initialFocusId (default): Popover exposes this prop as a string. The popover
   itself will try to find this element into the DOM. If it's found, focus is
   initially set on this element.

2. focusable elements: This is the second scenario, where the popover tries to
   find the first occurrence of possible focusable elements.

3. Popover: If the first two conditions are not met, then focus is initially set
   to the popover container.

#### Focus management

Once focus is in the popover, users can access controls within the popover
using:

1. **`tab`**: Moves focus to the next focusable element.

    **NOTE:** If the focus has reached the last focusable element inside the
   popover, the next tab will set focus on the next focusable element that
   exists after the PopoverAnchor.

2. **`shift + tab`**: Moves focus to the previous focusable element.

    **NOTE:** If the focus is set to the first focusable element inside the
   popover, the next shift + tab will set focus on the PopoverAnchor element.

#### Dismissing the popover

When a popover dialog closes, focus should return to the anchor element defined
in the Popover children prop.
