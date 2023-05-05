# eslint-plugin-comments by [@Garvae](https://sprd.li/4wr38watys)

<br/>

This [ESLint](https://eslint.org/) plugin will accumulate various rules for working with comments.

<br/>

## 🛠 Installation

<br/>

### 1. Install [ESLint](https://eslint.org/) if you haven't already

<br/>

```sh
npm i eslint --save-dev
```

<br/>

### 2. Install package

<br/>

npm:

```sh
npm -i --save-dev @garvae/eslint-plugin-comments
```

yarn:

```sh
yarn add -D @garvae/eslint-plugin-comments
```

<br/>

### 3. Add the plugin and the rule to the ESLint config

<br/>

```json
{
  "plugins": ["@garvae/comments"],
  "rules": {
    "@garvae/comments/no-line-comments": "error"
  }
}
```

<br/>

## 📦 Rules

<br/>

### 🧾 `no-line-comments`

<br/>

The `no-line-comments` rule of the `@garvae/eslint-plugin-comments` plugin can help you to enforce
special style for `Line` (double slash) type comments.
This rule returns an error for all comments of type `Line` (double slash) unless the special options of this rule (`ingore*`) are specified.
The format of this rule can be applied if both `--fix` option of `ESLint` and `fixable = true` option of this rule are specified.

<br/>

#### 💪 Benefits

✔️ Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix) <br/>
✔️ Flexible settings <br/>

<br/>

#### ⚙ Options

| option                        | <div style="min-width:300px">description</div>                                                                                                                                                                                                              | type            | default     |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| `fixable`                     | Enables auto-fix by the [`--fix` ESLint CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix). Disabled by default because you may want to check all comments first                                                                  | `boolean`       | `false`     |
| `ignore`                      | Defines the conditions under which a comment will be ignored by the rule                                                                                                                                                                                    | `Object`        | `undefined` |
| `ignore.startsWith`           | A comment will be ignored by the rule if it starts with one of the strings defined in the array of strings passed to this rule parameter.                                                                                                                   | `Array<string>` | `undefined` |
| `ignore.includes`             | A comment will be ignored by the rule if it includes one of the strings defined in the array of strings passed to this rule parameter.                                                                                                                      | `Array<string>` | `undefined` |
| `singleLineToSingleLineBlock` | If this option is `false` (default), a 'Line' type (not 'Block' type / starred) comment will be formatted into a multi-line 'Block' type (starred) comment, otherwise the comment will be formatted into a valid single-line 'Block' type (starred) comment | `boolean`       | `false`     |

<br/>

Example (all options):

```json
{
  "@garvae/comments/no-line-comments": [
    "error",
    {
      "fixable": true,
      "ignore": {
        "startsWith": ["keyword", "key-phrase"],
        "includes": ["keyword", "key-phrase"]
      },
      "singleLineToSingleLineBlock": true
    }
  ]
}
```

<br/>

#### ⚡ Examples

<br/>

##### ⚙ Default options

```json
{
  "@garvae/comments/no-line-comments": "error"
}
```

Examples of 👎 incorrect code for these options:

```js
// single-line comment
```

```js
// single-line comment
// single-line comment
```

```js
/**
 * multiline comment
     * line with wrong offset - Expected all lines to be aligned with the start of the comment
 */
```

```js
/**
 * multiline comment
   line without a '*' symbol - Expected a '*' symbol at the start of each line of the starred-block comment
 */
```

Examples of 👍 correct code for these options:

```js
/**
 * single-line comment
 */
```

```js
/**
 * single-line comment
 * single-line comment
 */
```

```js
/**
 * multiline comment
 * line with valid offset
 */
```

```js
/**
 * multiline comment
 * line with a '*' symbol
 */
```

<br/>

##### ⚙ `singleLineToSingleLineBlock` option

```json
{
  "@garvae/comments/no-line-comments": [
    "error",
    {
      "singleLineToSingleLineBlock": true
    }
  ]
}
```

Examples of 👎 incorrect code for these options:

```js
// single-line comment
```

```js
/* "Block" comment without ending spacing*/
```

```js
/*"Block" comment without leading spacing */
```

Examples of 👍 correct code for these options:

```js
/* single-line comment */
```

```js
/**
 * single-line comment
 */
```

<br/>

##### ⚙ `ignore` option + `startsWith`

```json
{
  "@garvae/comments/no-line-comments": [
    "error",
    {
      "ignore": { "startsWith": ["keyword", "key-phrase"] }
    }
  ]
}
```

Examples of 👎 incorrect code for these options:

```js
// single line comment
```

Examples of 👍 correct code for these options:

```js
// keyword single-line comment (will be ignored)
```

```js
// key-phrase single-line comment (will be ignored)
```

<br/>

##### ⚙ `ignore` option + `includes`

```json
{
  "@garvae/comments/no-line-comments": [
    "error",
    {
      "ignore": { "includes": ["keyword", "key-phrase"] }
    }
  ]
}
```

Examples of 👎 incorrect code for these options:

```js
// single-line comment
```

Examples of 👍 correct code for these options:

```js
// single-line comment with keyword (will be ignored)
```

```js
// single-line comment with key-phrase (will be ignored)
```

<br/>

## 💎 Recommendations

<br/>

- Read about ["multiline-comment-style" rule](https://ru.reactjs.org/docs/design-principles.html) by Teddy Katz. `no-line-comments` by [@Garvae](https://sprd.li/4wr38watys) and `multiline-comment-style` by Teddy Katz can complement each other

<br/>

## 🤝 Contributions

<br/>

🤝 Contributions, issues and feature requests are welcome! <br/>
Feel free to check [issues page](https://www.github.com/garvae/react-pie-donut-chart/issues).
You can also take a look at the [contuide](https://wwwhub.com/garvae/react-pie-donut-chart/raw/master/CONTRIBUTING.md).

❤️ **Give a ⭐ if you like this project!**

<br/>

## 🚀 Mentoring

### If you want to grow 🚀 fast in front-end development - [contact me! 🙋‍♂](https://sprd.li/4wr38watys)

<br/>

### 📞 My contacts

- [E-mail](vgarvae@gmail.com)
- [Telegram](https://t.me/garvae)
- [Facebook](https://www.facebook.com/garvae)
- [Instagram](https://www.instagram.com/garvae)
- [LinkedIn](https://linkedin.com/in/garvae)
- [GitHub](https://github.com/garvae)

<br/>

#### ... or use QR below 🔳

<div style="background-color: white; display: inline-block; margin-top: 2em; margin-bottom: 2em">
    <img src="assets/img/png/garvae-contacts.png" alt="contacts" width="300px" height="300px">
</div>

#### ... or [this link 🌐](https://sprd.li/4wr38watys)

<br/>

## 📄 [License - MIT](https://github.com/garvae/eslint-plugin-comments/blob/master/LICENSE)
