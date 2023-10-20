/**
 * @fileoverview Various rules for ESLint to work with comments
 * @author garvae
 */
module.exports = {
  meta: {
    name: '@garvae/eslint-plugin-comments',
    version: '',
  },
  rules: {
    'no-line-comments': require('./rules/no-line-comments')
  },
};
