// add function
import { returnFromLocalStorage } from './localStorage.js';

const addFunc = (task, _arr) => {
  if (task !== '') {
    _arr = returnFromLocalStorage('listOfTasks');
    if (_arr !== null) {
      _arr.push({ task: task, id: Date.now(), done: false });
      task = '';
    } else {
      _arr = [];
      _arr.push({ task: task, id: Date.now(), done: false });
    }
  }
};

export default addFunc;
