// @ts-check

import { createFocusNavigator } from './focus.js';

/** @returns {import('./router.js').PageController} */
export function createStaticController() {
	const navigator = createFocusNavigator({ root: document.querySelector('main'), selector: 'a[href], button, [data-focus-target]' });
	return {
		mount() {},
		handle(action) {
			return action.type === 'navigate' ? navigator.focus(action.direction) : false;
		},
		destroy() {},
	};
}
