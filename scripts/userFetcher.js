import { apiFetcher } from "./apiFetcher.js";

export const UserFetcher = (() => {
  return {
    create: (email, password) =>
      apiFetcher(
        "signup",
        "POST",
        { "Content-Type": "application/json" },
        { email, password }
      )
  };
})();
