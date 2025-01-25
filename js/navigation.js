
const optionsButton = document.querySelector(".options-button");
const optionsDropdown = document.querySelector(".options-dropdown");


optionsButton.addEventListener("click", () => {
  optionsDropdown.style.display =
    optionsDropdown.style.display === "block" ? "none" : "block";
});


document.addEventListener("click", (event) => {
  if (!event.target.closest(".options-menu")) {
    optionsDropdown.style.display = "none";
  }
});

// Option click handlers
document.getElementById("luckySpinOption").addEventListener("click", () => {
  window.location.href = "pages/luckySpin.html"; // Redirect to the Lucky Spin page
});

document.getElementById("redEnvelope").addEventListener("click", () => {
  window.location.href = "pages/envelope.html"; // Redirect to the New Year Message page
});

document.getElementById("settingsOption").addEventListener("click", () => {
  window.location.href = "#"; // Redirect to the Settings page
});

document.getElementById("fireWork").addEventListener("click", () => {
  window.location.href = "pages/fireWork.html"; // Redirect to the Fire Work page
});
