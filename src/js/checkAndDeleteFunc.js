// check and delete function
import { addLocalStorage, returnFromLocalStorage } from './localStorage.js';
import createListItems from './createListElements.js';

const checkAndDeleteFunc = (e) => {
  const dataKeyofItem = e.target.parentElement.getAttribute('data-key');
  if (e.target.type == 'checkbox') {
    arrOfTasks.forEach((item) => {
      if (item.id == dataKeyofItem) {
        item.done = !item.done;
      }
    });

    addLocalStorage(arrOfTasks);
    const ret = returnFromLocalStorage('listOfTasks');
    createListItems(ret);
  }
  if (e.target.textContent == 'erase') {
    arrOfTasks.forEach((item, i, arr) => {
      if (item.id == dataKeyofItem) {
        arrOfTasks.splice(i, 1);
      }

      addLocalStorage(arrOfTasks);
      const ret = returnFromLocalStorage('listOfTasks');
      createListItems(ret);
    });
    // e.target.parentElement.remove();
  }
};

export { checkAndDeleteFunc };
