import '../styles/base.css';
import '../styles/marketing.css';
import { initCommon, escapeHtml } from '../js/layout.js';
import { initToc } from '../js/toc.js';

const APP_URL = '#'; // TODO: put your 3D editor app URL here
const IMG = import.meta.env.BASE_URL + 'images/';

const galleryItems = [
  ['Black hoodie on a 3D model', '#1a1a1f,#4f69f2'], ['Summer dress mockup', '#e8a0b8,#7a1f3d'], ['Perfume box packaging', '#9a86c8,#2b1f4a'], ['Coffee pouch packaging', '#c88a5a,#3a2b2f'],
  ['Laptop with app screen', '#2b2f4a,#8a7ac8'], ['Phone mockup in hand', '#3a4a8a,#e07a8a'], ['White tee with print', '#e8d8c8,#c8584a'], ['Water bottle label', '#6a8fb8,#1b2a52'],
  ['Shipping box', '#c88a5a,#5a3a2b'], ['Tote bag pattern', '#7ab8a0,#2b4a6a'], ['Cap with logo', '#2b3a6a,#8fa0f7'], ['Coffee cup branding', '#f2c84a,#c8584a'],
  ['Tablet dashboard', '#4a5a7a,#d8c0a0'], ['Skincare jar', '#d9d6d2,#8a8f9a'], ['Hoodie colorways', '#5a3a8a,#f08a5a'],
];
const families = [
  ['Dress', 'Apparel', '#e8a0b8,#7a1f3d'], ['T-shirt', 'Apparel', '#e8d8c8,#c8584a'], ['Hoodie', 'Apparel', '#1a1a1f,#4f69f2'],
  ['Cap', 'Accessories', '#2b3a6a,#8fa0f7'], ['Tote bag', 'Accessories', '#7ab8a0,#2b4a6a'], ['Phone', 'Devices', '#3a4a8a,#e07a8a'],
  ['Laptop', 'Devices', '#2b2f4a,#8a7ac8'], ['Tablet', 'Devices', '#4a5a7a,#d8c0a0'], ['Product box', 'Packaging', '#c88a5a,#5a3a2b'],
  ['Pouch', 'Packaging', '#9a86c8,#2b1f4a'], ['Bottle', 'Drinkware', '#6a8fb8,#1b2a52'], ['Coffee cup', 'Drinkware', '#f2c84a,#c8584a'],
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const grad = (c) => `linear-gradient(160deg,${c.split(',')[0]},${c.split(',')[1]})`;

// Marquee: render the set twice so the CSS loop is seamless.
function fill(id, build) {
  const el = document.getElementById(id);
  if (!el) return;
  const html = build();
  el.innerHTML = html + html;
  el.querySelectorAll('img').forEach((i) => i.addEventListener('error', () => i.remove()));
  [...el.children].slice(el.children.length / 2).forEach((n) => n.setAttribute('aria-hidden', 'true'));
}

fill('gallery', () =>
  galleryItems.map(([alt, c], i) =>
    `<button class="ph" style="--g:${grad(c)}" aria-label="${escapeHtml(alt)}. Open details">
       <img src="${IMG}gallery-${i + 1}.jpg" alt="">
     </button>`).join(''));

fill('families', () =>
  families.map(([name, by, c]) =>
    `<a class="card ph" href="#" style="--g:${grad(c)}">
       <img src="${IMG}model-${slug(name)}.jpg" alt="${escapeHtml(name)} by ${escapeHtml(by)} sample image">
       <div class="cap"><b>${escapeHtml(name)}</b><small>${escapeHtml(by)} · View template →</small></div>
     </a>`).join(''));

// "What it does" accordion (one open at a time)
const items = document.querySelectorAll('#acc .acc-item');
items.forEach((item) =>
  item.querySelector('.acc-btn').addEventListener('click', () =>
    items.forEach((i) => i.classList.toggle('open', i === item))));

// Prompt box + bottom CTA
const prompt = document.getElementById('prompt');
document.getElementById('promptForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = prompt.value.trim();
  if (!text) { prompt.focus(); return; }
  window.location.href = APP_URL + '?q=' + encodeURIComponent(text);
});
document.getElementById('ctaBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => prompt?.focus(), 500);
});

initCommon();
initToc();
