// @ts-check

/** @typedef {{height: number, scrollBy: (amount: number) => void}} ScrollTarget */

/** @returns {import('./router.js').PageController} */
export function createArticleController() {
	let direction = 0;
	let velocity = 0;
	let frame = 0;

	/** @returns {ScrollTarget} */
	function scrollTarget() {
		const container = document.querySelector('[data-scroll-container]');
		if (container instanceof HTMLElement) {
			const overflow = getComputedStyle(container).overflowY;
			if (overflow === 'auto' || overflow === 'scroll') {
				return { height: container.clientHeight, scrollBy(amount) { container.scrollTop += amount; } };
			}
		}
		return { height: window.innerHeight, scrollBy(amount) { window.scrollBy(0, amount); } };
	}

	function tick() {
		const target = scrollTarget();
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const targetVelocity = direction * target.height * (reduced ? 0.02 : 0.003);
		velocity += (targetVelocity - velocity) * (reduced ? 1 : 0.06);
		target.scrollBy(velocity);
		if (!direction && Math.abs(velocity) < 0.1) {
			velocity = 0;
			frame = 0;
			return;
		}
		frame = window.requestAnimationFrame(tick);
	}

	function stop() { direction = 0; }

	return {
		mount() { window.addEventListener('blur', stop); },
		handle(action) {
			if (action.type === 'scroll.stop') {
				stop();
				return true;
			}
			if (action.type !== 'scroll.start') return false;
			direction = action.direction === 'down' ? 1 : -1;
			if (!frame) frame = window.requestAnimationFrame(tick);
			return true;
		},
		destroy() {
			window.removeEventListener('blur', stop);
			if (frame) window.cancelAnimationFrame(frame);
			frame = 0;
			direction = 0;
			velocity = 0;
		},
	};
}
