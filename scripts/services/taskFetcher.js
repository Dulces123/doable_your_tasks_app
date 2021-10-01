import { apiFetcher } from "../scripts/apiFetcher.js";

export const TaskFetcher = (() => {
  return {
    list: () =>
      apiFetcher("tasks", "GET", {
        Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
      }),
    create: (title, dueDate) =>
      apiFetcher(
        "tasks",
        "POST",
        {
          "Content-type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
        },
        { title, dueDate }
      ),
    edit: (important, completed) =>
      apiFetcher(
        `tasks/${id}`,
        "PATCH",
        {
          "Content-type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
        },
        { important, completed }
      ),
  };
})();
