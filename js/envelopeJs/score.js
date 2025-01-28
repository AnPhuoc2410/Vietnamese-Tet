const API_BASE_URL = "https://azure-ambiguous-fairy.glitch.me";
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let scores = [];

async function fetchFromAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
}

async function getScores() {
  try {
    scores = await fetchFromAPI('/scores');
    console.log("Fetched scores:", scores);
    updateScoreboard();
  } catch (error) {
    console.error("Failed to fetch scores:", error);
  }
}

async function addScore(userName, reward) {
  try {
    const response = await fetchFromAPI('/scores', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, reward }),
    });
    console.log("Added score:", response);
    await getScores(); // Fetch scores again to update the scoreboard
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
  scoreboardBody.innerHTML = ""; 
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

  if (!scoreboardBody) {
    console.error("Scoreboard table body not found!");
    return;
  }

  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = score.userName || "Anonymous";

  const rewardCell = document.createElement("td");
  rewardCell.textContent = formatReward(score.reward || 0);

  row.appendChild(nameCell);
  row.appendChild(rewardCell);
  scoreboardBody.appendChild(row);
}

function formatReward(reward) {
  if (reward >= 1000) {
    return `${reward / 1000}K`;
  } else if (reward == 0) {
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
    pageButton.classList.add("page-button");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.onclick = () => {
      currentPage = i;
      updateScoreboard();
    };

    pagination.appendChild(pageButton);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const scoreForm = document.getElementById("scoreForm");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const submitButton = scoreForm.querySelector("button[type='submit']");

  async function showLoadingIndicator() {
    loadingIndicator.style.display = "block";
  }

  async function hideLoadingIndicator() {
    loadingIndicator.style.display = "none";
  }

  async function getScoresWithLoading() {
    showLoadingIndicator();
    await getScores();
    hideLoadingIndicator();
  }

  async function addScoreWithLoading(userName, reward) {
    submitButton.disabled = true;
    await addScore(userName, reward);
    submitButton.disabled = false;
  }

  getScoresWithLoading();

  scoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = document.getElementById("name").value;
    const reward = document.getElementById("modalMessage").getAttribute("data-reward");

    await addScoreWithLoading(userName, parseInt(reward));
    scoreForm.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById("envelopeModal"));
    if (modal) modal.hide();
  });
});