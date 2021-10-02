import { apiFetcher } from "../services/apiFetcher.js";

export const TaskFetcher = (() => {
  return {
    list: () =>
      apiFetcher("tasks", "GET", {
        Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
      }),
    create: (title, due_date) =>
      apiFetcher(
        "tasks",
        "POST",
        {
          "Content-type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
        },
        { title, due_date }
      ),
    edit: (id, taskData) =>
      apiFetcher(
        `tasks/${id}`,
        "PATCH",
        {
          "Content-type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("userToken")}`,
        },
        taskData
      ),
  };
})();
