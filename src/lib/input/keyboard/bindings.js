// @ts-check

/** @typedef {import('../actions.js').PageType} PageType */

/** @type {Record<string, import('../actions.js').GlobalAction>} */
export const globalBindings = {
	m: { type: 'theme.toggle' },
	backspace: { type: 'history.back' },
	escape: { type: 'focus.blur' },
	plus: { type: 'content-width.change', direction: 'increase' },
	minus: { type: 'content-width.change', direction: 'decrease' },
};


/** @type {Record<PageType, Record<string, import('../actions.js').PageAction>>} */
export const pageBindings = {
	article: {
		j: { type: 'scroll.start', direction: 'down' },
		k: { type: 'scroll.start', direction: 'up' },
	},

	archive: {
		j: { type: 'navigate', direction: 'next' },
		k: { type: 'navigate', direction: 'previous' },
		arrowdown: { type: 'navigate', direction: 'next' },
		arrowup: { type: 'navigate', direction: 'previous' },
		l: { type: 'expand' },
		h: { type: 'collapse' },
		enter: { type: 'activate' },
  },

	static: {
		j: { type: 'navigate', direction: 'next' },
		k: { type: 'navigate', direction: 'previous' },
		arrowdown: { type: 'navigate', direction: 'next' },
		arrowup: { type: 'navigate', direction: 'previous' },
	},
};

/** @type {Record<PageType, Record<string, import('../actions.js').PageAction>>} */
export const pageReleaseBindings = {
	article: {
		j: { type: 'scroll.stop' },
		k: { type: 'scroll.stop' },
	},
	archive: {},
	static: {},
};
