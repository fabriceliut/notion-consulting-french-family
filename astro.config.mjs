// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Base canonique du site.
// Domaine personnalisé (GitHub Pages + CNAME) : site = domaine, base = "/".
// Pour un déploiement "project pages" (https://<user>.github.io/<repo>/),
// remplacez `site` par "https://fabriceliut.github.io", `base` par "/notion-consulting-french-family/",
// et supprimez public/CNAME.
export default defineConfig({
  site: "https://collectif-notion-france.fr",
  base: "/",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
