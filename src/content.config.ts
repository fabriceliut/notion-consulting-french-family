import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Couleurs de tags disponibles (palette Notion).
const tagColor = z.enum(["blue", "green", "purple", "orange", "pink", "gray", "yellow"]);

const consultants = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/consultants" }),
  schema: z.object({
    /** Nom affiché (neutralité de genre : n'ajoutez pas de titre genré). */
    name: z.string(),
    /** Rôle / accroche courte, ex. « Organisation, Notion & IA ». */
    role: z.string(),
    /** Ville principale d'intervention. */
    city: z.string(),
    /** Région administrative. */
    region: z.string(),
    /** Libellé de localisation affiché dans le badge, ex. « Lyon · Auvergne-Rhône-Alpes ». */
    locationLabel: z.string(),
    /** Initiales du monogramme (avatar). */
    initials: z.string().max(3),
    /** Couleur de fond du monogramme. */
    avatarColor: tagColor.default("blue"),
    /** Bio courte pour la carte (accueil). */
    bioShort: z.string(),
    /** Bio longue pour la fiche (accueil optionnel, sinon corps markdown). */
    tags: z.array(z.object({ label: z.string(), color: tagColor })).default([]),
    /** Ordre d'affichage dans la grille (croissant). */
    order: z.number().default(100),
    /** Lignes de la liste « Informations » sur la fiche. */
    info: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
    /** Liens externes / actions de la fiche. */
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          /** true = bouton primaire, false = secondaire. */
          primary: z.boolean().default(false),
          /** true si lien externe (target _blank + rel). */
          external: z.boolean().default(true),
        }),
      )
      .default([]),
    /** URLs pour le champ sameAs du JSON-LD Person. */
    sameAs: z.array(z.string()).default([]),
    /** Domaines de compétence pour knowsAbout (JSON-LD). */
    knowsAbout: z.array(z.string()).default([]),
    /** SEO par fiche. */
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const collections = { consultants };
