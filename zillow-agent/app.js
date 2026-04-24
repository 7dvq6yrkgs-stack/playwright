/* ═══════════════════════════════════════════════════════════════
   ZILLOW AGENT — Core Application Logic
   Property search, detail modal, chat agent, API integration
   ═══════════════════════════════════════════════════════════════ */

// ─── State ───
const state = {
  apiKey: localStorage.getItem('zillow_rapidapi_key') || '',
  results: [],
  totalResults: 0,
  currentPage: 1,
  currentSort: 'Newest',
  statusType: 'ForSale',
  lastQuery: '',
  selectedProperty: null,
  chatOpen: false,
  searchHistory: JSON.parse(localStorage.getItem('zillow_search_history') || '[]'),
};

const API_HOST = 'zillow-com1.p.rapidapi.com';
const API_BASE = `https://${API_HOST}`;

// ─── DOM Refs ───
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  searchInput: $('#search-input'),
  btnSearch: $('#btn-search'),
  autocomplete: $('#autocomplete-dropdown'),
  filterPills: $$('.pill'),
  resultsSection: $('#results-section'),
  resultsGrid: $('#results-grid'),
  resultsTitle: $('#results-title'),
  resultsCount: $('#results-count'),
  sortSelect: $('#sort-select'),
  pagination: $('#pagination'),
  emptyState: $('#empty-state'),
  settingsOverlay: $('#settings-overlay'),
  settingsModal: $('#settings-modal'),
  btnSettings: $('#btn-settings'),
  btnSettingsClose: $('#btn-settings-close'),
  apiKeyInput: $('#api-key-input'),
  btnToggleKey: $('#btn-toggle-key'),
  btnSaveKey: $('#btn-save-key'),
  keyStatus: $('#key-status'),
  detailOverlay: $('#detail-overlay'),
  detailModal: $('#detail-modal'),
  detailContent: $('#detail-content'),
  btnDetailClose: $('#btn-detail-close'),
  chatPanel: $('#chat-panel'),
  btnChatToggle: $('#btn-chat-toggle'),
  btnChatClose: $('#btn-chat-close'),
  chatMessages: $('#chat-messages'),
  chatInput: $('#chat-input'),
  btnChatSend: $('#btn-chat-send'),
};

// ─── Toast notifications ───
function createToastContainer() {
  let c = document.querySelector('.toast-container');
  if (!c) {
    c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}
function toast(msg, type = 'info') {
  const container = createToastContainer();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ═══════════════════════════════════════════════
// API LAYER
// ═══════════════════════════════════════════════
async function apiFetch(endpoint, params = {}) {
  if (!state.apiKey) {
    toast('Please set your RapidAPI key first', 'error');
    openSettings();
    throw new Error('No API key');
  }

  const url = new URL(`${API_BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': state.apiKey,
      'X-RapidAPI-Host': API_HOST,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('API Error:', res.status, errText);
    if (res.status === 403 || res.status === 401) {
      toast('Invalid API key or subscription expired', 'error');
    } else if (res.status === 429) {
      toast('Rate limit exceeded — slow down', 'error');
    } else {
      toast(`API error: ${res.status}`, 'error');
    }
    throw new Error(`API ${res.status}`);
  }

  return res.json();
}

// ─── Search ───
async function searchProperties(location, page = 1) {
  const data = await apiFetch('propertyExtendedSearch', {
    location,
    status_type: state.statusType,
    sort: state.currentSort,
    home_type: 'Houses,Apartments,Condos,Townhomes',
    page,
  });
  return data;
}

// ─── Property Details ───
async function getPropertyDetails(zpid) {
  const [details, images, priceHistory, walkScore] = await Promise.allSettled([
    apiFetch('property', { zpid }),
    apiFetch('images', { zpid }),
    apiFetch('priceHistory', { zpid }),
    apiFetch('walkAndTransitScore', { zpid }),
  ]);
  return {
    details: details.status === 'fulfilled' ? details.value : null,
    images: images.status === 'fulfilled' ? images.value : null,
    priceHistory: priceHistory.status === 'fulfilled' ? priceHistory.value : null,
    walkScore: walkScore.status === 'fulfilled' ? walkScore.value : null,
  };
}

// ─── Location autocomplete ───
let acAbort = null;
async function getLocationSuggestions(query) {
  if (acAbort) acAbort.abort();
  acAbort = new AbortController();
  try {
    const url = new URL(`${API_BASE}/locationSuggestions`);
    url.searchParams.set('q', query);
    const res = await fetch(url.toString(), {
      headers: {
        'X-RapidAPI-Key': state.apiKey,
        'X-RapidAPI-Host': API_HOST,
      },
      signal: acAbort.signal,
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (e) {
    if (e.name === 'AbortError') return [];
    return [];
  }
}

// ═══════════════════════════════════════════════
// UI RENDERING
// ═══════════════════════════════════════════════
function formatPrice(price) {
  if (!price && price !== 0) return 'N/A';
  if (typeof price === 'string') price = parseInt(price.replace(/[^0-9]/g, ''), 10);
  if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `$${(price / 1_000).toFixed(0)}K`;
  return `$${price.toLocaleString()}`;
}

function formatFullPrice(price) {
  if (!price && price !== 0) return 'N/A';
  if (typeof price === 'string') price = parseInt(price.replace(/[^0-9]/g, ''), 10);
  return `$${price.toLocaleString()}`;
}

function getBadgeClass() {
  if (state.statusType === 'ForRent') return 'badge-rent';
  if (state.statusType === 'RecentlySold') return 'badge-sold';
  return 'badge-sale';
}

function getBadgeText() {
  if (state.statusType === 'ForRent') return 'For Rent';
  if (state.statusType === 'RecentlySold') return 'Sold';
  return 'For Sale';
}

// ─── Skeleton Cards ───
function renderSkeletons(count = 6) {
  dom.resultsGrid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'property-card skeleton-card';
    card.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line price"></div>
        <div class="skeleton skeleton-line w80"></div>
        <div class="skeleton skeleton-line w60"></div>
        <div class="skeleton skeleton-line w40"></div>
      </div>
    `;
    dom.resultsGrid.appendChild(card);
  }
}

// ─── Property Card ───
function renderPropertyCard(prop) {
  const card = document.createElement('div');
  card.className = 'property-card';

  const imgSrc = prop.imgSrc || prop.miniCardPhotos?.[0]?.url || '';
  const price = prop.price || prop.listPrice || prop.soldPrice || '';
  const beds = prop.bedrooms ?? prop.beds ?? '—';
  const baths = prop.bathrooms ?? prop.baths ?? '—';
  const sqft = prop.livingArea ?? prop.area ?? '—';
  const address = prop.address || prop.streetAddress || 'Address unavailable';
  const zpid = prop.zpid;

  card.innerHTML = `
    <div class="card-image">
      ${imgSrc ? `<img src="${imgSrc}" alt="${address}" loading="lazy">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:2rem;">🏠</div>'}
      <span class="card-badge ${getBadgeClass()}">${getBadgeText()}</span>
    </div>
    <div class="card-body">
      <div class="card-price">${typeof price === 'string' ? price : formatFullPrice(price)}</div>
      <div class="card-address">${address}</div>
      <div class="card-specs">
        <span><span class="spec-value">${beds}</span> beds</span>
        <span><span class="spec-value">${baths}</span> baths</span>
        <span><span class="spec-value">${typeof sqft === 'number' ? sqft.toLocaleString() : sqft}</span> sqft</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openPropertyDetail(zpid, prop));
  return card;
}

// ─── Results ───
function renderResults(data) {
  const props = data.props || data.results || [];
  state.results = props;
  state.totalResults = data.totalResultCount || data.totalPages || props.length;

  dom.resultsGrid.innerHTML = '';
  dom.resultsSection.classList.remove('hidden');
  dom.emptyState.classList.add('hidden');

  if (props.length === 0) {
    dom.resultsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">🏚️</div>
        <h3 style="margin-bottom:8px;">No Properties Found</h3>
        <p style="color:var(--text-secondary);">Try a different location or adjust your filters.</p>
      </div>
    `;
    dom.resultsCount.textContent = '0 results';
    dom.pagination.innerHTML = '';
    return;
  }

  dom.resultsTitle.textContent = `Properties in ${state.lastQuery}`;
  dom.resultsCount.textContent = `${state.totalResults.toLocaleString()} results`;

  props.forEach((prop) => {
    dom.resultsGrid.appendChild(renderPropertyCard(prop));
  });

  renderPagination(data.totalPages || Math.ceil(state.totalResults / 40));
}

// ─── Pagination ───
function renderPagination(totalPages) {
  dom.pagination.innerHTML = '';
  if (totalPages <= 1) return;

  const maxShow = 7;
  let start = Math.max(1, state.currentPage - 3);
  let end = Math.min(totalPages, start + maxShow - 1);
  if (end - start < maxShow - 1) start = Math.max(1, end - maxShow + 1);

  if (state.currentPage > 1) {
    const prev = document.createElement('button');
    prev.className = 'page-btn';
    prev.textContent = '‹';
    prev.onclick = () => goToPage(state.currentPage - 1);
    dom.pagination.appendChild(prev);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${i === state.currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => goToPage(i);
    dom.pagination.appendChild(btn);
  }

  if (state.currentPage < totalPages) {
    const next = document.createElement('button');
    next.className = 'page-btn';
    next.textContent = '›';
    next.onclick = () => goToPage(state.currentPage + 1);
    dom.pagination.appendChild(next);
  }
}

async function goToPage(page) {
  state.currentPage = page;
  await performSearch(state.lastQuery, page);
  dom.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════════
// PROPERTY DETAIL MODAL
// ═══════════════════════════════════════════════
async function openPropertyDetail(zpid, basicProp) {
  dom.detailOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Show loading state
  dom.detailContent.innerHTML = `
    <div style="padding:60px;text-align:center;">
      <div class="skeleton" style="width:100%;height:340px;border-radius:var(--radius-lg) var(--radius-lg) 0 0;margin-bottom:20px;"></div>
      <div class="skeleton" style="width:40%;height:28px;margin:0 auto 12px;"></div>
      <div class="skeleton" style="width:60%;height:16px;margin:0 auto;"></div>
    </div>
  `;

  try {
    const { details, images, priceHistory, walkScore } = await getPropertyDetails(zpid);
    const prop = details || basicProp;

    const imgUrl = (images?.images?.[0]?.mixedSources?.jpeg?.[0]?.url)
                || prop?.imgSrc
                || prop?.miniCardPhotos?.[0]?.url
                || '';

    const price = prop.price || prop.listPrice || basicProp?.price || '';
    const address = prop.address?.streetAddress
      ? `${prop.address.streetAddress}, ${prop.address.city}, ${prop.address.state} ${prop.address.zipcode}`
      : (prop.address || basicProp?.address || 'Address unavailable');

    const beds = prop.bedrooms ?? basicProp?.bedrooms ?? '—';
    const baths = prop.bathrooms ?? basicProp?.bathrooms ?? '—';
    const sqft = prop.livingArea ?? basicProp?.livingArea ?? '—';
    const yearBuilt = prop.yearBuilt ?? '—';
    const homeType = prop.homeType || prop.propertyType || '';
    const description = prop.description || '';
    const zestimate = prop.zestimate;

    // Walk/Transit/Bike scores
    const ws = walkScore?.walkScore;
    const ts = walkScore?.transitScore;
    const bs = walkScore?.bikeScore;

    function scoreColor(s) {
      if (s >= 70) return 'green';
      if (s >= 40) return 'amber';
      return 'red';
    }

    dom.detailContent.innerHTML = `
      ${imgUrl ? `<img class="detail-hero-img" src="${imgUrl}" alt="${address}">` : '<div style="height:200px;background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;font-size:3rem;border-radius:var(--radius-lg) var(--radius-lg) 0 0;">🏠</div>'}
      <div class="detail-body">
        <div class="detail-price">${typeof price === 'string' ? price : formatFullPrice(price)}</div>
        <div class="detail-address">${address}</div>

        <div class="detail-specs">
          <div class="detail-spec">
            <span class="detail-spec-value">${beds}</span>
            <span class="detail-spec-label">Beds</span>
          </div>
          <div class="detail-spec">
            <span class="detail-spec-value">${baths}</span>
            <span class="detail-spec-label">Baths</span>
          </div>
          <div class="detail-spec">
            <span class="detail-spec-value">${typeof sqft === 'number' ? sqft.toLocaleString() : sqft}</span>
            <span class="detail-spec-label">Sq Ft</span>
          </div>
          <div class="detail-spec">
            <span class="detail-spec-value">${yearBuilt}</span>
            <span class="detail-spec-label">Year Built</span>
          </div>
          ${homeType ? `<div class="detail-spec"><span class="detail-spec-value" style="font-size:0.9rem;">${homeType}</span><span class="detail-spec-label">Type</span></div>` : ''}
        </div>

        ${zestimate ? `
          <div class="detail-section">
            <h3>💰 Zestimate</h3>
            <div class="zestimate-bar">
              <div>
                <div class="zestimate-val">${formatFullPrice(zestimate)}</div>
                <div class="zestimate-label">Zillow's estimated market value</div>
              </div>
            </div>
          </div>
        ` : ''}

        ${(ws !== undefined || ts !== undefined || bs !== undefined) ? `
          <div class="detail-section">
            <h3>🚶 Walk & Transit Scores</h3>
            <div class="score-row">
              ${ws !== undefined ? `<div class="score-badge"><span class="score-num ${scoreColor(ws)}">${ws}</span> Walk Score</div>` : ''}
              ${ts !== undefined ? `<div class="score-badge"><span class="score-num ${scoreColor(ts)}">${ts}</span> Transit</div>` : ''}
              ${bs !== undefined ? `<div class="score-badge"><span class="score-num ${scoreColor(bs)}">${bs}</span> Bike</div>` : ''}
            </div>
          </div>
        ` : ''}

        ${description ? `
          <div class="detail-section">
            <h3>📝 Description</h3>
            <p>${description}</p>
          </div>
        ` : ''}

        ${priceHistory && priceHistory.length > 0 ? `
          <div class="detail-section">
            <h3>📊 Price History</h3>
            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border-medium);">
                    <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-weight:600;">Date</th>
                    <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-weight:600;">Event</th>
                    <th style="text-align:right;padding:8px 12px;color:var(--text-muted);font-weight:600;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${priceHistory.slice(0, 10).map(h => `
                    <tr style="border-bottom:1px solid var(--border-subtle);">
                      <td style="padding:8px 12px;color:var(--text-secondary);">${h.date || '—'}</td>
                      <td style="padding:8px 12px;color:var(--text-secondary);">${h.event || '—'}</td>
                      <td style="padding:8px 12px;text-align:right;font-weight:600;">${h.price ? formatFullPrice(h.price) : '—'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } catch (err) {
    dom.detailContent.innerHTML = `
      <div style="padding:60px;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:12px;">😕</div>
        <h3>Could not load property details</h3>
        <p style="color:var(--text-secondary);margin-top:8px;">Check your API key and try again.</p>
      </div>
    `;
  }
}

function closePropertyDetail() {
  dom.detailOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════
// SEARCH FLOW
// ═══════════════════════════════════════════════
async function performSearch(query, page = 1) {
  if (!query.trim()) {
    toast('Please enter a location', 'error');
    return;
  }

  state.lastQuery = query.trim();
  state.currentPage = page;

  // Save to history
  if (!state.searchHistory.includes(state.lastQuery)) {
    state.searchHistory.unshift(state.lastQuery);
    if (state.searchHistory.length > 20) state.searchHistory.pop();
    localStorage.setItem('zillow_search_history', JSON.stringify(state.searchHistory));
  }

  // Show results section with skeletons
  dom.resultsSection.classList.remove('hidden');
  dom.emptyState.classList.add('hidden');
  dom.resultsTitle.textContent = `Searching "${state.lastQuery}"…`;
  dom.resultsCount.textContent = '';
  dom.pagination.innerHTML = '';
  renderSkeletons(6);
  dom.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  try {
    const data = await searchProperties(state.lastQuery, page);
    renderResults(data);
  } catch (err) {
    dom.resultsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">⚠️</div>
        <h3>Search Failed</h3>
        <p style="color:var(--text-secondary);margin-top:8px;">Please check your API key and try again.</p>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════
// AUTOCOMPLETE
// ═══════════════════════════════════════════════
let acTimer = null;
function setupAutocomplete() {
  dom.searchInput.addEventListener('input', () => {
    clearTimeout(acTimer);
    const q = dom.searchInput.value.trim();
    if (q.length < 2 || !state.apiKey) {
      dom.autocomplete.classList.remove('show');
      return;
    }
    acTimer = setTimeout(async () => {
      const results = await getLocationSuggestions(q);
      if (results.length === 0) {
        dom.autocomplete.classList.remove('show');
        return;
      }
      dom.autocomplete.innerHTML = '';
      results.slice(0, 6).forEach((r) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        const display = r.display || r.metaData?.city || r.name || q;
        const meta = r.metaData?.stateOrProvince || '';
        item.innerHTML = `
          <span class="ac-icon">📍</span>
          <span class="ac-label">${display}</span>
          ${meta ? `<span class="ac-meta">${meta}</span>` : ''}
        `;
        item.addEventListener('click', () => {
          dom.searchInput.value = display;
          dom.autocomplete.classList.remove('show');
          performSearch(display);
        });
        dom.autocomplete.appendChild(item);
      });
      dom.autocomplete.classList.add('show');
    }, 300);
  });

  document.addEventListener('click', (e) => {
    if (!dom.autocomplete.contains(e.target) && e.target !== dom.searchInput) {
      dom.autocomplete.classList.remove('show');
    }
  });
}

// ═══════════════════════════════════════════════
// SETTINGS MODAL
// ═══════════════════════════════════════════════
function openSettings() {
  dom.settingsOverlay.classList.add('show');
  dom.apiKeyInput.value = state.apiKey;
}
function closeSettings() {
  dom.settingsOverlay.classList.remove('show');
}

function setupSettings() {
  dom.btnSettings.addEventListener('click', openSettings);
  dom.btnSettingsClose.addEventListener('click', closeSettings);
  dom.settingsOverlay.addEventListener('click', (e) => {
    if (e.target === dom.settingsOverlay) closeSettings();
  });

  dom.btnToggleKey.addEventListener('click', () => {
    const inp = dom.apiKeyInput;
    if (inp.type === 'password') {
      inp.type = 'text';
      dom.btnToggleKey.textContent = 'Hide';
    } else {
      inp.type = 'password';
      dom.btnToggleKey.textContent = 'Show';
    }
  });

  dom.btnSaveKey.addEventListener('click', () => {
    const key = dom.apiKeyInput.value.trim();
    if (!key) {
      dom.keyStatus.textContent = 'Please enter a valid key';
      dom.keyStatus.className = 'key-status error';
      return;
    }
    state.apiKey = key;
    localStorage.setItem('zillow_rapidapi_key', key);
    dom.keyStatus.textContent = '✓ Key saved successfully';
    dom.keyStatus.className = 'key-status success';
    toast('API key saved!', 'success');
    setTimeout(closeSettings, 800);
  });

  // Auto-open if no key
  if (!state.apiKey) {
    setTimeout(openSettings, 600);
  }
}

// ═══════════════════════════════════════════════
// CHAT AGENT
// ═══════════════════════════════════════════════
function toggleChat() {
  state.chatOpen = !state.chatOpen;
  dom.chatPanel.classList.toggle('open', state.chatOpen);
}

function addChatMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
  dom.chatMessages.appendChild(msg);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

// Simple NLP parser for property queries
function parseChatQuery(text) {
  const lower = text.toLowerCase();
  const params = {};

  // Status type
  if (/\brent(al|s|ing)?\b/.test(lower)) params.statusType = 'ForRent';
  else if (/\b(sold|recent(ly)?\s*sold)\b/.test(lower)) params.statusType = 'RecentlySold';
  else params.statusType = 'ForSale';

  // Price
  const priceMatch = lower.match(/under\s*\$?([\d,.]+)\s*(k|m|million|thousand)?/i);
  if (priceMatch) {
    let val = parseFloat(priceMatch[1].replace(/,/g, ''));
    if (priceMatch[2] === 'k' || priceMatch[2] === 'thousand') val *= 1000;
    if (priceMatch[2] === 'm' || priceMatch[2] === 'million') val *= 1000000;
    params.maxPrice = val;
  }

  const priceAbove = lower.match(/(?:above|over|more than)\s*\$?([\d,.]+)\s*(k|m|million|thousand)?/i);
  if (priceAbove) {
    let val = parseFloat(priceAbove[1].replace(/,/g, ''));
    if (priceAbove[2] === 'k' || priceAbove[2] === 'thousand') val *= 1000;
    if (priceAbove[2] === 'm' || priceAbove[2] === 'million') val *= 1000000;
    params.minPrice = val;
  }

  // Rent price (/mo)
  const rentMatch = lower.match(/under\s*\$?([\d,.]+)\s*(?:\/\s*mo|per\s*month|monthly)/i);
  if (rentMatch) {
    params.rentMaxPrice = parseFloat(rentMatch[1].replace(/,/g, ''));
    params.statusType = 'ForRent';
  }

  // Beds
  const bedMatch = lower.match(/(\d+)\s*(?:-?\s*)?bed(room)?s?/i);
  if (bedMatch) params.bedsMin = parseInt(bedMatch[1]);

  // Baths
  const bathMatch = lower.match(/(\d+)\s*(?:-?\s*)?bath(room)?s?/i);
  if (bathMatch) params.bathsMin = parseInt(bathMatch[1]);

  // Location — take what's left after removing known patterns
  let location = text
    .replace(/\b(find|search|show|get|look for|looking for|me|please|can you|i want|i need)\b/gi, '')
    .replace(/\b(houses?|homes?|condos?|apartments?|townhomes?|properties|property|listings?|places?)\b/gi, '')
    .replace(/\b(for sale|for rent|recently sold|rentals?|rental)\b/gi, '')
    .replace(/under\s*\$?[\d,.]+\s*(k|m|million|thousand)?\s*(\/\s*mo|per\s*month|monthly)?/gi, '')
    .replace(/(above|over|more than)\s*\$?[\d,.]+\s*(k|m|million|thousand)?/gi, '')
    .replace(/\d+\s*-?\s*bed(room)?s?/gi, '')
    .replace(/\d+\s*-?\s*bath(room)?s?/gi, '')
    .replace(/\b(in|near|around|at)\b/gi, '')
    .replace(/[,.\s]+/g, ' ')
    .trim();

  if (location.length > 1) params.location = location;

  return params;
}

async function handleChatMessage(text) {
  if (!text.trim()) return;
  addChatMessage(text, 'user');
  dom.chatInput.value = '';

  const parsed = parseChatQuery(text);

  if (!parsed.location) {
    addChatMessage("I couldn't figure out the location. Could you specify a city, state, or ZIP? For example: <em>\"3-bed houses under $400k in Austin, TX\"</em>");
    return;
  }

  addChatMessage(`🔍 Searching for properties in <strong>${parsed.location}</strong>…`);

  // Update main UI state
  state.statusType = parsed.statusType || 'ForSale';
  state.lastQuery = parsed.location;

  // Update pills
  dom.filterPills.forEach((p) => {
    p.classList.toggle('active', p.dataset.status === state.statusType);
  });
  dom.searchInput.value = parsed.location;

  try {
    const apiParams = {
      location: parsed.location,
      status_type: parsed.statusType,
      sort: 'Newest',
      home_type: 'Houses,Apartments,Condos,Townhomes',
      page: 1,
    };
    if (parsed.maxPrice) apiParams.maxPrice = parsed.maxPrice;
    if (parsed.minPrice) apiParams.minPrice = parsed.minPrice;
    if (parsed.rentMaxPrice) apiParams.rentMaxPrice = parsed.rentMaxPrice;
    if (parsed.bedsMin) apiParams.bedsMin = parsed.bedsMin;
    if (parsed.bathsMin) apiParams.bathsMin = parsed.bathsMin;

    const data = await apiFetch('propertyExtendedSearch', apiParams);
    const props = data.props || data.results || [];
    const total = data.totalResultCount || props.length;

    if (props.length === 0) {
      addChatMessage("No properties matched that search. Try broadening your criteria or checking the location name.");
    } else {
      const top3 = props.slice(0, 3);
      let response = `Found <strong>${total.toLocaleString()}</strong> properties! Here are the top results:<br><br>`;
      top3.forEach((p, i) => {
        const price = p.price || p.listPrice || 'N/A';
        const addr = p.address || p.streetAddress || 'Address unavailable';
        const beds = p.bedrooms ?? p.beds ?? '?';
        const baths = p.bathrooms ?? p.baths ?? '?';
        response += `<strong>${i + 1}.</strong> ${typeof price === 'string' ? price : formatFullPrice(price)} — ${beds} bd, ${baths} ba<br><em>${addr}</em><br><br>`;
      });
      response += `I've loaded all results in the main view. Scroll down to explore! 👇`;
      addChatMessage(response);

      // Render in main grid
      renderResults(data);
    }
  } catch (err) {
    addChatMessage("Something went wrong with the search. Please check your API key and try again.");
  }
}

function setupChat() {
  dom.btnChatToggle.addEventListener('click', toggleChat);
  dom.btnChatClose.addEventListener('click', toggleChat);

  dom.btnChatSend.addEventListener('click', () => handleChatMessage(dom.chatInput.value));
  dom.chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatMessage(dom.chatInput.value);
  });
}

// ═══════════════════════════════════════════════
// EVENT LISTENERS & INIT
// ═══════════════════════════════════════════════
function setupSearch() {
  dom.btnSearch.addEventListener('click', () => {
    dom.autocomplete.classList.remove('show');
    performSearch(dom.searchInput.value);
  });
  dom.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      dom.autocomplete.classList.remove('show');
      performSearch(dom.searchInput.value);
    }
  });
}

function setupFilters() {
  dom.filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      dom.filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      state.statusType = pill.dataset.status;
      if (state.lastQuery) performSearch(state.lastQuery);
    });
  });
}

function setupSort() {
  dom.sortSelect.addEventListener('change', () => {
    state.currentSort = dom.sortSelect.value;
    if (state.lastQuery) performSearch(state.lastQuery);
  });
}

function setupDetailModal() {
  dom.btnDetailClose.addEventListener('click', closePropertyDetail);
  dom.detailOverlay.addEventListener('click', (e) => {
    if (e.target === dom.detailOverlay) closePropertyDetail();
  });
}

// ─── Init ───
function init() {
  setupSettings();
  setupSearch();
  setupAutocomplete();
  setupFilters();
  setupSort();
  setupDetailModal();
  setupChat();
}

document.addEventListener('DOMContentLoaded', init);
