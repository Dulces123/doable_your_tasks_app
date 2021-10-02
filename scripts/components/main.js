import { TaskFetcher } from "../services/taskFetcher.js";
import { DOMHandler } from "../domHandler.js"
import { SessionFetcher } from "../services/sessionFetcher.js";
import { loginView } from "../pages/loginView.js"
import { STORE } from "../store.js"

export const MainView = (() => {
  async function changeImportant(e){
    const taskId = parseInt(e.target.dataset.id)
    const currentTask = STORE.getTasks().find(task => task.id === taskId)
    currentTask.important = currentTask.important ? false : true
    await TaskFetcher.edit(taskId, currentTask)
    DOMHandler.render(MainView)
  }

  async function markAsCompleted(e){
    const taskId = parseInt(e.target.dataset.id)
    const currentTask = STORE.getTasks().find(task => task.id === taskId)
    currentTask.completed = currentTask.completed ? false : true
    await TaskFetcher.edit(taskId, currentTask)
    DOMHandler.render(MainView)
  }



  async function logoutUser(){
    await SessionFetcher.logout().then(() => sessionStorage.clear())
    document.querySelector(".logout-logo").style.display = "none"
    DOMHandler.render(loginView)
  }

  async function createTask(e){
    e.preventDefault();
    const form = document.querySelector("#app-form")
    const addButton = e.target.closest(".button-submit")
    const { title, due_date } = form
    if(addButton){
      if(title.value && due_date.value){
        await TaskFetcher.create(title.value, due_date.value);
        await TaskFetcher.list().then(response => STORE.setTasks(response));
        DOMHandler.render(MainView)
      }
      else{
        alert("no puede haber campos vacíos!")
      }
    }
  }
  return {
    render: () => {
      const listOfTasks = STORE.getTasks().map(task => `<li class = "flex justify-sb alit-center">
      <div class = "flex g-10">
      <img id = "completed" data-id = ${task.id} src="./images/${!task.completed? "" : "pink-"}checkbox.svg" alt="completed">
        <p>${task.title}</p>
      </div>
      <img id = "important" data-id = ${task.id} src="./images/important-${!task.important? "dark" : task.completed? "pink-lite": "pink"}.svg" alt="importance">
    </li>`).join(" ")

      return `<div class = "pd-lr-18">
      <div class = "flex justify-sb alit-center">
        <p>Sort</p>
        <select class = "category" name="category">
          <option value="alphabetical">Alphabetical (a-z)</option>
          <option value="date">Due date</option>
          <option value="importance">Importance</option>
        </select>
      </div>
      <div class = "flex g-18">
        <p>Show</p>
        <div class = "flex">
        <img id = "completed" src="./images/${STORE.getPendingState()? "pink-" : ""}checkbox.svg" alt="completed">
          <p>Only pending</p>
        </div>
        <div class="flex">
          <img id = "completed" src="./images/${STORE.getImportanceState()? "pink-" : ""}checkbox.svg" alt="completed">
          <p>Only important</p>
        </div>
      </div>
      <ul>
        ${listOfTasks}
      </ul>
      <form class = "task-form flex-column g-4" id = "app-form">
        <input type="text" name="title">
        <input type="date" name="due_date">
        <button class = "button-submit" type = "submit" >Add Task</button>
      </form>
    </div>`
    },
    listeners: () => {
      const addButton = document.querySelector(".button-submit")
      const logoutButton = document.querySelector(".logout-logo")
      const importantToggles = document.querySelectorAll("#important")
      importantToggles.forEach(toggle => toggle.addEventListener('click', changeImportant))
      const completedToggles = document.querySelectorAll("#completed")
      completedToggles.forEach(toggle => toggle.addEventListener('click', markAsCompleted))
      logoutButton.addEventListener('click', logoutUser)
      addButton.addEventListener("click", createTask)
    }
  }
})();