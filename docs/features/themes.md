# Themes and design tokens

The starter has two palettes, light and dark. `system` is an initial preference that selects one of those palettes from the operating-system preference; it is not a third palette. The default configured preference is `light`, preserving the starter's reference appearance.

## Styling architecture

- `src/styles/tokens.css` defines theme-independent design scales: body font, font sizes, line heights, spacing, content width, small radius, and shared transition duration.
- `src/styles/themes/light.css` and `src/styles/themes/dark.css` define the same semantic color tokens for each palette. Keep colors here; do not duplicate them under theme-specific names.
- `src/styles/theme.css` composes the token and palette files with imports. It does not contain component styling.
- `src/styles/global.css` and component styles use the tokens to implement the actual site design. Local layout details remain local.

## Public tokens

### Shared design scales

`tokens.css` currently exposes:

| Purpose | Tokens |
| --- | --- |
| Typography | `--font-body`, `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--line-height-tight`, `--line-height-prose`, `--line-height-normal` |
| Spacing | `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-6`, `--space-8`, `--space-10`, `--space-12` |
| Layout | `--content-width` |
| Shape | `--radius-sm` |
| Motion | `--duration-normal` |

For example, change `--content-width` or a spacing scale value to adjust the shared layout rhythm. The keyboard width control still adjusts `--content-width` at runtime and persists that reader preference.

There is no separate page-width token because the layout has no shared fixed page-width value. Individual sidebar widths, rail dimensions, and one-off offsets remain in component CSS.

### Semantic palette

Both palette files implement the same set:

```text
--background       --text             --muted
--line             --inline-code      --code-background
--accent           --secondary        --tertiary
--link             --marker           --strong
--emphasis         --focus
```

Change a token's value in both light and dark files when the meaning should stay consistent, or tune each value independently to preserve contrast. Components consume semantic names such as `var(--text)` and `var(--background)`; they do not need to know which palette is active.

## Default theme behavior

Set the initial preference in `src/site.config.ts`:

```ts
theme: {
  default: 'system', // 'light', 'dark', or 'system'
},
```

Resolution order is:

1. A persisted explicit `light` or `dark` choice wins.
2. Otherwise, a configured `light` or `dark` default is used.
3. With `system`, the effective palette follows `prefers-color-scheme`, including changes while the page is open until the reader chooses a theme.

An automatically resolved system value is not saved as a user preference. The visible toggle remains a two-state light/dark switch; clicking it or pressing `m` stores the explicit choice in local storage.

## Integrations

- **Shiki:** keeps its own `github-light` and `catppuccin-mocha` code themes. CSS selects the dark token output when `data-theme="dark"` is active.
- **Mermaid:** initializes with Mermaid's default or dark theme from the effective theme when the article loads. Existing rendered diagrams are not redrawn after a theme toggle.
- **Theme-dependent images:** MDX can pair `image-light` and `image-dark` in a `theme-image-pair`; the CSS crossfade uses `--duration-normal` and honors reduced-motion preferences. See the example in `kitchen-sink`.
- **KaTeX:** its stylesheet is included as before; it does not have a separate site palette integration.

## Design boundary

The starter exposes shared design scales and semantic theme tokens, not per-component styling configuration. V0.1 does not provide arbitrary named themes, a theme registry, runtime theme loading, theme presets or marketplace, or palette values in `site.config.ts`.
