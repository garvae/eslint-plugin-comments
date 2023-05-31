/**
 * @fileoverview Enforce a particular style for 'Line' (double-slash) type comments
 * @author Garvae
 *
 * Inspired by:
 * Teddy Katz
 * https://github.com/eslint/eslint/blob/1c388fb37739cc09dbd0b4aa59e9d45674280ad5/lib/rules/multiline-comment-style.js
 *
 * P.S. I recommend to read more about "multiline-comment-style" rule by Teddy Katz.
 * "no-line-comments" by @garvae and "multiline-comment-style" by Teddy Katz can complement each other
 */

const COMMENTS_IGNORE_PATTERN = /^(\s*(?:eslint[- ]|jshint\s+|jslint\s+|istanbul\s+|globals?\s+|exported\s+|jscs|ts-prune\s+))|(\/(\s)?<((reference)|(amd)).+)/u;
const LINEBREAK_MATCHER = /\r\n|[\r\n\u2028\u2029]/u;
const LEADING_SPACE_MATCHER = /^\s+/u;
const ENDING_SPACE_MATCHER = /.+\s$/u;
const LEADING_STAR_MATCHER = /^\*/u;

/**
 * @typedef {Object} Rule
 * @property {Function} create The factory of the rule.
 * @property {Object} meta The metadata of the rule.
 */
module.exports = {
  create(context) {
    const sourceCode = context.getSourceCode();
    const options = context.options?.[0];

    const {
      fixable = false,
      ignore: ignoreProp,
      singleLineToSingleLineBlock = false,
    } = options || {};

    const {
      includes: ignoreIncludes = [],
      startsWith: ignoreStartsWith = [],
    } = ignoreProp || {};

    /**
     * Processes a comment group that is currently in separate-line form, calculating the offset for each line.
     * @param {Object[]} commentGroup A group of comments containing multiple line comments.
     * @returns {string[]} An array of the processed lines.
     *
     *
     * @author Teddy Katz
     * https://github.com/eslint/eslint/blob/1c388fb37739cc09dbd0b4aa59e9d45674280ad5/lib/rules/multiline-comment-style.js
     */
    const processSeparateLineComments = commentGroup => {
      const allLinesHaveLeadingSpace = commentGroup
        .map(({ value }) => value)
        .filter(line => line.trim().length)
        .every(line => line.startsWith(' '));

      return commentGroup.map(({ value }) => (allLinesHaveLeadingSpace ? value.replace(LEADING_SPACE_MATCHER, '') : value));
    };

    /**
     * Converts a "line" type comment into starred-block type comment
     * @param {Object} firstComment The first comment of the group being converted
     * @param {string[]} commentLines A list of lines to appear in the new starred-block comment
     * @param {string} initialOffset The initial offset of the comment block
     * @returns {string} A representation of the comment value in starred-block form, excluding start and end markers
     */
    const convertToStarredBlock = (firstComment, commentLines, initialOffset,) => {
      if (firstComment.type === 'Line' && commentLines.length === 1 && singleLineToSingleLineBlock) {
        return `/* ${commentLines[0].trim()} */`;
      }

      const offset = `${initialOffset} `;

      let lines = commentLines.map(line => line.split(LINEBREAK_MATCHER)
        ?.map(l => l
          .replace(LEADING_SPACE_MATCHER, '')
          .replace(LEADING_STAR_MATCHER, ''))
        .filter(Boolean))
        .flat();

      if (!lines.length) {
        return '';
      }

      lines = lines.map(l => {
        if (!l.match(LEADING_SPACE_MATCHER)?.length) {
          return ` ${l}`;
        }

        return l;
      });


      if (lines.length === 1) {
        const line = lines[0];

        if (singleLineToSingleLineBlock) {
          return `/*${offset}${line.trim()}${offset}*/`;
        }

        lines = `\n${offset}*${line}`;
      } else {
        lines = lines.map(l => `\n${offset}*${l}`).join('');
      }

      return `/**${lines}\n${offset}*/`;
    };


    /**
     * Checks a group of comments to see if it's valid according to the given option.
     * @param {Object[]} comment A list of comments that appear together.
     * @returns {void}
     */
    const processComments = comment => {
      const [ firstComment ] = comment;
      const commentLines = processSeparateLineComments(comment);

      const initialOffset = sourceCode.text.slice(firstComment.range[0] - firstComment.loc.start.column, firstComment.range[0]);
      const range = [ firstComment.range[0], comment[comment.length - 1].range[1] ];

      /**
       * Prohibits block comments from having a '*' symbol at the beginning of each line.
       * Enforce block comments lines to be aligned equally.
       */
      if (firstComment.type === 'Block') {
        let isMissingStar = false;
        let isInvalidOffset = false;
        let isInvalidSpacing = false;

        comment.forEach(item => {
          if (isMissingStar || isInvalidOffset || isInvalidSpacing) {
            return;
          }

          const { value } = item;

          if (value.split(LINEBREAK_MATCHER).length < 2) {
            if (!value.match(LEADING_SPACE_MATCHER) || !value.match(ENDING_SPACE_MATCHER)) {
              isInvalidSpacing = true;
            }

            return;
          }

          const itemColumnStart = item.loc.start.column;
          const itemColumnEnd = item.loc.end.column;
          const isValidOffsetEnd = (itemColumnEnd - itemColumnStart) === 3;

          if (!isValidOffsetEnd) {
            isInvalidOffset = true;
            return;
          }

          isMissingStar = !!item
            .value
            .split(LINEBREAK_MATCHER)
            .find(line => {
              const l = line.trim();
              return l && !l.startsWith('*');
            });

          if (!isMissingStar) {
            const linesByMatcher = value.split(LINEBREAK_MATCHER);
            const lastLineOffset = linesByMatcher?.[linesByMatcher.length - 1]?.length;
            const linesToCheck = linesByMatcher?.slice(1, linesByMatcher.length - 1);

            isInvalidOffset = !!linesToCheck.find(line => line.match(LEADING_SPACE_MATCHER)?.join('')?.length !== lastLineOffset);
          }
        });

        if (isMissingStar || isInvalidOffset || isInvalidSpacing) {
          const fixer = f => f.replaceTextRange(range, convertToStarredBlock(firstComment, commentLines, initialOffset));

          let messageId = 'invalidOffset';

          if (isMissingStar) {
            messageId = 'missingStar';
          } else if (isInvalidSpacing) {
            messageId = 'invalidSpacing';
          }

          context.report({
            fix: fixable ? fixer : undefined,
            loc: {
              end: {
                column: firstComment.loc.start.column + 2,
                line: firstComment.loc.start.line,
              },
              start: firstComment.loc.start,
            },
            messageId,
          });

          return;
        }

        return;
      }

      const fixer = f => f.replaceTextRange(range, convertToStarredBlock(firstComment, commentLines, initialOffset));

      /**
       * Enforce line comments to be replaced with block comments
       */
      context.report({
        fix: fixable ? fixer : undefined,
        loc: {
          end: comment[comment.length - 1].loc.end,
          start: firstComment.loc.start,
        },
        messageId: comment.length > 1 ? 'noLineMultiple' : 'noLine',
      });
    };

    /**
     * Groups "Line" type comments.
     * Each group can contain one or more "Line" type comments.
     */
    return { Program() {
      return sourceCode.getAllComments()
        .filter(comment => comment.type === 'Line' || comment.type === 'Block')
        .filter(comment => !COMMENTS_IGNORE_PATTERN.test(comment.value))
        .filter(comment => !ignoreStartsWith?.find(pattern => comment.value?.trim?.()?.startsWith?.(pattern)))
        .filter(comment => !ignoreIncludes?.find(pattern => comment.value?.trim?.()?.includes?.(pattern)))
        .filter(comment => {
          const tokenBefore = sourceCode.getTokenBefore(comment, { includeComments: true });

          return !tokenBefore || tokenBefore.loc.end.line < comment.loc.start.line;
        })
        .reduce((...props) => {

          const [
            commentGroups,
            comment,
            index,
            commentList,
          ] = props;

          const tokenBefore = sourceCode.getTokenBefore(comment, { includeComments: true });

          if (
            index && commentList[index - 1].type === 'Line'
               && tokenBefore && tokenBefore.loc.end.line === comment.loc.start.line - 1
               && tokenBefore === commentList[index - 1]
          ) {
            commentGroups[commentGroups.length - 1].push(comment);
          } else {
            commentGroups.push([ comment ]);
          }

          return commentGroups;
        }, [])
        .forEach(processComments);
    } };
  },

  meta: {
    docs: {
      description: 'Enforce a particular style for "Line" (double-slash) type comments',
      recommended: false,
      url: 'https://github.com/garvae/eslint-plugin-comments',
    },
    fixable: 'code',
    messages: {
      invalidOffset: 'Expected all lines to be aligned with the start of the comment',
      invalidSpacing: 'Expected space both after \'\\*\' and before \'*/\' in comment.',
      missingStar: 'Expected a \'*\' symbol at the start of each line of the starred-block comment',
      noLine: 'Expected a starred block comment instead of a line comment',
      noLineMultiple: 'Expected a starred block comment instead of multiple-line comments',
    },
    schema: [ {
      additionalProperties: false,
      properties: {
        fixable: { type: 'boolean' },
        ignore: {
          additionalProperties: false,
          properties: {
            includes: {
              additionalItems: true,
              items: { type: 'string' },
              type: 'array',
              uniqueItems: true,
            },
            startsWith: {
              additionalItems: true,
              items: { type: 'string' },
              type: 'array',
              uniqueItems: true,
            },
          },
          type: 'object',
        },
        singleLineToSingleLineBlock: { type: 'boolean' },
      },
      type: 'object',
    } ],
    type: 'suggestion',
  },
};
