urlJSON = "./data.json";
loadJSON(urlJSON);
attachFilterColorScheme();
attachFilterActiveStatus();

async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) return;
  const data = await response.json();
  data.forEach((extensionObject) => {
    document
      .querySelector("div.extensions-wrapper")
      .appendChild(ExtensionCard(extensionObject));
  });
}
function attachFilterColorScheme() {
  document
    .querySelector("button.switch-color-scheme")
    .addEventListener("click", () => {
      document.documentElement.classList.contains("dark")
        ? document.documentElement.classList.remove("dark")
        : document.documentElement.classList.add("dark");
    });
}
function attachFilterActiveStatus() {
  const filterForm = document.querySelector("form.filter-form");
  filterForm.addEventListener("change", filterActiveStatus);
}
function filterActiveStatus(e) {
  const filterForm = e.target.closest("form");
  const filterStatus = e.target.value;
  filterForm.setAttribute("data-filter", filterStatus);
  filterForm.querySelectorAll("label").forEach((labelElement) => {
    labelElement.setAttribute(
      "data-selected",
      labelElement.querySelector("input").value === filterStatus
    );
  });
  filterExtensionCards();
}
function filterExtensionCards() {
  const filterStatus = document
    .querySelector("form.filter-form")
    .getAttribute("data-filter");
  document.querySelectorAll("div.extension-card").forEach((cardElement) => {
    switch (filterStatus) {
      case "all":
        cardElement.removeAttribute("hidden");
        break;
      case "active":
        cardElement.getAttribute("data-is-active") === "true"
          ? cardElement.removeAttribute("hidden")
          : cardElement.setAttribute("hidden", "");
        break;
      case "inactive":
        cardElement.getAttribute("data-is-active") !== "true"
          ? cardElement.removeAttribute("hidden")
          : cardElement.setAttribute("hidden", "");
        break;
    }
  });
}
function toggleActiveStatus(e) {
  const currentStatus = e.target
    .closest("div.extension-card")
    .getAttribute("data-is-active");
  const nextStatus = currentStatus === "true" ? "false" : "true";
  e.target
    .closest("div.extension-card")
    .setAttribute("data-is-active", nextStatus);
  filterExtensionCards();
}
function removeExtension(e) {
  e.target.closest("div.extension-card").remove();
}
function ExtensionCard(extensionObject) {
  const { logo, name, description, isActive } = extensionObject;
  const template = document.getElementById("extension-card-template");
  const clonedTemplate = template.content.cloneNode(true);
  const cardElement = clonedTemplate.querySelector(".extension-card");
  cardElement.dataset.isActive = isActive;
  cardElement.setAttribute("aria-label", name);
  cardElement.querySelector("img").src = logo;
  cardElement.querySelector("img").alt = name;
  cardElement.querySelector("h2").textContent = name;
  cardElement.querySelector("p").textContent = description;
  cardElement.querySelector("button.remove span.visually-hidden").textContent =
    name;
  cardElement.querySelector(
    "button.toggle span.visually-hidden"
  ).textContent = `${isActive === true ? "inactivate" : "activate"} ${name}`;
  cardElement
    .querySelector("button.remove")
    .addEventListener("click", removeExtension);
  cardElement
    .querySelector("button.toggle")
    .addEventListener("click", toggleActiveStatus);
  return cardElement;
}
