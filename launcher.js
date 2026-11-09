'use strict';

const GAME_DETAILS = {
  M1: { title: ['猜拳神廟', '冒險'], english: 'Rock Paper Scissors · Temple Adventure', tab: '神廟', genre: '猜拳冒險', eyebrow: 'THE TEMPLE AWAITS', description: '石頭、剪刀、布。\n用熟悉的猜拳，開啟一場神廟冒險。', theme: 'sage' },
  M2: { title: ['星際隕石', '財富'], english: 'Asteroid Riches', tab: '隕石', genre: '星際主題', eyebrow: 'BEYOND THE STARS', description: '下一段冒險，從星際出發。\n準備好探索隕石世界了嗎？', theme: 'space' },
  M3: { title: ['香腸', '對決'], english: 'Sausage Duel', tab: '香腸', genre: '歡樂對決', eyebrow: 'READY FOR THE DUEL', description: '歡迎來到香腸的對決舞台。\n選好遊戲，讓熱鬧開場。', theme: 'coral' },
  M4: { title: ['賽博高低', '對決'], english: 'Cyber Hi-Lo Battle', tab: '高低', genre: '賽博主題', eyebrow: 'STEP INTO THE NEON', description: '霓虹亮起，對決開場。\n在賽博世界，迎接下一次挑戰。', theme: 'violet' },
  M5: { title: ['五行鳳凰', '寶珠'], english: 'Phoenix of Five Elemental Orbs', tab: '鳳凰', genre: '五行主題', eyebrow: 'RISE WITH THE PHOENIX', description: '五行交會，鳳凰登場。\n展開屬於你的寶珠冒險。', theme: 'ember' },
  M6: { title: ['霓虹', '擲幣'], english: 'Neon Coin Flip', tab: '硬幣', genre: '硬幣主題', eyebrow: 'A MOMENT IN THE AIR', description: '硬幣翻轉，霓虹閃耀。\n讓下一場遊戲，從這裡開始。', theme: 'teal' },
  M7: { title: ['神秘球', '馬戲團'], english: 'Mystery Balls Circus', tab: '馬戲團', genre: '馬戲團主題', eyebrow: 'WELCOME TO THE CIRCUS', description: '燈光亮起，馬戲團開幕。\n一起走進神秘球的世界。', theme: 'rose' },
  M8: { title: ['尋寶', '探險'], english: 'Treasure Quest', tab: '尋寶', genre: '寶藏主題', eyebrow: 'FOLLOW THE TREASURE', description: '下一段旅程，通往未知的寶藏。\n準備出發，展開尋寶探險。', theme: 'ocean' },
  M9: { title: ['香蕉', '驚喜籤'], english: 'Banana Pull Tabs', tab: '香蕉', genre: '香蕉主題', eyebrow: 'A LITTLE TROPICAL SURPRISE', description: '一點熱帶風情，一份遊戲驚喜。\n歡迎來到香蕉的歡樂世界。', theme: 'olive' },
  M10: { title: ['骰子高塔', '大師'], english: 'Tower of Dice Master', tab: '骰塔', genre: '骰子主題', eyebrow: 'ONE TOWER. MANY POSSIBILITIES.', description: '走進骰子高塔，迎接新的挑戰。\n下一場冒險，正在等你。', theme: 'slate' },
  AI: { title: ['AI 百家樂', '牌桌'], english: 'AI Baccarat Table Game', tab: '百家樂', genre: '牌桌主題', eyebrow: 'TAKE YOUR SEAT', description: '牌桌已就緒。\n進入 AI 百家樂的遊戲世界。', theme: 'emerald' },
  SI8: { title: ['金融', '風暴'], english: 'Crash Market', tab: '金融風暴', genre: '市場主題', eyebrow: 'WATCH THE MARKET MOVE', description: '市場起伏，節奏瞬息萬變。\n從這裡進入 Crash Market。', theme: 'indigo' },
  TEST: { title: ['測試', '遊戲'], english: 'Test Playground', tab: '測試', genre: '測試入口', eyebrow: 'ROOM FOR EXPERIMENTS', description: '把新的點子，變成下一個可能。\n從測試入口探索目前的建置內容。', theme: 'sand' },
};

const header = document.getElementById('site-header');
const tabs = document.getElementById('game-tabs');
const library = document.getElementById('game-library');
const cardTemplate = document.getElementById('game-card-template');
const serviceStatus = document.getElementById('service-status');
const serviceLabel = document.getElementById('service-label');
const notice = document.getElementById('notice');
const noticeMessage = document.getElementById('notice-message');
const retryButton = document.getElementById('retry-button');
const prevButton = document.getElementById('tabs-prev');
const nextButton = document.getElementById('tabs-next');
const siteRoot = new URL('.', document.baseURI);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const entries = new Map();
let checking = false;
let lastChecked = 0;
let librarySignature = '';
let activeId = null;
let navigationLock = null;
let scrollFrame = 0;
let headerHeight = 140;
let drag = null;
let suppressClickUntil = 0;

function motion() { return reducedMotion.matches ? 'auto' : 'smooth'; }

function serviceState(state, message = '') {
  const ready = state === 'ready';
  serviceStatus.className = 'service-status' + (ready ? ' is-ready' : state === 'checking' ? '' : ' is-offline');
  serviceLabel.textContent = ready ? '遊戲庫已就緒' : state === 'checking' ? '正在載入' : '尚未就緒';
  noticeMessage.textContent = message;
  notice.hidden = !message;
  if (!ready) for (const entry of entries.values()) updateAvailability(entry, false, '清單未載入');
}

function updateAvailability(entry, available, unavailableLabel = '尚未建置') {
  entry.button.classList.toggle('is-disabled', !available);
  entry.button.setAttribute('aria-disabled', String(!available));
  entry.button.querySelector('.launch-label').textContent = available ? '開始遊戲' : unavailableLabel;
  entry.card.querySelector('.availability-tag').textContent = available ? '可以開啟' : unavailableLabel;
}

function validGame(game) {
  if (!game || typeof game.id !== 'string' || !/^[A-Za-z0-9_-]+$/.test(game.id) || typeof game.folder !== 'string' || typeof game.url !== 'string') return false;
  try {
    const url = new URL(game.url, siteRoot);
    const gamePath = `${siteRoot.pathname}${encodeURIComponent(game.folder)}/web-mobile/index.html`;
    return url.origin === siteRoot.origin && url.pathname === gamePath;
  } catch { return false; }
}

function detailsFor(game) {
  return GAME_DETAILS[game.id] || { title: [game.name || game.folder], english: game.subtitle || game.folder, tab: game.id, genre: '遊戲入口', eyebrow: 'A NEW ADVENTURE', description: '新的遊戲，新的開始。\n選好入口，展開下一場冒險。', theme: 'sage' };
}

function createEntry(game, index) {
  const detail = detailsFor(game);
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.id = `game-${game.id}`;
  card.classList.add(`theme-${detail.theme}`);
  card.dataset.gameId = game.id;
  card.setAttribute('aria-labelledby', `title-${game.id}`);
  card.querySelector('.game-id').textContent = game.id;
  card.querySelector('.game-eyebrow').textContent = detail.eyebrow;
  const title = card.querySelector('.game-title');
  title.id = `title-${game.id}`;
  detail.title.forEach((line, lineIndex) => {
    if (lineIndex) title.append(document.createElement('br'));
    title.append(document.createTextNode(line));
  });
  const spark = document.createElement('span');
  spark.className = 'title-spark';
  spark.textContent = '✳';
  spark.setAttribute('aria-hidden', 'true');
  title.append(spark);
  card.querySelector('.english-title').textContent = detail.english;
  card.querySelector('.game-description').textContent = detail.description;
  card.querySelector('.genre-tag').textContent = detail.genre;
  const button = card.querySelector('.launch-button');
  button.href = new URL(game.url, siteRoot).href;
  button.setAttribute('aria-label', `開始遊戲：${game.id} ${detail.title.join('')}`);
  const art = card.querySelector('.game-art');
  if (game.id === 'M1') art.append(document.getElementById('m1-art-template').content.cloneNode(true));
  else if (window.CocosGameArt && Object.hasOwn(window.CocosGameArt, game.id)) {
    // SVG strings are authored locally, never from API text.
    art.innerHTML = window.CocosGameArt[game.id];
  } else {
    const fallback = document.createElement('span');
    fallback.className = 'fallback-art';
    fallback.textContent = game.id;
    art.append(fallback);
  }
  const edition = document.createElement('span');
  edition.className = 'card-edition';
  edition.textContent = `GAME COLLECTION — ${String(index + 1).padStart(3, '0')}`;
  art.append(edition);
  const tab = document.createElement('a');
  tab.className = 'game-tab';
  tab.href = `#${card.id}`;
  tab.dataset.gameId = game.id;
  tab.draggable = false;
  tab.setAttribute('aria-label', `${game.id} ${detail.title.join('')}，前往遊戲入口`);
  const code = document.createElement('span');
  code.className = 'tab-code';
  code.textContent = game.id;
  const label = document.createElement('span');
  label.className = 'tab-name';
  label.textContent = detail.tab;
  tab.append(code, label);
  return { card, button, tab, game };
}

function renderLibrary(games) {
  const previousActive = activeId;
  entries.clear();
  const cards = document.createDocumentFragment();
  const links = document.createDocumentFragment();
  games.forEach((game, index) => {
    const entry = createEntry(game, index);
    entries.set(game.id, entry);
    cards.append(entry.card);
    links.append(entry.tab);
  });
  library.replaceChildren(cards);
  tabs.replaceChildren(links);
  library.setAttribute('aria-busy', 'false');
  const count = String(games.length).padStart(2, '0');
  document.getElementById('game-count').textContent = count;
  document.getElementById('library-count').textContent = count;
  if (!games.length) {
    const empty = document.createElement('p');
    empty.className = 'library-loading';
    empty.textContent = '目前沒有可開啟的遊戲。';
    library.append(empty);
  }
  activeId = null;
  setActive(entries.has(previousActive) ? previousActive : games[0]?.id);
  requestAnimationFrame(() => {
    updateArrowButtons();
    let hash;
    try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { hash = ''; }
    const target = Array.from(entries.values()).find(entry => entry.card.id === hash);
    if (target) navigateTo(target.game.id, { updateHash: false, behavior: 'auto', focus: false });
    else updateScrollPosition();
  });
}

async function loadGames() {
  if (checking) return;
  if (window.location.protocol === 'file:') {
    serviceState('offline', '請使用發布後的網站網址，或雙擊專案裡的 StartLauncher.cmd 開啟本機預覽。');
    retryButton.hidden = true;
    library.setAttribute('aria-busy', 'false');
    document.getElementById('library-loading')?.remove();
    return;
  }
  checking = true;
  retryButton.disabled = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(new URL('games.json', siteRoot), { cache: 'no-cache', signal: controller.signal });
    if (!response.ok) throw new Error('Game list unavailable');
    const data = await response.json();
    if (!Array.isArray(data.games) || !data.games.every(validGame) || new Set(data.games.map(game => game.id)).size !== data.games.length) throw new Error('Invalid game list');
    // Keep focus and scroll when reloading an unchanged game list.
    const signature = JSON.stringify(data.games.map(({ id, folder, name, subtitle, url }) => ({ id, folder, name, subtitle, url })));
    if (signature !== librarySignature) {
      renderLibrary(data.games);
      librarySignature = signature;
    }
    data.games.forEach(game => {
      const entry = entries.get(game.id);
      entry.game = game;
      updateAvailability(entry, game.available === true);
    });
    serviceState('ready');
  } catch {
    serviceState('offline', '遊戲清單載入失敗。請確認網路連線後重試。');
    library.setAttribute('aria-busy', 'false');
    document.getElementById('library-loading')?.remove();
  } finally {
    clearTimeout(timeout);
    checking = false;
    retryButton.disabled = false;
    lastChecked = Date.now();
  }
}

function ensureTabVisible(tab) {
  if (!tab || drag?.moved) return;
  const item = tab.getBoundingClientRect();
  const strip = tabs.getBoundingClientRect();
  if (item.left < strip.left + 10) tabs.scrollBy({ left: item.left - strip.left - 10, behavior: motion() });
  else if (item.right > strip.right - 10) tabs.scrollBy({ left: item.right - strip.right + 10, behavior: motion() });
}

function setActive(id) {
  if (!entries.has(id) || id === activeId) return;
  if (entries.has(activeId)) {
    entries.get(activeId).tab.removeAttribute('aria-current');
    entries.get(activeId).card.classList.remove('is-current');
  }
  activeId = id;
  const entry = entries.get(id);
  entry.tab.setAttribute('aria-current', 'location');
  entry.card.classList.add('is-current');
  ensureTabVisible(entry.tab);
}

function navigateTo(id, { updateHash = true, behavior = motion(), focus = true } = {}) {
  const entry = entries.get(id);
  if (!entry) return;
  navigationLock = { id, until: performance.now() + 1800 };
  setActive(id);
  ensureTabVisible(entry.tab);
  if (focus) entry.card.focus({ preventScroll: true });
  if (updateHash) history.replaceState(null, '', `#${entry.card.id}`);
  entry.card.scrollIntoView({ behavior, block: 'start' });
}

function updateScrollPosition() {
  scrollFrame = 0;
  if (!entries.size) return;
  if (navigationLock && performance.now() < navigationLock.until) {
    const targetTop = entries.get(navigationLock.id)?.card.getBoundingClientRect().top;
    if (typeof targetTop === 'number' && Math.abs(targetTop - headerHeight - 24) > 4) return;
  }
  navigationLock = null;
  const activationY = headerHeight + Math.min(150, window.innerHeight * 0.2);
  let current = entries.keys().next().value;
  for (const [id, entry] of entries) {
    if (entry.card.getBoundingClientRect().top <= activationY) current = id;
    else break;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = Array.from(entries.keys()).at(-1);
  setActive(current);
}

function scheduleScrollPosition() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollPosition);
}

function updateArrowButtons() {
  prevButton.disabled = tabs.scrollLeft <= 2;
  nextButton.disabled = tabs.scrollLeft >= tabs.scrollWidth - tabs.clientWidth - 2;
}

tabs.addEventListener('click', event => {
  if (event.detail !== 0 && performance.now() < suppressClickUntil) { event.preventDefault(); return; }
  const link = event.target.closest('a[data-game-id]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  navigateTo(link.dataset.gameId);
});
tabs.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const links = Array.from(entries.values(), entry => entry.tab);
  const index = links.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  const target = event.key === 'Home' ? links[0] : event.key === 'End' ? links.at(-1) : links[Math.max(0, Math.min(links.length - 1, index + (event.key === 'ArrowLeft' ? -1 : 1)))];
  target.focus({ preventScroll: true });
  ensureTabVisible(target);
});
tabs.addEventListener('dragstart', event => event.preventDefault());
tabs.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  drag = { pointerId: event.pointerId, x: event.clientX, left: tabs.scrollLeft, moved: false };
});
document.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const distance = event.clientX - drag.x;
  if (!drag.moved && Math.abs(distance) > 5) {
    drag.moved = true;
    tabs.classList.add('is-dragging');
    tabs.setPointerCapture(event.pointerId);
  }
  if (drag.moved) { event.preventDefault(); tabs.scrollLeft = drag.left - distance; }
});
function endDrag(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  if (drag.moved) suppressClickUntil = performance.now() + 250;
  if (tabs.hasPointerCapture(event.pointerId)) tabs.releasePointerCapture(event.pointerId);
  drag = null;
  tabs.classList.remove('is-dragging');
  updateArrowButtons();
}
document.addEventListener('pointerup', endDrag);
document.addEventListener('pointercancel', endDrag);
tabs.addEventListener('scroll', updateArrowButtons, { passive: true });
prevButton.addEventListener('click', () => tabs.scrollBy({ left: -Math.max(200, tabs.clientWidth * 0.7), behavior: motion() }));
nextButton.addEventListener('click', () => tabs.scrollBy({ left: Math.max(200, tabs.clientWidth * 0.7), behavior: motion() }));
library.addEventListener('click', event => {
  const button = event.target.closest('.launch-button');
  if (button?.getAttribute('aria-disabled') === 'true') event.preventDefault();
});
retryButton.addEventListener('click', () => { serviceState('checking'); loadGames(); });
window.addEventListener('scroll', scheduleScrollPosition, { passive: true });
window.addEventListener('scrollend', () => { navigationLock = null; scheduleScrollPosition(); });
window.addEventListener('wheel', () => { navigationLock = null; }, { passive: true });
window.addEventListener('touchstart', () => { navigationLock = null; }, { passive: true });
window.addEventListener('keydown', event => { if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(event.key)) navigationLock = null; });
window.addEventListener('hashchange', () => {
  let hash;
  try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = Array.from(entries.values()).find(entry => entry.card.id === hash);
  if (target) navigateTo(target.game.id, { updateHash: false });
});
document.getElementById('back-to-top').addEventListener('click', event => {
  event.preventDefault();
  navigationLock = null;
  history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo({ top: 0, behavior: motion() });
});
new ResizeObserver(() => {
  headerHeight = Math.ceil(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--sticky-height', `${headerHeight}px`);
  updateArrowButtons();
}).observe(header);
document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - lastChecked > 5000) loadGames(); });
setInterval(() => { if (!document.hidden) loadGames(); }, 20000);
loadGames();
