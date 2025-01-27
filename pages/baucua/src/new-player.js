import sessionStorage from './utils/session-storage.js';

const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formDaddy = new FormData(profileForm);
    const player = {
        name: formDaddy.get('name'),
        id: Date.now(),
        totalMoney: formDaddy.get('start-money'),
    };
    sessionStorage.store('currentPlayer', player);
    window.location = './play.html';
});