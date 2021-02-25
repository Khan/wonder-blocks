### Small toolbar example:

```js
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const buttonStyle = { width: 160 };

const smallButton = (
    <Button size="small" style={buttonStyle}>
        Small button
    </Button>
);

const strut = <Strut size={16}/>;

const secondaryButton = (
    <Button size="small" kind="secondary" style={buttonStyle}>
        Secondary button
    </Button>
);

const rightContent = <React.Fragment>
    {smallButton}
    {strut}
    {secondaryButton}
</React.Fragment>;

<Toolbar size="small" rightContent={rightContent}/>
```

### Small toolbar with multiple left side buttons:

**Note:** The `IconButton`s are nudged to the left by 1px to match designs.

```js
import {icons} from "@khanacademy/wonder-blocks-icon";
import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const zoomOutButton = <IconButton icon={icons.zoomOut} kind="primary"/>;
const zoomInButton = <IconButton icon={icons.zoomIn} kind="primary"/>;

const strut = <Strut size={16}/>;

const linkButton = (
    <Button kind="tertiary">
        Import...
    </Button>
);

const leftContent = <React.Fragment>
    {zoomOutButton}
    {strut}
    {zoomInButton}
</React.Fragment>;

<Toolbar size="small" leftContent={leftContent} rightContent={linkButton} />
```

### Toolbar with left icon button and right primary button:

**Note:** The `IconButton` is nudged to the left by 4px to match designs.

```js
import {icons} from "@khanacademy/wonder-blocks-icon";
import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const hintButton = <IconButton icon={icons.hint} kind="primary"/>;

const mainButton = (
    <Button kind="primary">
        Submit
    </Button>
);

<Toolbar leftContent={hintButton} rightContent={mainButton} />
```

### Toolbar with title

**Note:** The `IconButton` is nudged to the left by 6px to match designs.

```js
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary"/>;

<Toolbar
    leftContent={closeButton}
    title="Counting with small numbers"
/>
```

### Toolbar with left and right content

**Note:** The `IconButton` is nudged to the left by 6px to match designs.

```js
import Button from "@khanacademy/wonder-blocks-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary"/>;
const startExercise = <Button>Next Video</Button>;

<Toolbar
    leftContent={closeButton}
    rightContent={startExercise}
    title="Counting with small numbers"
/>
```

### Toolbar with multiple elements on the right

```js
import Button from "@khanacademy/wonder-blocks-button";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const buttonStyle = { width: 140 };

const nextExercise = <Button style={buttonStyle}>Next exercise</Button>;
const questionCount = <LabelLarge>7 questions</LabelLarge>;
const tryAgain = <Button style={buttonStyle} kind="secondary">Try again</Button>;
const strut = <Strut size={16}/>;

const rightContent = <React.Fragment>
    {questionCount}
    {strut}
    {tryAgain}
    {strut}
    {nextExercise}
</React.Fragment>;

<Toolbar rightContent={rightContent}/>
```

### Header overflow text

**Note:** The `IconButton` is nudged to the left by 6px to match designs.

```js
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";

const closeButton = <IconButton icon={icons.dismiss} kind="tertiary"/>;

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
import {View} from "@khanacademy/wonder-blocks-core";

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
