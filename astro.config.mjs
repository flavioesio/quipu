import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Troque pelo domínio real antes de publicar (usado em canonical, hreflang e sitemap).
export default defineConfig({
  site: 'https://pisqu.digital/',
  trailingSlash: 'always',
  integrations: [
    // O hreflang de cada página já está no <head>; o sitemap lista todas as URLs.
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
});
