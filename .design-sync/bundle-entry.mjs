// Wonder Blocks bundle entry (design-sync).
//
// `export * from "<pkg>"` (the converter's default extraEntries mechanism) does
// NOT re-export a module's default export. Most Wonder Blocks main components
// are default exports, so they'd be dropped from the global. This barrel
// re-exports each default-export component under its component name, and pulls
// in core's named exports (View, Text, Id, RenderStateRoot, …). Named exports
// of every other package are merged by the converter's own `export *` lines.
export * from "@khanacademy/wonder-blocks-core";

export {default as Banner} from "@khanacademy/wonder-blocks-banner";
export {default as BirthdayPicker} from "@khanacademy/wonder-blocks-birthday-picker";
export {default as Button} from "@khanacademy/wonder-blocks-button";
export {default as Clickable} from "@khanacademy/wonder-blocks-clickable";
export {default as IconButton} from "@khanacademy/wonder-blocks-icon-button";
export {default as Link} from "@khanacademy/wonder-blocks-link";
export {default as Pill} from "@khanacademy/wonder-blocks-pill";
export {default as SearchField} from "@khanacademy/wonder-blocks-search-field";
export {default as Switch} from "@khanacademy/wonder-blocks-switch";
export {default as Toolbar} from "@khanacademy/wonder-blocks-toolbar";
export {default as Tooltip} from "@khanacademy/wonder-blocks-tooltip";
