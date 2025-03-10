---
"@khanacademy/wonder-blocks-cell": patch
---

DetailCell and CompactCell: update styling to address accessibility issues (color contrast and using color as the only visual indicator). Updated styles include:

- General:
  - Changing the grey used for subtitles
  - Using `icon.primary` for the right accessory
- Press state:
  - Changing the background to `fadedBlue8`
  - Adding a thin left border when clickable cells are pressed
- Hover state:
  - Changing the background to `fadedBlue8`
- Disabled state:
  - Changing the focus outline to `action.disabled.default`
- Selected state (cells with `active=true`):
  - Adding a thick left border
  - Changing the text color to `activeBlue`
  - The styling no longer changes when a selected cell is hovered or pressed on
