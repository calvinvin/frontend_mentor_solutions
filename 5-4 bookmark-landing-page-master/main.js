// toggle side nav
const hamburgerButton = document.getElementById("header__hamburger-button");
const closeButton = document.getElementById("header__nav-close-button");
const sideNav = document.getElementById("header__nav");
const toggleSideNav = function () {
    sideNav.classList.toggle("show-nav");
}
hamburgerButton.addEventListener("click", toggleSideNav);
closeButton.addEventListener("click", toggleSideNav);

// change feature section
const featureButtons = document.querySelectorAll(".features__nav-button");
const featureDivs = document.querySelectorAll(".feature__wrapper");
const featureListItem = document.querySelectorAll(".features__nav-list-item");
const addOnActiveFeatureClassName = function(elements, feature) {
    elements.forEach((element)=>{
        element.classList.remove("active-feature");
        if (element.id.includes(feature)) {
            element.classList.add("active-feature");
        }
    })
}
const setActiveFeatureSection = function() {
    const feature = this.id.replace("-button", "");
    addOnActiveFeatureClassName(featureDivs, feature);
    addOnActiveFeatureClassName(featureListItem, feature);
}
featureButtons.forEach((button) => {
    button.addEventListener("click", setActiveFeatureSection);
})