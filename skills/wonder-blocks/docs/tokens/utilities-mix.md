# mix()

The `mix` function allows you to mix a color into a background color, using the
alpha channel of the base color to determine the linear blend.

## Usage

```js
import {mix} from "@khanacademy/wonder-blocks-tokens";

mix(color: string, background: string): string;
```

## API

| Argument     | TypeScript Type | Default    | Description                                      |
| ------------ | --------------- | ---------- | ------------------------------------------------ |
| `color`      | `string`        | _Required_ | The base color                                   |
| `background` | `string`        | _Required_ | The background color used to determine the blend |

## Example

This example shows how to mix a color with a background color. In this case, we
are using an alpha channel of `0.32` for the base color, and a solid color for
the background. The result is a color that is a linear blend of the two colors.

```typescript
import {color, mix} from "@khanacademy/wonder-blocks-tokens";

const mixedColor = mix(color.offBlack32, color.white);
const mixedColor2 = mix(color.white32, color.blue);
```

    <ColorItem colors={{color: color.offBlack32}} />
    <PhosphorIcon icon={plusIcon} size="large" aria-label="plus" />
    <ColorItem colors={{background: color.white}} />
    <PhosphorIcon icon={equalsIcon} size="large" aria-label="equals" />
    <ColorItem colors={{result: mixedColor}} />

    <ColorItem colors={{color: color.white32}} />
    <PhosphorIcon icon={plusIcon} size="large" aria-label="plus" />
    <ColorItem colors={{background: color.blue}} />
    <PhosphorIcon icon={equalsIcon} size="large" aria-label="equals" />
    <ColorItem colors={{result: mixedColor2}} />


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
- [Utilities Fade](utilities-fade.md)
