---
"@khanacademy/wonder-blocks-modal": minor
---

ModalLauncher: add a `styles` prop with a `backdrop` slot so custom styles can be applied to the backdrop (the veil), matching the API DrawerLauncher already has. Useful for properties that must live on the veil element itself, such as a `viewTransitionName`.
