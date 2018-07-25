### Small toolbar example:

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const buttonStyle = { width: 160 };

const smallButton = (
    <Button size="small" style={buttonStyle}>
        Small button
    </Button>
);
const secondaryButton = (
    <Button size="small" kind="secondary" style={buttonStyle}>
        Secondary button
    </Button>
);

<Toolbar size="small" rightContent={[smallButton, secondaryButton]} />
```

### Toolbar with title

```js
const {icons} = require("@khanacademy/wonder-blocks-icon");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary" style={{ marginLeft: -12 }} />;

<Toolbar
    leftContent={closeButton}
    title="Counting with small numbers"
/>
```

### Toolbar with left and right content

```js
const Button = require("@khanacademy/wonder-blocks-button").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary" style={{ marginLeft: -12 }} />;
const startExercise = <Button>Next Video</Button>;

<Toolbar
    leftContent={closeButton}
    rightContent={startExercise}
    title="Counting with small numbers"
/>
```

### Toolbar with multiple elements on the right

```js
const Button = require("@khanacademy/wonder-blocks-button").default;
const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");

const buttonStyle = { width: 140 };

const nextExercise = <Button style={buttonStyle}>Next exercise</Button>;
const questionCount = <LabelLarge>7 questions</LabelLarge>;
const tryAgain = <Button style={buttonStyle} kind="secondary">Try again</Button>;

<Toolbar
    rightContent={[questionCount, tryAgain, nextExercise]}
/>
```

### Header overflow text

```js
const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;
const Link = require("@khanacademy/wonder-blocks-link").default;
const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary" style={{ marginLeft: -12 }} />;

const goToExercise = (
    <Link href="#">
        <LabelLarge>Go to exercise</LabelLarge>
    </Link>
);

<Toolbar
    leftContent={closeButton}
    rightContent={goToExercise}
    subtitle="1 of 14 questions answered"
    title="Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious"
/>
```

### Inverted dark-colour scheme

```js
const {View} = require("@khanacademy/wonder-blocks-core");

const style = {
    backgroundColor: "#0a2a66",
    boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
    color: "white",
    height: 200,
};

<View style={style}>
    <Toolbar color="dark" title="Title" />
</View>
```
