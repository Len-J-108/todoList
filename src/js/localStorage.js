// add loacalStorage function

const addLocalStorage = (arr) => {
  localStorage.setItem('listOfTasks', JSON.stringify(arr)); // ads to localStorage in browser
};

// return from localStorage function

const returnFromLocalStorage = (val) => {
  const xx = JSON.parse(localStorage.getItem(val)); // returns from localStorage in browser
  return xx;
};

// exporting functions
export { addLocalStorage, returnFromLocalStorage };
