# Keyboard navigation

Keyboard shortcuts supplement the ordinary links, buttons, anchors, and native disclosure controls. They are ignored while focus is in a text input, textarea, select, editable region, or textbox.

## Global shortcuts

| Key | Action |
| --- | --- |
| Configured digit `0`–`9` | Activate the matching configured header navigation link, if present |
| `m` | Toggle between light and dark themes |
| `+` | Increase reading width by 5 characters, up to 100ch |
| `-` | Decrease reading width by 5 characters, down to 50ch |
| `Backspace` | Go back when browser history is available |
| `Escape` | Remove focus from the currently focused element |

Width and explicit theme choices are saved in local storage when available. Numeric navigation is resolved from the configured links rendered in the header; it does not depend on route names.

## Article pages

Hold `j` to scroll down or `k` to scroll up. Scrolling stops when the key is released or the page loses focus. The speed adapts to the available scroll area and respects reduced-motion preferences.

## Archive and other pages

On the writing archive, `j` / `ArrowDown` and `k` / `ArrowUp` move focus forward or backward among visible links and disclosure summaries, wrapping at either end. `l` opens the focused disclosure. `h` closes it, or closes its parent when the current disclosure is already closed. `Enter` toggles a disclosure when its summary is focused. Native disclosure controls remain available.

On other static pages, `j` / `ArrowDown` and `k` / `ArrowUp` move focus among visible links, wrapping at either end.

The keyboard controller uses page-type behavior and the rendered navigation markup rather than route names. That keeps shortcuts aligned with the configured links and current page layout; it is an implementation rationale, not a public routing API.
