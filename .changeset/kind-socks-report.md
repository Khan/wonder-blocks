---
"@khanacademy/wonder-blocks-tooltip": minor
---

Update tooltip implementation of Popper to:

- Ensure that the popper doesn't disappear when the referenced element is not in view in very small screen sizes. This ensures customers can interact with the popper in extra small screen sizes or +400% zoom without the popper randomly disappearing.
- Addition of an optional property to set what the root boundary is for the popper behavior. This is set to "viewport" by default, causing the popper to be positioned based on the user's viewport. If set to "document", it will position itself based on where there is available room within the document body