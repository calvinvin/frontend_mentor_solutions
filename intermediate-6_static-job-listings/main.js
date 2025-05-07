loadJSON();
attachClearFilters();
attachFilterFormChange();

async function loadJSON() {
  url = "./data.json";
  const response = await fetch(url);
  if (!response.ok) {
    console.log("Error! Cannot fetch 'data.json'.");
  }
  const data = await response.json();
  handleJobData(data);
}

function attachClearFilters() {
  document
    .querySelector("button.clear-filter-button")
    .addEventListener("click", (e) => {
      e.currentTarget
        .closest("form.filter-form")
        .querySelectorAll("input[name='filter")
        .forEach((checkBox) => (checkBox.checked = false));
      document
        .querySelector("form.filter-form")
        .dispatchEvent(new Event("change"));
    });
}

function attachFilterFormChange() {
  document
    .querySelector("form.filter-form")
    .addEventListener("change", handleFilterFormChange);
}

function handleFilterFormChange(e) {
  const filterForm = e.currentTarget;
  const checkedCheckBoxes = Array.from(filterForm.elements["filter"]).filter(
    (checkBox) => checkBox.checked === true
  );
  const checkedTagNames = checkedCheckBoxes.map(
    (checkedCheckBox) => checkedCheckBox.value
  );
  document.querySelectorAll("tr.job-wrapper").forEach((jobTrElement) => {
    let jobTrTags = [];
    jobTrTags.push(jobTrElement.getAttribute("data-role"));
    jobTrTags.push(jobTrElement.getAttribute("data-level"));
    jobTrTags.push(...jobTrElement.getAttribute("data-languages").split(" "));
    jobTrTags.push(...jobTrElement.getAttribute("data-tools").split(" "));
    const isMatch = checkedTagNames.every((checkedTagName) =>
      jobTrTags.includes(checkedTagName)
    );
    if (isMatch) {
      jobTrElement.removeAttribute("hidden");
    } else {
      jobTrElement.setAttribute("hidden", "");
    }
  });
}

function handleJobData(data) {
  const jobFilterRoleList = makeJobFilterList(data, "role");
  const jobFilterLevelList = makeJobFilterList(data, "level");
  const jobFilterLanguageList = makeJobFilterList(data, "languages");
  const jobFilterToolList = makeJobFilterList(data, "tools");
  const jobFilterList = jobFilterRoleList
    .concat(jobFilterLevelList)
    .concat(jobFilterLanguageList)
    .concat(jobFilterToolList);
  renderJobFilters(jobFilterList);
  renderJobs(data);
}

function renderJobFilters(jobFilterList) {
  jobFilterList.forEach((jobFilterTagName) => {
    document
      .querySelector("form.filter-form fieldset")
      .appendChild(JobFilter({ tagName: jobFilterTagName }));
  });
}

function renderJobs(data) {
  data.forEach((jobObject) => {
    document
      .querySelector("table.job-list-table > tbody")
      .appendChild(JobTr(jobObject));
  });
}

function makeJobFilterList(data, filterType) {
  if (!["role", "level", "languages", "tools"].includes(filterType)) return;
  if (["role", "level"].includes(filterType)) {
    return data.reduce((list, jobObject) => {
      if (!list.includes(jobObject[filterType].toLowerCase()))
        list.push(jobObject[filterType].toLowerCase());
      return list;
    }, []);
  } else if (["languages", "tools"].includes(filterType)) {
    return data.reduce((list, jobObject) => {
      jobObject[filterType].forEach((item) => {
        if (!list.includes(item.toLowerCase())) list.push(item.toLowerCase());
      });
      return list;
    }, []);
  }
}

function JobFilter({ tagName }) {
  const template = document.getElementById("template-filter-tag-wrapper");
  const clonedTemplate = template.content.cloneNode(true);
  clonedTemplate.querySelector("span").textContent = tagName;
  clonedTemplate.querySelector("span").setAttribute("id", `aria-${tagName}`);
  clonedTemplate.querySelector("input").setAttribute("value", tagName);
  clonedTemplate
    .querySelector("input")
    .setAttribute("aria-labelledby", `aria-${tagName}`);
  return clonedTemplate;
}

function JobTr(jobObject) {
  const {
    id,
    company,
    logo,
    new: isNew,
    featured: isFeatured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = jobObject;
  const templateJobTr = document.getElementById("template-job-wrapper");
  const clonedJobTr = templateJobTr.content.cloneNode(true);
  clonedJobTr.querySelector("tr").setAttribute("data-job-id", id);
  clonedJobTr.querySelector("tr").setAttribute("data-role", role.toLowerCase());
  clonedJobTr
    .querySelector("tr")
    .setAttribute("data-level", level.toLowerCase());
  clonedJobTr
    .querySelector("tr")
    .setAttribute(
      "data-languages",
      languages.map((languageName) => languageName.toLowerCase()).join(" ")
    );
  clonedJobTr
    .querySelector("tr")
    .setAttribute(
      "data-tools",
      tools.map((toolName) => toolName.toLowerCase()).join(" ")
    );
  clonedJobTr.querySelector("th.position a").textContent = position;
  clonedJobTr.querySelector("p.company > span.company__span").textContent =
    company;
  clonedJobTr.querySelector("p.new").textContent = isNew ? "New!" : "";
  clonedJobTr.querySelector("p.featured").textContent = isFeatured
    ? "Featured"
    : "";
  clonedJobTr.querySelector("li.postedAt > span.postedAt__span").textContent =
    postedAt;
  clonedJobTr.querySelector("li.contract > span.contract__span").textContent =
    contract;
  clonedJobTr.querySelector("li.location > span.location__span").textContent =
    location;
  clonedJobTr.querySelector(
    "li.role-wrapper > p.visually-hidden > span.role__span"
  ).textContent = role;
  clonedJobTr.querySelector(
    "li.role-wrapper > button.tag-button > span.tag-button__span"
  ).textContent = role;
  clonedJobTr.querySelector(
    "li.level-wrapper > p.visually-hidden > span.level__span"
  ).textContent = level;
  clonedJobTr.querySelector(
    "li.level-wrapper > button.tag-button > span.tag-button__span"
  ).textContent = level;
  languages.forEach((languageName) => {
    clonedJobTr
      .querySelector("li.languages-wrapper > ul")
      .appendChild(LanguageLi(languageName));
  });
  tools.forEach((toolName) => {
    clonedJobTr
      .querySelector("li.tools-wrapper > ul")
      .appendChild(ToolLi(toolName));
  });
  clonedJobTr.querySelector("img.company-logo").src = logo;
  clonedJobTr
    .querySelectorAll("button.tag-button")
    .forEach((tagButton) =>
      tagButton.addEventListener("click", handleClickFilterTagButton)
    );
  return clonedJobTr;

  function handleClickFilterTagButton(e) {
    const filterTagName = e.currentTarget
      .querySelector("span.tag-button__span")
      .textContent.toLowerCase();
    const tagCheckBox = document.querySelector(
      `form.filter-form input[name='filter'][value=${filterTagName}`
    );
    tagCheckBox.checked = true;
    document
      .querySelector("form.filter-form")
      .dispatchEvent(new Event("change"));
  }

  function LanguageLi(languageName) {
    const templateLanguageLi = document
      .getElementById("template-job-wrapper")
      .content.getElementById("template-language-wrapper");
    const clonedLanguageLi = templateLanguageLi.content.cloneNode(true);
    clonedLanguageLi.querySelector("p.visually-hidden").textContent =
      languageName;
    clonedLanguageLi.querySelector(
      "button.tag-button > span.tag-button__span"
    ).textContent = languageName;
    return clonedLanguageLi;
  }

  function ToolLi(toolName) {
    const templateToolLi = document
      .getElementById("template-job-wrapper")
      .content.getElementById("template-tool-wrapper");
    const clonedToolLi = templateToolLi.content.cloneNode(true);
    clonedToolLi.querySelector("p.visually-hidden").textContent = toolName;
    clonedToolLi.querySelector(
      "button.tag-button > span.tag-button__span"
    ).textContent = toolName;
    return clonedToolLi;
  }
}
