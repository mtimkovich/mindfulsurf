function disableFields(checked) {
  const delay = document.getElementById('delay');
  const sites = document.getElementById('sites');

  delay.disabled = !checked;
  sites.disabled = !checked;
}

// Saves options to chrome.storage.
function save_options() {
  const enabled = document.getElementById('enabled').checked;
  const delay = document.getElementById('delay').value;
  const sites = document.getElementById('sites').value.split('\n');

  chrome.storage.sync.set({
    enabled,
    delay,
    sites,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    enabled: false,
    delay: 3,
    sites: [],
  }, config => {
    document.getElementById('enabled').checked = config.enabled;
    document.getElementById('delay').value = config.delay;
    document.getElementById('sites').value = config.sites.join('\n');

    disableFields(config.enabled);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('enabled').addEventListener('change', e => {
  disableFields(e.target.checked);
});

