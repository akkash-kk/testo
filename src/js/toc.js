// Highlights the "On this page" link for the section currently in view.
export function initToc(id = 'toc') {
  const links = [...document.querySelectorAll(`#${id} a`)];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const targets = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  targets.forEach((t) => io.observe(t));
}
