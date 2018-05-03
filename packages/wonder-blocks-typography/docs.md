```js
const {View} = require("wonder-blocks-core");

// NOTE(mdr): I added an `id` attribute to each of these tags, to ensure that
//     they all pass the `id` attribute correctly. This fact will be saved in
//     snapshot tests.
<View>
    <Title id="example-Title">Title</Title>
    <HeadingLarge id="example-HeadingLarge">HeadingLarge</HeadingLarge>
    <HeadingMedium id="example-HeadingMedium">HeadingMedium</HeadingMedium>
    <HeadingSmall id="example-HeadingSmall">HeadingSmall</HeadingSmall>
    <HeadingXSmall id="example-HeadingXSmall">HeadingXSmall</HeadingXSmall>
    <BodySerifBlock id="example-BodySerifBlock">BodySerifBlock</BodySerifBlock>
    <BodySerif id="example-BodySerif">BodySerif</BodySerif>
    <BodyMonospace id="example-BodyMonospace">BodyMonospace</BodyMonospace>
    <Body id="example-Body">Body</Body>
    <LabelLarge id="example-LabelLarge">LabelLarge</LabelLarge>
    <LabelMedium id="example-LabelMedium">LabelMedium</LabelMedium>
    <LabelSmall id="example-LabelSmall">LabelSmall</LabelSmall>
    <LabelXSmall id="example-LabelXSmall">LabelXSmall</LabelXSmall>
    <Tagline id="example-Tagline">Tagline</Tagline>
    <Caption id="example-Caption">Caption</Caption>
    <Footnote id="example-Footnote">Footnote</Footnote>
</View>
```

You can change the color of text with the `style` prop:

```js
const Color = require("wonder-blocks-color").default;
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    blueText: {
        color: Color.blue,
    },
});

<Title style={styles.blueText}>Blue Title</Title>
```
