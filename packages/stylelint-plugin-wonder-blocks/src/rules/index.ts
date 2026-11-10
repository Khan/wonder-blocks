import type {Plugin} from "stylelint";

import preferSemanticColorOverGraphicsPalette from "./prefer-semantic-color-over-graphics-palette";

export const rules: ReadonlyArray<Plugin> = [
    preferSemanticColorOverGraphicsPalette,
];
