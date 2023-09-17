chrome.action.onClicked.addListener(_ => {
  chrome.storage.sync.get({enabled: false}).then(items => {
    chrome.storage.sync.set({enabled: !items.enabled});
  });
})

function setTitle(enabled) {
  let action = 'Enable';
  if (enabled) {
    action = 'Disable';
  }

  chrome.action.setTitle({title: `${action} Mindfulsurf`});
}

chrome.storage.sync.onChanged.addListener(changes => {
  if (changes.enabled === undefined) {
    return;
  }

  setTitle(changes.enabled.newValue);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({enabled: false}).then(items => {
    setTitle(items.enabled);
  });
});
