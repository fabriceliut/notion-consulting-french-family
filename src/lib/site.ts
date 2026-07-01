// Configuration centrale du site (métadonnées, navigation).
export const SITE = {
  name: "Collectif Notion France",
  shortName: "Collectif Notion FR",
  title: "Collectif Notion France — Consultants Notion en France",
  description:
    "Le collectif des consultants Notion indépendants en France. Trouvez un expert près de chez vous pour piloter votre TPE, PME ou PMI sur Notion.",
  locale: "fr_FR",
  lang: "fr",
  themeColor: "#ffffff",
  ogImage: "/assets/og-image.png",
  // Placeholder à remplacer par votre endpoint Formspree (https://formspree.io).
  formspreeId: "VOTRE_ID_FORMSPREE",
} as const;

export const NAV_LINKS = [
  { href: "/#raison-detre", label: "Raison d’être" },
  { href: "/#pourquoi-notion", label: "Pourquoi Notion" },
  { href: "/#consultants", label: "Consultants" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Construit une URL absolue à partir d'un chemin, en respectant `site`. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  const base = site ? site.toString().replace(/\/$/, "") : "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
