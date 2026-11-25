---
"@khanacademy/wonder-blocks-styles": minor
---

Ship a CSS-Mixins-1 focus mixin at
`@khanacademy/wonder-blocks-styles/focus-styles.css`. Consumers with a PostCSS
pipeline that includes `postcss-import` and `@csstools/postcss-mixins` can
write:

```css
@import "@khanacademy/wonder-blocks-styles/focus-styles.css";

.my-component:focus-visible {
    @apply --wb-focus-visible;
}
```

No JS surface or runtime changes; existing `focusStyles` Aphrodite helper is
untouched. Foundation for the CSS Modules migration tracked under WB-2120.
