import '../styles/base.css';
import '../styles/motion.css';
import { initCommon, initSingleSelect } from '../js/layout.js';
import { initPinSteps } from '../js/pin.js';
import { initPlans } from '../js/plans.js';

// Placeholder gradient generator (hue base h, card index i)
const g = (h, i) => `linear-gradient(160deg,hsl(${(h + i * 28) % 360},48%,56%),hsl(${(h + i * 28 + 40) % 360},42%,26%))`;

/* ===================================================================
   "Start with a ready-made template": left tabs stay pinned, the
   cards on the right swap as you scroll (or click a tab).
   =================================================================== */
const CATS = [
  ['Most used', 'Popular templates', 'The starting points people open first.'],
  ['3D mockups', 'Mockup videos', 'Turn any SequelBox mockup into motion.'],
  ['Short form', 'Reels and shorts', 'Vertical edits with captions and a beat.'],
  ['Paid social', 'Ads that convert', 'Hooks, offers and clear calls to action.'],
  ['How-to', 'Tutorials', 'Walk people through a product or a process.'],
  ['Big moments', 'Launch videos', 'Teasers, reveals and logo outros.'],
];
const SETS = [
  [['360° product spin', 'Turn a 3D mockup into a smooth turntable video.'], ['Social reel', 'A 9:16 reel with captions and music, ready to post.'], ['Launch video', 'Title, product shots and logo outro in one timeline.'], ['App walkthrough', 'Show a phone or laptop screen with captions and zooms.']],
  [['Hoodie turntable', 'Spin an apparel mockup through every angle.'], ['Packaging reveal', 'Open a box and show what is inside.'], ['Phone screen demo', 'Put your app on a 3D phone with smooth zooms.'], ['Laptop site scroll', 'Show a website scrolling on a laptop.']],
  [['Product teaser', 'A 9:16 teaser with bold titles and a beat.'], ['Unboxing reel', 'A quick unboxing cut with sound effects.'], ['Before and after', 'Split-screen reveal for edits and makeovers.'], ['Behind the scenes', 'Fast cuts of your making process.']],
  [['15-second product ad', 'One hook, one product, one call to action.'], ['Sale announcement', 'Big type and countdown for offers and drops.'], ['Testimonial ad', 'Pair a customer quote with product shots.'], ['Retargeting clip', 'Short loop to bring visitors back.']],
  [['How-to walkthrough', 'Step-by-step with titles and callouts.'], ['Screen recording', 'Clean cursor zooms and captions.'], ['Step-by-step guide', 'Numbered chapters with music.'], ['Feature explainer', 'Show one feature in under a minute.']],
  [['Product launch', 'Teaser, reveal and logo outro in one timeline.'], ['Collection drop', 'Show a whole collection with quick cuts.'], ['Feature release', 'Announce an update with captions.'], ['Event teaser', 'Short countdown video for events.']],
];
const FMT = [['9:16', '0:15'], ['1:1', '0:10'], ['16:9', '0:30'], ['9:16', '0:20']];
const cardsEl = document.getElementById('cards');

function showTemplates(i) {
  if (!cardsEl || !SETS[i]) return;
  const [kicker, title, text] = CATS[i];
  document.getElementById('cpKicker').textContent = kicker;
  document.getElementById('cpTitle').textContent = title;
  document.getElementById('cpText').textContent = text;
  document.getElementById('cpCount').textContent = SETS[i].length + ' templates';
  cardsEl.innerHTML = SETS[i]
    .map((c, j) =>
      `<article class="mc ph" style="--g:${g(i * 55 + 200, j)};--j:${j}"><div class="mc-art a${j}" aria-hidden="true"><span class="fmt">${FMT[j][0]} · ${FMT[j][1]}</span><span class="play"></span></div><div class="mc-b"><h3>${c[0]}</h3><p>${c[1]}</p><a class="try" href="#">Try in Motion Box</a></div></article>`)
    .join('');
}

/* ===================================================================
   "One timeline": left menu stays pinned, the editor on the right
   changes step by step as you scroll (or click a menu item).
   =================================================================== */
const win = document.getElementById('win');
const canvas = document.getElementById('canvas');
const insp = document.getElementById('insp');
const rows = [...document.querySelectorAll('.tl-row')];
const RATIO = { '9:16': 9 / 16, '1:1': 1, '16:9': 16 / 9 };

// small UI builders for the inspector panel
const slider = (label, val, text) => `<div class="f"><div class="f-h"><span>${label}</span><b>${text}</b></div><div class="sl"><u style="width:${val}%"></u><i style="left:${val}%"></i></div></div>`;
const toggle = (label, on = true) => `<div class="f t"><span>${label}</span><div class="sw2${on ? ' on' : ''}"></div></div>`;
const seg = (list, sel) => `<div class="seg2">${list.map((x, i) => `<span class="${i === sel ? 'on' : ''}">${x}</span>`).join('')}</div>`;
const title = (t, s) => `<div class="i-t"><b>${t}</b><span>${s}</span></div>`;

const STEPS = [
  { name: 'Trim and cut', ph: 0.1, time: '00:02', hue: 215,
    prompt: 'Trim the first 2 seconds and cut the dead air between shots.',
    ai: 'Done. I trimmed the intro and closed the gap.', list: ['Trimmed 00:00 – 00:02', 'Removed 1.2s of silence', 'Clip is now 14.0s'],
    insp: () => title('Trim', 'Intro.mp4') + slider('Start', 14, '00:02') + slider('End', 92, '00:16') + toggle('Remove silence') + `<div class="chipline"><span>14.0s</span><span>−2.0s</span></div>` },
  { name: 'Add captions', ph: 0.3, time: '00:05', hue: 330,
    prompt: 'Add white captions at the bottom and keep them readable on mobile.',
    ai: 'Captions are on. I matched them to your voice.', list: ['Transcribed 4 lines', 'Style: Bold, white', 'Safe area respected'],
    insp: () => title('Captions', 'English') + `<div class="f"><div class="f-h"><span>Style</span></div><div class="swatches"><span class="on">Aa</span><span>Aa</span><span>Aa</span></div></div>` + slider('Size', 60, '32 px') + toggle('Auto-generate') + toggle('Highlight words', false) },
  { name: 'Add music', ph: 0.52, time: '00:08', hue: 28,
    prompt: 'Score it with an upbeat track and fade it out at the end.',
    ai: 'Scored it and added a 2 second fade-out.', list: ['Track: Upbeat Launch', '120 BPM, 0:14', 'Auto-ducked under voice'],
    insp: () => title('Music', 'Library') + `<div class="trk on"><i></i><div><b>Upbeat Launch</b><span>120 BPM · 0:14</span></div></div><div class="trk"><i></i><div><b>Soft Studio</b><span>92 BPM · 0:30</span></div></div>` + slider('Volume', 70, '70%') + toggle('Fade out · 2s') },
  { name: 'Resize for social', ph: 0.4, time: '00:06', hue: 262, ratios: true,
    prompt: 'Make a 9:16 for Reels, 1:1 for the feed and 16:9 for YouTube.',
    ai: 'Three sizes ready. Subjects stay centred.', list: ['9:16 · Reels', '1:1 · Feed', '16:9 · YouTube'],
    insp: () => title('Canvas', 'Auto reframe') + ['9:16|Reels', '1:1|Feed', '16:9|YouTube'].map((x) => { const [r, n] = x.split('|'); return `<div class="rt" data-r="${r}"><i style="aspect-ratio:${RATIO[r]}"></i><div><b>${r}</b><span>${n}</span></div></div>`; }).join('') },
  { name: 'Add voiceover', ph: 0.62, time: '00:09', hue: 175,
    prompt: 'Record a voiceover and sync it under the captions.',
    ai: 'Voiceover recorded and aligned to the captions.', list: ['Input: Built-in mic', 'Noise removed', 'Synced to captions'],
    insp: () => title('Voiceover', 'Built-in mic') + `<div class="rec"><b></b><div class="lv"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>` + slider('Gain', 55, '+3 dB') + toggle('Remove noise') + toggle('Sync to captions') },
  { name: 'Import mockups', ph: 0.78, time: '00:11', hue: 248,
    prompt: 'Bring in the hoodie mockup from SequelBox and spin it 360°.',
    ai: 'Imported the hoodie and set a full turntable.', list: ['Asset: Hoodie 01', 'Spin 360° · 6s', 'Studio background'],
    insp: () => title('Mockups', 'From SequelBox') + `<div class="assets"><span class="on" style="--g:linear-gradient(150deg,#2a2d3a,#0e1016)"></span><span style="--g:linear-gradient(150deg,#e8d8c8,#c8584a)"></span><span style="--g:linear-gradient(150deg,#2b3a6a,#8fa0f7)"></span><span style="--g:linear-gradient(150deg,#7ab8a0,#2b4a6a)"></span></div>` + slider('Spin speed', 45, '1.0x') + toggle('Studio light') },
  { name: 'Export video', ph: 0.98, time: '00:14', hue: 140, done: true,
    prompt: 'Export as MP4 in 1080p, ready to post.',
    ai: 'Exported. Your video is ready to post.', list: ['MP4 · 1080p · 30 fps', '38 MB', 'Saved to your library'],
    insp: () => title('Export', 'Ready') + `<div class="f"><div class="f-h"><span>Resolution</span></div>${seg(['720p', '1080p', '4K'], 1)}</div><div class="f"><div class="f-h"><span>Format</span></div>${seg(['MP4', 'MOV', 'GIF'], 0)}</div><div class="prog"><u></u></div><div class="exp-done"><i></i>Exported · 38 MB</div>` },
];

// waveform bars
document.querySelectorAll('.lane.wave').forEach((el) => {
  const n = +el.dataset.bars, voice = el.dataset.kind === 'voice';
  el.innerHTML = Array.from({ length: n }, (_, i) => {
    const h = voice ? 25 + 70 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31)) : 30 + 60 * Math.abs(Math.sin(i * 0.5 + 1) * Math.cos(i * 0.17));
    return `<i style="height:${h.toFixed(0)}%"></i>`;
  }).join('');
});

const els = {
  bar: document.querySelector('.win-bar em'), bub: document.getElementById('bubble'), think: document.getElementById('think'),
  ai: document.getElementById('ai'), aiText: document.getElementById('aiText'), aiList: document.getElementById('aiList'),
  name: document.getElementById('stageName'), meta: document.getElementById('stageMeta'), ph: document.getElementById('playhead'),
};
let thinkTimer = 0, ratioTimer = 0;

function setRatio(r) {
  canvas.style.setProperty('--r', RATIO[r]);
  canvas.dataset.ratio = r;
  insp.querySelectorAll('.rt').forEach((n) => n.classList.toggle('on', n.dataset.r === r));
  els.meta.textContent = r + ' · 30 fps';
}

function showStep(i) {
  const s = STEPS[i];
  if (!s) return;
  win.dataset.step = i;
  els.bar.textContent = 'Product launch · ' + s.name;
  els.name.textContent = s.name;
  els.bub.textContent = s.prompt;
  // brief "thinking" then the assistant answer
  clearTimeout(thinkTimer);
  els.ai.classList.remove('show');
  els.think.classList.add('show');
  thinkTimer = setTimeout(() => {
    els.aiText.textContent = s.ai;
    els.aiList.innerHTML = s.list.map((t) => `<li>${t}</li>`).join('');
    els.think.classList.remove('show');
    els.ai.classList.add('show');
  }, 520);
  // stage
  canvas.style.setProperty('--h', s.hue);
  win.style.setProperty('--ph', s.ph);
  els.ph.dataset.time = s.time;
  insp.innerHTML = s.insp();
  insp.classList.remove('enter'); void insp.offsetWidth; insp.classList.add('enter');
  rows.forEach((r) => {
    const from = +r.dataset.from;
    r.classList.toggle('empty', i < from);
    r.classList.toggle('fresh', i === from);
  });
  // "Resize" step cycles the three social formats; the others stay 9:16
  clearInterval(ratioTimer);
  const order = ['9:16', '1:1', '16:9'];
  setRatio('9:16');
  if (s.ratios) {
    let k = 0;
    ratioTimer = setInterval(() => { k = (k + 1) % order.length; setRatio(order[k]); }, 1700);
    setRatio('9:16');
  }
}

/* ---- wire both pinned sections ---- */
initPinSteps({ pin: document.getElementById('demoPin'), menu: document.getElementById('demoMenu'), count: STEPS.length, onStep: showStep, counter: document.getElementById('demoCount'), rail: document.getElementById('demoRail') });
initPinSteps({ pin: document.getElementById('createPin'), menu: document.getElementById('ctabs'), count: SETS.length, onStep: showTemplates, counter: document.getElementById('createCount'), rail: document.getElementById('createRail') });

initSingleSelect(['seg']);
initCommon();
initPlans();
