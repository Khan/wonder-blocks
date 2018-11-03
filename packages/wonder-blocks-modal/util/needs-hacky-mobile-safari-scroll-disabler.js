// @flow

const needsHackyMobileSafariScrollDisabler = (() => {
    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPhone") > -1;
})();

export default needsHackyMobileSafariScrollDisabler;
