'use strict';

import Toastify from 'toastify-js';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//   {
//     type: 'GREETINGS',
//     payload: {
//       message: 'Hello, my name is Con. I am from ContentScript.',
//     },
//   },
//   (response) => {
//     console.log(response.message);
//   }
// );

const getKey = (e: KeyboardEvent) => {
  let key = e.code
  if (key.includes('Digit')) {
    key = key.replace('Digit', '')
  } else if (key.includes('Key')) {
    key = key.replace('Key', '').toLowerCase()
  } else if (key === 'Backquote') {
    key = '`'
  } else if (key === 'Minus') {
    key = '-'
  } else if (key === 'Equal') {
    key = '='
  } else if (key === 'Backslash') {
    key = '\\'
  } else if (key === 'BracketRight') {
    key = ']'
  } else if (key === 'BracketLeft') {
    key = '['
  } else if (key === 'Quote') {
    key = '\''
  } else if (key === 'Semicolon') {
    key = ';'
  } else if (key === 'Slash') {
    key = '/'
  } else if (key === 'Period') {
    key = '.'
  } else if (key === 'Comma') {
    key = ','
  } else if (key === 'ArrowUp') {
    key = '↑'
  } else if (key === 'ArrowDown') {
    key = '↓'
  } else if (key === 'ArrowLeft') {
    key = '←'
  } else if (key === 'ArrowRight') {
    key = '→'
  }

  if (e.ctrlKey) {
    return (e.key === 'Control')
      ? 'Ctrl'
      : `Ctrl + ${key}`;
  }
  if (e.altKey) {
    return (e.key === 'Alt')
      ? 'Alt'
      : `Alt + ${key}`;
  }
  if (e.shiftKey) {
    return (e.key === 'Shift')
      ? 'Shift'
      : `Shift + ${key}`;
  }
  if (e.metaKey) {
    return (e.key === 'Meta')
      ? 'Meta'
      : `Meta + ${key}`;
  }

  return `${key}`
}

const onKeyPress = (e: KeyboardEvent) => {
  Toastify({
    text: getKey(e),
    duration: '2000',
    gravity: 'bottom',
    position: 'right',
    style: {
      background: "#eff3f6",
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      borderRadius: '8px',
      color: 'black',
      fontWeight: 'bold',
      width: 'fit-content',
    }
  }).showToast();
}

async function init() {
  document.addEventListener('keydown', onKeyPress);

  const toastifyCss = document.createElement('link');
    toastifyCss.rel = 'stylesheet';
    toastifyCss.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
    document.head.appendChild(toastifyCss);
}

init();
