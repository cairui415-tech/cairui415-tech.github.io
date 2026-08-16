# GitHub Pages Deployment Spec

## Goal

Publish the existing portfolio at `https://cairui415-tech.github.io/` so the URL can be placed on a resume.

## Requirements

- Preserve the current visual design, interactions, Chinese copy, media, email, and phone links.
- Keep the Vinext source project in the repository while producing a static `out/` artifact for GitHub Pages.
- Serve from the account root with no repository path prefix.
- Include `.nojekyll` so `_next/` assets are served.
- Verify the generated HTML and every local asset referenced by it before publishing.
- Publish a public GitHub repository named `cairui415-tech.github.io`.
- Do not modify or delete the user's source materials outside this workspace.

## Acceptance

- `npm test` passes.
- `npm run export:static` creates `out/index.html`, `out/404.html`, `.nojekyll`, media, CSS, and JavaScript.
- The GitHub Pages deployment reports `built` and the public URL returns HTTP 200.
