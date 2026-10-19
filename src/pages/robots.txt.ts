import type { APIRoute } from 'astro';
// Gera o robots.txt com o domínio definido em astro.config.mjs (campo "site").
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
