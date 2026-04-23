# `mergeTheme`

`mergeTheme` is a utility that allows us to create a new copy of the target
theme by overriding some of its tokens with a new theme. This is useful when
defining another theme for a given component.

```ts
function mergeTheme<T>(sourceTheme: T, targetTheme: T): T;
```

<Banner
    kind="info"
    text="Note that the first argument will define the
interface/contract that the second arg needs to follow."
/>

## Usage

```ts
const buttonDefaultTheme = {
    color: {
        bg: {
            primary: tokens.color.blue,
        },
        text: {
            light: tokens.color.white,
        },
    },
    border: {
        radius: tokens.border.radius.medium_4,
    },
};

const buttonCustomTheme = mergeTheme(buttonDefaultTheme, {
    color: {
        bg: {
            primary: tokens.color.purple,
        },
    },
    border: {
        radius: tokens.border.radius.large_6,
    },
});
```


---

## Related docs

- [Overview](overview.md)
- [Theme Switcher](theme-switcher.md)
