const form = document.getElementById("contact-form");
const emailInput = document.querySelector("input#email");
const emailDiv = emailInput.parentNode.parentNode;
const messageInput = document.querySelector("textarea#message");
const successModal = document.getElementById("success-modal");
const submitButton = document.getElementById("submit-button");


function dismissSuccessModalByClickOutside(event) {
    if (event.target === successModal) {
        successModal.close();
    }
}
function resetForm() {
    form.reset();
}
function isEmptyString(string) {
    return string.trim().length === 0;
}
function validateEmailInput() {
    emailDiv.classList.remove("empty");
    emailDiv.classList.remove("invalid-email");
    if ( isEmptyString(this.value) ) {
        emailDiv.classList.add("empty");
        return;
    }
    if ( this.validity.typeMismatch ) {
        emailDiv.classList.add("invalid-email");
        return;
    }
}
function validateMessageInput() {
    this.setCustomValidity("");
    if ( isEmptyString(this.value) ) {
        this.setCustomValidity(" ");
    }
}

successModal.addEventListener("click", dismissSuccessModalByClickOutside);
successModal.addEventListener("close", resetForm);
emailInput.addEventListener("input", validateEmailInput);
messageInput.addEventListener("input", validateMessageInput);
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    successModal.showModal();
})