export const STORE = (() => {
  let listTasks = [];

  function setTasks(data){
    listTasks = data
  }

  function getTasks(){
    return [...listTasks]
  }

  return{
    setTasks,
    getTasks,
  }
})();