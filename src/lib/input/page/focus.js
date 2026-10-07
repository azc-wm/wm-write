// @ts-check

/** @typedef {'next' | 'previous'} FocusDirection */

/** @param {{root: HTMLElement | null, selector: string}} options */
export function createFocusNavigator({ root, selector }) {
	function visibleTargets() {
		if (!root) return [];
		return /** @type {HTMLElement[]} */ ([...root.querySelectorAll(selector)].filter(isVisible));
	}

	/** @param {FocusDirection} direction */
	function focus(direction) {
		const targets = visibleTargets();
		if (!targets.length) return false;
		const current = targets.findIndex((target) => target === document.activeElement);
		const offset = direction === 'next' ? 1 : -1;
		const index = current === -1
			? (direction === 'next' ? 0 : targets.length - 1)
			: (current + offset + targets.length) % targets.length;
		targets[index].focus();
		return true;
	}

	return { focus };
}

/** @param {Element} element @returns {element is HTMLElement} */
function isVisible(element) {
	if (!(element instanceof HTMLElement)) return false;
	const style = getComputedStyle(element);
	return element.getClientRects().length > 0 && style.visibility !== 'hidden' && style.display !== 'none';
}
