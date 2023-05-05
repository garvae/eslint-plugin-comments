/**
 * Tests for eslint RuleTester.
 * These tests should return no errors for valid multiline comments.
 *
 * @type {Array<{code: string}>}
 */
module.exports = [
  { code: '/**\n * multiline comment\n * multiline comment\n */' },
  {
    code: '// single-line comment \n // single-line comment',
    options: [ { ignore: { startsWith: [ 'single-line' ] } } ],
  },
  {
    code: '// ignored single-line comment \n // ignored single-line comment',
    options: [ { ignore: { includes: [ 'single-line' ] } } ],
  },
];
