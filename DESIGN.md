# DESIGN.md — Collectif Notion France

Companion file (format Stitch) pour toute IA de coding. Source de vérité du design system.

**Archétype socle :** Editorial warm (canonique : Notion) — crème, neutres chauds, surfaces douces.
**Déviation signature (sobre) :** (1) système éditorial léger (eyebrows, hiérarchie typo nette, tableau comparatif structuré) + (2) data discret (tableau Notion vs Google/Microsoft). Motion volontairement retenu (« premium propre », pas « site expérience »).

## 1. Visual Theme & Atmosphere
Clair, calme, éditorial. Beaucoup de blanc, neutres chauds à la Notion, un seul accent (bleu Notion). Densité modérée, lisibilité avant tout. Aucun ornement gratuit.

## 2. Color Palette & Roles (oklch)
- `--bg` oklch(1 0 0) — fond principal
- `--bg-warm` oklch(0.975 0.004 85) — sections alternées (crème chaud)
- `--surface` / `--surface-2` — cartes / champs
- `--text` oklch(0.31 0.006 65) — near-black chaud Notion (#37352f)
- `--text-muted` / `--text-faint` — via color-mix
- `--border` / `--border-strong` — via color-mix
- `--primary` oklch(0.63 0.153 251) — bleu Notion (#2383e2) ; états via color-mix
- Tags : palette Notion (blue/green/purple/orange/pink/gray/yellow), texte #37352f

## 3. Typography Rules
- Inter (400/500/600/700), fallback système. `font-feature-settings: "liga","kern"`. Tracking négatif titres (-0.02 à -0.035em).
- Échelle fluid clamp() : h1 (2.25–3.75rem), h2 (1.6–2.4rem), h3 ~1.45rem, body ~1.075rem. Ratio ~1.25.
- Largeur de lecture limitée (.prose max 680px).

## 4. Component Stylings (5 états)
- Button primary/secondary : default / hover (translateY -1px) / active (scale .985) / focus (ring 3px) / disabled.
- Card (feature, consultant) : border 1px, radius 12px, hover translateY -3px + shadow.
- Input/Select/Textarea : border-strong, focus ring bleu, hover border-faint.
- Nav : sticky, backdrop-blur + bordure au scroll (.is-scrolled).
- Tag/Loc : pill, palette Notion.

## 5. Layout Principles
- Base 8px. max-width 1080px. Gutter clamp(20–40px). Section-gap clamp(72–128px). Grilles auto-fit.

## 6. Depth & Elevation
- 3 niveaux : plat / --shadow-card (hover) / --shadow-elevate (cartes consultants, menu mobile). Pas de shadow-xl générique.

## 7. Do's and Don'ts
- DO : neutres chauds, un seul accent, contenu réel, focus visible custom, mobile-first.
- DON'T : blobs, gradients déco, Lorem ipsum, icône générique en logo, multi-sets d'icônes.

## 8. Responsive Behavior
- Breakpoints 640/768/1024/1280. Nav → hamburger < 720px. Form 2 col → 1 col. Touch targets ≥ 40px.

## 9. Agent Prompt Guide
- Utiliser les variables par rôle, jamais de hex isolé hors tags.
- Prompt-type : « Reproduis la charte Notion : fond blanc/crème chaud, texte #37352f, accent bleu #2383e2, Inter, cartes bords 1px radius 12px, motion retenu (reveal opacity+translateY, respect prefers-reduced-motion). »

## 10. Implémentation (Astro + Tailwind v4)
- **Source unique des tokens :** [`src/styles/global.css`](src/styles/global.css). Les rôles sont définis dans `:root` (`--bg`, `--text`, `--primary`, `--r-card`…). Un bloc `@theme inline` réexpose ces variables aux utilitaires Tailwind v4 (`text-primary`, `bg-warm`, `rounded-card`…) sans dupliquer les valeurs.
- **Polices :** Inter chargée via `<link preconnect>` + `<link stylesheet>` dans [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) (jamais d'`@import` CSS).
- **Composants (5 états) :** classes utilitaires sémantiques `.btn`/`.btn--primary`/`.btn--secondary` (default/hover/active/focus-visible/disabled), `.feature`, `.consultant-card`, `.input`/`.select`/`.textarea`, `.tag--*`, `.loc`, `.callout`, `.compare`. Focus-visible = ring 3px (`--focus-ring`). Cibles tactiles ≥ 40px (`min-height`).
- **Motion :** `[data-reveal]` (opacity + translateY 18px, easing `cubic-bezier(0.16,1,0.3,1)`, 600ms), révélé par IntersectionObserver ; navbar `backdrop-blur` via `.is-scrolled`. Tout est neutralisé sous `prefers-reduced-motion: reduce`.
- **Palette de tags :** clé `avatarColor`/`color` (`blue|green|purple|orange|pink|gray|yellow`) → `--tag-<clé>-bg`, texte `--tag-text` (#37352f).
