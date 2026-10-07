// @ts-check

/** @typedef {import('../actions.js').GlobalAction} GlobalAction */
import { toggleTheme as nextTheme } from '../../theme/preference.js';

const navigationSourceKey = 'navigation-source';

/** @returns {{mount: () => void, handle: (action: GlobalAction) => boolean, destroy: () => void}} */
export function createGlobalController() {
	let restoreTimer = 0;

	function toggleTheme() {
		const theme = nextTheme(document.documentElement.dataset.theme);
		document.documentElement.dataset.theme = theme;
		try { localStorage.setItem('theme', theme); } catch {}
	}

	/** @param {'increase' | 'decrease'} direction */
	function changeContentWidth(direction) {
		const current = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--content-width'), 10) || 75;
		const width = Math.min(100, Math.max(50, current + (direction === 'increase' ? 5 : -5)));
		document.documentElement.style.setProperty('--content-width', `${width}ch`);
		try { localStorage.setItem('content-width', String(width)); } catch {}
	}

	/** @param {GlobalAction} action */
	function handle(action) {
		switch (action.type) {
			case 'theme.toggle':
				toggleTheme();
				return true;
			case 'history.back':
				if (history.length <= 1) return false;
				history.back();
				return true;
			case 'navigation.shortcut': {
				const link = document.querySelector(`header a[data-navigation-shortcut="${action.shortcut}"]`);
				if (!(link instanceof HTMLAnchorElement)) return false;
				link.click();
				return true;
			}
			case 'content-width.change':
				changeContentWidth(action.direction);
				return true;
			case 'focus.blur':
				if (!(document.activeElement instanceof HTMLElement)) return false;
				document.activeElement.blur();
				return true;
		}
	}

	/** @param {MouseEvent} event */
	function onClick(event) {
		const target = event.target instanceof Element ? event.target : null;
		const link = target?.closest('a[href]');
		if (link instanceof HTMLAnchorElement && link.origin === location.origin && link.target !== '_blank') {
			try { sessionStorage.setItem(navigationSourceKey, JSON.stringify({ from: location.href, target: link.href })); } catch {}
		}
		if (target?.closest('#theme-toggle')) handle({ type: 'theme.toggle' });
	}

	function restoreNavigationSource() {
		try {
			const source = JSON.parse(sessionStorage.getItem(navigationSourceKey) || 'null');
			if (!source || source.from !== location.href) return;
			const link = [...document.querySelectorAll('a[href]')].find((candidate) => candidate instanceof HTMLAnchorElement && candidate.href === source.target);
			if (link instanceof HTMLAnchorElement) link.focus({ preventScroll: true });
			sessionStorage.removeItem(navigationSourceKey);
		} catch {}
	}

	return {
		mount() {
			document.addEventListener('click', onClick);
			window.addEventListener('pageshow', restoreNavigationSource);
			restoreTimer = window.setTimeout(restoreNavigationSource, 0);
		},
		handle,
		destroy() {
			document.removeEventListener('click', onClick);
			window.removeEventListener('pageshow', restoreNavigationSource);
			window.clearTimeout(restoreTimer);
		},
	};
}
