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

* Fill in provided rules here





