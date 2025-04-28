const fiveDaysLater = new Date(
  Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000
);
const targetTimestamp = fiveDaysLater;

updateClock();
const timer = setInterval(() => updateClock(), 500);

function updateClock() {
  const remainingTimestampObject = getRemainingTime(targetTimestamp);
  if (remainingTimestampObject.total < 0) {
    zeroClock();
    return;
  }
  for (key in remainingTimestampObject) {
    if (key === "total") continue;
    const currentValue = document
      .querySelector(`[data-field="${key}"]`)
      .getAttribute("data-current-value");
    const remainingValue = ("0" + remainingTimestampObject[key]).slice(-2);
    if (currentValue === remainingValue) continue;
    setFieldDataAttribute(key, remainingValue);
    setFieldTextValue(key, "current", currentValue);
    setFieldTextValue(key, "next", remainingValue);
    flipFieldBoard(key);
  }
}

function getRemainingTime(targetTimestamp) {
  const remainingTimestamp =
    Date.parse(targetTimestamp) - Date.parse(new Date());
  return {
    total: remainingTimestamp,
    days: Math.floor(remainingTimestamp / 1000 / 60 / 60 / 24),
    hours: Math.floor((remainingTimestamp / 1000 / 60 / 60) % 24),
    minutes: Math.floor((remainingTimestamp / 1000 / 60) % 60),
    seconds: Math.floor((remainingTimestamp / 1000) % 60),
  };
}
function setFieldTextValue(field, time, value) {
  document
    .querySelector(`[data-field="${field}"]`)
    .querySelectorAll(`.card__field-value.${time}`)
    .forEach((element) => (element.textContent = value));
}
function setFieldDataAttribute(field, value) {
  document
    .querySelector(`[data-field="${field}"]`)
    .setAttribute("data-current-value", value);
}
function flipFieldBoard(field) {
  const cardElement = document.querySelector(`[data-field="${field}"]`);
  const boardWrapperElement = cardElement.querySelector(".board-wrapper");
  boardWrapperElement.classList.remove("flip");
  void boardWrapperElement.offsetWidth;
  boardWrapperElement.classList.add("flip");
}
function zeroClock() {
  document
    .querySelectorAll("[data-field")
    .forEach((element) => element.setAttribute("data-current-value", "00"));
  document
    .querySelectorAll(".card__field-value")
    .forEach((element) => (element.textContent = "00"));
  clearInterval(timer);
}
