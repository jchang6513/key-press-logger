export const keyPressLoggerStorage = {
  get: (cb: (enable: boolean) => void) => {
    chrome.storage.sync.get(['keyPressLoggerEnable'], (result) => {
      cb(result.keyPressLoggerEnable);
    });
  },
  set: (enable: boolean, cb: (eb: boolean) => void) => {
    chrome.storage.sync.set(
      { keyPressLoggerEnable: enable },
      () => cb(enable),
    );
  },
};
