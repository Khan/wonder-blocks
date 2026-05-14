# Groups

---

## Core Border

```tsx
<ColorGroupStory
    category={semanticColor.core.border}
    group="core.border"
/>
```

---

## Core Background

```tsx
<ColorGroupStory
    category={semanticColor.core.background}
    group="core.background"
/>
```

---

## Core Foreground

```tsx
<ColorGroupStory
    category={semanticColor.core.foreground}
    group="core.foreground"
/>
```

---

## Feedback Info

```tsx
<ColorGroupStory
    category={semanticColor.feedback.info}
    group="feedback.info"
/>
```

---

## Feedback Success

```tsx
<ColorGroupStory
    category={semanticColor.feedback.success}
    group="feedback.success"
/>
```

---

## Feedback Warning

```tsx
<ColorGroupStory
    category={semanticColor.feedback.warning}
    group="feedback.warning"
/>
```

---

## Feedback Critical

```tsx
<ColorGroupStory
    category={semanticColor.feedback.critical}
    group="feedback.critical"
/>
```

---

## Feedback Neutral

```tsx
<ColorGroupStory
    category={semanticColor.feedback.neutral}
    group="feedback.neutral"
/>
```

---

## Focus

```tsx
<ColorGroup
    colors={semanticColor.focus}
    group="focus"
    valuePrefix={valuePrefix}
/>
```

---

## Input

```tsx
<ColorGroupStory
    category={semanticColor.input}
    group="input"
    includeExample={true}
/>
```

---

## Learning Math

```tsx
<ColorGroup
    colors={semanticColor.learning.math.foreground}
    group="learning.math.foreground"
/>
```

---

## Learning Border

```tsx
<ColorGroupStory
    category={semanticColor.learning.border}
    group="learning.border"
/>
```

---

## Learning Background

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

---

## Learning Foreground

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

---

## Learning Shadow

```tsx
<ColorGroupStory
    category={semanticColor.learning.shadow.progress}
    group="learning.shadow.progress"
/>
```

---

## Khanmigo

```tsx
<ColorGroup
    colors={semanticColor.khanmigo}
    group="khanmigo"
    valuePrefix={valuePrefix}
/>
```

---

## Mastery

```tsx
<ColorGroup
    colors={semanticColor.mastery}
    group="mastery"
    valuePrefix={valuePrefix}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Deprecated Semantic Colors](deprecated-deprecated-semantic-colors.md)
- [Deprecated Spacing Deprecated](deprecated-spacing-deprecated.md)
- [Media Query Breakpoints](media-query-breakpoints.md)
- [Semantic Color](semantic-color.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
