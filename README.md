# Collectif Notion France

Site vitrine du **Collectif Notion France** — collectif de consultants Notion indépendants qui aident les TPE, PME et PMI françaises à piloter leur activité sur Notion.

Site statique multi-pages, rapide et accessible, construit avec **Astro**, **Tailwind CSS v4** et **TypeScript**. Zéro framework JS lourd côté client.

## Sommaire
- [Stack](#stack)
- [Structure du projet](#structure-du-projet)
- [Développement](#développement)
- [Administrer le site (guide pour les membres)](#administrer-le-site-guide-pour-les-membres)
  - [Modifier les textes et la navigation](#modifier-les-textes-et-la-navigation)
  - [Ajouter un consultant](#ajouter-un-consultant)
  - [Changer l'adresse de réception du formulaire](#changer-ladresse-de-réception-du-formulaire)
- [Déploiement (GitHub Pages)](#déploiement-github-pages)
- [Variables & fichiers à connaître](#variables--fichiers-à-connaître)

## Stack
- [Astro](https://astro.build) (v7) — génération statique, content collections, `astro:assets`.
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — tokens centralisés (`:root` + `@theme inline`).
- TypeScript (mode strict).
- `@astrojs/sitemap` — `sitemap-index.xml` généré au build.
- **Police Inter auto-hébergée** : un fichier variable `woff2` unique dans `src/fonts/`, préchargé — zéro requête tierce bloquante (meilleur FCP/LCP).
- **Images optimisées** via `astro:assets` : les illustrations de `src/assets/` sont converties en WebP au build, avec dimensions intrinsèques (zéro décalage de mise en page).

> Objectif tenu : Lighthouse mobile **100 / 100 / 100 / 100** (performance, accessibilité, bonnes pratiques, SEO).

## Structure du projet
```
.
├── .github/workflows/deploy.yml   # CI GitHub Pages (Node 22)
├── astro.config.mjs               # site, base, intégrations, plugin Tailwind
├── DESIGN.md                      # design system (source de vérité)
├── public/                        # servi tel quel (préfixer les liens par la base du site)
│   ├── assets/                    # og-image.png, logo.svg
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   └── llms.txt                   # résumé structuré (ère LLM)
└── src/
    ├── assets/                    # illustrations (converties en WebP au build)
    ├── fonts/inter-latin-var.woff2  # police Inter auto-hébergée
    ├── styles/global.css          # tokens de design + composants (Tailwind v4)
    ├── content.config.ts          # schéma de la collection « consultants »
    ├── content/consultants/*.md   # 1 fichier = 1 consultant
    ├── lib/site.ts                # config centrale : métadonnées, navigation, helpers d'URL, formulaire
    ├── layouts/BaseLayout.astro   # <head>, SEO/OG, header/footer, scripts (nav, reveal, formulaire)
    ├── components/                # Header, Footer, Logo, ConsultantCard, TagList, LocationBadge
    └── pages/
        ├── index.astro            # accueil (hero, chiffres, manifeste, sections, formulaire…)
        └── consultants/[slug].astro  # fiche générée depuis la collection
```

## Développement
Prérequis : **Node.js ≥ 22.12** (requis par Astro 7).

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev (http://localhost:4321)
npm run build    # build statique dans dist/
npm run preview  # prévisualiser le build
```

## Administrer le site (guide pour les membres)
Pas besoin d'être développeur pour les tâches courantes. Tout se passe dans des fichiers texte, et **chaque push sur `main` redéploie le site automatiquement** (voir [Déploiement](#déploiement-github-pages)). Vous pouvez éditer directement sur GitHub (bouton crayon ✏️) ou en local.

### Modifier les textes et la navigation
- **Textes de la page d'accueil** (hero, chiffres clés, manifeste, « Pourquoi Notion », « Rejoindre le collectif », tableau comparatif…) : [`src/pages/index.astro`](src/pages/index.astro). Les contenus répétés sont regroupés en haut du fichier dans des tableaux faciles à éditer : `features`, `iaFeature`, `joinFeatures`, `compareRows`, `regions`.
- **Nom du site, description SEO, liens du menu** : [`src/lib/site.ts`](src/lib/site.ts) (`SITE` et `NAV_LINKS`).
- **Couleurs, typographie, styles** : tokens dans `:root` au début de [`src/styles/global.css`](src/styles/global.css) ; principes détaillés dans [`DESIGN.md`](DESIGN.md).

### Ajouter un consultant
1. Copiez un fichier existant comme modèle ([`src/content/consultants/fabrice-liut.md`](src/content/consultants/fabrice-liut.md) ou [`marie-bernard.md`](src/content/consultants/marie-bernard.md)) vers `src/content/consultants/prenom-nom.md`. **Le nom du fichier = le slug de l'URL** (`/consultants/prenom-nom`).
2. Renseignez le frontmatter (validé par le schéma [`src/content.config.ts`](src/content.config.ts)) :

```markdown
---
name: "Prénom Nom"
role: "Notion & organisation"
city: "Nantes"
region: "Pays de la Loire"
locationLabel: "Nantes · Pays de la Loire"
initials: "PN"
avatarColor: "green"          # blue | green | purple | orange | pink | gray | yellow
order: 30                      # ordre dans la grille (croissant)
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

3. La carte d'accueil, la fiche `/consultants/prenom-nom`, le sitemap et le JSON-LD `Person` sont générés automatiquement. Ton **neutre en genre** : n'ajoutez pas de titre genré.
4. Commitez sur `main` : la nouvelle fiche est en ligne après le déploiement.

> Astuce : les liens internes (ex. `href: "/#contact"`) sont automatiquement préfixés par la base du site via le helper `withBase()`. N'écrivez jamais de chemin interne « en dur ».

### Changer l'adresse de réception du formulaire
Modifiez `SITE.contactEmail` dans [`src/lib/site.ts`](src/lib/site.ts). Le formulaire passe par [FormSubmit.co](https://formsubmit.co) (sans backend) : à la **1re soumission vers une nouvelle adresse**, un mail de confirmation est envoyé — cliquez le lien **une seule fois** pour activer la réception. Ensuite les messages arrivent directement par mail.

## Déploiement (GitHub Pages)
Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) build le site et le publie sur GitHub Pages **à chaque push sur `main`**. Aucune action manuelle : commitez sur `main`, le site se met à jour en quelques minutes.

Configuration faite une fois : **Settings → Pages → Source : GitHub Actions**.

### Configuration actuelle (project pages)
Le site est publié sur `https://fabriceliut.github.io/notion-consulting-french-family/` :
- [`astro.config.mjs`](astro.config.mjs) → `site: "https://fabriceliut.github.io"`, `base: "/notion-consulting-french-family/"`.
- Les liens et assets internes passent par `withBase()` / `absoluteUrl()` ([`src/lib/site.ts`](src/lib/site.ts)) — ne codez pas les chemins en dur.

### Passer à un domaine personnalisé
1. [`astro.config.mjs`](astro.config.mjs) → `site: "https://votre-domaine.fr"`, `base: "/"`.
2. Créez `public/CNAME` contenant `votre-domaine.fr`.
3. Configurez l'enregistrement DNS (CNAME/ALIAS) vers `fabriceliut.github.io`.
4. Mettez à jour les URL absolues dans [`public/robots.txt`](public/robots.txt) et [`public/llms.txt`](public/llms.txt).

## Variables & fichiers à connaître
| Élément | Emplacement | Description |
| --- | --- | --- |
| `contactEmail` | [`src/lib/site.ts`](src/lib/site.ts) (`SITE.contactEmail`) | Adresse qui reçoit les messages du formulaire (via [FormSubmit.co](https://formsubmit.co)). Activation unique à la 1re soumission. |
| `SITE` / `NAV_LINKS` | [`src/lib/site.ts`](src/lib/site.ts) | Nom, description SEO, thème, et liens du menu de navigation. |
| `site` / `base` | [`astro.config.mjs`](astro.config.mjs) | Domaine et sous-chemin de déploiement (voir ci-dessus). |
| `og-image.png` | [`public/assets/og-image.png`](public/assets/og-image.png) | Image Open Graph 1200×630 (remplaçable). |
| Illustrations | [`src/assets/`](src/assets) | Converties en WebP au build ; référencées via `import` + `<Image>` dans `index.astro`. |

---
Collectif indépendant, non affilié à Notion Labs, Inc.
