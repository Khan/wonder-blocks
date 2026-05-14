# Color

Colors are a key part of our design system. They help us communicate information
and create visual hierarchy. This document outlines the semantic colors we use
in our product and how these are reflected in our primitive tokens.

## Semantic Colors

Semantic colors are a key part of our design system. They help us communicate
the intent of a given color and create visual hierarchy. This document outlines
how to use these colors depending on the context.

    <Banner
        kind="info"
        text="This is the recommended approach. To use these colors in your project, check out the corresponding tokens page."
        actions={[
            {
                type: "custom",
                // NOTE: This is a hack to bypass a Storybook bug where the
                // link doesn't work correctly with iframes.
                node: (
                    <a
                        href="./?path=/docs/packages-tokens-semantic-color--docs"
                        target="_blank"
                    >
                        Semantic Color tokens
                    </a>
                ),
            },
        ]}
    />

### Core

Core colors are used for the most common elements in the UI. These colors are
used for backgrounds, borders, and text. They are the foundation of our color
system and are used to create a consistent look and feel across the product.

#### Border

Borders define structure for elements. Generally borders for component elements
would use `core.border.neutral.subtle`, `core.border.neutral.default` for when
3:1 contrast is a priority (ex. form elements) and `core.border.neutral.strong`
for 4.5:1 contrast.

```tsx
<ColorGroupStory
    category={semanticColor.core.border}
    group="core.border"
/>
```

#### Background

Background colors are used to define the background of elements. This includes
the background of components like buttons, banners, and other elements that
require a background color.

```tsx
<ColorGroupStory
    category={semanticColor.core.background}
    group="core.background"
/>
```

#### Foreground

Foreground colors are used to define the foreground of elements. This includes
the text and icons that are displayed on top of the background color. This is
important for ensuring that the text and icons are legible and accessible.

<Banner
    kind="success"
    text="Make sure to use these colors consistently to ensure readability and accessibility. This includes checking contrast ratios for text and background colors."
    actions={[
        {
            type: "custom",
            node: (
                <a
                    href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
                    target="_blank"
                >
                    WCAG Guidelines - Contrast (minimum)
                </a>
            ),
        },
    ]}
/>

```tsx
<ColorGroupStory
    category={semanticColor.core.foreground}
    group="core.foreground"
/>
```

### Feedback

For elements where color can add meaning to the state of the system or an item
in the system.

<Banner
    kind="success"
    text="Make sure to use these colors consistently to communicate the same meaning
and include an icon or label to provide more context and clarity."
    actions={[
        {
            type: "custom",
            node: (
                <a
                    href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
                    target="_blank"
                >
                    WCAG Guidelines - Contrast (minimum)
                </a>
            ),
        },
    ]}
/>

#### Info

```tsx
<ColorGroupStory
    category={semanticColor.feedback.info}
    group="feedback.info"
/>
```

#### Success

```tsx
<ColorGroupStory
    category={semanticColor.feedback.success}
    group="feedback.success"
/>
```

#### Warning

```tsx
<ColorGroupStory
    category={semanticColor.feedback.warning}
    group="feedback.warning"
/>
```

#### Critical

```tsx
<ColorGroupStory
    category={semanticColor.feedback.critical}
    group="feedback.critical"
/>
```

#### Neutral

```tsx
<ColorGroupStory
    category={semanticColor.feedback.neutral}
    group="feedback.neutral"
/>
```

### Focus

For focus states on interactive elements. This is meant to be used globally for
all interactive elements regardless of the state (disabled, error, etc).

- `outer`: The outer ring of the focus state.
- `inner`: The inner ring of the focus state.

```tsx
<ColorGroup
    colors={semanticColor.focus}
    group="focus"
    valuePrefix={valuePrefix}
/>
```

### Input

For form elements, inputs, and other interactive elements that require user
interaction. This includes text inputs, checkboxes, radio buttons, and
selects. These colors are used to communicate the state of the input and its
validity.

```tsx
<ColorGroupStory
    category={semanticColor.input}
    group="input"
    includeExample={true}
/>
```

### Learning

Learning colors are used for elements that are related to learning experiences,
such as practice and mastery, among others.

#### Math

For MathJax elements, these colors are used to render mathematical expressions
in the UI.

```tsx
<ColorGroup
    colors={semanticColor.learning.math.foreground}
    group="learning.math.foreground"
/>
```

#### Border

```tsx
<ColorGroupStory
    category={semanticColor.learning.border}
    group="learning.border"
/>
```

#### Background

```tsx
<>
    <ColorGroupStory
        category={{
            gems: semanticColor.learning.background.gems,
            streaks: semanticColor.learning.background.streaks,
            due: semanticColor.learning.background.due,
        }}
        group="learning.background"
    />
    <ColorGroupStory
        category={semanticColor.learning.background.progress}
        group="learning.background.progress"
    />
</>
```

#### Foreground

```tsx
<>
    <ColorGroupStory
        category={{
            gems: semanticColor.learning.foreground.gems,
            streaks: semanticColor.learning.foreground.streaks,
            due: semanticColor.learning.foreground.due,
        }}
        group="learning.foreground"
    />
    <ColorGroupStory
        category={semanticColor.learning.foreground.progress}
        group="learning.foreground.progress"
    />
</>
```

#### Shadow

```tsx
<ColorGroupStory
    category={semanticColor.learning.shadow.progress}
    group="learning.shadow.progress"
/>
```

### Khanmigo

Colors to be used exclusively for Khanmigo or to communicate a relationship to
it.

```tsx
<ColorGroup
    colors={semanticColor.khanmigo}
    group="khanmigo"
    valuePrefix={valuePrefix}
/>
```

### Mastery

Standalone colors used only for communicating mastery.

```tsx
<ColorGroup
    colors={semanticColor.mastery}
    group="mastery"
    valuePrefix={valuePrefix}
/>
```

## Accessibility

When using color, it is important to consider accessibility. The contrast
between text and background colors should be high enough to ensure readability
for all users. The <a
href="https://www.w3.org/WAI/WCAG22/Understanding/distinguishable">Web Content
Accessibility Guidelines (WCAG)</a> provide guidance on how to ensure that our
content is accessible to all users.

For more detail, you can check the following Success Criteria documents:

- <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color">
      Use of Color
  </a>
- <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum">
      Contrast (minimum)
  </a>
- <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast">
      Non-text Contrast (Level AA)
  </a>

## Deprecated semantic colors

To reference the semantic colors that have been deprecated and will be removed
in the future, see [Deprecated Semantic Colors](./?path=/docs/packages-tokens-deprecated-deprecated-semantic-colors--docs)


---

## Related docs

- [Overview](overview.md)
- [Gallery](gallery.md)
- [Get Started](get-started.md)
