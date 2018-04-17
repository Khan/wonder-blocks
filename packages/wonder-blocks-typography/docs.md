```js
<Title>Title</Title>
<HeadingLarge>HeadingLarge</HeadingLarge>
<HeadingMedium>HeadingMedium</HeadingMedium>
<HeadingSmall>HeadingSmall</HeadingSmall>
<HeadingXSmall>HeadingXSmall</HeadingXSmall>
<BodySerifBlock>BodySerifBlock</BodySerifBlock>
<BodySerif>BodySerif</BodySerif>
<BodyMonospace>BodyMonospace</BodyMonospace>
<Body>Body</Body>
<LabelLarge>LabelLarge</LabelLarge>
<LabelMedium>LabelMedium</LabelMedium>
<LabelSmall>LabelSmall</LabelSmall>
<LabelXSmall>LabelXSmall</LabelXSmall>
<Tagline>Tagline</Tagline>
<Caption>Caption</Caption>
<Footnote>Footnote</Footnote>
```

You can change the color of text with the `color` prop:

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
