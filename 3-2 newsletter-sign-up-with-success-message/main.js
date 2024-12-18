const successModal = document.getElementById("success-modal");
const signUpForm = document.getElementById("sign-up-form");
const dismissButton = document.getElementById("dismiss-button");

function handleSubmit(e) {
    e.preventDefault();
    const emailInputElement = e.target.email;
    if (emailInputElement.validity.valid) {
        successModal.classList.add("success");
    } else {
        emailInputElement.focus();
    }
}
function dismissSuccessModal() {
    successModal.classList.remove("success");
    signUpForm.reset();
}

signUpForm.addEventListener("submit", handleSubmit);
dismissButton.addEventListener("click", dismissSuccessModal);