# PopoverContent

---

## Default

Default popover variant that displays text-only.

```tsx
<PopoverContent title="A simple popover" content="The default version only includes text." closeButtonVisible />
```

---

## With Icon

Decorate the popover with an illustrated icon. You need to pass an `icon`
prop with the following constraints:
- string: The URL of the icon asset
- `<img>` or `<svg>`: Make sure to define a width
When passing in a url for the `icon` prop, use the `iconAlt` prop to provide
alternative text for the icon if it communicates meaning.

```tsx
<PopoverContent title="Popover with Icon" content="Popovers can include images on the left." icon={<img src="./logo.svg" width="100%" alt="Wonder Blocks logo" />} />
```

---

## With Illustration

Call attention to the popover using a full-bleed illustration.

```tsx
<PopoverContent title="Popover with Illustration" content="As you can see, this popover includes a full-bleed illustration." image={<img
                src="./illustration.svg"
                alt="An illustration of a person skating on a pencil"
                width={288}
                height={200}
            />} closeButtonVisible />
```



---

## Related docs

- [Popover](popover.md)
- [Popover Accessibility](popover-accessibility.md)
- [Popover Content Core](popover-content-core.md)
