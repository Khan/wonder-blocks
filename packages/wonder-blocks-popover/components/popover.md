#### Example: Opening a popover using a trigger element

This example shows a popover adorning the same element that triggers it. This
is accomplished by passing a function as children and using the `open` property
passed it as the `onClick` handler on a button in this example.

**NOTES:**
- You will always need to add a trigger element inside the Popover to
control when and/or from where to open the popover dialog.
- For this example, if you use the `image` prop, make sure to avoid using `icon`
  and/or `emphasized` at the same time. Doing so will throw an error.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <Popover
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

#### Example: Opening a popover programmatically

Sometimes you'll want to trigger a popover programmatically. This can be done by
setting the `opened` prop to `true`. In this situation the `Popover` is a
controlled component. The parent is responsible for managing the opening/closing
of the popover when using this prop. This means that you'll also have to update
`opened` to false in response to the onClose callback being triggered.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const {HeadingSmall, LabelLarge} = require("@khanacademy/wonder-blocks-typography");

const customIcon = {
    small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
};

const styles = StyleSheet.create({
    example: {
        paddingTop: Spacing.medium * 15
    },
    customPopover: {
        maxWidth: Spacing.medium * 25,
        width: Spacing.medium * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small}px 0`
    },
    action: {
        cursor: "pointer",
        margin: Spacing.small,
        padding: Spacing.xxSmall,
        alignItems: "center",
        justifyContent: "center"
    },
});

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
                                    <View style={styles.action} onClick={close}>
                                        <Icon
                                            icon={customIcon}
                                            color={Color.gold}
                                            size="large"
                                        />
                                        <LabelLarge>Option 1</LabelLarge>
                                    </View>
                                    <View style={styles.action} onClick={close}>
                                        <Icon
                                            icon={customIcon}
                                            color={Color.green}
                                            size="large"
                                        />
                                        <LabelLarge>Option 2</LabelLarge>
                                    </View>
                                    <View style={styles.action} onClick={close}>
                                        <Icon
                                            icon={customIcon}
                                            color={Color.blue}
                                            size="large"
                                        />
                                        <LabelLarge>Option 3</LabelLarge>
                                    </View>
                                </View>
                            </View>
                        </PopoverContentCore>
                    }
                >
                    <Button onClick={() => console.log('This is a controlled popover.')}>
                        Anchor element (it doesn't open the popover)
                    </Button>
                </Popover>
                <Strut size={Spacing.xLarge} />
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

### Variants

#### Example: Text-only popover (with emphasis and actions)

This example shows the default popover variant. By default, it only includes
`title` and `content`, but you can add more optional props, such as
`emphasized`, `closeButtonVisible` and `actions`.

**NOTE:** If you use `actions`, you can use it with the following alternatives:
1) Passing a Node that contains the actions to be executed. In this case, you'll
   need to manage the internal logic of each action.
2) Passing a function as children and using the `close` property passed it as
   the `onClick` handler on each action inside this example.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");

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
                closeButtonVisible
                title="Title"
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                emphasized
                actions={({close}) => (
                    <Button onClick={close} light={true} kind="primary">
                        Continue
                    </Button>
                )}
            />
        }
    >
        <Button onClick={() => console.log('Custom click')}>Open emphasized popover</Button>
    </Popover>
</View>
```

#### Example: Icon Popover

Decorate the popover with an illustrated icon. In order to use this variant, you
will need to set the `icon` prop inside the `PopoverContent`.

**NOTE:** When using this variant, make sure to avoid using `image` and/or
  `emphasized` at the same time. Doing so will throw an error.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");

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
                icon="/logo.svg"
                closeButtonVisible
            />
        }
    >
        <Button>Open icon popover</Button>
    </Popover>
</View>
```

#### Example: PopoverContent with illustration

This example shows a way to call attention to the popover using a full-bleed
illustration. In order to use this variant correctly, you will need to set the
`icon` prop inside the `PopoverContent`. Also, make sure to add a defined size
to the image.

**NOTE:** When using this variant, make sure to avoid using `icon` and/or
  `emphasized` at the same time. Doing so will throw an error.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");

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

### Accessibility notes
The popover component will populate the `aria-describedby` attribute
automatically, unless the user sets an `id` prop inside the Popover instance.
Internally, it will be set on the trigger element.
