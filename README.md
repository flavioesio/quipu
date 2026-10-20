# Pisqu — Consultoria & Agência (Astro)

Site estático em **Astro 5**, com 3 idiomas (PT, EN, ES), 12 serviços e uma página real
para cada serviço em cada idioma (40 páginas), com SEO pronto (canonical, hreflang, Open Graph, sitemap).

> **Instalação e publicação: `INSTALACAO.md`. Estratégia de SEO e plano de 90 dias: `ESTRATEGIA-SEO.md`.**

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera a pasta dist/ (site estático pronto para publicar)
npm run preview  # testa o build
```

Requer Node 18.20+ (recomendado Node 20 ou superior).

## Antes de publicar

1. **Domínio:** troque `https://www.seudominio.com` em `astro.config.mjs` (o robots.txt é gerado sozinho).
2. **Contatos:** edite o bloco `contact` em `src/lib/site.ts` (são exemplos).
3. **Formulário:** defina `PUBLIC_FORM_ENDPOINT` no `.env` (veja `.env.example` e `INSTALACAO.md`).

## Estrutura

```
src/
  data/
    services.json   12 serviços: cor, grupo, metas e textos em PT/EN/ES (plano de 3 etapas)
    i18n.json       textos do site e nomes dos grupos, por idioma
    icons.json      ícones SVG e cores dos valores
  lib/site.ts       tipos, idiomas e helpers
  layouts/Base.astro   <head> com SEO, menu, contato e rodapé
  components/       Header, Hero (celular + rede de serviços), Contact, Divider
  pages/
    index.astro                  redireciona para o idioma salvo/do navegador
    [lang]/index.astro           página inicial (pt, en, es)
    [lang]/servicos/[slug].astro plano de ação de cada serviço
  scripts/ui.ts     menu, valores (acordeão) e formulário
  styles/global.css estilos (tema claro/escuro automático)
public/logo/        arara e logo completo (WebP com fundo transparente)
```

## Como editar

- **Textos e serviços:** edite os JSON em `src/data/`. Um novo serviço aparece sozinho no menu,
  na home, no formulário e ganha página nos 3 idiomas.
- **Novo idioma:** adicione o código em `langs` (`src/lib/site.ts`), traduza `i18n.json` e `services.json`.
- **Cores e visual:** variáveis no topo de `src/styles/global.css`.

## Observações

- Valores, prazos e metas dos planos são ilustrativos: troque pelos reais antes de divulgar.
- `global.css` veio do site em arquivo único e ainda tem regras de versões anteriores que podem ser limpas.
# pisqu
