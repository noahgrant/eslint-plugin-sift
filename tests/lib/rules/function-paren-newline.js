/**
 * @fileoverview enforce consistent line breaks inside function parentheses
 * @author Teddy Katz
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/function-paren-newline");
const RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const LEFT_MISSING_ERROR = { message: "Expected a newline after '('.", type: "Punctuator" };
const LEFT_UNEXPECTED_ERROR = { message: "Unexpected newline after '('.", type: "Punctuator" };
const RIGHT_MISSING_ERROR = { message: "Expected a newline before ')'.", type: "Punctuator" };
const RIGHT_UNEXPECTED_ERROR = { message: "Unexpected newline before ')'.", type: "Punctuator" };

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run("function-paren-newline", rule, {

    valid: [

        // multiline option (default)
        "function baz(foo, bar) {}",
        "(function(foo, bar) {});",
        "(function baz(foo, bar) {});",
        "(foo, bar) => {};",
        "foo => {};",
        "baz(foo, bar);",
        "function baz() {}",
        `bar(() => {
          console.log('foo');
          baz();
        })`,
        `baz(\`foo
              bar\`)
        `,
        `bar(
          reallyLongParamOnOneLine
        )`,
        `bar(
          reallyLongParam
            .thatGoesMultipleLines()
        )`,
        `bar(
          reallyLongParam
            .thatGoesMultipleLines(),
          withASecondParam
        )`,
        `bar('foo', {
          imAn: 'object',
          whatAn: 'object'
        })`,
        `bar({
          imAn: 'object',
          whatAn: 'object'
        }, 'foo')`,
        `bar('foo', [
          'im an array entry',
          'me too'
        ])`,
        `bar(
          () => 'im a pretend timeout function',
          2000
        )`,
        `bar(
          {imAn: 'inline object', foo: 'bar'},
          2000
        )`,
        `bar(() => {
          'im a pretend timeout function';
        }, 2000)`,
        `(() => {
          console.log('foo');
          baz();
        })`,
        `bar({
          foo: 'bar',
          bar: 'foo'
        })`,
        `bar = ({
          foo='bar',
          bar='foo'
        }) => {}`,
        `bar([
          'foo',
          'bar'
        ])`,
        `var bar = (
          foo,
          bar
        ) => {}`,
        `
            function baz(
                foo =
                1
            ) {}
        `,
        `
            function baz(
                foo,
                bar
            ) {}
        `,
        `
            (function(
                foo,
                bar
            ) {});
        `,
        `
            (function baz(
                foo,
                bar
            ) {});
        `,
        `
            (
                foo,
                bar
            ) => {};
        `,
        `
            baz(
                foo,
                bar
            );
        `,
        "new Foo(bar, baz)",
        "new Foo",
        "new (Foo)",

        `
            (foo)
            (bar)
        `,
        `
            foo.map(value => {
              return value;
            })
        `,

        // always option
        {
            code: "function baz(foo, bar) {}",
            options: ["multiline"]
        },
        {
            code: `
                function baz(
                    foo,
                    bar
                ) {}
            `,
            options: ["always"]
        },
        {
            code: `
                (function(
                    foo,
                    bar
                ) {});
            `,
            options: ["always"]
        },
        {
            code: `
                (function baz(
                    foo,
                    bar
                ) {});
            `,
            options: ["always"]
        },
        {
            code: `
                (
                    foo,
                    bar
                ) => {};
            `,
            options: ["always"]
        },
        {
            code: `
                baz(
                    foo,
                    bar
                );
            `,
            options: ["always"]
        },
        {
            code: `
                function baz(
                ) {}
            `,
            options: ["always"]
        },

        // never option
        {
            code: "function baz(foo, bar) {}",
            options: ["never"]
        },
        {
            code: "(function(foo, bar) {});",
            options: ["never"]
        },
        {
            code: "(function baz(foo, bar) {});",
            options: ["never"]
        },
        {
            code: "(foo, bar) => {};",
            options: ["never"]
        },
        {
            code: "baz(foo, bar);",
            options: ["never"]
        },
        {
            code: "function baz() {}",
            options: ["never"]
        },

        // minItems option
        {
            code: "function baz(foo, bar) {}",
            options: [{ minItems: 3 }]
        },
        {
            code: `
                function baz(
                    foo, bar, qux
                ) {}
            `,
            options: [{ minItems: 3 }]
        },
        {
            code: `
                baz(
                    foo, bar, qux
                );
            `,
            options: [{ minItems: 3 }]
        },
        {
            code: "baz(foo, bar);",
            options: [{ minItems: 3 }]
        },
        {
            code: "foo(bar, baz)",
            options: ["consistent"]
        },
        {
            code: `
                foo(bar,
                baz)
            `,
            options: ["consistent"]
        },
        {
            code: `
                foo(
                    bar, baz
                )
            `,
            options: ["consistent"]
        },
        {
            code: `
                foo(
                    bar,
                    baz
                )
            `,
            options: ["consistent"]
        }
    ],

    invalid: [

        // multiline option (default)
        {
            code: `
                function baz(foo,
                    bar
                ) {}
            `,
            output: `
                function baz(\nfoo,
                    bar
                ) {}
            `,
            errors: [LEFT_MISSING_ERROR]
        },
        {
            code: `
                (function(
                    foo,
                    bar) {})
            `,
            output: `
                (function(
                    foo,
                    bar\n) {})
            `,
            errors: [RIGHT_MISSING_ERROR]
        },
        {
            code: `
                (function baz(foo,
                    bar) {})
            `,
            output: `
                (function baz(\nfoo,
                    bar\n) {})
            `,
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: `
                baz(
                    foo, bar);
            `,
            output: `
                baz(foo, bar);
            `,
            errors: [LEFT_UNEXPECTED_ERROR]
        },
        {
            code: `
                (foo, bar
                ) => {};
            `,
            output: `
                (foo, bar) => {};
            `,
            errors: [RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                function baz(
                    foo, bar
                ) {}
            `,
            output: `
                function baz(foo, bar) {}
            `,
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                function baz(
                ) {}
            `,
            output: `
                function baz() {}
            `,
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                new Foo(bar,
                    baz);
            `,
            output: `
                new Foo(\nbar,
                    baz\n);
            `,
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: `
                function baz(/* not fixed due to comment */
                foo) {}
            `,
            output: `
                function baz(/* not fixed due to comment */
                foo\n) {}
            `,
            errors: [RIGHT_MISSING_ERROR]
        },
        {
            code: `
                function baz(foo
                /* not fixed due to comment */) {}
            `,
            output: null,
            errors: [RIGHT_UNEXPECTED_ERROR]
        },

        // always option
        {
            code: `
                function baz(foo,
                    bar
                ) {}
            `,
            output: `
                function baz(\nfoo,
                    bar
                ) {}
            `,
            options: ["always"],
            errors: [LEFT_MISSING_ERROR]
        },
        {
            code: `
                (function(
                    foo,
                    bar) {})
            `,
            output: `
                (function(
                    foo,
                    bar\n) {})
            `,
            options: ["always"],
            errors: [RIGHT_MISSING_ERROR]
        },
        {
            code: `
                (function baz(foo,
                    bar) {})
            `,
            output: `
                (function baz(\nfoo,
                    bar\n) {})
            `,
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "function baz(foo, bar) {}",
            output: "function baz(\nfoo, bar\n) {}",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "(function(foo, bar) {});",
            output: "(function(\nfoo, bar\n) {});",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "(function baz(foo, bar) {});",
            output: "(function baz(\nfoo, bar\n) {});",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "(foo, bar) => {};",
            output: "(\nfoo, bar\n) => {};",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "baz(foo, bar);",
            output: "baz(\nfoo, bar\n);",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: "function baz() {}",
            output: "function baz(\n) {}",
            options: ["always"],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },

        // never option
        {
            code: `
                function baz(foo,
                    bar
                ) {}
            `,
            output: `
                function baz(foo,
                    bar) {}
            `,
            options: ["never"],
            errors: [RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                (function(
                    foo,
                    bar) {})
            `,
            output: `
                (function(foo,
                    bar) {})
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR]
        },
        {
            code: `
                function baz(
                    foo,
                    bar
                ) {}
            `,
            output: `
                function baz(foo,
                    bar) {}
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                (function(
                    foo,
                    bar
                ) {});
            `,
            output: `
                (function(foo,
                    bar) {});
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                (function baz(
                    foo,
                    bar
                ) {});
            `,
            output: `
                (function baz(foo,
                    bar) {});
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                (
                    foo,
                    bar
                ) => {};
            `,
            output: `
                (foo,
                    bar) => {};
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                baz(
                    foo,
                    bar
                );
            `,
            output: `
                baz(foo,
                    bar);
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                function baz(
                ) {}
            `,
            output: `
                function baz() {}
            `,
            options: ["never"],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },

        // minItems option
        {
            code: "function baz(foo, bar, qux) {}",
            output: "function baz(\nfoo, bar, qux\n) {}",
            options: [{ minItems: 3 }],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: `
                function baz(
                    foo, bar
                ) {}
            `,
            output: `
                function baz(foo, bar) {}
            `,
            options: [{ minItems: 3 }],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: "baz(foo, bar, qux);",
            output: "baz(\nfoo, bar, qux\n);",
            options: [{ minItems: 3 }],
            errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR]
        },
        {
            code: `
                baz(
                    foo,
                    bar
                );
            `,
            output: `
                baz(foo,
                    bar);
            `,
            options: [{ minItems: 3 }],
            errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR]
        },
        {
            code: `
                foo(
                    bar,
                    baz)
            `,
            output: `
                foo(
                    bar,
                    baz\n)
            `,
            options: ["consistent"],
            errors: [RIGHT_MISSING_ERROR]
        },
        {
            code: `
                foo(bar,
                    baz
                )
            `,
            output: `
                foo(bar,
                    baz)
            `,
            options: ["consistent"],
            errors: [RIGHT_UNEXPECTED_ERROR]
        }
    ]
});
