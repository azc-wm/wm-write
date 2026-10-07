# Article layout

The article page keeps the text column narrow and places supporting information around it on wide screens:

```text
context rail | article | tags and table of contents
```

The left rail is populated by the post's optional `left-aside.mdx`. The right rail contains the optional `right-aside.mdx`, tags, and a table of contents generated from article headings. Sidecars stay beside the article and are discovered by filename.

At smaller widths, the layout collapses into a single column. The article remains readable without the sidecars or JavaScript. The scrollbar and keyboard controller enhance navigation while ordinary links, anchors, and native disclosure controls remain available.

The content itself supplies headings, images, and code blocks. For artwork with separate light and dark versions, a `theme-image-pair` crossfades between `image-light` and `image-dark` when the theme changes. Its opacity transition shares the duration token used by theme colors and respects reduced-motion preferences. CSS provides the typography, spacing, and color tokens; the article layout stays shared across posts.
