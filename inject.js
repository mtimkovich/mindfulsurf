function wait(ms) {
  const start = performance.now();
  while (performance.now() - start < ms);
}

function isAffected(sites) {
  for (const site of sites) {
    if (site.length === 0) {
      continue;
    }

    let match = site.replace('.', '\\.');
    match = match.replace('*', '.*');
    const regex = new RegExp(match, 'i');

    if (location.href.match(regex) !== null) {
      return true;
    }
  }

  return false;
}

function main(config) {
  if (!config.enabled) {
    return;
  }

  // Don't mess with chrome:// urls.
  if (location.href.startsWith('chrome://')) {
    return;
  }

  if (!isAffected(config.sites)) {
    return;
  }

  wait(config.delay * 1000);
}

chrome.storage.sync.get({
  enabled: false,
  delay: 3,
  sites: [],
}, main);

