const languageForm = document.querySelector("form.language-form");
let targetLanguageCode = languageForm.language.value;

attachLanguageSelection();
fetchAdvice();
attachFetchAdvice();

// below are functions.
function attachLanguageSelection() {
  languageForm.addEventListener("change", (e) => {
    const newLanguageCode = e.target.value;
    targetLanguageCode = newLanguageCode;
    updateAdviceBySlipId();
  });
}
function attachFetchAdvice() {
  document
    .getElementById("button-fetch-advice")
    .addEventListener("click", fetchAdvice);
}
async function fetchAdvice() {
  setLoading(true);
  const randomAdviceAPI = "https://api.adviceslip.com/advice";
  const response = await fetch(randomAdviceAPI);
  if (!response.ok) {
    renderAdviceContent("Oops, cannot get advice from the server.");
    setLoading(false);
    return;
  }
  const slipObject = await response.json();
  handleAdvice(slipObject, targetLanguageCode);
}
async function updateAdviceBySlipId() {
  const slipId = document.getElementById("advice-id").textContent;
  if (!slipId) return;
  setLoading(true);
  const adviceByIdAPI = `https://api.adviceslip.com/advice/${slipId}`;
  const response = await fetch(adviceByIdAPI);
  if (!response.ok) {
    renderAdviceContent("Oops, cannot get advice from the server.");
    setLoading(false);
    return;
  }
  const slipObject = await response.json();
  if (targetLanguageCode === "en") {
    renderAdviceContent(slipObject.slip.advice);
  } else {
    translate(slipObject.slip.advice, targetLanguageCode);
  }
  setLoading(false);
}
async function translate(textToBeTranslate, targetLanguageCode) {
  if (targetLanguageCode === "en") return;
  const apiKey = "AIzaSyB31x0CmH9fn6f7rOIkmKTjGfST7bSew8o";
  const translateURL =
    "https://translation.googleapis.com/language/translate/v2";
  const header = {
    "X-goog-api-key": apiKey,
  };
  const body = {
    q: textToBeTranslate,
    target: targetLanguageCode,
    format: "text",
    source: "en",
    model: "nmt",
    key: apiKey,
  };
  const response = await fetch(translateURL, {
    method: "POST",
    headers: header,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    renderAdviceContent("Oops, cannot translate advice.");
    return;
  }
  const responseBody = await response.json();
  const {
    data: {
      translations: [{ translatedText: translatedResult }, ...rest],
    },
  } = responseBody;
  renderAdviceContent(translatedResult);
}
function handleAdvice(slipObject) {
  const {
    slip: { id, advice },
  } = slipObject;
  renderAdviceId(id);
  if (targetLanguageCode === "en") {
    renderAdviceContent(advice);
    return;
  }
  translate(advice, targetLanguageCode);
}
function renderAdviceId(id) {
  document.getElementById("advice-id").textContent = id;
  document.querySelector("div.advice-wrapper").classList.remove("loading");
}
function renderAdviceContent(content) {
  document.getElementById("advice-content").textContent = content;
}
function setLoading(isLoading) {
  if (isLoading === true) {
    document.querySelector("div.advice-wrapper").classList.add("loading");
  } else {
    document.querySelector("div.advice-wrapper").classList.remove("loading");
  }
}
