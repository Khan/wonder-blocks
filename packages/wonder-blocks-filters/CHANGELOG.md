# @khanacademy/wonder-blocks-filters

## 0.1.0

### Minor Changes

- b0dfff3: Add `ExclusiveCategoryFilter`, a radio group for filtering a list by one category at a time. It has a required visible label, one tab stop, and arrow-key navigation that moves focus and selection together
- 8fc8e0a: ExclusiveCategoryFilter: Add visual styles from the Figma spec and the `startIcon` option property
- 16ddb19: Add new `@khanacademy/wonder-blocks-filters` package

### Patch Changes

- b0dfff3: ExclusiveCategoryFilter: Sync the parent when the first option is chosen while `selectedValue` matches no option, use index-based option ids, follow the nearest `dir` for arrow keys, and render the label with `BodyText`
