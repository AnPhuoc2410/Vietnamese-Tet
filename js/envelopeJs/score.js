const API_BASE_URL = "https://azure-ambiguous-fairy.glitch.me";
const ITEMS_PER_PAGE = 5; // Number of items per page
let currentPage = 1;
let scores = [];

// Fetch all scores
async function getScores() {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`);
    scores = await response.json();
    updateScoreboard(); // Update the scoreboard table
  } catch (error) {
    console.error("Failed to fetch scores:", error);
  }
}

// Add a new score
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
      updateScoreboard(); // Add the new score to the scoreboard table
    }
  } catch (error) {
    console.error("Failed to add score:", error);
  }
}

// Clear all scores
async function clearScores() {
  try {
    await fetch(`${API_BASE_URL}/scores`, {
      method: "DELETE",
    });

    // Clear the scoreboard table in the UI
    scores = [];
    updateScoreboard();
  } catch (error) {
    console.error("Failed to clear scores:", error);
  }
}

// Update the scoreboard table
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

// Append a single score to the scoreboard table
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

// Format reward value
function formatReward(reward) {
  if (reward >= 1000) {
    return `${reward / 1000}K`;
  }else if(reward == 0){
    return 'Nit';
  }
  return reward.toString();
}

// Update pagination controls
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

// Initialize the scoreboard on page load
document.addEventListener("DOMContentLoaded", () => {
  getScores(); // Fetch and display existing scores

  // Handle form submission
  const scoreForm = document.getElementById("scoreForm");
  scoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const reward = document.getElementById("modalMessage").getAttribute('data-reward');
    await addScore(userName, parseInt(reward));
    scoreForm.reset(); // Clear the form
  });
});