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

display();

const playForm = document.getElementById("play-form");

playForm.addEventListener("change", function (event) {
  event.preventDefault();
  makeBet();
  display();
});

playForm.addEventListener("submit", function (event) {
  event.preventDefault();

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
