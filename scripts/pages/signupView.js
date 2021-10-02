import { TaskFetcher } from "../services/taskFetcher.js"
import { DOMHandler } from "../domHandler.js"
import { loginView } from "./loginView.js";
import { UserFetcher } from "../services/userFetcher.js";

export const signupView = (() => {
  async function signupFormOptions(e) {
    e.preventDefault();
    const form = document.querySelector("#app-form");
    const signupButton = e.target.closest("button")
    const loginAnchor = e.target.closest("a")

    const { email, password } = form;

    if(signupButton){
      await UserFetcher.create(email.value, password.value).then((body) => 
      {
        console.log(body.token)
        sessionStorage.setItem("userToken", body.token);
        document.querySelector(".logout-logo").style.display = "block";
      }
    );
  }

  if(loginAnchor){
    DOMHandler.render(loginView)
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
      <div class = "flex-column g-16 alit-center">
        <button class = "button-submit" type = "submit" form="app-form">Create account</button>
        <a href="#">Login</a>
      </div>
    </div>`;
    },
    listeners: () => {
      const signupForm = document.querySelector(".app-form");
      signupForm.addEventListener("click", signupFormOptions);
    },
  };
})();
