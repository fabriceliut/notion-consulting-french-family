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
  // Adresse qui reçoit les messages du formulaire de contact.
  // Le formulaire utilise FormSubmit.co (sans backend) : les soumissions sont
  // envoyées par mail à cette adresse. Une confirmation unique est demandée à
  // la 1re soumission (cliquer le lien reçu par mail pour activer).
  contactEmail: "fabrice@liut.me",
} as const;

/** Endpoint FormSubmit pour la soumission native (fallback sans JS). */
export const CONTACT_ACTION = `https://formsubmit.co/${SITE.contactEmail}`;
/** Endpoint FormSubmit AJAX (réponse JSON) pour la soumission asynchrone. */
export const CONTACT_AJAX = `https://formsubmit.co/ajax/${SITE.contactEmail}`;

export const NAV_LINKS = [
  { href: "/#raison-detre", label: "Raison d’être" },
  { href: "/#pourquoi-notion", label: "Pourquoi Notion" },
  { href: "/#consultants", label: "Consultants" },
  { href: "/#rejoindre", label: "Rejoindre" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Base du site (ex. "/notion-consulting-french-family/"), injectée par Astro. */
export const BASE = import.meta.env.BASE_URL;

/**
 * Préfixe un chemin interne par la base du site.
 * Ex. withBase("/#contact") -> "/notion-consulting-french-family/#contact".
 * Les URL absolues (http…) et ancres pures (#…) sont laissées inchangées.
 */
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("#")) return path;
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Construit une URL absolue (site + base + chemin) pour canonical/OG/JSON-LD. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  const origin = site ? site.toString().replace(/\/$/, "") : "";
  return `${origin}${withBase(path)}`;
}
