import type { APIRoute } from 'astro';
import { S, U, seo, serviceUrl, url, langs, type Lang } from '../lib/site';
// Resumo do site em texto simples para buscadores com IA (convenção llms.txt).
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const names: Record<Lang, string> = { pt: 'Português', en: 'English', es: 'Español' };
  const parts = [
    '# Pisqu — Consultoria & Agência',
    '> Agência de marketing digital, desenvolvimento web, inteligência artificial e automação. Digital marketing, web development, AI and automation agency. Agencia de marketing digital, desarrollo web, IA y automatización.',
  ];
  for (const l of langs) {
    parts.push(`\n## ${names[l]}`, `- [${U[l].nav[0]}](${abs(url(l))})`);
    for (const s of S) parts.push(`- [${seo[s.s][l][0]}](${abs(serviceUrl(l, s.s))}): ${s.L[l][1]}`);
  }
  return new Response(parts.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
