// @ts-check

import { createDispatcher } from './dispatcher.js';
import { createGlobalController } from './global/controller.js';
import { createKeyboardController } from './keyboard/controller.js';
import { createPageController, resolvePageType } from './page/router.js';

/** @returns {{mount: () => void, destroy: () => void}} */
export function createInteractionController() {
	const pageType = resolvePageType(document.body?.dataset.page);
	const globalController = createGlobalController();
	const pageController = createPageController(pageType);
	const dispatcher = createDispatcher({ globalController, pageController });
	const keyboardController = createKeyboardController({ pageType, dispatch: dispatcher.dispatch });

	return {
		mount() {
			globalController.mount();
			pageController.mount();
			keyboardController.mount();
		},
		destroy() {
			keyboardController.destroy();
			pageController.destroy();
			globalController.destroy();
		},
	};
}
