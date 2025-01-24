class MainController {
    constructor() {
        this.setupGlobalLogic();
        this.setupEventListeners();
    }

    // Global logic like favicon, shared styles, etc.
    setupGlobalLogic() {
        this.setFavicon('../imgs/favicon.ico');
        console.log('Global logic initialized.');
    }

    // Dynamically set favicon
    setFavicon(iconPath) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = iconPath;
    }

    // Add event listeners for navigation buttons
    setupEventListeners() {
        const homeButton = document.getElementById('homeButton');
        const aboutButton = document.getElementById('aboutButton');
        const contactButton = document.getElementById('contactButton');

        if (homeButton) {
            homeButton.addEventListener('click', () => {
                this.navigateTo('home.html');
            });
        }

        if (aboutButton) {
            aboutButton.addEventListener('click', () => {
                this.navigateTo('about.html');
            });
        }

        if (contactButton) {
            contactButton.addEventListener('click', () => {
                this.navigateTo('contact.html');
            });
        }
    }

    // Centralized navigation logic
    navigateTo(page) {
        // Perform any pre-navigation logic
        console.log(`Navigating to ${page}`);
        window.location.href = page;
    }
}

// Initialize the MainController when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MainController();
});