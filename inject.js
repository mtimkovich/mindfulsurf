function sleep(ms) {
  const start = performance.now();
  while (performance.now() - start < ms);
}

function siteMatch(str) {
  if (str === '') return false;

  let match = str.replace('.', '\\.');
  const regex = new RegExp(match, 'i');
  return location.host.match(regex) !== null;
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

