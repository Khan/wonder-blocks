---
"@khanacademy/wonder-blocks-clickable": minor
"@khanacademy/wonder-blocks-dropdown": minor
"@khanacademy/wonder-blocks-core": minor
---

Fixes keyboard tests in Dropdown and Clickable with specific key events. We now check event.key instead of event.which or event.keyCode to match the keys returned from Testing Library/userEvent.
