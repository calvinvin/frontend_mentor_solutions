const formPage = document.querySelector("div.form");
const ticketPage = document.querySelector("div.submitted");
const form = formPage.querySelector("form.form__form");
const uploadInput = formPage.querySelector("input.form__input[type='file']");
const removeAvatarButton = formPage.querySelector(
  "button.form__field-upload-remove-img"
);

const handleDragOverAvatar = (e) => {
  e.preventDefault();
};

const handleDropAvatar = (e) => {
  e.preventDefault();
  uploadInput.files = e.dataTransfer.files;
  uploadInput.dispatchEvent(new Event("change"));
};

const handleRemoveUploadedAvatar = (e) => {
  const removeAvatarButton = e.target;
  const uploadField = removeAvatarButton.closest("div.form__field-upload");
  const fileThumbnail = uploadField.querySelector(
    "img.form__field-upload-thumbnail"
  );
  uploadField.classList.remove("not-empty");
  fileThumbnail.src = "";
  uploadInput.value = "";
};

const handleUploadAvatar = (e) => {
  const uploadInput = e.target;
  const uploadField = uploadInput.closest("div.form__field-upload");
  const fileThumbnail = uploadField.querySelector(
    "img.form__field-upload-thumbnail"
  );
  uploadField.classList.remove("not-empty");
  uploadField.classList.remove("field-error");
  const uploadedFileList = uploadInput.files;
  if (uploadedFileList.length === 0) {
    return;
  }
  const [avatarFile] = uploadedFileList;
  const avatarFileSizeInKB = Math.ceil(avatarFile.size / 1000);
  if (avatarFileSizeInKB > 500) {
    uploadField.classList.add("field-error");
    uploadInput.value = "";
    return;
  }
  fileThumbnail.src = URL.createObjectURL(avatarFile);
  uploadField.classList.add("not-empty");
};

const validateEmail = (form) => {
  const emailInput = form.elements.email;
  const emailField = emailInput.closest("div.form__field-email");
  emailField.classList.remove("field-error");
  if (emailInput.validity.valueMissing || emailInput.validity.typeMismatch) {
    emailField.classList.add("field-error");
  }
};

const handleSubmitSuccessfully = (form) => {
  formPage.hidden = true;
  ticketPage.hidden = false;
  const ticketAvatarElement = ticketPage.querySelector("img.ticket__avatar");
  const ticketNameElements = ticketPage.querySelectorAll(
    "span.submitted__name, p.ticket__name"
  );
  const ticketEmailElement = ticketPage.querySelector("span.submitted__email");
  const ticketUsernameElement = ticketPage.querySelector("p.ticket__username");
  const formElements = form.elements;
  ticketAvatarElement.src =
    formElements.file.files.length === 0
      ? ""
      : URL.createObjectURL(formElements.file.files[0]);
  for (let ticketNameElement of ticketNameElements) {
    ticketNameElement.textContent = formElements.name.value
      ? formElements.name.value
      : "<unknown>";
  }
  ticketEmailElement.textContent = formElements.email.value;
  ticketUsernameElement.textContent = formElements.username.value
    ? formElements.username.value
    : "<unknown>";
};

const handleSubmit = (e) => {
  e.preventDefault();
  const submittedForm = e.target;
  validateEmail(submittedForm);
  if (!form.checkValidity()) return;
  handleSubmitSuccessfully(form);
};

uploadInput.addEventListener("change", handleUploadAvatar);
removeAvatarButton.addEventListener("click", handleRemoveUploadedAvatar);
form.addEventListener("submit", handleSubmit);
