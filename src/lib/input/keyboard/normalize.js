// @ts-check

/** @type {Record<string, string>} */
const keyAliases = {
	Backspace: 'backspace',
	Escape: 'escape',
	Enter: 'enter',
	ArrowDown: 'arrowdown',
	ArrowUp: 'arrowup',
	'+': 'plus',
	'-': 'minus',
};

/** @param {KeyboardEvent} event */
export function normalizeKey(event) {
	const implicitShift = event.key === '+' || (event.key === '=' && event.shiftKey);
	const modifiers = [];

	if (event.ctrlKey || event.metaKey) modifiers.push('mod');
	if (event.altKey) modifiers.push('alt');
	if (event.shiftKey && !implicitShift) modifiers.push('shift');

	const key = event.key === '=' && event.shiftKey
		? 'plus'
		: keyAliases[event.key] ?? event.key.toLowerCase();

	return [...modifiers, key].join('+');
}
