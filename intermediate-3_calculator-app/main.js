attachHandleThemeControlFormChange();
function attachHandleThemeControlFormChange() {
  document
    .getElementById("theme-control-form")
    .addEventListener("change", handleThemeControlFormChange);
}
function handleThemeControlFormChange(e) {
  document.body.dataset.theme = e.target.value;
}
