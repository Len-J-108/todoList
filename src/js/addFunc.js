import { returnFromLocalStorage } from './localStorage.js';

const addFunc = (val, arr) => {
  if (val !== '') {
    arr = returnFromLocalStorage('listOfTasks');
    if (arr !== null) {
      arr.push({ task: val, id: Date.now(), done: false });
      val = '';
    } else {
      arr = [];
      arr.push({ task: val, id: Date.now(), done: false });
    }
    return arr;
  }
};

export default addFunc;
