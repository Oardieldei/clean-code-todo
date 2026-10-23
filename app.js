const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskCheckBox = function () {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  return checkBox;
};

const createNewTaskLabel = function (taskString) {
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task";
  return label;
};

const createNewTaskEditInput = function () {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";
  return editInput;
};

const createNewTaskEditButton = function () {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  return editButton;
};

const createNewTaskDeleteButton = function () {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  listItem.appendChild(createNewTaskCheckBox());
  listItem.appendChild(createNewTaskLabel(taskString));
  listItem.appendChild(createNewTaskEditInput());
  listItem.appendChild(createNewTaskEditButton());
  listItem.appendChild(createNewTaskDeleteButton());

  return listItem;
};

const placeTaskInList = function (
  taskListItem,
  targetList,
  checkboxEventHandler,
) {
  targetList.appendChild(taskListItem);
  bindTaskEvents(taskListItem, checkboxEventHandler);
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  placeTaskInList(listItem, incompleteTaskHolder, markTaskAsCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const markTaskAsCompleted = function () {
  placeTaskInList(this.parentNode, completedTasksHolder, markTaskAsIncomplete);
};

const markTaskAsIncomplete = function () {
  placeTaskInList(this.parentNode, incompleteTaskHolder, markTaskAsCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], markTaskAsCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], markTaskAsIncomplete);
}
