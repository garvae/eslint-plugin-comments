/**
 * @fileoverview Enforce a particular style for 'Line' (double-slash) type comments
 * @author Garvae
 */

const { RuleTester } = require('eslint');

const rule = require('../../../../lib/rules/no-line-comments');

const invalidMultiLine = require('./invalid/multiline');
const invalidOneLine = require('./invalid/single-line');
const validMultiLine = require('./valid/multiline');
const validOneLine = require('./valid/single-line');

const ruleTester = new RuleTester();

ruleTester.run('@garvae/eslint-plugin-comments/no-line-comments', rule, {
  invalid: [ ...invalidOneLine, ...invalidMultiLine ],
  valid: [ ...validOneLine, ...validMultiLine ],
});
