let resultObject = {
  displayValue: "",
  calculateValue: "",
};

attachHandleThemeControlFormChange();
attachHandleClickButton();
attachHandleKeyDown();

function attachHandleThemeControlFormChange() {
  document
    .getElementById("theme-control-form")
    .addEventListener("change", handleThemeControlFormChange);
}
function attachHandleClickButton() {
  document
    .querySelectorAll("button.button")
    .forEach((button) => button.addEventListener("click", handleClickButton));
}
function attachHandleKeyDown() {
  document.documentElement.addEventListener("keydown", handleKeyDown);
}
function handleThemeControlFormChange(e) {
  document.body.dataset.theme = e.target.value;
}
function handleClickButton(e) {
  const buttonValue = e.target.value;
  if (buttonValue === "reset") {
    resultObject = {
      displayValue: "0",
      calculateValue: "",
    };
  } else if (buttonValue === "del") {
    resultObject.displayValue = "0";
  } else if (buttonValue === "=") {
    resultObject.calculateValue =
      resultObject.calculateValue + resultObject.displayValue;
    resultObject.displayValue = /[+\-*/]/.test(
      resultObject.calculateValue[resultObject.calculateValue.length - 1]
    )
      ? eval(resultObject.calculateValue.slice(0, -1)).toFixed(8)
      : eval(resultObject.calculateValue).toFixed(8);
    resultObject.displayValue = /.*\..*0+$/.test(
      String(resultObject.displayValue)
    )
      ? String(resultObject.displayValue).replace(/0+$/, "").replace(/\.$/, "")
      : String(resultObject.displayValue);
    resultObject.calculateValue = "";
  } else if (/[+\-*/]/.test(buttonValue)) {
    resultObject.calculateValue =
      resultObject.calculateValue + resultObject.displayValue + buttonValue;
    resultObject.displayValue = "0";
  } else if (/[0-9]/.test(buttonValue)) {
    resultObject.displayValue =
      resultObject.displayValue === "0"
        ? buttonValue
        : resultObject.displayValue + buttonValue;
  } else if (buttonValue === ".") {
    if (/.*\..*/.test(resultObject.displayValue)) return;
    resultObject.displayValue === ""
      ? (resultObject.displayValue = "0.")
      : (resultObject.displayValue = resultObject.displayValue + ".");
  }
  updateDisplayValue();
  console.log(resultObject);
}
function updateDisplayValue() {
  document.getElementById("output").textContent = resultObject.displayValue;
}
function handleKeyDown(e) {
  const key = e.key;
  if (/[=.0-9+\-*/]/.test(key)) {
    document
      .querySelector(`button[value='${key}']`)
      .dispatchEvent(new Event("click"));
    return;
  }
  switch (key) {
    case "Backspace":
      document
        .querySelector("button[value='del']")
        .dispatchEvent(new Event("click"));
      break;
    case "Escape":
      document
        .querySelector("button[value='reset']")
        .dispatchEvent(new Event("click"));
      break;
    case "Enter":
      document
        .querySelector("button[value='=']")
        .dispatchEvent(new Event("click"));
      break;
  }
}
