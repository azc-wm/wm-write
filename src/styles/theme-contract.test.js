import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function paletteTokens(file) {
	return [...readFileSync(new URL(file, import.meta.url), 'utf8').matchAll(/^\s*--([\w-]+)\s*:/gm)]
		.map(([, name]) => name)
		.sort();
}

test('light and dark themes implement the same semantic palette', () => {
	const light = paletteTokens('./themes/light.css');
	const dark = paletteTokens('./themes/dark.css');
	assert.deepEqual(light, dark);
	assert.deepEqual(light, [
		'accent', 'background', 'code-background', 'emphasis', 'focus', 'inline-code', 'line', 'link',
		'marker', 'muted', 'secondary', 'strong', 'tertiary', 'text',
	].sort());
});
