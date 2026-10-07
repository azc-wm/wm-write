// @ts-check

import { createArchiveController } from './archive.js';
import { createArticleController } from './article.js';
import { createStaticController } from './static.js';

/**
 * @typedef {Object} PageController
 * @property {() => void} mount
 * @property {(action: import('../actions.js').PageAction) => boolean} handle
 * @property {() => void} destroy
 */

/** @param {string | undefined} pageType */
export function resolvePageType(pageType) {
	return pageType === 'article' || pageType === 'archive' || pageType === 'static' ? pageType : 'static';
}

/** @param {import('../actions.js').PageType} pageType */
export function createPageController(pageType) {
	switch (pageType) {
		case 'article': return createArticleController();
		case 'archive': return createArchiveController();
		default: return createStaticController();
	}
}
