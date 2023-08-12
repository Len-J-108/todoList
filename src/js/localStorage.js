// add loacalStorage function

const addLocalStorage = (arr) => {
  localStorage.setItem('listOfTasks', JSON.stringify(arr));
};

// return from localStorage function

const returnFromLocalStorage = (val) => {
  const xx = JSON.parse(localStorage.getItem(val));
  return xx;
};

export { addLocalStorage, returnFromLocalStorage };