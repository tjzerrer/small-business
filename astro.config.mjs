import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://small-business.vercel.app",
  integrations: [sitemap()]
});
