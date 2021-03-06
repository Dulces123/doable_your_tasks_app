import { TaskFetcher } from "../services/taskFetcher.js";
import { DOMHandler } from "../domHandler.js";
import { SessionFetcher } from "../services/sessionFetcher.js";
import { loginView } from "../pages/loginView.js";
import { STORE } from "../store.js";

export const MainView = (() => {
  async function sortByCriteria(e) {
    const select = e.target;
    const selectedIndex = select.selectedIndex;
    STORE.setSortCriteria(selectedIndex);
    STORE.setImportanceState(false);
    STORE.setPendingState(false);
    DOMHandler.render(MainView);
  }

  async function filtersOptions(e) {
    const pendingFilter = e.target.closest("#filter-pending");
    const importanceFilter = e.target.closest("#filter-importance");
    if (pendingFilter) {
      STORE.getPendingState()
        ? STORE.setPendingState(false)
        : STORE.setPendingState(true);
      STORE.setImportanceState(false);
    }

    if (importanceFilter) {
      STORE.getImportanceState()
        ? STORE.setImportanceState(false)
        : STORE.setImportanceState(true);
      STORE.setPendingState(false);
    }
    DOMHandler.render(MainView);
  }

  async function changeImportant(e) {
    const taskId = parseInt(e.target.dataset.id);
    const currentTask = STORE.getTasks().find((task) => task.id === taskId);
    currentTask.important = currentTask.important ? false : true;
    await TaskFetcher.edit(taskId, currentTask);
    DOMHandler.render(MainView);
  }

  async function markAsCompleted(e) {
    const taskId = parseInt(e.target.dataset.id);
    const currentTask = STORE.getTasks().find((task) => task.id === taskId);
    currentTask.completed = currentTask.completed ? false : true;
    await TaskFetcher.edit(taskId, currentTask);
    DOMHandler.render(MainView);
  }

  async function logoutUser() {
    await SessionFetcher.logout().then(() => sessionStorage.clear());
    document.querySelector(".logout-logo").style.display = "none";
    DOMHandler.render(loginView);
  }

  async function createTask(e) {
    e.preventDefault();
    const form = document.querySelector("#app-form");
    const addButton = e.target.closest(".button-submit");
    const { title, due_date } = form;
    if (addButton) {
      if (title.value && due_date.value) {
        await TaskFetcher.create(title.value, due_date.value);
        await TaskFetcher.list().then((response) => STORE.setTasks(response));
        DOMHandler.render(MainView);
      } else {
        alert("no puede haber campos vac??os!");
      }
    }
  }

  async function displayCurrentTaskData(e) {
    const taskContainer = e.target.closest("div");
    const form = document.querySelector("form");
    if (taskContainer.id === "task") {
      document.querySelector("#add").style.display = "none";
      document.querySelector("#edit").style.display = "block";
      const currentTask = STORE.getTasks().find(
        (task) => task.id === parseInt(taskContainer.dataset.id)
      );
      STORE.setCurrentTask(currentTask);
      const { title, due_date } = form;
      title.value = currentTask.title;
      due_date.value = currentTask.due_date;
    }
  }

  async function editTask(e) {
    e.preventDefault();
    const currentTask = STORE.getCurrentTask();
    const { title, due_date } = document.querySelector("form");
    if (title.value && due_date.value) {
      await TaskFetcher.edit(currentTask.id, {
        title: title.value,
        due_date: due_date.value,
      }).then((response) =>
        STORE.setTasks([
          ...STORE.getTasks().filter((task) => task !== currentTask),
          response,
        ])
      );

      DOMHandler.render(MainView);
    } else {
      alert("no puede haber campos vac??os!");
    }
  }

  async function destroyTask(e) {
    e.preventDefault();
    const taskId = e.target.dataset.id;
    await TaskFetcher.delete(taskId);
    const newTasks = STORE.getTasks().filter(
      (task) => task.id !== parseInt(taskId)
    );
    STORE.setTasks(newTasks);
    DOMHandler.render(MainView);
  }

  return {
    render: () => {
      const pendingValue = STORE.getPendingState();
      const importanceValue = STORE.getImportanceState();
      STORE.sortTasks();
      let listOfTasks = STORE.getListSortedTasks();
      if (pendingValue && !importanceValue) {
        listOfTasks = STORE.getPendingTasks();
      }
      if (importanceValue && !pendingValue) {
        listOfTasks = STORE.getImportantTasks();
      }

      const filterTasks = listOfTasks
        .map(
          (task) => `<div id = "task" data-id = ${
            task.id
          } class = "flex justify-sb alit-center">
      <div class = "flex g-10">
        <img id = "completed" data-id = ${task.id} src="./images/${
            !task.completed ? "" : "pink-"
          }checkbox.svg" alt="completed">
        <p class = "task-title ${task.completed ? "op-50" : ""}">${
            task.title
          }</p>
      </div>
      <div class = "flex g-4 mr-20">
        <img id = "trash" data-id = ${
          task.id
        } src="./images/trash.svg" alt="trash">
        <img id = "important" data-id = ${task.id} src="./images/important-${
            !task.important ? "dark" : task.completed ? "pink-lite" : "pink"
          }.svg" alt="importance">
      </div>
    </div>
    <p class = "task-date ${task.completed ? "op-50" : ""}">${new Date(
            task.due_date
          )
            .toDateString()
            .replace(/\ 20\d{2}/, "")}</p>`
        )
        .join(" ");

      return `<div class = "pd-lr-18">
      <div class = "sort-options flex justify-sb alit-center mb-20">
        <p>Sort</p>
        <select class = "category" name="category">
          <option value="default">Select Criteria</option>
          <option value="alphabetical">Alphabetical (a-z)</option>
          <option value="date">Due date</option>
          <option value="importance">Importance</option>
          <option value="restore">Reset</option>
        </select>
      </div>
      <div class = "filters flex g-18">
        <p>Show</p>
        <div class = "flex">
        <img id = "filter-pending" src="./images/${
          STORE.getPendingState() ? "pink-" : ""
        }checkbox.svg" alt="pending">
          <p>Only pending</p>
        </div>
        <div class="flex">
          <img id = "filter-importance" src="./images/${
            STORE.getImportanceState() ? "pink-" : ""
          }checkbox.svg" alt="importance">
          <p>Only important</p>
        </div>
      </div>
      <div class = "list-tasks flex-column g-12 mt-24 pr-12">
        ${filterTasks}
      </div>
      <form class = "task-form flex-column g-4 mt-24" id = "app-form">
        <input type="text" name="title">
        <input type="date" name="due_date">
        <button id = "add" class = "button-submit" type = "submit" >Add Task</button>
        <button style = "display: none" id = "edit" class = "button-submit" type = "submit" >Edit Task</button>
      </form>
    </div>`;
    },
    listeners: () => {
      const addButton = document.querySelector(".button-submit");
      const editButton = document.querySelector("#edit");
      const logoutButton = document.querySelector(".logout-logo");
      const importantToggles = document.querySelectorAll("#important");
      const completedToggles = document.querySelectorAll("#completed");
      const trashButtons = document.querySelectorAll("#trash");
      const tasksFilters = document.querySelector(".filters");
      const sortOptions = document.querySelector("select");
      const taskContainers = document.querySelectorAll("#task");
      sortOptions.addEventListener("change", sortByCriteria);
      tasksFilters.addEventListener("click", filtersOptions);
      importantToggles.forEach((toggle) =>
        toggle.addEventListener("click", changeImportant)
      );
      completedToggles.forEach((toggle) =>
        toggle.addEventListener("click", markAsCompleted)
      );
      logoutButton.addEventListener("click", logoutUser);
      addButton.addEventListener("click", createTask);
      editButton.addEventListener("click", editTask);
      trashButtons.forEach((button) =>
        button.addEventListener("click", destroyTask)
      );
      taskContainers.forEach((container) =>
        container.addEventListener("click", displayCurrentTaskData)
      );
    },
  };
})();
