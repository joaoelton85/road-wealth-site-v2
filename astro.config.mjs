import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roadwealth.com.br',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/^https:\/\/roadwealth\.com\.br\/404\/?$/.test(page),
    }),
  ],
});
