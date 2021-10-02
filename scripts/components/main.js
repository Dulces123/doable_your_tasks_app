import { TaskFetcher } from "../services/taskFetcher.js";
import { DOMHandler } from "../domHandler.js"
import { SessionFetcher } from "../services/sessionFetcher.js";
import { loginView } from "../pages/loginView.js"
import { STORE } from "../store.js"

export const MainView = (() => {
  async function logoutUser(){
    await SessionFetcher.logout().then(() => sessionStorage.clear())
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
      console.log(STORE.getTasks())
      const listOfTasks = STORE.getTasks().map(task => `<li class = "flex">
      <div class = "flex g-10">
        <input type="checkbox">
        <p>${task.title}</p>
      </div>
      <img src="./images/important-${!task.important? "dark" : task.completed? "pink-lite": "pink"}.svg" alt="importance">
    </li>`).join(" ")

      return `<div class = "pd-lr-18">
      <div class = "flex">
        <p>Sort</p>
        <select class = "category" name="category">
          <option value="alphabetical">Alphabetical (a-z)</option>
          <option value="date">Due date</option>
          <option value="importance">Importance</option>
        </select>
      </div>
      <div class = "flex">
        <p>Show</p>
        <div class = "flex">
          <input type="checkbox">
          <p>Only pending</p>
        </div>
        <div class="flex">
          <input type="checkbox">
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
      logoutButton.addEventListener('click', logoutUser)
      addButton.addEventListener("click", createTask)
    }
  }
})();