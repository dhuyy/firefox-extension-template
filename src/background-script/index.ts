browser.runtime.onInstalled.addListener(async () => {
  const platformInfo = await browser.runtime.getPlatformInfo();

  browser.storage.local.set({ currentOS: platformInfo.os }).catch(error => {
    console.error(error);
  });
});
