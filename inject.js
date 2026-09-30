const MESSAGES = [
  'Dear friend, please enjoy three in and out-breaths while the page loads.',
  'Breathing in, I have arrived.\nBreathing out, I am home.',
  'Breathing in, I choose this moment.\nBreathing out, I choose the next.',
  'Breathing in, there is nowhere else to go.\nBreathing out, there is nothing else to do.',
  'Breathing in, I stop.\nBreathing out, I come back to myself.',
  'Take three breaths. The page will wait.',
  'Pause. Breathe. Smile.',
  'In, out. Deep, slow.',
  'Present moment, wonderful moment.',
  'Listen, listen. This pause brings me back to my true home.',
];

function delay(ms) {
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:2147483647;background:#fff;' +
    'display:flex;align-items:center;justify-content:center;' +
    'box-sizing:border-box;padding:2em;text-align:center;white-space:pre-line;' +
    'font:24px/1.4 "Cormorant Garamond", serif;color:#9a9a9a';
  overlay.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  const attach = () => {
    if (!overlay.isConnected) document.documentElement.appendChild(overlay);
  };
  attach();

  // Re-attach if the page rewrites the DOM out from under us.
  const observer = new MutationObserver(attach);
  observer.observe(document, {childList: true, subtree: true});

  setTimeout(() => {
    observer.disconnect();
    overlay.remove();
  }, ms);
}

function siteMatch(str) {
  // Accept bare domains as well as pasted URLs.
  const site = str.trim().toLowerCase()
    .replace(/^[a-z]+:\/\//, '')
    .replace(/[\/?#].*$/, '');
  if (site === '') return false;

  const host = location.hostname.toLowerCase();
  return host === site || host.endsWith('.' + site);
}

function main(config) {
  if (!config.enabled) return;
  if (!config.sites.some(siteMatch)) return;

  delay(config.delay * 1000);
}

chrome.storage.sync.get({
  enabled: false,
  delay: 3,
  sites: [],
}, main);

