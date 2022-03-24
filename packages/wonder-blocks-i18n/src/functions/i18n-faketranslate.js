// @flow
import Accents from "./i18n-accents.js";
import Boxes from "./i18n-boxes.js";
import parseQueryString from "./parse-query-string.js";
import {getLocale} from "./get-locale.js";

import type {IProvideTranslation} from "./types.js";

type TranslatorMap = {[key: string]: IProvideTranslation, ...};

/**
 * A map of language key to translator.
 *
 * This map is used by our i18n calls to look up client-side translations when
 * a match does not otherwise exist.
 */
export const Translators: TranslatorMap = {
    boxes: new Boxes(),

    // Our accents translation also makes the string twice as long.
    // NOTE(jeff): If we want longer strings, change this number.
    accents: new Accents(2),
};

/**
 * A translator that performs all the work of looking up what translation to use
 * and then uses it.
 *
 * @export
 * @class FakeTranslate
 * @implements {IProvideTranslation}
 */
export default class FakeTranslate implements IProvideTranslation {
    static langParam: ?string;

    get _translator(): ?IProvideTranslation {
        // We look up our fake translator on the fly in case the kaLocale
        // was changed.
        const identityTranslator = {
            translate: (s: string) => s,
        };

        const language = FakeTranslate.langParam || getLocale();
        const translator = language && Translators[language];
        return translator || identityTranslator;
    }

    _translateSegment(input: string): string {
        // This method takes a string and returns an array.
        // It looks for two things to separate text:
        // 1. URLs
        // 2. Python variable substitutions
        const urlRegex =
            /((http[s]?|ftp):\/\/)?([\w-]+\.)([\w-.]+)((\/[\w-]+)*)?\/?(#[\w-]*)?(\?[\w-]+(=[\w%"']+)?(&[\w-]+(=[\w%"']+)?)*)?/g;
        const pythonSubstRegex = /%\([\w]+\)s/g;

        const tokenSearchRegex = new RegExp(
            `${urlRegex.source}|${pythonSubstRegex.source}`,
            "g",
        );

        const safeTranslate = (str) =>
            // We know that we have a translator at this point, so just ignore
            // flow.
            // $FlowIgnore[incompatible-use]
            this._translator.translate(str);

        // The way it works.
        // 1. Look for a thing
        // 2. Take before the thing and lex against other things
        // 3. Take after the thing and lex that for python vars
        // 4. Flatten into a single array and return.
        const subsegments = [];
        let lastMatchEndIndex = 0;
        let match = tokenSearchRegex.exec(input);
        while (match !== null) {
            if (match.index !== lastMatchEndIndex) {
                subsegments.push(
                    safeTranslate(
                        input.substring(lastMatchEndIndex, match.index),
                    ),
                );
            }
            subsegments.push(match[0]);
            lastMatchEndIndex = match.index + match[0].length;
            match = tokenSearchRegex.exec(input);
        }

        if (lastMatchEndIndex < input.length) {
            subsegments.push(safeTranslate(input.substring(lastMatchEndIndex)));
        }

        return subsegments.join("");
    }

    _parseAndTranslate(input: string): string {
        if (!this._translator || input == null) {
            // We're doing nothing if we don't have to.
            return input;
        }

        // Here we parse the input text into chunks. Some chunks need
        // translating and some do not.

        // The input is chunked to cater for embedded HTML tags and variable
        // subsitution syntax. Tags and variables are left alone, with the
        // surrounding text being translated using our fake translation.

        // This is based off the more complex work done in the backend
        // fake_translate.py. However, that handles far more scenarios as
        // a lot more content passes through that system. We're fortunate here
        // in that we only need consider the thing things that might get passed
        // in frontend code, so we can be a little more general.

        // The things that we are specifically looking for are:
        // 1. HTML tags
        // 2. Python-style variable substitutions like %(str)s
        // 3. URLs

        // So, first, let's get the content as an array of HTML and text nodes.
        // We're leveraging the dom for this since it already knows about HTML.
        const stringToHTMLElements = (htmlString) => {
            const template = document.createElement("template");
            template.innerHTML = htmlString;
            return template;
        };

        const html = stringToHTMLElements(input);

        // Now we can go through each one and translate the text bits.
        // This is a recursive function to cater for situations such as:
        //
        //      <a href="#"><b>Some bold</b> and not bold link text</a>
        const processChildNodes = (parent): void => {
            for (const node of parent.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Something to translate!
                    const newText = this._translateSegment(node.textContent);
                    if (newText != null) {
                        const newTextNode = document.createTextNode(newText);
                        parent.replaceChild(newTextNode, node);
                    }
                } else {
                    switch (node.nodeName) {
                        case "CODE":
                        case "PRE":
                            // Don't want to translate these tags.
                            break;

                        default:
                            // Recurse into everything else.
                            processChildNodes(node);
                            break;
                    }
                }
            }
        };

        processChildNodes(html.content);

        // Because we used the parsing powers of the DOM, any special characters
        // will have been encoded as entities. We want to strip those, so we do
        // that here.
        const tempNode = document.createElement("template");
        const entitiesDecoded = html.innerHTML.replace(/&(\w+);/g, (match) => {
            tempNode.innerHTML = match;
            return tempNode.content.textContent;
        });
        return entitiesDecoded;
    }

    translate: (input: string) => string = (input: string): string =>
        this._parseAndTranslate(input);
}

export const init = ({search}: {search: string, ...}) => {
    // We can rely on needing a page refresh to update the language.
    if (typeof FakeTranslate.langParam !== "string") {
        const query = parseQueryString(search);

        // We support "_lang" for a couple of reasons.
        // 1. Situations where we want to bypass the i18n middleware that,
        //    due to bugs or otherwise, can redirect based on the lang
        //    param.
        // 2. Checking client-side translation in webpack (which currently
        //    doesn't support different languages).
        // 3. Seeing what is i18n in client-side code versus not i18n or
        //    handled by content.
        FakeTranslate.langParam = query.lang || query._lang;
    }
};
