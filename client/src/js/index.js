const { Workbox } = require('workbox-window');
const Editor = require('./editor.js');
require('./database.js');
require('../css/style.css');

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const initializeEditor = async () => {
  try {
    const editor =  new Editor();
    if (typeof editor === 'undefined') {
      loadSpinner();
    }
  } catch (error) {
    console.error('There was an error initializing the editor');
    throw error;
  }
};

const registerServiceWorker = async () => {
  try {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      // register workbox service worker
      const workboxSW = new Workbox('./src-sw.js');
      await workboxSW.register();
    } else {
      console.error('Service workers are not supported in this browser.');
    }
  } catch (error) {
    console.error('There was an error registering the service worker');
    throw error;
  }
};

const initializeApp = async () => {
  try {
    await initializeEditor();
    await registerServiceWorker();
  } catch (error) {
    console.error('There was an error initializing the app');
    throw error;
  }
};

initializeApp();
