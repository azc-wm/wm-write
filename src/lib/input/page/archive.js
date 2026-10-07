// @ts-check

import { createFocusNavigator } from './focus.js';

/** @returns {import('./router.js').PageController} */
export function createArchiveController() {
	const navigator = createFocusNavigator({ root: document.querySelector('main'), selector: 'a[href], [data-focus-target]' });

	/** @returns {HTMLDetailsElement | null} */
	function activeNode() {
		const active = document.activeElement;
		const node = active instanceof Element ? active.closest('[data-archive-node]') : null;
		return node instanceof HTMLDetailsElement ? node : null;
	}

	/** @param {HTMLDetailsElement} node */
	function focusSummary(node) {
		const summary = node.querySelector('[data-focus-target]');
		if (summary instanceof HTMLElement) summary.focus();
	}

	return {
		mount() {},
		handle(action) {
			if (action.type === 'navigate') return navigator.focus(action.direction);
			const node = activeNode();
			if (!node) return false;
			if (action.type === 'expand') {
				node.open = true;
				return true;
			}
			if (action.type === 'activate') {
				if (!(document.activeElement instanceof HTMLElement) || !document.activeElement.matches('[data-focus-target]')) return false;
				node.open = !node.open;
				return true;
			}
			if (action.type === 'collapse') {
				if (node.open) {
					node.open = false;
					focusSummary(node);
					return true;
				}
				const parent = node.parentElement?.closest('[data-archive-node]');
				if (parent instanceof HTMLDetailsElement) {
					parent.open = false;
					focusSummary(parent);
				}
				return true;
			}
			return false;
		},
		destroy() {},
	};
}
