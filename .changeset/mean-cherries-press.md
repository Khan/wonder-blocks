---
"@khanacademy/wonder-blocks-clickable": major
"@khanacademy/wonder-blocks-dropdown": major
"@khanacademy/wonder-blocks-core": major
---

Fixes keyboard tests in Dropdown and Clickable with specific key events. We now check `event.key` instead of `event.which` or `event.keyCode` to remove deprecated event properties and match the keys returned from Testing Library/userEvent.
