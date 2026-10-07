// @ts-check

/** @typedef {'article' | 'archive' | 'static'} PageType */

/** @typedef {(
 *  | { type: 'theme.toggle' }
 *  | { type: 'navigation.shortcut'; shortcut: string }
 *  | { type: 'history.back' }
 *  | { type: 'content-width.change'; direction: 'increase' | 'decrease' }
 *  | { type: 'focus.blur' }
 * )} GlobalAction */

/** @typedef {(
 *   | { type: 'navigate'; direction: 'next' | 'previous' }
 *   | { type: 'scroll.start'; direction: 'up' | 'down' }
 *   | { type: 'scroll.stop' }
 *   | { type: 'expand' }
 *   | { type: 'collapse' }
 *   | { type: 'activate' }
 * )} PageAction */

/** @typedef {GlobalAction | PageAction} Action */

export {};
