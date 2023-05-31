/**
 * Tests for eslint RuleTester.
 * These tests should return no errors for valid single-line comments.
 *
 * @type {Array<{code: string, options: [{ignore: {startsWith?: string[], includes?: string[]}}]}>}
 */
module.exports = [
  { code: '/// <reference path="..." />' },
  { code: '/// <amd-module />' },
  { code: '/* single-line comment */' },
  {
    code: '// single-line comment',
    options: [ { ignore: { startsWith: [ 'single-line' ] } } ],
  },
  {
    code: '// ignored single-line comment',
    options: [ { ignore: { includes: [ 'single-line' ] } } ],
  },
];
