/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

/**
 * This file is very simple. Given a path, it returns the path of the
 * associated test file, assuming that our conventions have been followed.
 */
const path = require("path");

const getTestPath = (pathToFile) => {
    const codeFolder = path.dirname(pathToFile);
    const testFolder = path.join(codeFolder, "__tests__");

    const codeFileName = path.basename(pathToFile);
    const testFileName = `${codeFileName.replace(/\.js$/, ".test.js")}`;

    return path.join(testFolder, testFileName);
};

const file = process.argv[2];

console.log(getTestPath(file));
