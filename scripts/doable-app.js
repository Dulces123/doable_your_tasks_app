import { DOMHandler } from "./domHandler.js"
import { loginView } from "./pages/loginView.js"
import { MainView } from "./components/main.js"
import { TaskFetcher } from "./services/taskFetcher.js"
import { STORE } from "../scripts/store.js"

if(sessionStorage.getItem("userToken") === null){
  DOMHandler.render(loginView)
}
else{
  await TaskFetcher.list().then(response => STORE.setTasks(response))
  document.querySelector(".logout-logo").style.display = "block"
  DOMHandler.render(MainView)
}
