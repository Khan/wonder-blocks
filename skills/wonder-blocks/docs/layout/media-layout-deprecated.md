# MediaLayout (Deprecated)

> Package: `@khanacademy/wonder-blocks-layout`

---

## Default

```tsx
<MediaLayout>
    {({mediaSize, mediaSpec, styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

---

## Screen Size Styles

```tsx
<MediaLayout styleSheets={styleSheets}>
    {({mediaSize, mediaSpec, styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

---

## All Styles

```tsx
<MediaLayout styleSheets={styleSheets}>
    {({styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

---

## Custom Spec

```tsx
<MediaLayoutContext.Provider value={contextValue}>
    <MediaLayout styleSheets={styleSheets}>
        {({mediaSize, styles}) => {
            const HeadingComponent =
                mediaSize === "small" ? HeadingSmall : HeadingLarge;

            return (
                <View style={styles.example}>
                    <HeadingComponent>
                        Current mediaSpec: {mediaSize}
                    </HeadingComponent>
                    <Body tag="p">
                        {`Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat.`}
                    </Body>
                </View>
            );
        }}
    </MediaLayout>
</MediaLayoutContext.Provider>
```



---

## Related docs

- [Spring](spring.md)
- [Strut](strut.md)
