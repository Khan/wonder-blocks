## Product

Use only accessible colors against appropriate backgrounds for links, buttons, and other navigational elements.

```js
const {StyleSheet} = require("aphrodite");

const {View} = require("wonder-blocks-core");
const Swatch = require("./docutils/swatch").default;

const Color = require("./index").default;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        height: 768,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.blue}
        name="Blue" 
        use="text"
        desc="Actionable. Used to indicate actionable items like links and buttons."
    />
    <Swatch 
        color={Color.purple} 
        name="Purple" 
        use="text"
        desc="Used to indicate Mastery."
    />
    <Swatch 
        color={Color.gold} 
        name="Gold" 
        segments={1}
        desc="Used as an accent for celebratory moments. If using for icons, accompany with descriptive text."
    />
    <Swatch 
        color={Color.green} 
        name="Green" 
        use="icon"
        desc="Affirmative. Used to indicate success states and correctness. Do not use for text."
    />
    <Swatch 
        color={Color.red} 
        name="Red" 
        use="text"
        desc="Negative. Used for errors and destructive actions."
    />
</View>
```

## Neutral

Used for text and chrome components

```js
const {StyleSheet} = require("aphrodite");

const {View} = require("wonder-blocks-core");
const Swatch = require("./docutils/swatch").default;

const Color = require("./index").default;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        height: 768 + 256,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.offBlack}
        name="Off-Black" 
        use="text"
        desc="Primary text color. Can also used for links in lists."
    />
    <Swatch 
        color={Color.offBlack64}
        name="Off-Black 64%" 
        use="text"
        desc="Secondary text color and modal backdrop color."
    />
    <Swatch 
        color={Color.offBlack50}
        name="Off-Black 50%" 
        desc="Fieldset borders"
        width={256}
        segments={1}
    />
    <Swatch 
        color={Color.offBlack32}
        name="Off-Black 32%" 
        desc="Disabled states"
        width={256}
        segments={1}
    />
    <Swatch 
        color={Color.offBlack16}
        name="Off-Black 16%" 
        desc="Hairline color"
        width={256}
        segments={1}
    />
    <Swatch 
        color={Color.offBlack8}
        name="Off-Black 8%"
        desc="Shadow color"
        width={256}
        segments={1}
    />
    <Swatch 
        color={Color.offWhite}
        name="Off-White"
        desc="Only used as a secondary background color"
        width={256}
        segments={1}
    />
</View>
```

## Brand

Use for designing anything centered around Khan Academy as a brand. Secondary brand colors should only be used for decoration. Expanded brand palette used for illustrations.

```js
const {StyleSheet} = require("aphrodite");

const {View} = require("wonder-blocks-core");
const Swatch = require("./docutils/swatch").default;

const Color = require("./index").default;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        height: 768,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.darkBlue}
        name="Dark Blue"
        segments={1}
        desc="Primary brand color. Can be used as a background color in headers and illustrative areas."
    />
    <Swatch 
        color={Color.teal} 
        name="Teal" 
        segments={1}
        desc="Secondary brand color. This is only accessible on Dark Blue, so use lightly."
    />
    <Swatch 
        color={Color.lightBlue} 
        name="Light Blue" 
        segments={1}
        desc="Secondary brand color. This is only accessible on Dark Blue, so use lightly."
    />
    <Swatch 
        color={Color.pink} 
        name="Pink" 
        segments={1}
        desc="Secondary brand color."
    />
</View>
```
