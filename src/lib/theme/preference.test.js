import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveEffectiveTheme, toggleTheme } from './preference.js';

test('configured light and dark defaults resolve directly', () => {
	assert.equal(resolveEffectiveTheme(null, 'light', true), 'light');
	assert.equal(resolveEffectiveTheme(null, 'dark', false), 'dark');
});

test('system default follows either system preference', () => {
	assert.equal(resolveEffectiveTheme(null, 'system', false), 'light');
	assert.equal(resolveEffectiveTheme(null, 'system', true), 'dark');
});

test('persisted explicit preference wins over configured and system defaults', () => {
	assert.equal(resolveEffectiveTheme('light', 'dark', true), 'light');
	assert.equal(resolveEffectiveTheme('dark', 'light', false), 'dark');
});

test('toggle remains a two-state light/dark switch', () => {
	assert.equal(toggleTheme('light'), 'dark');
	assert.equal(toggleTheme('dark'), 'light');
});
