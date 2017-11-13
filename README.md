# eslint-plugin-sift

Custom ESLint Rules for Sift Science

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sift`:

```
$ npm install eslint-plugin-sift --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-sift` globally.

## Usage

Add `sift` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sift"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "sift/rule-name": 2
    }
}
```

## Supported Rules

This plugin includes slight variations on three existing [ESLint](https://eslint.org) rules to better support Sift Science's front-end rules:

* [array-element-newline](https://github.com/noahgrant/eslint-plugin-sift/blob/master/lib/rules/array-element-newline.js):

    Whereas the original rule's `{multiline: true}` option only checks for newlines _within_ array elements, this rule also checks for newlines _between_ elements. Therefore, all of the following are valid:
    
    ```js
    var foo = [1, 2, 3];
    
    var foo = [
      somethingReallyLog,
      letsPretendThatIfAllEntriesWereOnOneLineTheyWouldPassOurMaxLen,
      puppies
    ];
    
    var foo = [
      oneEntry
        .thatIsAlsoMultiLine()
     ];
     ```

    ([original rule](https://eslint.org/docs/rules/array-element-newline))

* [function-paren-newline](https://github.com/noahgrant/eslint-plugin-sift/blob/master/lib/rules/function-paren-newline.js):

    Whereas the original rule's `multiline` option checked for newlines _between_ function parameters, this rule also checks for newlines _within_ function parameters. It also fallsback to `consistent` behavior if there is just a single parameter or if any of the parameters are node types that generally look good not forced onto new lines, like objects/arrays/functions blocks. So all of the following are valid:
    
    ```jsx
    bar(shortParam1, shortParam2);
    
    bar(reallyLongParamOnOneLine);
    bar(
      reallyLongParamOnOneLine
    );
    bar(
      reallyLongParam
        .thatGoesMultipleLines()
    );
    bar(
      reallyLongParam
        .thatGoesMultipleLines(),
      withASecondParam
    );
    
    window.setTimeout(() => {
      console.log('foo');
      baz();
    }, 5000);
    
    bar(
      <MyComponent
        isLong
        requiresManyProps={42}
      />
    );
    
    bar('foo', {
      imAn: 'object',
      whatAn: 'object'
    });
    
    bar([
      'im an array entry',
      'me too'
    ], 'foo');
    ```
    
    ([original rule](https://eslint.org/docs/rules/function-paren-newline))

* [space-infix-ops](https://github.com/noahgrant/eslint-plugin-sift/blob/master/lib/rules/space-infix-ops.js):

    This follows the original rule of requiring spaces around operators, but adds the _exception_ of default paramters. So all the following are valid:
    
    ```js
    var foo = 'bar';
    
    noah = noah + 1;
    
    function returnName(name='noah') {
      return name;
    }
    ```
    
    This follows some [lengy discussions](https://github.com/eslint/eslint/issues/3587) that ended up with this not being implemented in ESLint.
    
    ([original rule](https://eslint.org/docs/rules/space-infix-ops))


## Adding a New Rule

To add a rule to this repo, you'll need to make two files:

1. The rule itself: `/lib/rules/<rule_name>.js` ([more info](https://eslint.org/docs/developer-guide/working-with-rules))
2. A test file for the rule: `/tests/lib/rule/<rule_name>.js` ([more info](https://eslint.org/docs/developer-guide/nodejs-api#ruletester))

To run tests, just run:

`$ npm test`
