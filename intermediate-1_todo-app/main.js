loadLocalStorage();
updateItemAmount();

attachHandleTodoListMutation();
attachHandleClickCreateTodoWrapper();
attachHandleClickSwitchColorSchemeButton();
attachHandleClickClearCompletedButton();
attachHandleCreateTodo();
attachHandleClickTodoFilter();
attachHandleClickListItemRow();

// functions
function loadLocalStorage() {
  const localColorScheme = localStorage.getItem("colorScheme");
  const localTodoItems = localStorage.getItem("todoItems");
  if (localColorScheme) setColorScheme(localColorScheme);
  if (localTodoItems) {
    try {
      JSON.parse(localTodoItems).forEach((localTodoItem) =>
        createTodo(localTodoItem)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
function updateItemAmount() {
  const itemAmountSpan = document.getElementById("item-amount__number");
  itemAmountSpan.textContent = document.querySelectorAll(
    "li.todo-item[data-status='active']"
  ).length;
}
function setColorScheme(colorScheme) {
  document.documentElement.dataset.colorScheme = colorScheme;
  localStorage.setItem("colorScheme", colorScheme);
}
function reOrderTodoItemLi() {
  const todoItemLis = document.querySelectorAll("li.todo-item");
  todoItemLis.forEach((todoItemLi, index) => {
    todoItemLi.id = `todo-item-${+index + 1}`;
    todoItemLi.dataset.number = +index + 1;
  });
}
function createTodo(todoItemObject) {
  document
    .querySelector("ol.todo-list")
    .appendChild(makeTodoItemElementsFromObject(todoItemObject));
}
function makeTodoItemObjectListFromCurrentPage() {
  return Array.from(document.querySelectorAll("li.todo-item")).map(
    (todoItemLi) => {
      return {
        number: todoItemLi.dataset.number,
        description: todoItemLi.querySelector("p.todo-item__description")
          .textContent,
        status: todoItemLi.dataset.status,
      };
    }
  );
}
function makeTodoItemElementsFromObject(object) {
  const { number, description, status } = object;
  const todoTemplate = document.getElementById("todo-row-template");
  const newTodoTemplate = todoTemplate.content.cloneNode(true);
  const newTodoItemLi = newTodoTemplate.querySelector("li.todo-item");
  newTodoItemLi.addEventListener("click", handleClickListItemRow);
  newTodoItemLi.dataset.number = number;
  newTodoItemLi.id = `todo-item-${number}`;
  newTodoItemLi.querySelector("p.todo-item__description").textContent =
    description;
  newTodoItemLi.dataset.status = status;
  return newTodoTemplate;
}
function attachHandleClickListItemRow() {
  document
    .querySelectorAll("li.todo-item")
    .forEach((li) => li.addEventListener("click", handleClickListItemRow));
}
function attachHandleTodoListMutation() {
  handleTodoListMutation(document.querySelector("ol.todo-list"));
}
function attachHandleClickTodoFilter() {
  document
    .querySelectorAll("form.todo-filter-form")
    .forEach((formTodoFilter) =>
      formTodoFilter.addEventListener("change", handleClickTodoFilter)
    );
}
function attachHandleCreateTodo() {
  document
    .getElementById("create-todo__form")
    .addEventListener("submit", handleCreateTodo);
}
function attachHandleClickClearCompletedButton() {
  document
    .getElementById("clear-completed-button")
    .addEventListener("click", handleClickClearCompletedButton);
}
function attachHandleClickCreateTodoWrapper() {
  document
    .querySelector("div.create-todo-wrapper")
    .addEventListener("click", handleClickCreateTodoWrapper);
}
function attachHandleClickSwitchColorSchemeButton() {
  document
    .getElementById("switch-color-scheme-button")
    .addEventListener("click", handleClickSwitchColorSchemeButton);
}
function handleDragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.dropEffect = "move";
  e.effectAllowed = "move";
}
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
function handleDrop(e) {
  console.log(e);
  e.preventDefault();
  const currentTodoItemLi = e.target.closest("li.todo-item");
  const draggedTodoItemLiId = e.dataTransfer.getData("text");
  currentTodoItemLi.insertAdjacentElement(
    "afterend",
    document.getElementById(draggedTodoItemLiId)
  );
  reOrderTodoItemLi();
}
function handleCreateTodo(e) {
  e.preventDefault();
  const newTodoItemDescription = e.target.todo.value;
  e.target.reset();
  const newTodoItemStatus = "active";
  const newTodoItemNumber =
    document.querySelectorAll("li.todo-item").length === 0
      ? 1
      : Math.max(
          ...Array.from(document.querySelectorAll("li.todo-item")).map(
            (li) => li.dataset.number
          )
        ) + 1;
  const newTodoItemObject = {
    number: newTodoItemNumber,
    description: newTodoItemDescription,
    status: newTodoItemStatus,
  };
  createTodo(newTodoItemObject);
}
function handleTodoListMutation(todoList) {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };
  const callback = (mutationList, observer) => {
    updateItemAmount();
    localStorage.setItem(
      "todoItems",
      JSON.stringify(makeTodoItemObjectListFromCurrentPage())
    );
  };
  const observer = new MutationObserver(callback);
  observer.observe(todoList, config);
}
function handleClickSwitchColorSchemeButton(e) {
  let currentColorScheme;
  let htmlColorScheme = document.documentElement.dataset.colorScheme;
  if (htmlColorScheme) {
    currentColorScheme = htmlColorScheme;
  } else {
    currentColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
  }
  let newColorScheme = currentColorScheme === "dark" ? "light" : "dark";
  setColorScheme(newColorScheme);
}
function handleClickCreateTodoWrapper(e) {
  e.currentTarget.querySelector("input[name='todo']").focus();
}
function handleClickListItemRow(e) {
  const clickTarget = e.target;
  const todoItemLi = e.currentTarget;
  if (clickTarget.closest("button.todo-item__delete-wrapper")) {
    todoItemLi.remove();
  } else if (
    clickTarget.closest(
      "button.todo-item__status-wrapper, p.todo-item__description"
    )
  ) {
    todoItemLi.dataset.status =
      todoItemLi.dataset.status === "active" ? "completed" : "active";
  }
}
function handleClickTodoFilter(e) {
  const selectedFilter = e.currentTarget["todo-filter"].value;
  const todoItems = document.querySelectorAll("li.todo-item");
  todoItems.forEach((todoItem) => {
    todoItem.hidden = !(
      todoItem.dataset.status === selectedFilter || selectedFilter === "all"
    );
  });
}
function handleClickClearCompletedButton() {
  for (let completedItem of document.querySelectorAll(
    "li[data-status='completed']"
  )) {
    completedItem.remove();
  }
}
