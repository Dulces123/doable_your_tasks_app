import { TaskFetcher } from "../services/taskFetcher.js";
import { DOMHandler } from "../domHandler.js"
import { SessionFetcher } from "../services/sessionFetcher.js";
import { loginView } from "../pages/loginView.js"

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
        await TaskFetcher.create(title.value, due_date.value).then(body => {
          console.log(body);
          TaskFetcher.list().then(response => console.log(response));
          DOMHandler.render(MainView)
        })
        
      }
      else{
        alert("no puede haber campos vacíos!")
      }
    }
  }
  return {
    render: () => {
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
        <li class = "flex">
          <div class = "flex g-10">
            <input type="checkbox">
            <p>Help my mom</p>
          </div>
          <img src="./images/important-dark.svg" alt="importance">
        </li>
        <li class = "flex">
          <div class = "flex g-10">
            <input type="checkbox">
            <p>Make my day</p>
          </div>
          <img src="./images/important-dark.svg" alt="importance">
        </li>
        <li class = "flex">
          <div class = "flex g-10">
            <input type="checkbox">
            <p>Do my time</p>
          </div>
          <img src="./images/important-dark.svg" alt="importance">
        </li>
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