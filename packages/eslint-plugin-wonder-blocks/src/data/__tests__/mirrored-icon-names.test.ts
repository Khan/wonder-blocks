import {
    MIRRORED_ICON_NAMES as lintMirroredIconNames,
    identifierToPhosphorName,
    isMirroredIconIdentifier,
} from "../mirrored-icon-names";
// Sync against the runtime whitelist in wonder-blocks-icon. Relative import is
// intentional: the published plugin embeds its own copy and must not depend on
// the React package, but CI must catch drift between the two lists.
import {MIRRORED_ICON_NAMES as iconMirroredIconNames} from "../../../../wonder-blocks-icon/src/util/mirrored-icon-names";

describe("mirrored-icon-names sync", () => {
    test("eslint copy matches wonder-blocks-icon whitelist", () => {
        expect([...lintMirroredIconNames].sort()).toEqual(
            [...iconMirroredIconNames].sort(),
        );
    });
});

describe("identifierToPhosphorName", () => {
    test.each([
        ["caretLeftIcon", "caret-left"],
        ["caretRight", "caret-right"],
        ["arrowRightIcon", "arrow-right"],
        ["signOutIcon", "sign-out"],
        ["signInBold", "sign-in"],
        ["textIndentIcon", "text-indent"],
        ["paperPlaneTiltIcon", "paper-plane-tilt"],
        ["arrowCircleRightFill", "arrow-circle-right"],
    ])("%s → %s", (identifier, expected) => {
        expect(identifierToPhosphorName(identifier)).toBe(expected);
    });
});

describe("isMirroredIconIdentifier", () => {
    test.each([
        ["caretLeftIcon", true],
        ["signOutIcon", true],
        ["textOutdentIcon", true],
        ["caretDownIcon", false],
        ["playIcon", false],
        ["arrowUpRightIcon", false],
        ["finishIconRTL", false],
    ])("%s → %s", (identifier, expected) => {
        expect(isMirroredIconIdentifier(identifier)).toBe(expected);
    });
});
