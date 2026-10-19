// Interações do site: menu, valores (acordeão), formulário e preferência de idioma.
// Tudo é delegado no document e os elementos são buscados na hora do uso,
// então funciona também quando o conteúdo da página é trocado sem recarregar.
// Eventos de conversão (só funcionam se PUBLIC_GA_ID estiver definido; veja INSTALACAO.md).
const track = (name: string, params: Record<string, unknown> = {}) => { try { (window as any).gtag?.('event', name, params); } catch {} };

const header = () => document.getElementById('hd');
const setMenu = (open: boolean) => {
  const h = header();
  h?.classList.toggle('mo', open);
  h?.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-expanded', String(open)));
};

// ---- valores (acordeão com troca automática)
let current = 0;
let timer: number | undefined;
const rows = () => document.querySelectorAll<HTMLElement>('.vr');
const setValue = (k: number) => {
  current = k;
  rows().forEach((r) => {
    const on = Number(r.dataset.v) === k;
    r.classList.toggle('on', on);
    r.setAttribute('aria-expanded', String(on));
  });
};
const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const tick = () => {
  window.clearInterval(timer);
  if (reduceMotion() || !rows().length) return;
  timer = window.setInterval(() => setValue((current + 1) % rows().length), 6000);
};

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t.closest('[data-m]')) { setMenu(!header()?.classList.contains('mo')); return; }
  if (!t.closest('#mg') || t.closest('#mg a')) setMenu(false);

  const row = t.closest<HTMLElement>('.vr');
  if (row) { setValue(Number(row.dataset.v)); tick(); return; }

  const link = t.closest<HTMLAnchorElement>('a[href]');
  if (link) {
    const href = link.getAttribute('href') || '';
    if (href.includes('wa.me')) track('whatsapp_click', { link_url: href });
    else if (href.startsWith('mailto:')) track('email_click');
  }

  const lang = t.closest<HTMLElement>('[data-l]');
  if (lang) { try { localStorage.setItem('qt-lang', lang.dataset.l!); } catch {} }

  const svc = t.closest<HTMLElement>('[data-s]');
  const sel = document.getElementById('sel') as HTMLSelectElement | null;
  if (svc && sel) sel.value = svc.dataset.s!;
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Com PUBLIC_FORM_ENDPOINT definido (.env), o formulário envia de verdade (ex.: Formspree).
// Sem endpoint, apenas simula o envio (modo demonstração).
const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;
document.addEventListener('submit', async (e) => {
  const form = e.target as HTMLFormElement;
  if (form.id !== 'f') return;
  e.preventDefault();
  const ok = document.getElementById('ok');
  const err = document.getElementById('err');
  if (ok) ok.style.display = 'none';
  if (err) err.style.display = 'none';
  let sent = true;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      sent = res.ok;
    } catch { sent = false; }
  }
  const msg = sent ? ok : err;
  if (msg) msg.style.display = 'block';
  if (sent) { form.reset(); track('generate_lead', { form: 'contato' }); }
});

const init = () => {
  current = 0;
  if (rows().length) { setValue(0); tick(); } else window.clearInterval(timer);
};
init();
document.addEventListener('astro:page-load', init);
document.addEventListener('qt:render', init);
