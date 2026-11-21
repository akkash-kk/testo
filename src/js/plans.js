// Pricing cards (INR). Annual = discounted price with the monthly list price struck through.
const features = [
  '3D mockup editor in the browser', 'All apparel, packaging & device templates', 'Upload your own artwork',
  'Colour, material & lighting controls', 'PNG, JPG & transparent exports', '360° turntable export',
  'Motion Box video editor', 'Captions, music & transitions', 'MP4 export up to 4K',
  'Brand kit & saved designs', 'Commercial use license', 'Priority support',
];

const plans = [
  { n: 'Starter', s: 'For trying SequelBox and Motion Box', list: '', p: '₹0', feats: features.slice(0, 5).concat(['Motion Box at 720p']), btn: 'btn-o', cta: 'Start free', credits: '5 mockup exports / month', note: '720p Motion Box exports' },
  { n: 'Creator', tag: 'Best value', hl: 1, s: 'For freelancers, makers and small brands', list: '₹599', p: '₹449', feats: features.slice(0, 10), btn: 'btn', cta: 'Get Creator', credits: 'Unlimited mockup exports', note: '1080p Motion Box exports' },
  { n: 'Studio', tag: 'For teams', s: 'For agencies and growing teams', list: '₹1,799', p: '₹1,349', feats: features, btn: 'btn-w', cta: 'Get Studio', credits: 'Unlimited exports + 4K video', note: 'Team workspace, 5 seats' },
];

export function initPlans() {
  const el = document.getElementById('plans');
  if (!el) return;
  const toggle = document.getElementById('annual');

  const render = () => {
    const annual = toggle ? toggle.checked : true;
    el.innerHTML = plans
      .map((p) => {
        const price = annual ? p.p : p.list || p.p;
        const strike = annual && p.list ? `<s>${p.list}</s>` : '';
        const billed = p.list ? (annual ? 'billed annually' : 'billed monthly') : 'free forever';
        return `
    <div class="pl${p.hl ? ' hl' : ''}">
      <div class="pl-h"><h3>${p.n}</h3>${p.tag ? `<span class="tag2">${p.tag}</span>` : ''}</div>
      <p class="sub">${p.s}</p>
      <div class="price">${strike}<b>${price}</b><small>/month<br>${billed}</small></div>
      <div class="box"><b>${p.credits}</b><span>${p.note}</span></div>
      <div class="box" style="color:var(--dim)">No model training on your data</div>
      <a class="${p.btn}" href="#">${p.cta}</a>
      <ul>${p.feats.map((f) => `<li><svg class="ic"><use href="#i-check"/></svg><span>${f}</span></li>`).join('')}</ul>
    </div>`;
      })
      .join('');
  };

  render();
  toggle?.addEventListener('change', render);
}
