import sessionStorage from "./utils/session-storage.js";
import localStorage from "./utils/local-storage.js";

const animalArr = ["deer", "gourd", "chicken", "fish", "crab", "shrimp"];
const currentPlayer = sessionStorage.get("currentPlayer");
const player = {
  name: currentPlayer.name,
  id: currentPlayer.id,
  totalMoney: currentPlayer.totalMoney,
  bets: currentPlayer.bets
    ? currentPlayer.bets
    : animalArr.reduce((animalBetsObj, animal) => {
        animalBetsObj[animal] = "";
        return animalBetsObj;
      }, {}),
  get totalBet() {
    return Object.values(this.bets)
      .map(Number)
      .reduce((total, bet) => {
        return total + bet;
      });
  },
  get currentMoney() {
    return this.totalMoney - this.totalBet;
  },
};

// Add countdown overlay to HTML
const countdownOverlay = document.createElement("div");
countdownOverlay.innerHTML = `
  <div id="countdown-overlay" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-red-800 p-8 rounded-lg text-center">
      <div id="countdown" class="text-6xl font-bold text-yellow-500 mb-4">3</div>
      <div class="text-white text-xl">Đang lắc xúc xắc...</div>
    </div>
  </div>
`;
document.body.appendChild(countdownOverlay);

function startCountdown() {
  const overlay = document.getElementById("countdown-overlay");
  const countdownEl = document.getElementById("countdown");
  let count = 3;

  overlay.classList.remove("hidden");

  const countdownInterval = setInterval(() => {
    count--;
    countdownEl.textContent = count;

    if (count === 0) {
      clearInterval(countdownInterval);
      setTimeout(() => {
        overlay.classList.add("hidden");
        revealResults();
      }, 1000);
    }
  }, 1000);
}

function revealResults() {
  const rollResults = ["", "", ""].map(rollDice);
  rollResults.forEach(function (animal, i) {
    const diceEl = document.getElementById("dice-" + i);
    diceEl.src = "./assets/" + animal + ".jpg";
    win(animal);
  });
  rollResults.forEach(function (animal) {
    player.bets[animal] = "";
  });
  lose();
  display();
}

display();

const playForm = document.getElementById("play-form");

playForm.addEventListener("change", function (event) {
  event.preventDefault();
  makeBet();
  display();
});

playForm.addEventListener("submit", function (event) {
  event.preventDefault();
  startCountdown(); // Start countdown instead of immediately showing results
});

const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.store("playerList", player);
  window.location = "./baucua.html";
});

function display() {
  document.getElementById("player-name-display").textContent = player.name;
  document.getElementById("current-money-display").textContent =
    player.currentMoney;
  document.getElementById("total-bet-display").textContent = player.totalBet;
  for (let i = 0; i < animalArr.length; i++) {
    document.getElementById(animalArr[i] + "-bet").value =
      player.bets[animalArr[i]];
  }
}

function makeBet() {
  const formDaddy = new FormData(playForm);
  const totalBetArr = formDaddy.getAll("bet");
  for (let i = 0; i < totalBetArr.length; i++) {
    player.bets[animalArr[i]] = totalBetArr[i];
  }
}

function rollDice() {
  const result = Math.floor(Math.random() * animalArr.length);
  return animalArr[result];
}

function win(animal) {
  player.totalMoney = Number(player.totalMoney) + Number(player.bets[animal]);
}

function lose() {
  animalArr.forEach(function (animal) {
    player.totalMoney = Number(player.totalMoney) - Number(player.bets[animal]);
    player.bets[animal] = "";
  });
}
