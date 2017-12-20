/**
 * @fileoverview Enforce event handler naming conventions in JSX
 * @author Jake Marsh
 */
'use strict';

const REACT_SUPPORTED_EVENTS = [
	'onCompositionEnd',
	'onCompositionStart',
	'onCompositionUpdate',
	'onCopy',
	'onCut',
	'onPaste',
	'onKeyDown',
	'onKeyPress',
	'onKeyUp',
	'onFocus',
	'onBlur',
	'onChange',
	'onInput',
	'onInvalid',
	'onSubmit',
	'onClick',
	'onContextMenu',
	'onDoubleClick',
	'onDrag',
	'onDragEnd',
	'onDragEnter',
	'onDragExit',
	'onDragLeave',
	'onDragOver',
	'onDragStart',
	'onDrop',
	'onMouseDown',
	'onMouseEnter',
	'onMouseLeave',
	'onMouseMove',
	'onMouseOut',
	'onMouseOver',
	'onMouseUp',
	'onSelect',
	'onTouchCancel',
	'onTouchEnd',
	'onTouchMove',
	'onTouchStart',
	'onScroll',
	'onWheel',
	'onAbort',
	'onCanPlay',
	'onCanPlayThrough',
	'onDurationChange',
	'onEmptied',
	'onEncrypted',
	'onEnded',
	'onError',
	'onLoadedData',
	'onLoadedMetadata',
	'onLoadStart',
	'onPause',
	'onPlay',
	'onPlaying',
	'onProgress',
	'onRateChange',
	'onSeeked',
	'onSeeking',
	'onStalled',
	'onSuspend',
	'onTimeUpdate',
	'onVolumeChange',
	'onWaiting',
	'onLoad',
	'onError',
	'onAnimationStart',
	'onAnimationEnd',
	'onAnimationIteration',
	'onTransitionEnd',
	'onToggle'
];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce event handler naming conventions in JSX',
      category: 'Stylistic Issues',
      recommended: false
    },

    schema: [{
      type: 'object',
      properties: {
        eventHandlerPrefix: {
          type: 'string'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const eventHandlerPrefix = configuration.eventHandlerPrefix || 'on';

    const EVENT_HANDLER_REGEX = new RegExp(`^((.*\\.)?${eventHandlerPrefix})[A-Z].*$`);
    const ALL_EVENTS = REACT_SUPPORTED_EVENTS.concat(REACT_SUPPORTED_EVENTS.map((evt) => `${evt}Capture`));

    return {
      JSXAttribute: function(node) {
        if (!node.value || !node.value.expression || !node.value.expression.object) {
          return;
        }

        const propKey = typeof node.name === 'object' ? node.name.name : node.name;
        const propValue = sourceCode.getText(node.value.expression).replace(/^this\.|.*::/, '');

        if (propKey === 'ref') {
          return;
        }

        const propIsEventHandler = ALL_EVENTS.includes(propKey);
        const propFnIsNamedCorrectly = EVENT_HANDLER_REGEX.test(propValue);

        if (propIsEventHandler && !propFnIsNamedCorrectly) {
          context.report({
            node: node,
            message: `Handler function for ${propKey} prop key must begin with '${eventHandlerPrefix}'`
          });
        }
      }
    };
  }
};
