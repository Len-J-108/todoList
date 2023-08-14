// import { addLocalStorage } from './localStorage.js';
import { addLocalStorage } from './localStorage.js';
// import sortByCompleteVal from './main.js';
import { checkAndDeleteFunc } from './checkAndDeleteFunc.js';

// renders the todo list
const createListItems = (arr, _sortVal, _list) => {
  if (_sortVal === false) {
    // sortVal == false => list gets sorted by date.
    arr.sort((a, b) => b.id - a.id);
  }
  if (_sortVal === true) {
    // sortVal == true => list gets sorted by completion.
    arr.sort((a, b) => Number(a.done) - Number(b.done));
  }

  addLocalStorage(arr); // adding to localStorage in browser under 'listOfTasks'

  _list.innerHTML = ''; // resetting the list element so it doesn't get rendered twoce in a row.
  if (!arr) {
    return;
  }
  arr.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-key', item.id);

    // setting the checkbox
    const isDone = document.createElement('input');
    isDone.setAttribute('type', 'checkbox');
    if (item.done) {
      isDone.setAttribute('checked', '');
      li.classList.add('completed');
    }

    //setting the text
    const itemTxt = document.createElement('span');
    itemTxt.textContent = item.task;

    //setting the date element
    const date = document.createElement('span');
    date.textContent = new Date(item.id)
      .toLocaleDateString()
      .replaceAll('/', '.');

    // setting the erase button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'erase';

    // appending
    li.append(isDone, itemTxt, date, delBtn);
    _list.append(li);

    // eventListener for check and erase of individual item.
    li.addEventListener('click', checkAndDeleteFunc);
  });
};

// exporting function
export default createListItems;
