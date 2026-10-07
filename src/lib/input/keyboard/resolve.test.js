import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveKeyboardAction } from './resolve.js';

/** @param {string} key */
function keyEvent(key) {
	return /** @type {KeyboardEvent} */ ({ key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false });
}

test('numeric navigation shortcuts resolve without route names', () => {
	assert.deepEqual(resolveKeyboardAction(keyEvent('2'), 'static'), {
		type: 'navigation.shortcut',
		shortcut: '2',
	});
});
