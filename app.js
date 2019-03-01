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