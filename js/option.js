// Get the button and dropdown menu elements
const optionsButton = document.querySelector('.options-button');
const optionsDropdown = document.querySelector('.options-dropdown');

// Toggle the dropdown visibility when the options button is clicked
optionsButton.addEventListener('click', () => {
    optionsDropdown.style.display = optionsDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if clicking outside of it
document.addEventListener('click', (event) => {
    if (!event.target.closest('.options-menu')) {
        optionsDropdown.style.display = 'none';
    }
});

// Option click handlers
document.getElementById('luckySpinOption').addEventListener('click', () => {
    window.location.href = 'luckySpin.html'; // Redirect to the Lucky Spin page
});

document.getElementById('newYearMessageOption').addEventListener('click', () => {
    window.location.href = 'showMessage.html'; // Redirect to the New Year Message page
});

document.getElementById('settingsOption').addEventListener('click', () => {
    window.location.href = 'settings.html'; // Redirect to the Settings page
});

document.getElementById('fireWork').addEventListener('click', () => {
    window.location.href = 'fireWork.html'; // Redirect to the Fire Work page
});
