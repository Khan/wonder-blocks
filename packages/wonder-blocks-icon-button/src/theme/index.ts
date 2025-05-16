import {mapValuesToCssVars} from "@khanacademy/wonder-blocks-tokens";
import themeDefault from "./default";

const theme = {
    ...themeDefault,
};

export default mapValuesToCssVars(theme, "--wb-c-icon-button-");
