# Switch

## Best Practices

### With Labelling

The switch can be paired with a visible label which should be an html `label`
element. The label should include the `htmlFor` attribute, and the switch should
include the `aria-labelledby` attribute.

**Note:** If you are already using a label to describe the switch, we encourage
you not to use the `aria-label` attribute because it could override the
`label`'s text.

#### Label

The label text should **not** change as the state of the switch changes.

<!-- Could not resolve: SwitchBestPracticesStories.WithLabel -->

#### Label, Description

If a description is also provided, the switch should include the `aria-describedby` attribute.

<!-- Could not resolve: SwitchBestPracticesStories.WithLabelAndDescription -->

#### Label, ON/OFF Labels

If on/off labels are desired, they should include the `aria-hidden` attribute to prevent
redundant descriptions of the state for screen readers.

<!-- Could not resolve: SwitchBestPracticesStories.WithLabelAndOnOff -->

### Inside Cells

The switch can be placed inside a cell as a left/right accessory.

In the following examples, the title is a `label` element with the `htmlFor` attribute set to the
switch, so that clicking the title also changes the state of the switch. The `onClick` attribute
is omitted from the cell, and the `onChange` exists on the switch as normal.

#### Compact Cell

<!-- Could not resolve: SwitchBestPracticesStories.InsideCell -->

#### Detailed Cell

In the detailed cell, the title should change the state of the switch, and the description should
not.

<!-- Could not resolve: SwitchBestPracticesStories.InsideDetailCell -->

### With a Tooltip

The switch can be wrapped with a tooltip that describes the purpose and state of the switch.

<!-- Could not resolve: SwitchBestPracticesStories.WithTooltip -->

### References

For more details, see the [Accessibility section](https://www.w3.org/WAI/ARIA/apg/patterns/switch/#wai-ariaroles,states,andproperties) in w3.org.
