/**
 * @fileoverview Tests for jsx-handler-names
 * @author Jake Marsh
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/jsx-handler-names');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-handler-names', rule, {
  valid: [{
    code: '<TestComponent onChange={this.onChange} />'
  }, {
    code: '<TestComponent onChange={this.props.onChange} />'
  }, {
    code: '<TestComponent onChange={this.props.onFoo} />'
  }, {
    code: '<TestComponent isSelected={this.props.isSelected} />'
  }, {
    code: '<TestComponent onNonReservedEvent={this.state.shouldDisplay} />'
  }, {
    code: '<TestComponent shouldDisplay={arr[0].prop} />'
  }, {
    code: '<TestComponent onChange={props.onChange} />'
  }, {
    code: '<TestComponent ref={this.handleRef} />'
  }, {
    code: '<TestComponent ref={this.somethingRef} />'
  }, {
    code: '<TestComponent onFocus={this.props.garbageTrucksContent} />',
    options: [{eventHandlerPrefix: 'garbageTrucks'}]
  }, {
    code: '<TestComponent onFocus={this.garbageTrucksContent} />',
    options: [{eventHandlerPrefix: 'garbageTrucks'}]
  }, {
    code: '<TestComponent onChange={props::onChange} />',
    parser: 'babel-eslint'
  }, {
    code: '<TestComponent onChange={::props.onChange} />',
    parser: 'babel-eslint'
  }, {
    code: '<TestComponent onChange={props.foo::onChange} />',
    parser: 'babel-eslint'
  }, {
    code: '<TestComponent only={this.only} />'
  }],

  invalid: [{
    code: '<TestComponent onChange={this.doSomethingOnChange} />',
    errors: [{message: 'Handler function for onChange prop key must begin with \'on\''}]
  }, {
    code: '<TestComponent onClick={this.handlerChange} />',
    errors: [{message: 'Handler function for onClick prop key must begin with \'on\''}]
  }, {
    code: '<TestComponent onClick={this.handlerChange} />',
    options: [{eventHandlerPrefix: 'jumpingJacks'}],
    errors: [{message: 'Handler function for onClick prop key must begin with \'jumpingJacks\''}]
  }, {
    code: '<TestComponent onBlur={this.props.handlerChange} />',
    options: [{eventHandlerPrefix: 'garbageTrucks'}],
    errors: [{message: 'Handler function for onBlur prop key must begin with \'garbageTrucks\''}]
  }, {
    code: '<TestComponent onBlur={this.props.handlerChange} />',
    options: [{eventHandlerPrefix: 'garbageTrucks'}],
    errors: [{message: 'Handler function for onBlur prop key must begin with \'garbageTrucks\''}]
  }]
});
