// check and delete function
import { addLocalStorage, returnFromLocalStorage } from './localStorage.js';
import {
  createListItems,
  arrOfTasks,
  sortByCompleteVal,
  list,
} from './main.js';

const innerFunc = (e, arrOfTasks) => {
  // dataKey can identify the individual object in the todo array.
  const dataKeyofItem = e.target.parentElement.getAttribute('data-key');

  /* if clicked on checkbox the individual item gets
  checked i.e. unchecked, then the updated list gets added to 
  browsers localStorage and the list gets rerendered. */
  if (e.target.type == 'checkbox') {
    arrOfTasks.forEach((item) => {
      if (item.id == dataKeyofItem) {
        item.done = !item.done;
      }
    });
    addLocalStorage(arrOfTasks); // adding to localStorage in browser under 'listOfTasks'
    createListItems(
      returnFromLocalStorage('listOfTasks'),
      sortByCompleteVal,
      list
    ); // renders the list
  }

  /* if clicked on erase buttin the individual item gets deleted from
  the list, then the updated list gets added to 
  browsers localStorage and the list gets rerendered. */
  if (e.target.textContent == 'erase') {
    arrOfTasks.forEach((item, i) => {
      if (item.id == dataKeyofItem) {
        arrOfTasks.splice(i, 1);
      }

      addLocalStorage(arrOfTasks); // adding to localStorage in browser under 'listOfTasks'
      createListItems(
        returnFromLocalStorage('listOfTasks'),
        sortByCompleteVal,
        list
      ); // renders the list
    });
  }
};

const checkAndDeleteFunc = (e) => innerFunc(e, arrOfTasks); // closure for working with two arguments in eventHandler function.

export { checkAndDeleteFunc };
