// toggle shopping cart
const shoppingcartButton = document.getElementById("shopping-cart-button");
const shoppingcartPage = document.getElementById("shopping-cart-page");
const shoppingcartPageBackground = document.getElementById("shopping-cart-background")
function toggleShoppingCart() {
    shoppingcartPage.classList.toggle("expand-shopping-cart");
}
const toggleShoppingCartByClickOutside = function (e) {
    (e.target === shoppingcartPageBackground) && toggleShoppingCart();
}
shoppingcartButton.addEventListener("click", toggleShoppingCart);
shoppingcartPage.addEventListener("click", toggleShoppingCartByClickOutside);


// toggle side navigation
const hamburberButton = document.getElementById("hamburger-button");
const closeSideNavButton = document.getElementById("close-side-nav-button");
const navElement = document.getElementById("primary-navigation");
function toggleSideNav() {
    navElement.classList.toggle("expand-side-nav")
}
const toggleSideNavByClickOutside = function (e) {
    (e.target === this) && toggleSideNav();
}
hamburberButton.addEventListener("click", toggleSideNav);
closeSideNavButton.addEventListener("click", toggleSideNav);
navElement.addEventListener("click", toggleSideNavByClickOutside);


// toggle lightbox gallery
const displayImageButton = document.querySelectorAll("button.display-image-button");
const displayImage = document.querySelectorAll("img.display-image")
const sectionLightboxGallery = document.getElementById("lightbox-gallery");
const lightboxGalleryCloseButton = document.getElementById("lightbox-gallery-close-button");
function toggleLightboxGallery(e) {
    sectionLightboxGallery.classList.toggle("show-light-box-gallery");
}
function toggleLightboxGalleryByClickOutside(e) {
    (e.target === this) && sectionLightboxGallery.classList.toggle("show-light-box-gallery");
}
displayImageButton.forEach( (button) => {
    button.addEventListener("click", toggleLightboxGallery);
})
lightboxGalleryCloseButton.addEventListener("click", toggleLightboxGallery);
sectionLightboxGallery.addEventListener("click", toggleLightboxGalleryByClickOutside);


// change displaying image
const productImages = [
    { displayImageFileName: "image-product-1.jpg", thumbnailImageFileName: "image-product-1-thumbnail.jpg" },
    { displayImageFileName: "image-product-2.jpg", thumbnailImageFileName: "image-product-2-thumbnail.jpg" },
    { displayImageFileName: "image-product-3.jpg", thumbnailImageFileName: "image-product-3-thumbnail.jpg" },
    { displayImageFileName: "image-product-4.jpg", thumbnailImageFileName: "image-product-4-thumbnail.jpg" },
];
const displayImg = document.querySelectorAll("img.display-image");
const thumbnailButtons = document.querySelectorAll("button.product-thumbnail");
const nextButtons = document.querySelectorAll("button.next-button");
const previousButtons = document.querySelectorAll("button.previous-button");
function getFilenameFromURL(URL) {
    return URL.split('/').findLast(()=>true);
}
function getCurrentDisplayImageIndex() {
    const currentDisplayImageFileName = getFilenameFromURL(displayImg[0].src);
    const currentDisplayImageIndex = findProductImageIndexByFileName(currentDisplayImageFileName);
    return currentDisplayImageIndex
}
function findProductImageIndexByFileName(filename) {
    const isFilenameInProductImage = function (element) {
        return Object.values(element).includes(filename);
    }
    return productImages.findIndex(isFilenameInProductImage);
}
function changeDisplayImageByIndex(index) {
    displayImg.forEach((image)=>{
        image.src = `./images/${productImages[index].displayImageFileName}`;
    })
}
function changeSelectedThumbnailByIndex(index) {
    const thumbnailFilenameToBeSelected = productImages[index].thumbnailImageFileName;
    thumbnailButtons.forEach((button) => {
        button.classList.remove("selected");
        const buttonImgFilename = getFilenameFromURL(button.childNodes[0].src);
        if (buttonImgFilename === thumbnailFilenameToBeSelected) {
            button.classList.add("selected");
        }
    })
}
function changeDisplayImageByClickThumbnail(e) {
    const thumbnailFilename = getFilenameFromURL(e.target.src);
    const thumbnailIndex = findProductImageIndexByFileName(thumbnailFilename);
    changeDisplayImageByIndex(thumbnailIndex);
    changeSelectedThumbnailByIndex(thumbnailIndex);
}
function displayNextOrPreviousImage(direction) {
    function getNewIndexByDirection(currentIndex, direction, imageAmount) {
        if (direction === "next") {
            return (currentIndex + 1) % imageAmount;
        } else if (direction === "previous") {
            return (currentIndex + 3) % imageAmount
        }
    }
    const currentDisplayImageIndex = getCurrentDisplayImageIndex();
    const newDisplayImageIndex = getNewIndexByDirection(currentDisplayImageIndex, direction, productImages.length);
    changeDisplayImageByIndex(newDisplayImageIndex);
    changeSelectedThumbnailByIndex(newDisplayImageIndex);
}
thumbnailButtons.forEach((button) => {
    button.addEventListener("click", changeDisplayImageByClickThumbnail);
})
nextButtons.forEach((button) => {
    button.addEventListener("click", ()=>displayNextOrPreviousImage("next"));
})
previousButtons.forEach((button) => {
    button.addEventListener("click", ()=>displayNextOrPreviousImage("previous"));
})


// set purchase item amount
const minusButton = document.getElementById("minus-button");
const plusButton = document.getElementById("plus-button");
const amountInputElement = document.getElementById("item-amount");
function minusItemAmount() {
    amountInputElement.value > 0 && amountInputElement.value --;
    amountInputElement.dispatchEvent(new Event("change"));
}
function plusItemAmount() {
    amountInputElement.value ++;
    amountInputElement.dispatchEvent(new Event("change"));
}
minusButton.addEventListener("click", minusItemAmount);
plusButton.addEventListener("click", plusItemAmount);


// add to cart
let cartItems = [];
const spanShoppingCartItemAmount = document.getElementById("shopping-cart-item-amount");
const divCartItemListWrapper = document.getElementById("cart-item-list-wrapper");
function updateShoppingCartItemAmount() {
    spanShoppingCartItemAmount.textContent = cartItems.length || "";
}
function updateSectionCartWrapper() {
    const sectionCartWrapper = document.getElementById("cart-wrapper");
    if (cartItems.length) {
        sectionCartWrapper.classList.remove("empty-cart");
    } else {
        sectionCartWrapper.classList.add("empty-cart");
    }
}
function deleteCartItemByUUID(uuid) {
    console.log(uuid);
    console.log(cartItems);
    cartItems = cartItems.filter((cartItem)=>cartItem.uuid !== uuid);
    document.getElementById(uuid).remove();
    updateSectionCartWrapper();
    updateShoppingCartItemAmount();
}
function addCartItemToShoppingCartItemList(cartItem) {
    const divCartItemListWrapper = document.getElementById("cart-item-list-wrapper");
    function makeDivCartItemWrapper(cartItem) {
        const newDivCartItem = document.createElement("div");
        newDivCartItem.id = cartItem.uuid;
        newDivCartItem.classList.add("cart-item-wrapper");
        const {salePrice, itemName, thumbnailUrl, thumbnailAlt, itemAmount} = cartItem;
        newDivCartItem.innerHTML = `
            <img class="cart-item-thumbnail" src="${thumbnailUrl}" alt="${thumbnailAlt}">
            <div class="cart-item-text-wrapper">
                <span class="cart-item-title">
                ${itemName}
                </span>
                <div class="cart-item-price-wrapper">
                <span class="cart-item-price price">${salePrice}</span>
                <span>×</span>
                <span class="cart-item-amount">${itemAmount}</span>
                <span class="cart-item-subtotal price">${ (Number(salePrice) * Number(itemAmount)).toFixed(2) }</span>
                </div>
            </div>
            <button type="button" class="delete-cart-item-button" onClick="deleteCartItemByUUID('${newDivCartItem.id}')"><img src="images/icon-delete.svg" alt="Delete icon"></button>
        `;
        return newDivCartItem
    }
    divCartItemListWrapper.insertBefore(makeDivCartItemWrapper(cartItem), divCartItemListWrapper.firstChild);
    divCartItemListWrapper.dispatchEvent(new Event("change"));
}
function validateItemAmount(inputItemAmount) {
    function isInvalidItemAmount(input) {
        return Number(input.value) < 1 ;
    }
    inputItemAmount.setCustomValidity("");
    if (isInvalidItemAmount(inputItemAmount)) {
        inputItemAmount.focus();
        inputItemAmount.setCustomValidity(" ");
        return false;
    }
    return true;
}
const inputItemAmount = document.getElementById("item-amount");
inputItemAmount.addEventListener("change", (e) => {
    validateItemAmount(e.target);
});
const purchaseForm = document.getElementById("purchase-form");
const handleSubmit = function(event) {
    event.preventDefault();
    if (!validateItemAmount(inputItemAmount)) {
        return;
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.uuid = crypto.randomUUID();
    cartItems.push(data);
    updateShoppingCartItemAmount();
    updateSectionCartWrapper();
    addCartItemToShoppingCartItemList(data);
}
purchaseForm.addEventListener("submit", handleSubmit);


// checkout shopping cart 
const checkoutForm = document.getElementById("checkout-form");
function handleCheckout(e) {
    e.preventDefault();
    let totalItemAmount = cartItems.reduce(
        (sum, cartItem) => sum + Number(cartItem.itemAmount),
        0
    );
    let totalPriceAmount = cartItems.reduce(
        (sum, cartItem) => sum + (Number(cartItem.salePrice) * Number(cartItem.itemAmount)),
        0
    );
    window.alert(`You ordered ${totalItemAmount} items and total $${totalPriceAmount} dollars.`);
}
checkoutForm.addEventListener("submit", handleCheckout);