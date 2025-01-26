const API_BASE_URL = "https://azure-ambiguous-fairy.glitch.me";
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let scores = [];


async function getScores() {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`);
    scores = await response.json();
    updateScoreboard();
  } catch (error) {
    console.error("Failed to fetch scores:", error);
  }
}


async function addScore(userName, reward) {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, reward }),
    });

    if (response.ok) {
      const newScore = await response.json();
      scores.push(newScore);
      updateScoreboard(); 
    }
  } catch (error) {
    console.error("Failed to add score:", error);
  }
}


async function clearScores() {
  try {
    await fetch(`${API_BASE_URL}/scores`, {
      method: "DELETE",
    });

    scores = [];
    updateScoreboard();
  } catch (error) {
    console.error("Failed to clear scores:", error);
  }
}

function updateScoreboard() {
  const scoreboardBody = document.querySelector("#scoreboard tbody");
  scoreboardBody.innerHTML = ""; // Clear existing rows

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedScores = scores.slice(start, end);

  paginatedScores.forEach((score) => {
    appendScoreToScoreboard(score);
  });

  updatePagination();
}

function appendScoreToScoreboard(score) {
  const scoreboardBody = document.querySelector("#scoreboard tbody");
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = score.userName;

  const rewardCell = document.createElement("td");
  rewardCell.textContent = formatReward(score.reward);

  row.appendChild(nameCell);
  row.appendChild(rewardCell);
  scoreboardBody.appendChild(row);
}

function formatReward(reward) {
  if (reward >= 1000) {
    return `${reward / 1000}K`;
  }else if(reward == 0){
    return 'Nit';
  }
  return reward.toString();
}

function updatePagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(scores.length / ITEMS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.toggle("disabled", i === currentPage);
    pageButton.onclick = () => {
      currentPage = i;
      updateScoreboard();
    };
    pagination.appendChild(pageButton);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getScores(); 

  const scoreForm = document.getElementById("scoreForm");
  scoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const reward = document.getElementById("modalMessage").getAttribute('data-reward');
    await addScore(userName, parseInt(reward));
    scoreForm.reset(); // Clear the form
  });
});