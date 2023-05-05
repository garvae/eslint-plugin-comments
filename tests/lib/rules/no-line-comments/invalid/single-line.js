/**
 * Tests for eslint RuleTester.
 * These tests should return an error for invalid single-line comments.
 *
 * @type {Array<{output: string, code: string, options: [{singleLineToSingleLineBlock: boolean, fixable: boolean}], errors: [{line: number, messageId: string}]}>}
 */
module.exports = [
  {
    code: '// single-line comment',
    errors: [ {
      line: 1,
      messageId: 'noLine',
    } ],
    options: [ {
      fixable: false,
      singleLineToSingleLineBlock: true,
    } ],
    output: '// single-line comment',
  },
  {
    code: '// single-line comment',
    errors: [ {
      line: 1,
      messageId: 'noLine',
    } ],
    options: [ {
      fixable: false,
      singleLineToSingleLineBlock: false,
    } ],
    output: '// single-line comment',
  },
  {
    code: '// single-line comment',
    errors: [ {
      line: 1,
      messageId: 'noLine',
    } ],
    options: [ {
      fixable: true,
      singleLineToSingleLineBlock: true,
    } ],
    output: '/* single-line comment */',
  },
  {
    code: '// single-line comment',
    errors: [ {
      line: 1,
      messageId: 'noLine',
    } ],
    options: [ {
      fixable: true,
      singleLineToSingleLineBlock: false,
    } ],
    output: '/**\n * single-line comment\n */',
  },
  {
    code: '/* single-line comment*/',
    errors: [ {
      line: 1,
      messageId: 'invalidSpacing',
    } ],
    options: [ {
      fixable: true,
      singleLineToSingleLineBlock: true,
    } ],
    output: '/* single-line comment */',
  },
  {
    code: '/* single-line comment*/',
    errors: [ {
      line: 1,
      messageId: 'invalidSpacing',
    } ],
    options: [ {
      fixable: false,
      singleLineToSingleLineBlock: true,
    } ],
    output: '/* single-line comment*/',
  },
  {
    code: '/*single-line comment */',
    errors: [ {
      line: 1,
      messageId: 'invalidSpacing',
    } ],
    options: [ {
      fixable: true,
      singleLineToSingleLineBlock: true,
    } ],
    output: '/* single-line comment */',
  },
  {
    code: '/*single-line comment */',
    errors: [ {
      line: 1,
      messageId: 'invalidSpacing',
    } ],
    options: [ {
      fixable: false,
      singleLineToSingleLineBlock: true,
    } ],
    output: '/*single-line comment */',
  },
];
