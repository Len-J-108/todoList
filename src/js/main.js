import addFunc from './addFunc.js';
import { addLocalStorage, returnFromLocalStorage } from './localStorage.js';

// Selecting
const wrapper = document.getElementById('wrapper');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const sortByCompleteBtn = document.getElementById('sort-by-complete');
const deleteCompletedBtn = document.getElementById('delete-completed');

let arrOfTasks = [];

let sortByCompleteVal = false; // if true list gets sorted by completion

//------------------------------------------------------------------------------------
// check and delete function

const checkAndDeleteFunc = (e) => {
  const dataKeyofItem = e.target.parentElement.getAttribute('data-key');
  if (e.target.type == 'checkbox') {
    arrOfTasks.forEach((item, i, arr) => {
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

//------------------------------------------------------------------------------------
// create listItems Function

const createListItems = (arr) => {
  if (sortByCompleteVal === false) {
    arr.sort((a, b) => b.id - a.id);
  }
  if (sortByCompleteVal === true) {
    arr.sort((a, b) => Number(a.done) - Number(b.done));
  }
  addLocalStorage(arr);

  list.innerHTML = '';
  if (!arr) {
    return;
  }
  arr.forEach((item, i, arr) => {
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
    list.append(li);

    li.addEventListener('click', checkAndDeleteFunc);
  });
};
//------------------------------------------------------------------------------------
// EVENTLISTENERS

window.addEventListener('load', () => {
  if (!localStorage.getItem('listOfTasks')) {
    return;
  }
  if (localStorage.getItem('listOfTasks')) {
    arrOfTasks = returnFromLocalStorage('listOfTasks');
    createListItems(arrOfTasks);
  }
});

// Add
form.addEventListener('submit', (e) => {
  e.preventDefault();
  arrOfTasks = addFunc(input.value, arrOfTasks);
  // console.log('main: ', arrOfTasks);
  addLocalStorage(arrOfTasks);

  const ret = returnFromLocalStorage('listOfTasks');
  createListItems(ret);
});

// Sort By Complete
sortByCompleteBtn.addEventListener('click', () => {
  sortByCompleteVal = sortByCompleteVal ? false : true;

  setTimeout(createListItems(arrOfTasks, 3000));
  createListItems(arrOfTasks);
});

// delete completed
deleteCompletedBtn.addEventListener('click', () => {
  arrOfTasks = arrOfTasks.filter((el) => el.done === false);
  createListItems(arrOfTasks);
});
