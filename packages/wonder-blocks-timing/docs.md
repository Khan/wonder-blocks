Abstractions for common timing APIs like `setTimeout`, `setInterval` and
`requestAnimationFrame`.

## Migration

Migrating from the standard API is as simple as:

1. Wrapping your component with the `withActionScheduler` HOC
2. Using the `WithActionScheduler<TOwnProps>` type to extend your components props
3. Use the new `schedule` prop in your component instead of `setTimeout`, `setInterval` and `requestAnimationFrame`

