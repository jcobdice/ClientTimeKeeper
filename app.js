import * as clientManager from './js/clientManager.js';
import { timer, setTimesOnCard } from './js/timer.js';

window.addEventListener('load', () => {
    registerServiceWorker();
});

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('../serviceWorker.js');
        }   catch (e) {
        console.log(`Service worker failed to register`);
        }
    }
}

let deferredPrompt;
let addApp = document.querySelector('#addApp');
addApp.style.display = 'none';

let btnAdd = document.querySelector('.add');
let btnCancel = document.querySelector('.cancel');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  console.log(`up`);
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  addApp.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addApp.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });

btnCancel.addEventListener('click', (e) => {
    addApp.style.display = 'none';
});