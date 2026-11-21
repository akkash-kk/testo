// Shared behaviour for every page: mobile menu + FAQ accordions.

export function initMenu() {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('siteNav');
  if (!btn || !nav) return;
  const set = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
}

// Only one FAQ answer open at a time, per list.
export function initFaq() {
  document.querySelectorAll('.faq, .faq-list').forEach((list) => {
    const items = [...list.querySelectorAll('details')];
    items.forEach((d) =>
      d.addEventListener('toggle', () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      })
    );
  });
}

// Single-select button groups: the clicked button gets .on, the rest lose it.
export function initSingleSelect(ids, onPick) {
  ids.forEach((id) => {
    const box = document.getElementById(id);
    if (!box) return;
    box.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !box.contains(b)) return;
      const kids = [...box.children];
      kids.forEach((c) => c.classList.toggle('on', c === b));
      onPick?.(id, kids.indexOf(b), b);
    });
  });
}

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function initCommon() {
  initMenu();
  initFaq();
}
