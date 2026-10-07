// @ts-check

import { resolveKeyboardAction, resolveKeyboardReleaseAction } from './resolve.js';

/**
 * @typedef {import('../actions.js').Action} Action
 * @typedef {import('../actions.js').PageType} PageType
 * @typedef {{pageType: PageType, dispatch: (action: Action) => boolean}} KeyboardControllerOptions
 */

/** @param {KeyboardControllerOptions} options */
export function createKeyboardController({ pageType, dispatch }) {
	/** @param {KeyboardEvent} event */
	function onKeyDown(event) {
		if (event.defaultPrevented || isTypingTarget(event.target)) return;
		const action = resolveKeyboardAction(event, pageType);
		if (action && dispatch(action)) event.preventDefault();
	}

	/** @param {KeyboardEvent} event */
	function onKeyUp(event) {
		if (isTypingTarget(event.target)) return;
		const action = resolveKeyboardReleaseAction(event, pageType);
		if (action && dispatch(action)) event.preventDefault();
	}

	return {
		mount() {
			document.addEventListener('keydown', onKeyDown);
			document.addEventListener('keyup', onKeyUp);
		},
		destroy() {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		},
	};
}

/** @param {EventTarget | null} target */
function isTypingTarget(target) {
	if (!(target instanceof HTMLElement)) return false;
	return target.matches('input, textarea, select')
		|| target.isContentEditable
		|| target.getAttribute('role') === 'textbox';
}
