import {mapValuesToCssVars} from "@khanacademy/wonder-blocks-tokens";
import themeDefault from "./default";

// Export the raw theme for direct use in components
export const theme = themeDefault;

// Export the CSS variables for use in CSS
export default mapValuesToCssVars(themeDefault, "--wb-c-switch-");
