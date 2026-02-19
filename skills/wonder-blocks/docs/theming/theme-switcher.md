# `ThemeSwitcher`

`ThemeSwitcher` is a component that wraps a children with a reference to the
selected theme. This uses a combination of custom data attributes
(`data-wb-theme`) and CSS variables to apply the theme to the children. The
default CSS variables are defined in the `:root` selector, and the
theme-specific CSS variables are defined in the `data-wb-theme` selector. For
more info about the CSS variables, see the
`@khanacademy/wonder-blocks-tokens/styles.css` file.

## Usage

```tsx
import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";

<ThemeSwitcher theme="default">
    <Button>Themed button</Button>
</ThemeSwitcher>;
```

This example demonstrates how to use the `ThemeSwitcher` component to switch
between themes.

<!-- Could not resolve: ThemeSwitcherStories.Default -->

This example demonstrates that components using the 'default' theme can be
nested within components using the 'thunderblocks' theme.

<!-- Could not resolve: ThemeSwitcherStories.Nested -->


---

## Related docs

- [Overview](overview.md)
- [Merge Theme](merge-theme.md)
