// Scroll-pinned steps: the section's stage stays stuck under the header while
// scrolling moves through the steps one by one (like the other pages).
// On narrow screens pinning is switched off in CSS and the menu is click-only.
const HEADER = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;

export function initPinSteps({ pin, menu, count, onStep, counter, rail }) {
  if (!pin || !menu) return { set() {} };
  const items = [...menu.children];
  const wide = window.matchMedia('(min-width: 901px)');
  const stick = pin.querySelector('.pin-stick');
  const pad = (n) => String(n).padStart(2, '0');
  let cur = -1;
  let lockUntil = 0;
  let raf = 0;

  const set = (i) => {
    if (i === cur) return;
    cur = i;
    items.forEach((el, j) => el.classList.toggle('on', j === i));
    if (counter) counter.textContent = pad(i + 1);
    onStep(i);
  };

  const measure = () => {
    const r = pin.getBoundingClientRect();
    const total = r.height - stick.offsetHeight; // distance the stage stays pinned
    return { top: r.top + window.scrollY, total: Math.max(total, 1), p: (HEADER() - r.top) / Math.max(total, 1) };
  };

  const update = () => {
    raf = 0;
    if (!wide.matches) return;
    const { p } = measure();
    const clamped = Math.min(1, Math.max(0, p));
    if (rail) rail.style.transform = `scaleX(${(clamped * (count - 1) + 1) / count})`;
    pin.style.setProperty('--sp', String(Math.min(1, Math.max(0, p * count - Math.floor(p * count)))));
    if (performance.now() < lockUntil) return;
    set(Math.min(count - 1, Math.max(0, Math.floor(clamped * count))));
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

  menu.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || !menu.contains(b)) return;
    const i = items.indexOf(b);
    set(i);
    if (rail) rail.style.transform = `scaleX(${(i + 1) / count})`;
    if (wide.matches) {
      const { top, total } = measure();
      lockUntil = performance.now() + 900;
      window.scrollTo({ top: top - HEADER() + ((i + 0.5) / count) * total, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  wide.addEventListener?.('change', () => { cur = -1; queue(); });
  set(0);
  queue();
  return { set };
}
