Dropdowns consist of an opener and the part that contains the items. The latter
component is portalled to a place in the DOM that prevents is from being clipped
by an overflow: auto container. This would be either as a child of `body` or the
modal launcher portal if the dropdown is used in a portal.

Clicking the opener should open and close the dropdown. It is also possible to
close the dropdown by clicking elsewhere on the page.

For keyboard use, use space to open the menu and up/down arrow keys for item
navigation. Space may be used for selection on option items. The tab or escape
key may be used to close the menu (tab would also shift focus to the next
element on the page).
