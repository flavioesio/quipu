# Guia de instalação — Quipu (Astro)

Este projeto gera um **site estático** (HTML, CSS e um pouco de JavaScript). Depois de compilado,
não precisa de servidor com Node: basta publicar a pasta `dist/` em qualquer hospedagem.

---

## 1. O que você precisa

| Item | Versão | Para quê |
|---|---|---|
| **Node.js** | 20 ou 22 (LTS). Mínimo: 18.20.8 | Rodar e compilar o projeto |
| **npm** | vem junto com o Node | Instalar as dependências |
| Editor de código (opcional) | VS Code + extensão "Astro" | Editar os arquivos |

Conferir se já tem: abra o terminal e rode `node -v` e `npm -v`.
Se não tiver, baixe o instalador **LTS** em https://nodejs.org.

## 2. Instalar e rodar no seu computador

```bash
# 1) Descompacte quipu-astro-projeto.zip e entre na pasta
cd quipu-astro

# 2) Instale as dependências (só na primeira vez; leva ~1 minuto)
npm install

# 3) Rode em modo de desenvolvimento
npm run dev
```

Abra **http://localhost:4321** no navegador. Qualquer alteração nos arquivos aparece na hora.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Compila o site e gera a pasta `dist/` (esta é a pasta que vai para a hospedagem) |
| `npm run preview` | Abre o `dist/` para você testar como ficará no ar |

## 3. Configurações obrigatórias antes de publicar

1. **Domínio** — troque `https://www.seudominio.com` em **um só lugar**: `astro.config.mjs` (campo `site`).
   Canonical, hreflang, sitemap, `robots.txt`, `llms.txt` e dados estruturados usam esse endereço.
2. **Contatos** — edite `src/lib/site.ts`, bloco `contact` (e-mail e WhatsApp, com DDI e só dígitos
   no campo `number`). Eles aparecem na barra do topo e na seção de contato, já como links.
3. **Formulário** — veja a seção 5.
   **Redes sociais e endereço** (opcional, ajuda no SEO) — preencha `brand` em `src/lib/site.ts`.
   **Analytics** (opcional) — coloque `PUBLIC_GA_ID=G-XXXXXXXXXX` no `.env` para medir leads.
4. **Textos reais** — os prazos, metas e números dos planos de ação são ilustrativos.
   Ajuste em `src/data/services.json`.

## 4. Publicar (escolha uma opção)

Em todas, o comando de build é `npm run build` e a pasta publicada é `dist`.

**Netlify (mais simples)**
1. Rode `npm run build`.
2. Em https://app.netlify.com/drop arraste a pasta `dist`. Pronto, o site fica no ar.
3. Para publicar automático a cada mudança: suba o projeto no GitHub, em *Add new site → Import*,
   com *Build command* `npm run build` e *Publish directory* `dist`.

**Vercel**: importe o repositório do GitHub; ele detecta o Astro sozinho.

**Cloudflare Pages**: *Build command* `npm run build`, *Build output directory* `dist`.

**GitHub Pages**: no `astro.config.mjs` ajuste `site` (e `base`, se o endereço tiver `/nome-do-repo/`)
e use o fluxo oficial do Astro para Pages.

**Servidor próprio (nginx/Apache)**: copie o conteúdo de `dist/` para a pasta pública
(`/var/www/quipu`, por exemplo). Como as páginas usam URLs com barra final, o padrão do
servidor já funciona. Exemplo para nginx:

```nginx
server {
  server_name www.seudominio.com;
  root /var/www/quipu;
  index index.html;
  location / { try_files $uri $uri/ =404; }
}
```

Depois de publicar, envie o `https://www.seudominio.com/sitemap-index.xml` ao Google Search Console.

## 4.1 Depois de publicar (SEO)

1. Adicione o domínio no **Google Search Console** (verificação por DNS) e envie `https://SEU-DOMINIO/sitemap-index.xml`.
2. Rode `npm run build` e `npm run audit` a cada publicação (precisa de Python 3): ele confere títulos, descrições, H1, canonical, hreflang, dados estruturados e links.
3. Siga o plano de `ESTRATEGIA-SEO.md` (palavras-chave, conteúdo, SEO local, links e roteiro de 90 dias).

## 5. Formulário de contato (para receber as mensagens)

Por padrão o formulário só **simula** o envio. Para receber de verdade:

1. Crie um formulário em um serviço como **Formspree** (https://formspree.io) e copie o endereço
   do tipo `https://formspree.io/f/xxxxxxxx`. Também funciona um **webhook do n8n**.
2. Na raiz do projeto, copie `.env.example` para `.env` e preencha:
   ```
   PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
3. Rode `npm run build` de novo. Na Netlify/Vercel, cadastre a mesma variável em
   *Environment variables* antes do build.

Se o envio falhar, o visitante vê uma mensagem de erro com a sugestão de usar o WhatsApp.

## 6. Como editar o site

| Quero... | Edite |
|---|---|
| Mudar textos de qualquer idioma | `src/data/i18n.json` |
| Mudar/adicionar um serviço | `src/data/services.json` (aparece sozinho no menu, home, formulário e ganha 1 página por idioma) |
| Trocar o logo | arquivos em `public/logo/` (mesmo nome) |
| Mudar cores e estilos | topo de `src/styles/global.css` (variáveis `--t`, `--v`, `--s`, `--i`) |
| Adicionar um idioma | inclua o código em `langs` (`src/lib/site.ts`) e traduza `i18n.json` e `services.json` |
| Títulos, descrições, H1 e endereços (URLs) de cada serviço | `src/data/seo.json` |
| Mudar a estrutura da home | `src/pages/[lang]/index.astro` |
| Mudar a página de serviço | `src/pages/[lang]/servicos/[slug].astro` |

URLs geradas: `/pt/`, `/en/`, `/es/` e `/pt/servicos/seo/` (idem para os outros serviços e idiomas).

## 7. Problemas comuns

- **`npm: command not found`** — o Node não está instalado; veja a seção 1.
- **Erro de versão do Node** — atualize para Node 20 ou 22 (`node -v` para conferir).
- **Porta 4321 ocupada** — rode `npm run dev -- --port 3000`.
- **Mudei o `.env` e nada mudou** — reinicie o `npm run dev` ou rode o build de novo.
- **Links e imagens quebrados em subpasta (GitHub Pages)** — configure `base` no `astro.config.mjs`.
- **Instalação falhou no meio** — apague a pasta `node_modules` e rode `npm install` novamente.
