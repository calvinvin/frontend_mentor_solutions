const priceObject = {
  plan: {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 },
  },
  "add-on": {
    "online-service": { monthly: 1, yearly: 10 },
    "larger-storage": { monthly: 2, yearly: 20 },
    "customizable-profile": { monthly: 2, yearly: 20 },
  },
};
renderPrice();
renderConfirmForm(makeFormData());
attachHandleTabButton();
attachHandleNavigationButton();
attachHandleChangeBillingCycleButton();
attachHandleForm();

function attachHandleChangeBillingCycleButton() {
  document
    .querySelector("button.plan__billing-cycle-button")
    .addEventListener("click", handleChangeBillingCycleButton);
}
function renderPrice() {
  Object.entries(priceObject).forEach(([fieldType, fieldValueObject]) => {
    Object.entries(fieldValueObject).forEach(
      ([fieldName, { monthly, yearly }]) => {
        document.querySelector(
          `span[data-${fieldType}='${fieldName}'][data-billing-cycle='monthly']`
        ).textContent = monthly;
        document.querySelector(
          `span[data-${fieldType}='${fieldName}'][data-billing-cycle='yearly']`
        ).textContent = yearly;
      }
    );
  });
}
function attachHandleTabButton() {
  document
    .querySelectorAll("button.tab__button")
    .forEach((tabButton) =>
      tabButton.addEventListener("click", handleTabButtonClick)
    );
  document
    .querySelector("div.tab-wrapper[role='tablist']")
    .addEventListener("keydown", handleTabButtonKeyboardNavigation);
}
function handleTabButtonClick(e) {
  document.querySelectorAll("button.tab__button").forEach((tabButton) => {
    tabButton.setAttribute(
      "aria-selected",
      e.currentTarget === tabButton ? "true" : "false"
    );
  });
}
function handleTabButtonKeyboardNavigation(e) {
  function changeTabFocus(direction) {
    if (!["previous", "next"].includes(direction)) return;
    const tabButtonElements = document.querySelectorAll("button.tab__button");
    const currentTabButtonFocus = Array.from(tabButtonElements).findIndex(
      (tabButtonElement) => tabButtonElement.getAttribute("tabindex") === "0"
    );
    let nextTabButtonFocus;
    switch (direction) {
      case "next":
        nextTabButtonFocus =
          currentTabButtonFocus === tabButtonElements.length - 1
            ? 0
            : currentTabButtonFocus + 1;
        break;
      case "previous":
        nextTabButtonFocus =
          currentTabButtonFocus === 0
            ? tabButtonElements.length - 1
            : currentTabButtonFocus - 1;
        break;
    }
    tabButtonElements[currentTabButtonFocus].setAttribute("tabindex", "-1");
    tabButtonElements[nextTabButtonFocus].setAttribute("tabindex", "0");
    tabButtonElements[nextTabButtonFocus].focus();
  }
  switch (e.key) {
    case "ArrowRight":
      changeTabFocus("next");
      break;
    case "ArrowDown":
      changeTabFocus("next");
      break;
    case "ArrowUp":
      changeTabFocus("previous");
      break;
    case "ArrowLeft":
      changeTabFocus("previous");
      break;
  }
}
function attachHandleNavigationButton() {
  document
    .querySelectorAll(".button.back, .button.next")
    .forEach((navigationButtonElement) =>
      navigationButtonElement.addEventListener("click", handleNavigationButton)
    );
}
function handleNavigationButton(e) {
  const clickedButtonElement = e.currentTarget;
  if (clickedButtonElement.classList.contains("back")) {
    direction = "previous";
  } else if (clickedButtonElement.classList.contains("next")) {
    direction = "next";
  }
  const tabButtonElements = document.querySelectorAll(
    "button.tab__button[role='tab']"
  );
  const currentTabButtonElement = Array.from(tabButtonElements).find(
    (tabButtonElement) =>
      tabButtonElement.getAttribute("aria-controls") ===
      e.currentTarget
        .closest("div.step-wrapper[role='tabpanel']")
        .getAttribute("id")
  );
  const currentTabFocusIndex = Array.from(tabButtonElements).findIndex(
    (tabButtonElement) => tabButtonElement === currentTabButtonElement
  );
  const navigatedTabFocusIndex =
    direction === "next" ? currentTabFocusIndex + 1 : currentTabFocusIndex - 1;
  tabButtonElements[navigatedTabFocusIndex].click();
}
function handleChangeBillingCycleButton(e) {
  const currentBillingCycle = new FormData(
    document.getElementById("subscription-form")
  ).get("billing-cycle");
  const targetBillingCycle =
    currentBillingCycle === "monthly" ? "yearly" : "monthly";
  document
    .querySelector(`input[name='billing-cycle'][value='${targetBillingCycle}']`)
    .click();
}
function attachHandleForm() {
  const form = document.getElementById("subscription-form");
  form.addEventListener("change", handleFormChange);
  form.addEventListener("submit", handleFormSubmit);
}
function handleFormChange(e) {
  renderConfirmForm(makeFormData());
}
function handleFormSubmit(e) {
  e.preventDefault();
  Array.from(document.querySelectorAll("button[role='tab']")).forEach(
    (tabButton) => {
      tabButton.setAttribute("aria-selected", "false");
      tabButton.setAttribute("tabindex", "-1");
      tabButton.setAttribute("disabled", "");
    }
  );
  document.getElementById("subscription-form").classList.add("submitted");
}
function makeFormData() {
  const form = document.getElementById("subscription-form");
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const plan = formData.get("plan");
  const addOns = formData.getAll("add-on[]");
  const billingCycle = formData.get("billing-cycle");
  let totalPrice = 0;
  totalPrice += priceObject["plan"][plan][billingCycle];
  addOns.forEach(
    (addOn) => (totalPrice += priceObject["add-on"][addOn][billingCycle])
  );
  return {
    name: name,
    email: email,
    phone: phone,
    plan: plan,
    addOns: addOns,
    billingCycle: billingCycle,
    totalPrice: totalPrice,
  };
}
function renderConfirmForm(formData) {
  const { name, email, phone, plan, addOns, billingCycle, totalPrice } =
    formData;
  const billingCycleAbbreviations = {
    monthly: "mo",
    yearly: "yr",
  };
  const billingCycleAbbreviation = billingCycleAbbreviations[billingCycle];
  clearConfirmWrapper();
  renderPlan({
    plan: plan,
    billingCycle: billingCycle,
    billingCycleAbbreviation: billingCycleAbbreviation,
  });
  renderAddOn({
    addOns: addOns,
    billingCycle: billingCycle,
    billingCycleAbbreviation: billingCycleAbbreviation,
  });
  renderTotal({
    totalPrice: totalPrice,
    billingCycle: billingCycle,
    billingCycleAbbreviation: billingCycleAbbreviation,
  });
  function renderTotal({ totalPrice, billingCycle, billingCycleAbbreviation }) {
    document.querySelector(
      "div.confirm__total-wrapper h3.confirm__total-heading span.confirm__billing-cycle"
    ).textContent = billingCycle;
    document.querySelector(
      "p.confirm__total-p span.confirm__total-price"
    ).textContent = totalPrice;
    document.querySelector(
      "p.confirm__total-p span.confirm__billing-cycle"
    ).textContent = billingCycleAbbreviation;
  }
  function clearConfirmWrapper() {
    document.querySelector("ul.confirm-wrapper").innerHTML = "";
  }
  function renderPlan({ plan, billingCycle, billingCycleAbbreviation }) {
    document.querySelector("ul.confirm-wrapper").appendChild(
      Plan({
        plan: plan,
        billingCycle: billingCycle,
        billingCycleAbbreviation: billingCycleAbbreviation,
      })
    );
  }
  function renderAddOn({ addOns, billingCycle, billingCycleAbbreviation }) {
    if (addOns.length === 0) {
      return;
    }
    addOns.forEach((addOn) => {
      document.querySelector("ul.confirm-wrapper").appendChild(
        AddOn({
          addOn: addOn,
          billingCycle: billingCycle,
          billingCycleAbbreviation: billingCycleAbbreviation,
        })
      );
    });
  }
  function Plan({ plan, billingCycle, billingCycleAbbreviation }) {
    const templatePlan = document.getElementById("confirm-plan-template");
    const clonedTemplatePlan = templatePlan.content.cloneNode(true);
    clonedTemplatePlan.querySelector("h3.confirm__plan > span").textContent =
      billingCycle;
    clonedTemplatePlan.querySelector(
      "div.confirm__price-wrapper span.confirm__item-price"
    ).textContent = priceObject["plan"][plan][billingCycle];
    clonedTemplatePlan.querySelector(
      "div.confirm__price-wrapper span.confirm__billing-cycle"
    ).textContent = billingCycleAbbreviation;
    clonedTemplatePlan
      .querySelector("button.confirm__change-plan-button")
      .addEventListener("click", () =>
        document.getElementById("button-step-2").click()
      );
    return clonedTemplatePlan;
  }
  function AddOn({ addOn, billingCycle, billingCycleAbbreviation }) {
    const templateAddOn = document.getElementById("confirm-add-on-template");
    const clonedTemplateAddOn = templateAddOn.content.cloneNode(true);
    clonedTemplateAddOn.querySelector("h3.confirm__add-on").textContent = addOn;
    clonedTemplateAddOn.querySelector("span.confirm__item-price").textContent =
      priceObject["add-on"][addOn][billingCycle];
    clonedTemplateAddOn.querySelector(
      "span.confirm__billing-cycle"
    ).textContent = billingCycleAbbreviation;
    return clonedTemplateAddOn;
  }
}
