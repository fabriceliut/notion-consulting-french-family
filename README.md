# Collectif Notion France

Site vitrine du **Collectif Notion France** — collectif de consultants Notion indépendants qui aident les TPE, PME et PMI françaises à piloter leur activité sur Notion.

Site statique multi-pages, rapide et accessible, construit avec **Astro**, **Tailwind CSS v4** et **TypeScript**. Zéro framework JS lourd côté client.

## Sommaire
- [Stack](#stack)
- [Structure du projet](#structure-du-projet)
- [Développement](#développement)
- [Déploiement (GitHub Pages)](#déploiement-github-pages)
- [Ajouter un consultant](#ajouter-un-consultant)
- [Variables à remplacer](#variables-à-remplacer)

## Stack
- [Astro](https://astro.build) (dernière version) — génération statique, content collections.
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — tokens centralisés (`@theme inline`).
- TypeScript (mode strict).
- `@astrojs/sitemap` — `sitemap-index.xml` généré au build.
- Polices Inter chargées via `preconnect` + `stylesheet` (pas d'`@import` CSS).

## Structure du projet
```
.
├── .github/workflows/deploy.yml   # CI GitHub Pages
├── astro.config.mjs               # site, base, intégrations, plugin Tailwind
├── DESIGN.md                      # design system (source de vérité)
├── public/
│   ├── assets/                    # og-image.png, logo.svg
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── llms.txt                   # résumé structuré (ère LLM)
│   └── CNAME                      # domaine personnalisé GitHub Pages
└── src/
    ├── styles/global.css          # tokens + composants (Tailwind v4)
    ├── content.config.ts          # schéma de la collection « consultants »
    ├── content/consultants/*.md   # 1 fichier par consultant
    ├── lib/site.ts                # config centrale (métadonnées, nav)
    ├── layouts/BaseLayout.astro   # <head>, SEO/OG, header/footer, scripts
    ├── components/                # Header, Footer, Logo, ConsultantCard, TagList, LocationBadge
    └── pages/
        ├── index.astro            # accueil (toutes les sections)
        └── consultants/[slug].astro  # fiche générée depuis la collection
```

## Développement
Prérequis : Node.js ≥ 20.

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev (http://localhost:4321)
npm run build    # build statique dans dist/
npm run preview  # prévisualiser le build
```

## Déploiement (GitHub Pages)
Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) build le site et le publie sur GitHub Pages à chaque push sur `main`.

Étapes une fois :
1. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
2. Pousser sur `main` : le site est déployé automatiquement.

### Domaine personnalisé (par défaut)
Le projet est configuré pour le domaine `collectif-notion-france.fr` :
- `astro.config.mjs` → `site: "https://collectif-notion-france.fr"`, `base: "/"`.
- [`public/CNAME`](public/CNAME) contient le domaine.
- Configurez l'enregistrement DNS (CNAME/ALIAS) vers `fabriceliut.github.io`.

### Sans domaine personnalisé (project pages)
Pour publier sur `https://fabriceliut.github.io/notion-consulting-french-family/` :
1. Dans `astro.config.mjs` : `site: "https://fabriceliut.github.io"`, `base: "/notion-consulting-french-family/"`.
2. Supprimez [`public/CNAME`](public/CNAME).
3. Mettez à jour les URL absolues dans `public/robots.txt` et `public/llms.txt`.

## Ajouter un consultant
1. Créez un fichier `src/content/consultants/prenom-nom.md`. Le nom du fichier = le slug de l'URL (`/consultants/prenom-nom`).
2. Renseignez le frontmatter (validé par le schéma [`src/content.config.ts`](src/content.config.ts)) :

```markdown
---
name: "Prénom Nom"
role: "Notion & organisation"
city: "Nantes"
region: "Pays de la Loire"
locationLabel: "Nantes · Pays de la Loire"
initials: "PN"
avatarColor: "green"        # blue | green | purple | orange | pink | gray | yellow
order: 30                     # ordre dans la grille (croissant)
bioShort: "Bio courte affichée sur la carte d'accueil."
tags:
  - { label: "Notion", color: "purple" }
  - { label: "Organisation", color: "blue" }
info:
  - { k: "Localisation", v: "Nantes — présentiel possible dans la région" }
  - { k: "Spécialités", v: "Notion, organisation" }
links:
  - { label: "LinkedIn", href: "https://www.linkedin.com/in/…", primary: false, external: true }
  - { label: "Contacter via le collectif", href: "/#contact", primary: true, external: false }
sameAs:
  - "https://www.linkedin.com/in/…"
knowsAbout: ["Notion", "Organisation"]
seo:
  title: "Prénom Nom — Consultant Notion à Nantes"
  description: "Description SEO de la fiche (≤ 160 caractères)."
---

Bio longue en Markdown. Les listes, paragraphes et emphases sont rendus dans la
zone `.prose` de la fiche.
```

3. La carte d'accueil, la fiche, le sitemap et le JSON-LD `Person` sont générés automatiquement. Ton **neutre en genre** : n'ajoutez pas de titre genré.

## Variables à remplacer
| Variable | Emplacement | Description |
| --- | --- | --- |
| `contactEmail` | [`src/lib/site.ts`](src/lib/site.ts) (`SITE.contactEmail`) | Adresse qui reçoit les messages du formulaire. Le formulaire passe par [FormSubmit.co](https://formsubmit.co) (sans backend) : à la **1re soumission**, un mail de confirmation est envoyé à cette adresse — cliquez le lien une fois pour activer. Ensuite les messages arrivent directement par mail. |
| `site` / `base` / CNAME | [`astro.config.mjs`](astro.config.mjs), [`public/CNAME`](public/CNAME) | Domaine de déploiement (voir ci-dessus). |
| `og-image.png` | [`public/assets/og-image.png`](public/assets/og-image.png) | Image Open Graph 1200×630 (déjà fournie, remplaçable). |

---
Collectif indépendant, non affilié à Notion Labs, Inc.
