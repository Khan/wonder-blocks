// @flow
/**
 * A util method for producing a query string with possibly multiple queries.
 *
 * Original from:
 * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
 *
 * @param {Object} data
 * @param {Boolean} includeQuestionMark (optional)
 * @return {String}
 *
 * Example:
 * queryStringFromObject({a: alpha, b: beta}) returns '?a=alpha&b=beta'.
 *
 * TODO(somewhatabstract, FEI-3464): Consolidate query string parsing functions.
 */
const addition = /\+/g;
const regex = /([^&=]+)=?([^&]*)/g;
const decode = (str: string) => decodeURIComponent(str.replace(addition, " "));

const parseQueryString = (query: string): {[key: string]: string, ...} => {
    const urlParams = {};
    const noQuestionMark = query.charAt(0) === "?" ? query.slice(1) : query;

    // Regex for replacing addition symbol with a space
    let matchResult;
    while ((matchResult = regex.exec(noQuestionMark))) {
        const key = decode(matchResult[1]);
        const value = decode(matchResult[2]);
        if (urlParams[key] !== undefined) {
            urlParams[key] = [].concat(urlParams[key], value);
        } else {
            urlParams[key] = value;
        }
    }
    return urlParams;
};

export default parseQueryString;
