'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const counterStorage = {
    get: (cb: (enable: boolean) => void) => {
      chrome.storage.sync.get(['keyPressLoggerEnable'], (result) => {
        cb(result.keyPressLoggerEnable);
      });
    },
    set: (enable: boolean, cb: () => void) => {
      chrome.storage.sync.set(
        {
          keyPressLoggerEnable: enable,
        },
        () => {
          cb();
        }
      );
    },
  };

  const setupSwitch = () => {
    document.getElementById('enable-switch')!.addEventListener('change', () => {
      toggleSwitch();
    });
  }

  const toggleSwitch = () => {
    counterStorage.get((enable) => {
      counterStorage.set(!enable, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];

          chrome.tabs.sendMessage(
            tab.id!,
            {
              type: 'TOGGLE',
              payload: { enable: !enable },
            }
          );
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupSwitch);
})();
