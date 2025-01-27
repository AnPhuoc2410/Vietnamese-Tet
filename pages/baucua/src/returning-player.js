import sessionStorage from './utils/session-storage.js';
import localStorage from './utils/local-storage.js';

const tbody = document.getElementById('tbody');

const playerList = localStorage.get('playerList');

playerList.forEach(function(player) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdMoney = document.createElement('td');
    tdName.textContent = player.name;
    tdMoney.textContent = player.totalMoney;
    tr.appendChild(tdName);
    tr.appendChild(tdMoney);
    tbody.appendChild(tr);

    tr.addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.store('currentPlayer', player);
        window.location = './play.html';
    });
});