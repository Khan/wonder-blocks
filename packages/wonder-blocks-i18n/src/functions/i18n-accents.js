// @flow
import type {IProvideTranslation} from "./types.js";

// This map provides a way to get an "accented" character for any of the
// 26 english alphabet characters in either upper or lower case.
// This map is sourced from Wikipedia pages on diacritics and specific letters
// (example URLs below):
//    - https://en.wikipedia.org/wiki/Diacritic
//    - https://en.wikipedia.org/wiki/W
const ACCENT_MAP = {
    a: "áàăắặâấåäãąā",
    A: "ÁÀĂẮẶÂẤÅÄÃĄĀ",
    b: "ƀḃḅ",
    B: "ɃḂḄ",
    c: "ćĉčç",
    C: "ĆĈČÇ",
    d: "ďđḑ",
    D: "ĎĐḐ",
    e: "éèêềěëėęē",
    E: "ÉÈÊỀĚËĖĘĒ",
    f: "ḟ",
    F: "Ḟ",
    g: "ĝǧģ",
    G: "ĜǦĢ",
    h: "ĥȟħḥ",
    H: "ĤȞĦḤ",
    i: "íìîïįī",
    I: "ÎÏÍÌĮĪ",
    j: "ĵ",
    J: "Ĵ",
    k: "ķḱ",
    K: "ĶḰ",
    l: "ĺľłļḷ",
    L: "ĹĽŁĻḶ",
    m: "ḿṁṃm̃",
    M: "ḾṀṂM̃",
    n: "ńňñņŋ",
    N: "ŃŇÑŅŊ",
    o: "óòôöőõȯȱøōỏ",
    O: "ÓÒÔÖŐÕȮȰØŌỏ",
    p: "ṕṗᵽ",
    P: "ṔṖⱣ",
    q: "ʠ",
    Q: "Ɋ",
    r: "ŕřŗ",
    R: "ŔŘŖ",
    s: "śŝšș",
    S: "ŚŜŠŞ",
    t: "ťț",
    T: "ŤŢ",
    u: "úùŭûůüųűūư",
    U: "ÚÙŬÛŮÜŲŰŪƯ",
    v: "ṽṿ",
    V: "ṼṾ",
    w: "ẃẁŵẅ",
    W: "ẂẀŴẄ",
    y: "ý",
    Y: "Ý",
    x: "ẍẋ",
    X: "ẌẊ",
    z: "źžż",
    Z: "ŹŽŻ",
};

// This regular expression matches the keys in our map.
const SubstitutionRegex = new RegExp(
    `[${Object.keys(ACCENT_MAP).join("")}]`,
    "g",
);

export default class Accents implements IProvideTranslation {
    _scaleFactor: number;

    constructor(scaleFactor: number = 1) {
        if (scaleFactor < 1) {
            throw new Error("Scaling factor must be 1 or greater.");
        }
        this._scaleFactor = scaleFactor;
    }

    translate: (input: string) => string = (input: string): string => {
        if (!input) {
            return "";
        }

        const countMap = {};
        const updateCount = (char) => {
            const count = countMap[char] || 0;
            countMap[char] = count + 1;
            return count;
        };

        // We want to substitute each character in the input string with
        // a corresponding accent character from the map. We also want to
        // ensure this is entirely deterministic, so we vary the accents based
        // on our intended string width and the repetition of the characters.
        return input.replace(SubstitutionRegex, (substring) => {
            const possibles = ACCENT_MAP[substring];
            const count = updateCount(substring);
            return possibles[count % possibles.length].repeat(
                this._scaleFactor,
            );
        });
    };
}
