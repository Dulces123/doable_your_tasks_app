export const STORE = (() => {
  let listTasks = [];
  let listSortedTasks = [];
  let currentTask = {};
  let pending = false;
  let important = false;
  let criteria = 4

  function setSortCriteria(option){
    criteria = option
  }

  function setListSortedTasks(data){
    listSortedTasks = data
  }

  function getListSortedTasks(){
    return listSortedTasks
  }

  function sortTasks(){
    switch(STORE.getSortCriteria()){
      case 1: {
        STORE.setListSortedTasks(STORE.getTasks().sort((a,b) => a.title.localeCompare(b.title)))
        break;
      }
      case 2: {
        STORE.setListSortedTasks(STORE.getTasks().sort((a,b) => new Date(a.due_date) - new Date(b.due_date)))
        break;
      }
      case 3: {
        STORE.setListSortedTasks(STORE.getTasks().sort((a,b) => b.important - a.important))
        break;
      }
      case 4: {
        STORE.setListSortedTasks([...STORE.getTasks()])
        break;
      }
    }
  }

  function getSortCriteria(){
    return criteria
  }

  function getCurrentTask(){
    return currentTask
  }

  function setCurrentTask(data){
    currentTask = data;
  }

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
    getImportantTasks,
    setSortCriteria,
    getSortCriteria,
    sortTasks,
    setListSortedTasks,
    getListSortedTasks,
    getCurrentTask,
    setCurrentTask
  }
})();