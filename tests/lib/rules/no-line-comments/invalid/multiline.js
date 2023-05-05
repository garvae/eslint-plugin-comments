/**
 * Tests for eslint RuleTester.
 * These tests should return an error for invalid multiline comments.
 *
 * @type {Array<{output: string, code: string, options: [{singleLineToSingleLineBlock: boolean, fixable: boolean}], errors: [{line: number, messageId: string}]}>}
 */
module.exports = [
  {
    code: '// multiline comment\n// multiline comment',
    errors: [ {
      line: 1,
      messageId: 'noLineMultiple',
    } ],
    options: [ { fixable: true } ],
    output: '/**\n * multiline comment\n * multiline comment\n */',
  },
  {
    code: '// multiline comment\n// multiline comment',
    errors: [ {
      line: 1,
      messageId: 'noLineMultiple',
    } ],
    options: [ { fixable: false } ],
    output: '// multiline comment\n// multiline comment',
  },
  {
    code: '/**\n * multiline comment\n * multiline comment\n*/',
    errors: [ {
      line: 1,
      messageId: 'invalidOffset',
    } ],
    options: [ { fixable: true } ],
    output: '/**\n * multiline comment\n * multiline comment\n */',
  },
  {
    code: '/**\n * multiline comment\n * multiline comment\n*/',
    errors: [ {
      line: 1,
      messageId: 'invalidOffset',
    } ],
    options: [ { fixable: false } ],
    output: '/**\n * multiline comment\n * multiline comment\n*/',
  },
  {
    code: '/**\n * multiline comment\n* multiline comment\n */',
    errors: [ {
      line: 1,
      messageId: 'invalidOffset',
    } ],
    options: [ { fixable: true } ],
    output: '/**\n * multiline comment\n * multiline comment\n */',
  },
  {
    code: '/**\n * multiline comment\n* multiline comment\n */',
    errors: [ {
      line: 1,
      messageId: 'invalidOffset',
    } ],
    options: [ { fixable: false } ],
    output: '/**\n * multiline comment\n* multiline comment\n */',
  },
  {
    code: '/**\n * multiline comment\n multiline comment\n */',
    errors: [ {
      line: 1,
      messageId: 'missingStar',
    } ],
    options: [ { fixable: true } ],
    output: '/**\n * multiline comment\n * multiline comment\n */',
  },
  {
    code: '/**\n * multiline comment\n multiline comment\n */',
    errors: [ {
      line: 1,
      messageId: 'missingStar',
    } ],
    options: [ { fixable: false } ],
    output: '/**\n * multiline comment\n multiline comment\n */',
  },
];
