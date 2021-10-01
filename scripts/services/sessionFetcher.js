import { apiFetcher } from "./apiFetcher.js";

export const SessionFetcher = (() => {
  return {
    login: (email, password) =>
      apiFetcher(
        "login",
        "POST",
        { "Content-Type": "application/json" },
        { email, password }
      ),
    logout: () =>
      apiFetcher(
        "logout",
        "DELETE",
        { Authorization: `Token token=${sessionStorage.getItem("userToken")}` }
      ),
  };
})();
