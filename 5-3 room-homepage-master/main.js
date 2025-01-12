const nav = document.getElementById("nav");
const hamburgerButton = document.getElementById("hamburger-button");
const closeButton = document.getElementById("close-button");

function toggleSideNav() {
    nav.classList.toggle("show-side-nav");
}
function closeSideNavByClickOutside(e) {
    if (e.target === this) {
        nav.classList.remove("show-side-nav");
    } 
}

hamburgerButton.addEventListener("click", toggleSideNav);
closeButton.addEventListener("click", toggleSideNav);
nav.addEventListener("click", closeSideNavByClickOutside);