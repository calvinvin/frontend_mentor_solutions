const createElement = (element) => document.createElement(element);
const setAttribute = (attribute, value) => (element) => {
  element[attribute] = value;
  return element;
};
const setHrefAttribute = (value) => (element) =>
  setAttribute("href", value)(element);
const addClass = (className) => (element) => {
  element.classList.add(className);
  return element;
};
const setTextContent = (value) => (element) => {
  element["textContent"] = value;
  return element;
};
const setId = (id) => (element) => {
  element.id = id;
  return element;
};
const pipeline = ([headFn, ...tailFns]) =>
  headFn === undefined
    ? (input) => input
    : tailFns.length === 0
    ? (input) => headFn(input)
    : (input) => pipeline(tailFns)(headFn(input));
const appendToElement = (parentElement) => (childElement) => {
  parentElement.append(childElement);
  return parentElement;
};
const stripSpaceToDash = (str) => str.replaceAll(" ", "-");

const makeElement = (object) => {
  if (!Object.hasOwn(object, "tagName")) return null;
  return Object.entries(object).reduce((element, currentEntry) => {
    const [attribute, value] = currentEntry;
    return attribute === "tagName"
      ? element
      : setAttribute(attribute, value)(element);
  }, createElement(object.tagName));
};

const makeTableOfContentElement = (nodeList) => {
  return Array.from(nodeList).reduce((olElement, currentElement) => {
    if (currentElement.tagName === "H2") {
      const aElement = makeElement({
        tagName: "a",
        textContent: currentElement.textContent,
        href: `#${stripSpaceToDash(
          currentElement.querySelector("span.chapter-name").textContent
        )}`,
      });
      pipeline([
        appendToElement(createElement("li")),
        appendToElement(olElement),
      ])(aElement);
      return olElement;
    }
    if (currentElement.tagName === "H3") {
      if (olElement.lastElementChild.lastElementChild.tagName !== "OL") {
        olElement.lastElementChild.append(createElement("ol"));
      }
      const aElement = makeElement({
        tagName: "a",
        textContent:
          currentElement.textContent.slice(0, 3) +
          " " +
          currentElement.textContent.slice(3),
        href: `#${stripSpaceToDash(
          currentElement.querySelector("span.section-name").textContent
        )}`,
      });
      pipeline([
        appendToElement(createElement("li")),
        appendToElement(olElement.lastElementChild.lastElementChild),
      ])(aElement);
      return olElement;
    }
    return olElement;
  }, createElement("ol"));
};

const contentElement = document.getElementById("table-of-contents");
contentElement.append(
  makeTableOfContentElement(
    document.querySelectorAll("h2.learning-path__heading, h3.solution__heading")
  )
);
document
  .querySelectorAll("h2.learning-path__heading, h3.solution__heading")
  .forEach((headingNode) => {
    setAttribute(
      "id",
      stripSpaceToDash(headingNode.querySelectorAll("span")[1].textContent)
    )(headingNode);
  });
