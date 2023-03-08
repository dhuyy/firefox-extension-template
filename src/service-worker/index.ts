chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.getPlatformInfo(platformInfo => {
    chrome.storage.local.set({ currentOS: platformInfo.os }).catch(error => {
      console.error(error);
    });
  });

  // https://stackoverflow.com/a/56483156
  return true;
});
