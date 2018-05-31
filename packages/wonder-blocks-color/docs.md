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
        height: 384,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.blue}
        name="blue" 
        use="text"
        desc="Actionable. Used to indicate actionable items like links and buttons."
    />
    <Swatch 
        color={Color.purple} 
        name="purple" 
        use="text"
        desc="Used to indicate Mastery."
    />
    <Swatch 
        color={Color.green} 
        name="green" 
        use="icons"
        desc="Affirmative. Used to indicate success states and correctness. Do not use for text."
    />
    <Swatch 
        color={Color.red} 
        name="red" 
        use="text"
        desc="Negative. Used for errors and destructive actions."
    />
     <Swatch 
        color={Color.gold} 
        name="gold" 
        segments={1}
        desc="Used as an accent for celebratory moments. If using for icons, accompany with descriptive text."
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
        height: 580,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.offBlack}
        name="offBlack" 
        use="text"
        desc="Primary text color. Can also used for links in lists."
    />
    <Swatch 
        color={Color.offBlack64}
        name="offBlack64" 
        use="text"
        desc="Secondary text color and modal backdrop color."
    />
    <Swatch 
        color={Color.offBlack50}
        name="offBlack50" 
        desc="Fieldset borders"
        segments={1}
    />
    <Swatch 
        color={Color.offBlack32}
        name="offBlack32" 
        desc="Disabled states"
        segments={1}
    />
    <Swatch 
        color={Color.offBlack16}
        name="offBlack16" 
        desc="Hairline color"
        segments={1}
    />
    <Swatch 
        color={Color.offBlack8}
        name="offBlack8"
        desc="Shadow color"
        segments={1}
    />
    <Swatch 
        color={Color.offWhite}
        name="offWhite"
        desc="Only used as a secondary background color"
        segments={1}
    />
    <Swatch 
        color={Color.darkBlue}
        name="white"
        desc="Primary background color and primary text color on colored backgrounds."
        use="text"
        segments={2}
    />
    <Swatch 
        color={Color.darkBlue}
        name="white64"
        desc="Secondary text color on colored backgrounds, and hairline color on colored backgrounds"
        use="text"
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
        height: 384,
    },
});

<View style={styles.container}>
    <Swatch 
        color={Color.darkBlue}
        name="darkBlue"
        segments={1}
        desc="Primary brand color. Can be used as a background color in headers and illustrative areas."
    />
    <Swatch 
        color={Color.teal} 
        name="teal" 
        segments={1}
        desc="Secondary brand color. This is only accessible on Dark Blue, so use lightly."
    />
    <Swatch 
        color={Color.lightBlue} 
        name="lightBlue" 
        segments={1}
        desc="Secondary brand color. This is only accessible on Dark Blue, so use lightly."
    />
    <Swatch 
        color={Color.pink} 
        name="pink" 
        segments={1}
        desc="Secondary brand color."
    />
</View>
```
