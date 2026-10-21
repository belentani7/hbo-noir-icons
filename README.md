# BELENTANI — Neural Icons / HBO Noir Studio

**Visual identities for real projects, without fake data.** A bespoke cinematic 3D icon exploration, high-resolution vector export, local design workbench, public GitHub repository discovery and an optional server-side icon-brief adapter. Noir black, violet light, milky plasma and fluid glass.

## Product delivered in this branch

- **Original multi-view experience remains intact:** cascade-3D, smartwatch cascade, minimal zero-text and cinematic grand-screen views; custom icon studio, design rules, articles, CLI interface and Doctor Fix UI.
- **Live glyphs, real vector export:** `IconStudioModal` copies and downloads a **1024×1024 SVG** whose vector geometry is cloned from the **actual existing `RepoIcon` glyph**, not the former blank `<g>` placeholder. The export includes original paths, gradients/filters and a noir halo frame. The default glyph library contains 15 distinct symbolic renderers.
- **Privacy-safe catalog:** `src/data/repositories.ts` was absent and prevented the application from resolving imports. It is now intentionally empty at build time. The live public GitHub API can populate the gallery; a user with no accessible public repositories sees a professional empty state and can still access the design studio. No private names or invented star counts are bundled.
- **Honest GitHub semantics:** a metadata `homepage` value is labeled a **declared URL**; it is not claimed to be a verified live deployment.
- **Robust synced data:** public GitHub records with optional missing icon features no longer crash the icon inspector.
- **Owner-funded AI protection:** the MiniMax brief adapter no longer embeds a `VITE_MINIMAX_API_KEY` in browser JS. A same-origin server function `api/icon-brief.ts` handles the secret in server environment only and is **disabled by default**. Request size, same-origin guard, per-instance abuse cap, timeout, output parsing and bounded fields are included. The in-memory rate limit is **not globally authoritative across serverless replicas**; global edge/WAF limits and provider spending caps are prerequisites for enabling this publicly.
- **Brand and contracts:** package identity + lockfile aligned, complete shared view/mode types, real regression tests and a CI quality gate.

## Install locally

Node 22 with the retained npm lockfile:

```bash
npm ci --no-audit --no-fund
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Open http://localhost:3000. The Vite frontend works without secret keys. If there are no public repositories in the selected GitHub account, choose **Abrir laboratorio de iconos** in the empty state to use the local workbench; the app does not access your private repositories. The preview/rendering depends on a browser with WebGL/canvas support.

## Optional icon brief service

On Vercel, `/api/icon-brief` can be enabled *after* the owner sets a valid server-only `MINIMAX_API_KEY`, an approved `MINIMAX_MODEL`, verified provider behavior, the secret `ICON_BRIEF_API_ENABLED=true` **and** the client option `VITE_ICON_BRIEF_ENABLED=true`. Configure spend caps, edge global rate limits and domains before serving traffic. **Never** give browser code a provider bearer secret. The endpoint returns a text-based art-direction brief; SVG icon export is local and doesn't depend on MiniMax.

## Quality and honest release boundary

```bash
npm test
npm run lint  # strict TypeScript checker in this repository
npm run build
```

The new regression suite covers the actual vector geometry export, all 15 pre-existing renderers, the public-data privacy boundary, server-only credentials, and preservation of every original view. The CI workflow runs npm ci → tests → TypeScript → production Vite build. **None is declared passing until the job actually runs.** GitHub Actions has recently failed with no runner assignment in this account; that failure is a release blocker, not evidence about code quality.

This gallery is not a GitHub admin panel: browser public API calls cannot reveal private repositories, repair repositories, deploy production applications, or determine whether a homepage URL is operational merely from metadata. The in-app CLI is a visual project-navigation interface, not an unrestricted shell.

All original interactive components, specifications, CSS, scripts, brand assets and experimental modules are preserved.

---

## Initial AI Studio development notes (historical, preserved)

The following instructions originated with the initial prototype and referred to GEMINI_API_KEY. They are preserved for context; they do **not** describe current operational security or the frontend's working feature requirements.

---

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dec69f1a-51d1-44c4-8281-8f59bf285278

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
