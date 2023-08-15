import addFunc from './addFunc.js';
import { addLocalStorage, returnFromLocalStorage } from './localStorage.js';
// import { checkAndDeleteFunc } from './checkAndDeleteFunc.js';
import createListItems from './createListElements.js';

// Selecting
// const wrapper = document.getElementById('wrapper');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
// const addButton = document.querySelector('.add-button');
const sortByCompleteBtn = document.getElementById('sort-by-complete');
const deleteCompletedBtn = document.getElementById('delete-completed');
const eraseAllBtn = document.getElementById('erase-all');

// initial Array
let arrOfTasks = [];

// Flag for sorting function
let sortByCompleteVal = false; // if true list gets sorted by completion

//------------------------------------------------------------------------------------
// EVENTLISTENERS

// Load List from LocalStorage on refresh...
window.addEventListener('load', () => {
  const abc = localStorage.getItem('listOfTasks');

  if (!abc || abc === 'undefined') {
    return;
  }
  if (localStorage.getItem('listOfTasks')) {
    arrOfTasks = returnFromLocalStorage('listOfTasks');
    createListItems(arrOfTasks, sortByCompleteVal, list);
  }
});

// Add
form.addEventListener('submit', (e) => {
  e.preventDefault(); //prevents the form from getting sent.

  if (!input.value) {
    return alert('enter something...');
  }

  arrOfTasks = addFunc(input.value.trim(), arrOfTasks);
  input.value = ''; // resets the text input after adding item.
  addLocalStorage(arrOfTasks); // adding to localStorage in browser under 'listOfTasks'

  createListItems(
    // renders the list
    returnFromLocalStorage('listOfTasks'),
    sortByCompleteVal,
    list
  );
});

// Sort By Complete
sortByCompleteBtn.addEventListener('click', () => {
  if (arrOfTasks.some((item) => item.done)) {
    sortByCompleteVal = !sortByCompleteVal;
    createListItems(arrOfTasks, sortByCompleteVal, list); // renders the list
  } else {
    return;
  }
});

// delete completed
deleteCompletedBtn.addEventListener('click', () => {
  arrOfTasks = arrOfTasks.filter((el) => el.done === false);
  createListItems(arrOfTasks, sortByCompleteVal, list); // renders the list
});

// erase all
eraseAllBtn.addEventListener('click', (e) => {
  localStorage.removeItem('listOfTasks'); // deletes list from localStorage
  arrOfTasks = []; // resets arr for (empty) rendering
  createListItems(arrOfTasks, sortByCompleteVal, list); // renders the list (empty)
});

// Exports
export { createListItems, arrOfTasks, sortByCompleteVal, list };
