/**
 * Updates the plugin version in the 'meta' section
 */
const {readFile, writeFile} = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../');

let version = ''

const SCRIPT_NAME = 'plugin-version-update'
const PATH_PACKAGE_JSON = `${root}/package.json`
const PATH_LIB_ROOT = `${root}/lib/index.js`

readFile(PATH_PACKAGE_JSON, 'utf-8', function (err, contents) {
    if (err) {
        console.log(`
        Something went wrong while "${SCRIPT_NAME}" script running.
        Error while reading the file: "${PATH_PACKAGE_JSON}"
        Error: ${err}
        `);
        return;
    }

    const packageJsonObj = JSON.parse(contents)
    version = packageJsonObj.version
});

readFile(PATH_LIB_ROOT, 'utf-8', function (err, contents) {
    if (err) {
        console.log(`
        Something went wrong while "${SCRIPT_NAME}" script running.
        Error while reading the file: "${PATH_LIB_ROOT}"
        Error: ${err}
        `);
        return;
    }

    const replaced = contents.replace(/version:\s((['"]\d+\.\d+\.\d+['"])|(['"]{2}))/g, `version: '${version}'`);

    writeFile(PATH_LIB_ROOT, replaced, 'utf-8', function (err) {
       if (err){
           console.log(`
           Something went wrong while "${SCRIPT_NAME}" script running.
           Error while writing the file: "${PATH_LIB_ROOT}"
           Error: ${err}
           `);
       }
    });
});
