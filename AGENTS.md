## Project principles

- Keep JavaScript minimal; prefer Astro's zero-JS output and use Svelte islands only for genuinely interactive UI.
- Build components atomically: one clear responsibility, explicit props, accessible markup, and styles kept close to the component when practical.
- Prefer semantic HTML, progressive enhancement, native browser features, and CSS over client-side JavaScript.
- Keep the visual system minimal, sober, readable, and consistent. Avoid abstractions, dependencies, and configuration until the project needs them.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
