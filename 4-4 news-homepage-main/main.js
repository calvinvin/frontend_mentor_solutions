const openSideNavButton = document.getElementById("hamburger-icon");
const closeSideNavButton = document.getElementById("close-icon");
const primaryNavigation = document.getElementById("primary-navigation");
const outsideOfSideNav = document.getElementById("background-blurrer");

function toggleSideNav() {
    primaryNavigation.classList.toggle("show-side-nav");
}

openSideNavButton.addEventListener("click", toggleSideNav);
closeSideNavButton.addEventListener("click", toggleSideNav);
outsideOfSideNav.addEventListener("click", toggleSideNav);