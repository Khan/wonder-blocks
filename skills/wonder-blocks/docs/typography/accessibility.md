## Typography Accessibility

### Rules of Thumb

* The font size should be large enough for the text to be readable. The
  font size for the Wonder Blocks Typography `Body` element is currently
  set to be 16px. Headings are even larger.
  * Each Wonder Blocks Typography component has its own predetermined
    font size - this cannot be updated by the user via the `styles` prop.
* The color contrast should pass WCAG.
  * "WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for
    normal text and 3:1 for large text." [(Contrast Checker, WebAIM)](https://webaim.org/resources/contrastchecker/).
* It is best to use a familiar font that is easy to read. By default,
  most Wonder Blocks Typography elements use Lato (a sans-serif font) for
  Latin-based languages, and Noto for Non-Latin languages such as Arabic,
  Armenian, Greek, and Hebrew. The `BodySerif` and `BodySerifBlock`
  components use the Noto Serif font.
  * Note that sans-serif fonts are generally recommended for use on web,
    but serif fonts may be preferable for some users, such as users with
    dyslexia.
* There should be adequate line spacing in order to make text easier to read.
  Each Wonder Blocks Typography component has its own predetermined
  line height - this cannot be updated by the user via the `styles` prop.

More information about all these points and more can be found in the
[References](#references) below.

### Demo: Font size

```tsx
<View>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.xCircle}
            style={styles.incorrect}
        />
        <Body>
            The following text is too small for body text (10px):
        </Body>
    </View>
    <View>
        <p
            style={{
                fontSize: "10px",
            }}
        >
            The quick brown fox jumps over the lazy dog.
        </p>
    </View>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.checkCircle}
            style={styles.correct}
        />
        <Body>
            The following text is adequate for body text (16px):
        </Body>
    </View>
    <Body>The quick brown fox jumps over the lazy dog</Body>
</View>
```

### Demo: Color contrast

```tsx
<View>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.xCircle}
            style={styles.incorrect}
        />
        <Body>
            The color contrast for the following text is too low:
        </Body>
    </View>
    <Body
        style={{
            // NOTE: Using disabled on purpose to demonstrate the
            // contrast ratio issue.
            color: semanticColor.core.foreground.disabled.default,
        }}
    >
        The quick brown fox jumps over the lazy dog
    </Body>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.checkCircle}
            style={styles.correct}
        />
        <Body>
            The color contrast for the following text is adequate:
        </Body>
    </View>
    <Body
        style={{
            color: semanticColor.core.foreground.neutral.strong,
        }}
    >
        The quick brown fox jumps over the lazy dog
    </Body>
</View>
```

### Demo: Line spacing

```tsx
<View>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.xCircle}
            style={styles.incorrect}
        />
        <Body>The following line spacing is too small:</Body>
    </View>
    <View>
        <p
            style={{
                lineHeight: 1,
            }}
        >
            Khan Academy offers practice exercises, instructional
            videos, and a personalized learning dashboard that empower
            learners to study at their own pace in and outside of the
            classroom. We tackle math, science, computing, history, art
            history, economics, and more, including K-14 and test
            preparation (SAT, Praxis, LSAT) content. We focus on skill
            mastery to help learners establish strong foundations, so
            there is no limit to what they can learn next!
        </p>
    </View>
    <View style={styles.explanation}>
        <PhosphorIcon
            icon={IconMappings.checkCircle}
            style={styles.correct}
        />
        <Body>The following line spacing is adequate:</Body>
    </View>
    <Body>
        Khan Academy offers practice exercises, instructional videos,
        and a personalized learning dashboard that empower learners to
        study at their own pace in and outside of the classroom. We
        tackle math, science, computing, history, art history,
        economics, and more, including K-14 and test preparation (SAT,
        Praxis, LSAT) content. We focus on skill mastery to help
        learners establish strong foundations, so there is no limit to
        what they can learn next!
    </Body>
</View>
```

### References

* [Typefaces and Fonts - WebAIM](https://webaim.org/techniques/fonts/)
* [Contrast Checker - WebAIM](https://webaim.org/resources/contrastchecker)


---

## Related docs

- [Body](body.md)
- [Body Monospace](body-monospace.md)
- [Body Serif](body-serif.md)
- [Body Serif Block](body-serif-block.md)
- [Body Text New](body-text-new.md)
- [Caption](caption.md)
- [Footnote](footnote.md)
- [Heading Large](heading-large.md)
- [Heading Medium](heading-medium.md)
- [Heading New](heading-new.md)
- [Heading Small](heading-small.md)
- [Heading Xsmall](heading-xsmall.md)
- [Label Large](label-large.md)
- [Label Medium](label-medium.md)
- [Label Small](label-small.md)
- [Label Xsmall](label-xsmall.md)
- [Tagline](tagline.md)
- [Title](title.md)
