import services from '../data/services.json';
import i18n from '../data/i18n.json';
import icons from '../data/icons.json';
import seoData from '../data/seo.json';

export const langs = ['pt', 'en', 'es'] as const;
export type Lang = (typeof langs)[number];
export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

export type Service = { s: string; c: string; g: number; kv: string[]; L: Record<Lang, any[]> };
export const S = services as unknown as Service[];
export const U = i18n.U as Record<Lang, any>;
export const G = i18n.G as Record<Lang, string[]>;
export const IC = icons.IC as Record<string, string>;
export const MI = icons.MI as string[];
export const VC = icons.VC as string[];

/** Semanas de cada etapa do plano de ação. */
export const T = ['1', '2-3', '4+'];
export const url = (l: Lang, p = '') => `/${l}/${p}`;
export const num = (i: number) => String(i + 1).padStart(2, '0');
// ---- SEO: URLs localizadas (/pt/servicos/trafego-pago/, /en/services/paid-media/, ...)
export const sections: Record<Lang, string> = { pt: 'servicos', en: 'services', es: 'servicios' };
export const slugs = seoData.slugs as Record<string, Record<Lang, string>>;
export const seo = seoData.services as unknown as Record<string, Record<Lang, [string, string, string]>>; // [h1, title, description]
export const seoHome = seoData.home as Record<Lang, [string, string]>; // [title, description]
/** Caminho (sem idioma) de um serviço, ex.: servicos/trafego-pago/ */
export const servicePath = (l: Lang, id: string) => `${sections[l]}/${slugs[id][l]}/`;
export const serviceUrl = (l: Lang, id: string) => url(l, servicePath(l, id));
export const langNames: Record<Lang, string> = { pt: 'Português', en: 'English', es: 'Español' };

/** Dados da marca usados nos dados estruturados (schema.org). Preencha redes sociais e endereço quando tiver. */
export const brand = {
  name: 'Quipu',
  alt: 'Quipu — Consultoria & Agência',
  social: [] as string[], // ex.: ['https://www.linkedin.com/company/...', 'https://www.instagram.com/...']
  address: null as null | { streetAddress: string; addressLocality: string; addressRegion?: string; postalCode?: string; addressCountry: string },
  areaServed: ['BR', 'PE'],
};
export const orgId = (site: URL) => `${site.origin}/#organization`;

/** Contatos exibidos no site. Troque pelos dados reais (número só com dígitos, com DDI). */
export const contact = {
  email: 'contato@exemplo.com',
  whatsapp: [
    { label: 'PE', display: '+51 994 170 427', number: '51900000000' },
    { label: 'BR', display: '+55 11 92221-1978', number: '5511900000000' },
  ],
};
