import { SessionFecther } from "../scripts/sessionFetcher.js";
import { TaskFetcher } from "../scripts/taskFetcher.js"

await SessionFecther.login("erizo@mail.com", "123456").then((body) => {
  sessionStorage.setItem("userToken", body.token);
  console.log(sessionStorage.getItem("userToken"));
});
