// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Base canonique du site.
// Déploiement « project pages » GitHub : https://fabriceliut.github.io/notion-consulting-french-family/
// Pour un domaine personnalisé (CNAME) : site = domaine, base = "/", et rétablir public/CNAME.
export default defineConfig({
  site: "https://fabriceliut.github.io",
  base: "/notion-consulting-french-family/",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
