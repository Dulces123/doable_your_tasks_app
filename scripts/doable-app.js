import { SessionFecther } from "./services/sessionFetcher.js";
import { DOMHandler } from "./domHandler.js"
// await SessionFecther.login("erizo@mail.com", "123456").then((body) => {
//   sessionStorage.setItem("userToken", body.token);
//   console.log(sessionStorage.getItem("userToken"));
// });

DOMHandler.render()