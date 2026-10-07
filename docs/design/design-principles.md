# Design principles

wm-write is an editorial starter for technical and personal writing. Its visual language should feel calm, precise, readable, and connected to software without imitating a terminal or a generic SaaS landing page. These principles guide customization; the feature contracts document behavior.

## Typography and layout

- Use the bundled Commit Mono consistently across interface, articles, and metadata.
- Build hierarchy with size, weight, spacing, alignment, and contrast rather than a succession of typefaces.
- Keep prose comfortable to read, with a narrow measure and generous line spacing.
- Prefer simple grids, restrained separators, limited content width, and useful negative space.
- Keep supporting details subordinate to the writing. The article rails are optional and collapse into a single column on small screens.

## Color and detail

- Keep the palette small: a background, primary text, supporting tones, and a restrained accent.
- Use semantic tokens from both palette files so light and dark themes retain the same meaning.
- Reserve the accent for links, focus, selected states, and other functional emphasis.
- Prefer flat surfaces, discreet borders, and minimal or no corner rounding. Avoid decorative gradients, large shadows, glow, and blur.
- Use motion to communicate a state change; respect reduced-motion preferences.

## Navigation and interaction

- Keep navigation textual and make standard links, buttons, anchors, and native disclosure controls work without shortcuts.
- Keyboard controls supplement the visible interface and follow the behavior in the [keyboard navigation contract](../features/keyboard-navigation.md).
- Keep interactions direct and predictable. Avoid simulated terminals, custom cursors, and motion that does not explain a relationship or state.

## Content first

- Treat the home page as an entry point to the configured site and its writing, not a marketing hero.
- Prefer compact editorial lists over decorative cards when presenting articles.
- Use article sidebars, diagrams, code, and theme-specific artwork when they clarify the content.
- Keep copy concise and let the writing and working examples provide the site's personality.

The simplest treatment that preserves clarity and intent is usually the right one.
