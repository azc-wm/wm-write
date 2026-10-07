// @ts-check

import { globalBindings, pageBindings, pageReleaseBindings } from './bindings.js';
import { normalizeKey } from './normalize.js';

/**
 * @param {KeyboardEvent} event
 * @param {import('../actions.js').PageType} pageType
 * @returns {import('../actions.js').Action | null}
 */
export function resolveKeyboardAction(event, pageType) {
	return resolve(normalizeKey(event), pageType, pageBindings);
}

/**
 * @param {KeyboardEvent} event
 * @param {import('../actions.js').PageType} pageType
 * @returns {import('../actions.js').PageAction | null}
 */
export function resolveKeyboardReleaseAction(event, pageType) {
	return pageReleaseBindings[pageType]?.[normalizeKey(event)] ?? null;
}

/**
 * @param {string} key
 * @param {import('../actions.js').PageType} pageType
 * @param {Record<import('../actions.js').PageType, Record<string, import('../actions.js').PageAction>>} bindings
 * @returns {import('../actions.js').Action | null}
 */
function resolve(key, pageType, bindings) {
	return globalBindings[key] ?? bindings[pageType]?.[key] ?? (/^\d$/.test(key) ? { type: 'navigation.shortcut', shortcut: key } : null);
}
