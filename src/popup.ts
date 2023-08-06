'use strict';

import './popup.css';
import { keyPressLoggerStorage } from './storage';

(function () {
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
