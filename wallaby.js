/* eslint-disable import/no-commonjs */
/**
 * Configuration for the wallabyjs test runner.
 * See https://wallabyjs.com/ for details.
 *
 * To run the tests you'll need to install the wallaby plugin for
 * your IDE, see https://wallabyjs.com/download/.  Once the plugin
 * is installed, use it to select this file as the wallaby config you
 * want to use then start wallaby.
 */
module.exports = (wallaby) => {
    return {
        autoDetect: true,
        trace: true,
    };
};
