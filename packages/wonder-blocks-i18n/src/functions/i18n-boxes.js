// @flow
import type {IProvideTranslation} from "./types.js";

// c.f. http://www.alanflavell.org.uk/unicode/unidata25.html
// hollow (white) square; also try \u25a0 or \u25aa+b
export const BoxChar = "\u25a1";

const AlphaNumRegex = /\w/g;

export default class Boxes implements IProvideTranslation {
    translate(input: string): string {
        if (!input) {
            return "";
        }

        if (input.startsWith("&")) {
            return BoxChar;
        }

        return input.replace(AlphaNumRegex, BoxChar);
    }
}
