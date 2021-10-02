export const STORE = (() => {
  let listTasks = [];
  let pending = false;
  let important = false;

  function getPendingState(){
    return pending;
  }

  function getImportanceState(){
    return important;
  }

  function setTasks(data){
    listTasks = data
  }

  function getTasks(){
    return [...listTasks]
  }

  return{
    setTasks,
    getTasks,
    getPendingState,
    getImportanceState
  }
})();