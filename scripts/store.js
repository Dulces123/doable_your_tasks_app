export const STORE = (() => {
  let listTasks = [];
  let pending = false;
  let important = false;


  function getPendingTasks(){
    return [...STORE.getTasks()].filter( task => task.completed === false)
  }

  function getImportantTasks(){
    return [...STORE.getTasks()].filter( task => task.important === true)
  }
  
  function getPendingState(){
    return pending;
  }

  function getImportanceState(){
    return important;
  }

  function setPendingState(bool){
    pending = bool;
  }

  function setImportanceState(bool){
    important = bool;
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
    getImportanceState,
    setPendingState,
    setImportanceState,
    getPendingTasks,
    getImportantTasks
  }
})();