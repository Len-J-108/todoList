// import { addLocalStorage } from './localStorage.js';
import { addLocalStorage } from './localStorage.js';
import sortByCompleteVal from './main.js';
import { checkAndDeleteFunc } from './checkAndDeleteFunc.js';

const createListItems = (_arr, _list) => {
  if (sortByCompleteVal === false) {
    _arr.sort((a, b) => b.id - a.id);
  }
  if (sortByCompleteVal === true) {
    _arr.sort((a, b) => Number(a.done) - Number(b.done));
  }
  addLocalStorage(_arr);

  _list.innerHTML = '';
  if (!_arr) {
    return;
  }
  _arr.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-key', item.id);

    const isDone = document.createElement('input');
    isDone.setAttribute('type', 'checkbox');
    if (item.done) {
      isDone.setAttribute('checked', '');
      li.classList.add('completed');
    }

    const itemTxt = document.createElement('span');
    itemTxt.textContent = item.task;

    const date = document.createElement('span');
    date.textContent = new Date(item.id)
      .toLocaleDateString()
      .replaceAll('/', '.');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'erase';

    li.append(isDone, itemTxt, date, delBtn);
    // appending
    _list.append(li);

    li.addEventListener('click', checkAndDeleteFunc);
  });
};

export default createListItems;
