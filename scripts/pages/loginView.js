import { SessionFetcher } from "../services/sessionFetcher.js";
import { TaskFetcher } from "../services/taskFetcher.js"
import { DOMHandler } from "../domHandler.js"
import { MainView } from "../components/main.js";
import { signupView } from "../pages/signupView.js"

export const loginView = (() => {
  async function loginFormOptions(e) {
    e.preventDefault();
    const form = document.querySelector("#app-form");
    const loginButton = e.target.closest("button")
    const signUpAnchor = e.target.closest("a")

    const { email, password } = form;

    if(loginButton){
      await SessionFetcher.login(email.value, password.value).then((body) => 
      {
        sessionStorage.setItem("userToken", body.token);
        document.querySelector(".logout-logo").style.display = "block";
        TaskFetcher.list().then(response => console.log(response))
        DOMHandler.render(MainView);
      }
    );
  }

  if(signUpAnchor){
    DOMHandler.render(signupView)
  }
}

  return {
    render: () => {
      return `<div class = "app-form">
      <form class = "mb-16" id = "app-form">
        <p>Email</p>
        <input class = "user-form-input" type="text" name = "email">
        <p>Password</p>
        <input class = "user-form-input" type="password" name = "password">
      </form>
      <div class = "flex-column g-16">
        <button class = "button-submit" type = "submit" form="app-form">Login</button>
        <a href="#">Create an account</a>
      </div>
    </div>`;
    },
    listeners: () => {
      const loginForm = document.querySelector(".app-form");
      loginForm.addEventListener("click", loginFormOptions);
    },
  };
})();
