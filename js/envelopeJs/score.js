const API_BASE_URL = "https://114a8708-e189-4e40-be62-f8e4db9ea3e2-00-dwf2ql6e9ran.pike.replit.dev"; // Change this to your API server

// Fetch all scores
async function getScores() {
  try {
    const response = await fetch(`${API_BASE_URL}/scores`);
    const scores = await response.json();
    updateScoreboard(scores); // Update the scoreboard table
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
      appendScoreToScoreboard(newScore); // Add the new score to the scoreboard table
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
    const scoreboardBody = document.querySelector("#scoreboard tbody");
    scoreboardBody.innerHTML = "";
  } catch (error) {
    console.error("Failed to clear scores:", error);
  }
}

// Update the scoreboard table
function updateScoreboard(scores) {
  const scoreboardBody = document.querySelector("#scoreboard tbody");
  scoreboardBody.innerHTML = ""; // Clear existing rows

  scores.forEach((score) => {
    appendScoreToScoreboard(score);
  });
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