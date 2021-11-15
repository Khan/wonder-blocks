### useUniqueIdWithoutMock (hook)

This hook is similar to `<UniqueIDProvider mockOnFirstRender={false}>`.
It will return `null` on the initial render and then the same identifier
factory for each subsequent render. The identifier factory is unique to
each component.

### `useUniqueIdWithMock`

This hook is similar to `<UniqueIDProvider mockOnFirstRender={true}>`.
It will return a mock identifier factory on the initial render that doesn'that
guarantee identifier uniqueness. Mock mode can help things appear on the screen
during the initial render, but is not the default, because it is not always safe
(e.g., we need actual IDs for some SVG constructs).

For examples see the `Core/useUniqueId*` stories in storybook.
