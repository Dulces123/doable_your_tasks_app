export const DOMHandler = (() => {
  return {
    render: (elementHTML) => {
      const container = document.querySelector(".app-content")
      container.innerHTML = elementHTML.render()
      elementHTML.listeners();
    } 
  }
}
)();