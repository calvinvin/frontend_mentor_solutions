const hamburberButton = document.getElementById("header__hamburger-button");
const closeButton = document.getElementById("header__close-button");
const divHeaderTopWrapper = document.getElementById("header__top-wrapper");
function toggleSideNav() {
    divHeaderTopWrapper.classList.toggle("show-side-nav");
}
hamburberButton.addEventListener("click", toggleSideNav);
closeButton.addEventListener("click", toggleSideNav);