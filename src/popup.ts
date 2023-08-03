'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const keyPressLoggerStorage = {
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

  const setupSwitch = (enable: boolean) => {
    const node = document.getElementById('enable-switch') as HTMLInputElement;
    if (node) {
      node.checked = enable
      node.addEventListener('change', () => {
        toggleSwitch();
      });
    }
  }

  const sendToggleMessage = (enable: boolean) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id!,
        {
          type: 'TOGGLE',
          payload: { enable },
        }
      );
    });
  }

  const toggleSwitch = () => {
    keyPressLoggerStorage.get((enable) => {
      keyPressLoggerStorage.set(!enable, sendToggleMessage);
    });
  }

  function restoreSwitch() {
    // Restore count value
    keyPressLoggerStorage.get((enable) => {
      if (typeof enable === 'undefined') {
        // Set counter value as 0
        keyPressLoggerStorage.set(false, (eb) => {
          sendToggleMessage(eb);
          setupSwitch(false);
        });
      } else {
        setupSwitch(enable);
        sendToggleMessage(enable);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreSwitch);
})();
