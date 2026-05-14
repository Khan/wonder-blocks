# fade()

The `fade` function adjusts the alpha value of a color.

## Usage

```js
import {fade} from "@khanacademy/wonder-blocks-tokens";

fade(color: string, percentage: number): string;
```

## API

| Argument     | TypeScript Type | Default    | Description          |
| ------------ | --------------- | ---------- | -------------------- |
| `color`      | `string`        | _Required_ | The base color       |
| `percentage` | `number`        | _Required_ | The alpha percentage |

## Example

This example shows how to use the `fade` function to adjust the alpha value of a
color. The `fade` function takes a color and a percentage as arguments and
returns a new color with the adjusted alpha value.

```typescript
import {color, fade} from "@khanacademy/wonder-blocks-tokens";

const fadedPurple64 = fade(color.purple, 0.64);
const fadedGreen50 = fade(color.green, 0.5);
```

    <ColorItem colors={{color: color.purple}} />
    <PhosphorIcon icon={plusIcon} size="large" aria-label="plus" />
    <PhosphorIcon icon={equalsIcon} size="large" aria-label="equals" />
    <ColorItem colors={{result: fadedPurple64}} />

    <ColorItem colors={{color: color.green}} />
    <PhosphorIcon icon={plusIcon} size="large" aria-label="plus" />
    <PhosphorIcon icon={equalsIcon} size="large" aria-label="equals" />
    <ColorItem colors={{result: fadedGreen50}} />


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
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Mix](utilities-mix.md)
