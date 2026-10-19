#!/usr/bin/env python3
"""Auditoria de SEO do site compilado (pasta dist/). Uso: npm run build && python3 scripts/audit-seo.py"""
import re, json, glob, os, sys, html as H
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist') + '/'
pages = {}
for f in glob.glob(D + '**/index.html', recursive=True) + glob.glob(D + '404.html'):
    rel = '/' + os.path.relpath(f, D).replace('index.html', '').replace('\\', '/')
    pages[rel] = open(f, encoding='utf-8').read()
issues, warns = [], []
def find(h, pat, flags=re.S): return re.findall(pat, h, flags)
titles, descs = {}, {}
LANGS = {'pt-BR': 'pt', 'en': 'en', 'es': 'es'}
for p, h in sorted(pages.items()):
    if p == '/':  # redirecionador raiz (noindex)
        continue
    is404 = p.endswith('404.html') or p == '/404.html'
    t = H.unescape((find(h, r'<title>(.*?)</title>') or [''])[0])
    d = H.unescape((find(h, r'<meta name="description" content="(.*?)"') or [''])[0])
    h1 = find(h, r'<h1[^>]*>(.*?)</h1>')
    can = (find(h, r'<link rel="canonical" href="(.*?)"') or [''])[0]
    robots = (find(h, r'<meta name="robots" content="(.*?)"') or [''])[0]
    if not t: issues.append((p, 'sem <title>'))
    elif len(t) > 65: warns.append((p, f'title longo ({len(t)})'))
    if not d: issues.append((p, 'sem meta description'))
    elif not 90 <= len(d) <= 165: warns.append((p, f'description fora de 90-165 ({len(d)})'))
    if len(h1) != 1: issues.append((p, f'{len(h1)} H1 (esperado 1)'))
    if not is404:
        if not can.endswith(p): issues.append((p, f'canonical não aponta para si mesma: {can}'))
        titles.setdefault(t, []).append(p); descs.setdefault(d, []).append(p)
        if 'noindex' in robots: issues.append((p, 'noindex em página indexável'))
        alts = dict(find(h, r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"'))
        for need in ['pt-BR', 'en', 'es', 'x-default']:
            if need not in alts: issues.append((p, f'hreflang {need} ausente'))
        for lang, href in alts.items():
            tp = '/' + href.split('/', 3)[3]
            if tp not in pages: issues.append((p, f'hreflang {lang} aponta para página inexistente {tp}'))
            elif lang != 'x-default':  # reciprocidade
                back = dict(find(pages[tp], r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"'))
                if back.get(find(h, r'<html lang="([^"]+)"')[0]) != can: issues.append((p, f'hreflang não recíproco com {tp}'))
        if find(h, r'<html lang="([^"]+)"')[0] != [k for k, v in LANGS.items() if f'/{v}/' == p[:4]][0]: issues.append((p, 'atributo lang do <html> diferente do idioma da URL'))
        og = find(h, r'<meta property="og:image" content="(.*?)"')
        if not og: issues.append((p, 'sem og:image'))
        for blk in find(h, r'<script type="application/ld\+json">(.*?)</script>'):
            try: json.loads(blk)
            except Exception as e: issues.append((p, f'JSON-LD inválido: {e}'))
        text = re.sub(r'<(script|style)[\s\S]*?</\1>', ' ', h); text = re.sub(r'<[^>]+>', ' ', text)
        words = len(H.unescape(text).split())
        if words < 300: warns.append((p, f'pouco texto ({words} palavras)'))
    for img in find(h, r'<img\b[^>]*>'):
        if 'alt=' not in img: issues.append((p, 'imagem sem atributo alt'))
    for href in set(find(h, r'href="(/[^"#?]*)')):
        if href.startswith(('/_astro', '/logo', '/og', '/favicon', '/apple', '/icon', '/site.web', '/sitemap', '/robots', '/llms')): continue
        if (href if href.endswith('/') else href + '/') not in pages: issues.append((p, f'link interno quebrado {href}'))
for t, ps in titles.items():
    if len(ps) > 1: issues.append((ps[0], f'title duplicado em {len(ps)} páginas: {t}'))
for d, ps in descs.items():
    if len(ps) > 1: issues.append((ps[0], f'description duplicada em {len(ps)} páginas'))
for f in ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'llms.txt', 'favicon.ico', 'site.webmanifest', 'og/og-default.png']:
    if not os.path.exists(D + f): issues.append(('/', f'arquivo ausente: {f}'))
sm = open(D + 'sitemap-0.xml').read() if os.path.exists(D + 'sitemap-0.xml') else ''
n_sm = len(find(sm, r'<loc>'))
print(f'Páginas analisadas: {len([p for p in pages if p != "/"])} | URLs no sitemap: {n_sm}')
print(f'Problemas: {len(issues)} | Avisos: {len(warns)}')
for p, m in issues: print('  [ERRO]', p, '-', m)
for p, m in warns[:15]: print('  [aviso]', p, '-', m)
sys.exit(1 if issues else 0)
