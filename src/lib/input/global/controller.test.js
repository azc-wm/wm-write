import test from 'node:test';
import assert from 'node:assert/strict';
import { createGlobalController } from './controller.js';

test('keyboard theme toggle changes effective theme and persists explicit preference', () => {
	const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
	const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
	const writes = [];
	Object.defineProperty(globalThis, 'document', {
		configurable: true,
		value: { documentElement: { dataset: { theme: 'light' } } },
	});
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		value: { setItem: (...entry) => writes.push(entry) },
	});
	try {
		assert.equal(createGlobalController().handle({ type: 'theme.toggle' }), true);
		assert.equal(document.documentElement.dataset.theme, 'dark');
		assert.deepEqual(writes, [['theme', 'dark']]);
	} finally {
		if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument);
		else delete globalThis.document;
		if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
		else delete globalThis.localStorage;
	}
});
