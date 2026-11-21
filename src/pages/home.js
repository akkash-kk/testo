import '../styles/base.css';
import '../styles/marketing.css';
import '../styles/home.css';
import { initCommon, escapeHtml } from '../js/layout.js';
import { initToc } from '../js/toc.js';

/* ---- Tools: tabbed grid ---- */
const T = {
  Apparel: [['Dress mockup', 'Show a dress on a 3D model.'], ['T-shirt mockup', 'Place a print on a tee.'], ['Hoodie mockup', 'Front, back and sleeve artwork.'], ['Cap mockup', 'Logos on caps and hats.'], ['Tote bag mockup', 'Patterns on bags.'], ['Jacket mockup', 'Outerwear in 3D.']],
  Packaging: [['Product box', 'Artwork on every side.'], ['Pouch', 'Stand-up and flat pouches.'], ['Shipping box', 'Mailers and cartons.'], ['Bottle label', 'Wrap labels in 3D.'], ['Paper bag', 'Retail and takeaway bags.'], ['Perfume box', 'Premium folding cartons.']],
  Devices: [['Phone mockup', 'Put your app on a phone.'], ['Laptop mockup', 'Show your site on a laptop.'], ['Tablet mockup', 'Dashboards on tablets.'], ['Watch mockup', 'Faces and straps.'], ['Desktop mockup', 'Monitors and setups.'], ['Multi-device', 'Several screens in one scene.']],
  Drinkware: [['Bottle', 'Water and drink bottles.'], ['Can', 'Cans with full wrap.'], ['Mug', 'Print on mugs.'], ['Tumbler', 'Insulated cups.'], ['Coffee cup', 'Takeaway cups.'], ['Glass', 'Branded glassware.']],
  'Motion Box': [['Video editor', 'Cut clips on a timeline.'], ['Auto captions', 'Add subtitles in minutes.'], ['Music and audio', 'Layer tracks and voiceover.'], ['Trim and cut', 'Split, trim and rearrange.'], ['Resize for social', '9:16, 1:1 and 16:9.'], ['Mockup to video', 'Turn mockups into video.']],
};
const hues = [230, 280, 160, 20, 330, 200];

function showTools(key) {
  const list = T[key] || T.Apparel;
  const href = key === 'Motion Box' ? 'motionbox.html' : 'mockups.html';
  document.getElementById('tg').innerHTML = list
    .map(([name, desc], i) =>
      `<a class="h-card tool" href="${href}"><i style="background:linear-gradient(135deg,hsl(${hues[i]},60%,62%),hsl(${hues[i] + 40},50%,34%))"></i><div><b>${escapeHtml(name)}</b><span>${escapeHtml(desc)}</span></div></a>`)
    .join('');
}

/* ---- Popular templates: filterable scroller ---- */
const M = [['Hoodie', 'Apparel'], ['Dress', 'Apparel'], ['T-shirt', 'Apparel'], ['Product box', 'Packaging'], ['Pouch', 'Packaging'], ['Phone', 'Devices'], ['Laptop', 'Devices'], ['Tablet', 'Devices']];

function showModels(key) {
  document.getElementById('ms').innerHTML = M
    .filter((m) => key === 'All' || m[1] === key)
    .map(([name, cat], i) =>
      `<a class="h-card model" href="mockups.html"><div class="m" style="background:linear-gradient(135deg,hsl(${i * 45},55%,52%),hsl(${i * 45 + 50},50%,24%))"></div><div class="t"><span></span><div><b>${escapeHtml(name)}</b><small>${escapeHtml(cat)}</small></div></div></a>`)
    .join('');
}

/* ---- Learn cards ---- */
const L = [
  ['Tutorial', 'SequelBox Academy', 'Step-by-step tutorials for mockups and video.', 'Start learning'],
  ['Community', 'Join the Discord', 'Share work and get feedback.', 'Open the channel'],
  ['Guide', 'Mock up a hoodie', 'Place artwork on apparel in two minutes.', 'Read the guide'],
  ['Guide', 'Make a 360° video', 'Turn a mockup into a spin in Motion Box.', 'Read the guide'],
];
document.getElementById('lg').innerHTML = L
  .map(([kind, title, text, cta], i) =>
    `<a class="h-card learn" href="#"><div class="m" style="background:linear-gradient(135deg,hsl(${i * 70 + 200},45%,56%),hsl(${i * 70 + 250},40%,26%))"></div><div class="h-body"><span class="kind">${kind}</span><h3>${title}</h3><p>${text}</p><span class="go">${cta} →</span></div></a>`)
  .join('');

showTools('Apparel');
showModels('All');

/* ---- Tab groups ---- */
document.querySelectorAll('.tabs').forEach((group) =>
  group.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    group.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    if (group.id === 'tabs') showTools(b.textContent);
    if (group.id === 'mt') showModels(b.textContent);
  })
);

/* ---- "What's new" arrows ---- */
const sc = document.getElementById('sc');
document.getElementById('next')?.addEventListener('click', () => sc.scrollBy({ left: 336, behavior: 'smooth' }));
document.getElementById('prev')?.addEventListener('click', () => sc.scrollBy({ left: -336, behavior: 'smooth' }));

initCommon();
initToc();
