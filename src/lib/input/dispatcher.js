// @ts-check

/**
 * @typedef {import('./actions.js').Action} Action
 * @typedef {{handle: (action: import('./actions.js').GlobalAction) => boolean}} GlobalController
 * @typedef {{handle: (action: import('./actions.js').PageAction) => boolean}} PageController
 */

const globalActionTypes = new Set([
	'theme.toggle',
	'history.back',
	'navigation.shortcut',
	'content-width.change',
	'focus.blur',
]);

/** @param {{globalController: GlobalController, pageController: PageController}} options */
export function createDispatcher({ globalController, pageController }) {
	/** @param {Action} action */
	function dispatch(action) {
		if (globalActionTypes.has(action.type)) return globalController.handle(/** @type {import('./actions.js').GlobalAction} */ (action));
		return pageController.handle(/** @type {import('./actions.js').PageAction} */ (action));
	}

	return { dispatch };
}
