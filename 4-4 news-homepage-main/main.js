const openSideNavButton = document.getElementById("hamburger-icon");
const closeSideNavButton = document.getElementById("close-icon");
const primaryNavigation = document.getElementById("primary-navigation");

function toggleSideNav() {
    primaryNavigation.classList.toggle("show-side-nav");
}

openSideNavButton.addEventListener("click", toggleSideNav);
closeSideNavButton.addEventListener("click", toggleSideNav);