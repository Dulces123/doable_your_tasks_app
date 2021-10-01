export const loginView = (() => {
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
    </div>`
    }
  }
})();