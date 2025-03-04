const content = {};
// {1: {name, solutions: []} }
const learningpathHeadingElements = document.querySelectorAll("h2.learning-path__heading");
learningpathHeadingElements.forEach((learningpathHeadingElement, index)=>{
    const pathname = learningpathHeadingElement.textContent.split(":")[1].slice(1);
    learningpathHeadingElement.id = pathname.replaceAll(' ', '-');
    content[index+1] = {pathname: pathname, solutionList: []};
})
const solutionHeadingElements = document.querySelectorAll("h3.solution__heading");
solutionHeadingElements.forEach(solutionHeadingElement=>{
    const textContent = solutionHeadingElement.textContent;
    solutionHeadingElement.id = textContent.slice(3).replaceAll(' ', '-');
    const path = textContent.charAt(0);
    content[path].solutionList.push(textContent.slice(3).replaceAll(' ', '-'));
})

const contentElement = document.getElementById("table-of-contents");
const contentH2Element = document.createElement("h2");
contentH2Element.textContent = "Table of Contents";
contentElement.appendChild(contentH2Element);
const contentOlElement = document.createElement("ol");
for (let pathIndex of Object.keys(content).sort()) {
    const contentLiElement = document.createElement("li");
    const contentLiAElement = document.createElement("a");
    contentLiAElement.textContent = `Learning Path ${pathIndex}: ${content[pathIndex].pathname}`;
    contentLiAElement.href = `#${content[pathIndex].pathname.replaceAll(' ', '-')}`;
    contentLiElement.appendChild(contentLiAElement);
    const pathOlElement = document.createElement("ol");
    content[pathIndex].solutionList.forEach((solution, solutionIndex)=>{
        const solutionLiElement = document.createElement("li");
        const solutionLiAElement = document.createElement("a");
        solutionLiAElement.textContent = `${pathIndex}.${solutionIndex+1} ${solution}`;
        solutionLiAElement.href = `#${solution.replaceAll(' ', '-')}`;
        solutionLiElement.appendChild(solutionLiAElement);
        pathOlElement.appendChild(solutionLiElement);
    })
    contentLiElement.appendChild(pathOlElement);
    contentOlElement.appendChild(contentLiElement);
};
contentElement.appendChild(contentOlElement);