# Estratégia de SEO — Pisqu (Consultoria & Agência)

> **Expectativa honesta:** ninguém pode garantir o 1º lugar no Google. O que dá para fazer é montar a
> melhor base técnica e de conteúdo possível e executar um plano consistente. Metas realistas:
> **1º lugar para a marca ("Pisqu") em semanas**; **top 3 em buscas específicas e de cauda longa em 2–4 meses**;
> **primeira página em termos competitivos ("agência de marketing digital") em 6–12 meses ou mais**,
> e só com conteúdo novo, links e reputação contínuos. Pagar por anúncios acelera os primeiros leads
> enquanto o orgânico amadurece.

---

## 1. O que já está implementado no site (auditado: 0 erros)

**Técnico**
- 40 páginas estáticas (3 idiomas × home + 12 serviços), HTML pronto para o robô ler, carregamento rápido (sem fontes externas, sem frameworks pesados).
- **URLs localizadas com palavra-chave** em cada idioma: `/pt/servicos/trafego-pago/`, `/en/services/paid-media/`, `/es/servicios/publicidad-digital/`.
- `canonical` em cada página, **hreflang** recíproco (pt-BR, en, es, x-default), `sitemap-index.xml`, `robots.txt` e `llms.txt` gerados com o seu domínio, página 404 útil, `lang` correto no `<html>`.
- Meta tags de compartilhamento (Open Graph + Twitter) com imagem 1200×630, favicon, ícone de app e manifest.
- Script de auditoria: `npm run build && npm run audit` (títulos, descrições, H1, canonical, hreflang, JSON-LD, links, alt).

**On-page**
- **Título e descrição únicos e otimizados** para cada página e idioma (≤ 62 e 110–160 caracteres), com a palavra-chave principal no início.
- **Um H1 por página, com palavra-chave** (home: "Marketing digital, IA e automação para a sua empresa crescer."; serviços: "Gestão de tráfego pago", "Automação de processos com n8n" etc.).
- Hierarquia H1 › H2 › H3 limpa, texto explicativo de ~100+ palavras em cada serviço, **FAQ visível** (4 perguntas por serviço + 5 na home) que cobre dúvidas de busca de cauda longa e respostas para buscadores com IA.
- **Links internos**: menu com todos os serviços, rodapé com todos os serviços por grupo e por idioma, "serviços relacionados" em cada página, breadcrumbs.

**Dados estruturados (schema.org, JSON-LD)**
- `Organization/ProfessionalService` + `WebSite` em todas as páginas; `Service` + `BreadcrumbList` em cada serviço; catálogo de ofertas (`OfferCatalog`) na home.
- Nota: não usei marcação `FAQPage` de propósito. O Google restringiu o rich result de FAQ a sites de governo e saúde desde 2023; o texto do FAQ continua valendo para as pessoas e para as IAs.

**Medição de leads**
- Eventos prontos (GA4): `whatsapp_click`, `email_click`, `generate_lead` (formulário enviado). Ative com `PUBLIC_GA_ID` no `.env`.

---

## 2. O que SÓ você pode fazer antes de publicar (impacta diretamente o ranking)

| # | Tarefa | Por quê |
|---|---|---|
| 1 | Trocar `seudominio.com` em `astro.config.mjs` pelo domínio real (HTTPS) | canonical, hreflang e sitemap dependem disso |
| 2 | Colocar e-mail e WhatsApp reais (`src/lib/site.ts`) e, se houver, **endereço** e redes sociais (`brand`) | consistência de NAP (nome, endereço, telefone) e sinais de entidade |
| 3 | Ligar o formulário (`PUBLIC_FORM_ENDPOINT`) | sem isso, nenhum lead chega |
| 4 | Substituir prazos, metas e "3 dias úteis" por **o que você realmente cumpre** | promessas falsas prejudicam confiança e conversão |
| 5 | Publicar **política de privacidade** e aviso de cookies (LGPD) | exigido para formulário/analytics e para anúncios; ainda **não existe** no site |
| 6 | Adicionar **casos reais, depoimentos e números verificáveis** | é o maior ativo de confiança (E-E-A-T) e de conversão; hoje o site não tem prova social |
| 7 | Página "Equipe/Quem somos" com pessoas reais (foto, cargo, LinkedIn) | agências são avaliadas por quem está por trás |
| 8 | Revisão de um nativo em inglês e espanhol | texto natural rende mais que tradução literal |

---

## 3. Mapa de palavras-chave (hipóteses para validar)

> Não tenho acesso a dados de volume. Valide no **Google Keyword Planner**, no **Search Console** (depois de 30 dias)
> e nas sugestões do próprio Google. Priorize termos com **intenção de contratar**.

| Página | PT (Brasil) | ES (Peru/LatAm) | EN |
|---|---|---|---|
| Home | agência de marketing digital, agência de marketing e IA | agencia de marketing digital Lima/Perú, agencia de IA y automatización | digital marketing and AI agency |
| Tráfego pago | gestão de tráfego pago, agência de tráfego pago, Google Ads para empresas | publicidad en Google Ads Perú, gestión de campañas Meta Ads | paid media management agency |
| SEO | agência de SEO, consultoria de SEO, como aparecer no Google | agencia SEO Lima, posicionamiento web Perú | SEO agency Latin America |
| Redes sociais | gestão de redes sociais para empresas, social media | gestión de redes sociales para empresas | social media management |
| Influência | agência de marketing de influência | agencia de influencers Perú | influencer marketing agency |
| Vídeo com IA | vídeo com IA para anúncios, criar vídeos com inteligência artificial | video con IA para anuncios | AI video production |
| Sites | criação de sites profissionais, agência de criação de sites | diseño de páginas web Perú | web design agency |
| Desenvolvimento | desenvolvimento de loja virtual, desenvolvimento de sites sob medida | desarrollo de tiendas online | custom web development |
| Integração de IA | integração de IA em sistemas, integrar IA no CRM | integración de IA en empresas | AI integration for business |
| n8n | automação com n8n, consultoria n8n, automatizar processos | automatización con n8n | n8n automation agency |
| Agentes de IA | agentes de IA para empresas, criar agente de IA | agentes de IA para empresas | AI agent development |
| WhatsApp + IA | chatbot WhatsApp com IA, API oficial do WhatsApp Business, automação de atendimento | chatbot de WhatsApp con IA, API de WhatsApp Business | WhatsApp Business API chatbot |
| Alocação | alocação de profissionais de TI, staff augmentation, outsourcing de desenvolvedores | outsourcing de desarrolladores, staff augmentation LatAm | IT staff augmentation, nearshore developers |

**Onde competir primeiro:** os 4 serviços de **IA e automação** (n8n, agentes, WhatsApp + IA, integração de IA) têm
menos concorrência e alta intenção comercial do que "agência de marketing digital". Comece por eles, em PT e ES.

---

## 4. Plano de conteúdo (é o que mais move o orgânico)

O site tem as **páginas de serviço (fundo de funil)**. Para ranquear de verdade você precisa de **conteúdo de topo e meio de funil**
que leve para elas. Sugestão: um blog em `/pt/blog/`, `/es/blog/`, `/en/blog/` (posso criar essa estrutura no Astro).

**Meta:** 2 artigos por semana por 3 meses (24 artigos), cada um com 1.200+ palavras, exemplos reais, imagens próprias e link para o serviço correspondente.

| Pilar (serviço) | Artigos de apoio (PT; replique em ES/EN) |
|---|---|
| Automação n8n | "n8n: o que é e para que serve"; "10 automações para fazer com n8n em uma agência/empresa"; "n8n vs Zapier vs Make: qual escolher"; "Como integrar CRM, planilhas e e-mail com n8n" |
| Agentes de IA | "O que é um agente de IA e como usar na empresa"; "Chatbot x agente de IA: diferenças"; "Como medir o ROI de um agente de atendimento" |
| WhatsApp + IA | "Como usar a API oficial do WhatsApp Business"; "Automação de atendimento no WhatsApp: guia completo"; "WhatsApp Business app x API: quando migrar" |
| Tráfego pago | "Quanto investir em tráfego pago por mês"; "Google Ads x Meta Ads: onde anunciar"; "CAC e ROAS: como calcular" |
| SEO | "SEO para sites de serviços: passo a passo"; "Checklist de SEO técnico"; "Como escolher palavras-chave com intenção de compra" |
| Vídeo com IA | "Como criar vídeos de anúncio com IA sem perder a identidade da marca"; "Avatares e locução com IA: limites e boas práticas" |
| Alocação | "Staff augmentation x terceirização x contratação CLT"; "Como contratar desenvolvedores na América Latina" |
| Site/Dev | "Quanto custa um site profissional"; "Loja virtual: plataforma pronta ou sob medida?" |

**Formatos que ranqueiam e convertem:** guias passo a passo, comparativos, checklists, templates para baixar (troca por e-mail),
**estudos de caso com números reais** e vídeos curtos incorporados.

---

## 5. SEO local e de entidade (seu diferencial: Lima e São Paulo)

1. **Google Business Profile** para cada cidade onde você tenha presença/atendimento (se elegível). Categorias: "Agência de marketing", "Consultoria de TI". Fotos, serviços, horários, posts semanais.
2. **NAP idêntico** (nome, endereço, telefone) no site, no Google, no LinkedIn e nos diretórios.
3. **Diretórios de agências** (verifique elegibilidade): Clutch, GoodFirms, Sortlist; páginas de parceiros de ferramentas (ex.: programa de especialistas do n8n; parceiros Meta/Google, se qualificar).
4. **Avaliações reais** (peça a cada cliente satisfeito: Google, Clutch). Responda todas.
5. **Perfis consistentes** (LinkedIn, Instagram, YouTube) e adicione os links em `brand.social` (`src/lib/site.ts`): alimenta o schema `sameAs`.

---

## 6. Autoridade (links) sem atalhos arriscados

- **Parcerias e menções:** publicar estudos/casos com clientes e pedir link do site deles; webinars e podcasts de marketing, IA e automação.
- **Conteúdo "linkável":** relatórios com dados próprios, ferramentas gratuitas (calculadora de ROAS, checklist de automação), templates de fluxos n8n.
- **Digital PR / guest posts** em blogs de marketing e tecnologia nos 3 idiomas.
- **Evite** comprar links, redes de blogs e diretórios de baixa qualidade (risco de penalidade).

---

## 7. Busca com IA (GEO)

- Respostas diretas e curtas no início das seções (FAQ já segue isso), definições claras ("O que é...").
- Entidade consistente: mesmo nome, descrição e dados em site, Google Business, LinkedIn e diretórios; `llms.txt` já publicado.
- Citações a fontes e dados próprios aumentam a chance de ser referenciado por assistentes de IA.

---

## 8. Medição (configure no dia da publicação)

1. **Google Search Console** → adicionar propriedade de **domínio** (verificação por DNS) → enviar `https://SEU-DOMINIO/sitemap-index.xml`. Solicitar indexação das 3 homes.
2. **Bing Webmaster Tools** (importa do Search Console em 1 clique).
3. **GA4** (`PUBLIC_GA_ID`): marque `generate_lead`, `whatsapp_click` e `email_click` como **eventos-chave**. Exiba o aviso de cookies antes de ativar.
4. **PageSpeed Insights / Core Web Vitals:** meta LCP < 2,5 s, CLS < 0,1, INP < 200 ms (o site já nasce leve; monitore depois de adicionar imagens e scripts).
5. Rodar `npm run audit` a cada publicação.

**KPIs mensais:** impressões e cliques (Search Console), posição média das palavras-chave-alvo, páginas indexadas, leads (formulário + WhatsApp + e-mail), taxa de conversão visita → lead, custo por lead (se houver anúncios).

---

## 9. Conversão: transformar visitas em leads e contratos

- Responder WhatsApp e formulário em **menos de 5 minutos** (a velocidade pesa mais que qualquer detalhe de design).
- Um pedido por página: "Quero este plano" (já existe) + WhatsApp visível. Considere botão flutuante de WhatsApp.
- **Provas na primeira dobra:** logos de clientes, nota de avaliações, número de projetos (só se for verdade).
- **Páginas de aterrissagem separadas** para campanhas pagas (com UTM) sem poluir a estrutura orgânica.
- Oferta de entrada clara: diagnóstico gratuito ou plano de ação em até X dias (defina o que você cumpre).

---

## 10. Roteiro de 90 dias

| Período | Foco | Entregas |
|---|---|---|
| **Dia 0 (publicação)** | Base | Domínio e contatos reais; formulário; GA4; Search Console + sitemap; Bing; Google Business; perfil LinkedIn; política de privacidade |
| **Semanas 1–2** | Prova e confiança | 3 casos/depoimentos reais; página de equipe; revisão nativa EN/ES; primeiros 4 artigos (n8n, agentes, WhatsApp) |
| **Semanas 3–6** | Conteúdo + autoridade | 8 artigos; 2 ferramentas/templates gratuitos; cadastro em diretórios; pedir avaliações; 5 menções/links de parceiros |
| **Semanas 7–12** | Escala | 12 artigos (PT + ES); 1 relatório com dados próprios; webinar/podcast; revisar títulos com base nos dados do Search Console; criar landing pages para anúncios |
| **Mês 4+** | Otimização contínua | Atualizar artigos com impressões e posição 8–20 ("quase lá"); expandir EN; testes A/B de CTA |

**Como saber se está funcionando:** em 4–8 semanas você deve ver impressões crescendo e a marca ranqueando; em 3–4 meses, primeiras posições em cauda longa e leads orgânicos recorrentes.
