> TODO(scottgrant): Finish building, and write more thorough docs.

## Toolbar with title

```js
const dismissIcon =
    "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
const closeButton = (
    <svg role="img" width="24px" height="24px">
        <path d={dismissIcon} />
    </svg>
);

<Toolbar
	leftContent={closeButton}
	title="Counting with small numbers"
/>
```

## Toolbar with left and right content

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const dismissIcon =
    "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
const closeButton = (
    <svg role="img" width="24px" height="24px">
        <path d={dismissIcon} />
    </svg>
);

const startExercise = <Button>Next Video</Button>;

<Toolbar
	leftContent={closeButton}
	rightContent={startExercise}
	title="Counting with small numbers"
/>
```

## Toolbar with multiple elements on the right

```js
const Button = require("@khanacademy/wonder-blocks-button").default;
const {LabelMedium} = require("@khanacademy/wonder-blocks-typography");

const nextExercise = <Button>Next exercise</Button>;
const questionCount = <LabelMedium>7 questions</LabelMedium>;
const tryAgain = <Button kind="secondary">Try again</Button>;

<Toolbar
	rightContent={[questionCount, tryAgain, nextExercise]}
	showClose={false}
/>
```

## Header overflow text

```js
const Link = require("@khanacademy/wonder-blocks-link").default;

const dismissIcon =
    "M12.003 10.588L7.707 6.293a1 1 0 0 0-1.414 1.414l4.295 4.296-4.295 4.295a1 1 0 0 0 1.414 1.414l4.296-4.295 4.295 4.295a1 1 0 0 0 1.414-1.414l-4.295-4.295 4.295-4.296a1 1 0 1 0-1.414-1.414l-4.295 4.295z";
const closeButton = (
    <svg role="img" width="24px" height="24px">
        <path d={dismissIcon} />
    </svg>
);

const goToExercise = <Link>Go to exercise</Link>;

<Toolbar
	leftContent={closeButton}
	rightContent={goToExercise}
	subtitle="1 of 14 questions answered"
	title="Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious"
/>
```

## Inverted dark-colour scheme

```js
const {View} = require("@khanacademy/wonder-blocks-core");

const style = {
	backgroundColor: "#0a2a66",
	boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
	color: "white",
	height: 200,
};

<View style={style}>
	<Toolbar color="dark" showClose={true} title="Title" />
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</View>
```
