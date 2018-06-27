> TODO(scottgrant): Finish building, and write more thorough docs.

## Content toolbar

### Standard view

```js
<Toolbar
	contentKind="Video"
	showClose={true}
	title="Counting with small numbers"
/>
```

### Content completed view

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const startExercise = <Button>Next Video</Button>;

<Toolbar
	contentKind="Video"
	rightContent={[startExercise]}
	showClose={false}
	title="Counting with small numbers"
/>
```

## Exercise toolbar

### Generic header

```js
const Link = require("@khanacademy/wonder-blocks-link").default;

// TODO(scottgrant): This is a placeholder icon. The icon in Zeplin was rotated.
const caretPath = "M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z";
const caretIcon = (
    <svg role="img" width="24px" height="24px">
        <path fill="#1865f2" d={caretPath} />
    </svg>
);
//const goToExercise = <Link>Go to exercise {caretIcon}</Link>;
const goToExercise = <a href="#">Go to exercise</a>;

<Toolbar
	rightContent={[goToExercise]}
	showClose={true}
	subtitle="0 of 7 questions answered"
	title="Exercise Title"
/>
```

### Start of task card

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const questionCount = <span>7 questions</span>;
const startExercise = <Button>Start exercise</Button>;

<Toolbar
	rightContent={[questionCount, startExercise]}
	showClose={false}
/>
```

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const nextExercise = <Button>Next exercise</Button>;
const questionCount = <span>7 questions</span>;
const tryAgain = <Button kind="secondary">Try again</Button>;

<Toolbar
	rightContent={[questionCount, tryAgain, nextExercise]}
	showClose={false}
/>
```

### End of task card

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const circle = (size, fill, border) => {
	const style = {
		backgroundColor: fill,
		border: `2px solid ${border}`,
		borderRadius: "50%",
		display: "inline-block",
		height: size,
		width: size,
	};
	const outerStyle = {
		display: "flex",
    	flexDirection: "column",
    	justifyContent: "center",
		margin: 3,
	};

	return (
		<span style={outerStyle}>
			<span style={style} />
		</span>
	);
}

const circleComplete = circle(4, "#00a60e", "#00a60e");
const circleActive = circle(8, "#00a60e", "#00a60e");
const circleIncomplete = circle(4, "white", "rgba(33, 36, 44, 0.2)");
const circleStyle = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
};
const questionCount = (
	<span style={circleStyle}>
		<span style={{marginRight: 12}}>Get 5 of 7 questions to level up to Familiar</span>
		{circleComplete} {circleComplete}
		{circleActive}
		{circleIncomplete} {circleIncomplete} {circleIncomplete} {circleIncomplete}
	</span>
);
const nextQuestion = <Button>Next question</Button>;

<Toolbar
	rightContent={[questionCount, nextQuestion]}
	showClose={false}
/>
```

### Header overflow text

```js
const Link = require("@khanacademy/wonder-blocks-link").default;

// TODO(scottgrant): This is a placeholder icon. The icon in Zeplin was rotated.
const caretPath = "M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z";
const caretIcon = (
    <svg role="img" width="24px" height="24px">
        <path fill="#1865f2" d={caretPath} />
    </svg>
);
//const goToExercise = <Link>Go to exercise {caretIcon}</Link>;
const goToExercise = <a href="#">Go to exercise</a>;

<Toolbar
	contentKind="Exercise"
	rightContent={[goToExercise]}
	showClose={true}
	subtitle="1 of 14 questions answered"
	title="Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious"
/>
```

## Video & Article toolbars

```js
<Toolbar
	showClose={true}
	title="Title"
/>
```

```js
const Button = require("@khanacademy/wonder-blocks-button").default;

const startExercise = <Button>Next Video</Button>;

<Toolbar
	rightContent={[startExercise]}
	showClose={false}
/>
```

## Inverted dark-colour scheme

```js
const style = {
	backgroundColor: "#0a2a66",
	boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.64)",
	color: "white",
};

<Toolbar
	showClose={true}
	style={style}
	title="Title"
/>
```
