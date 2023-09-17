function sleep(ms) {
  const start = performance.now();
  while (performance.now() - start < ms);
}

function siteMatch(str) {
  if (str === '') return false;

  const match = str.replace('.', '\\.');
  const regex = new RegExp(match, 'i');
  return location.host.test(regex);
}

function main(config) {
  if (!config.enabled) return;
  if (!config.sites.some(siteMatch)) return;

  sleep(config.delay * 1000);
}

chrome.storage.sync.get({
  enabled: false,
  delay: 3,
  sites: [],
}, main);

