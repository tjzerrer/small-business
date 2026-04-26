import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://small-business-toolkit.vercel.app",
  integrations: [sitemap()]
});
