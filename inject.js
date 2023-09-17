function sleep(ms) {
  const start = performance.now();
  while (performance.now() - start < ms);
}

function glob(str) {
  let match = str.replace('.', '\\.');
  return new RegExp(match, 'i');
}

function isAffected(sites) {
  for (const site of sites) {
    if (site.length === 0) continue;

    const regex = glob(site)
    if (location.host.match(regex) !== null) return true;
  }

  return false;
}

function main(config) {
  if (!config.enabled) return;
  if (!isAffected(config.sites)) return;

  sleep(config.delay * 1000);
}

chrome.storage.sync.get({
  enabled: false,
  delay: 3,
  sites: [],
}, main);

