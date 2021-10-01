// import { SessionFecther } from "./services/sessionFetcher.js";
import { DOMHandler } from "./domHandler.js"
import { loginView } from "./pages/loginView.js"

// await SessionFecther.login("erizo@mail.com", "123456").then((body) => {
//   sessionStorage.setItem("userToken", body.token);
//   console.log(sessionStorage.getItem("userToken"));
// });

DOMHandler.render(loginView)