//imports
import { returnFromLocalStorage } from './localStorage.js';
import addFunc from './addFunc.js';
import createListItems from './createListElements.js';

// Selecting
// const wrapper = document.getElementById('wrapper');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
// const addButton = document.querySelector('.add-button');
const sortByCompleteBtn = document.getElementById('sort-by-complete');
const deleteCompletedBtn = document.getElementById('delete-completed');

let arrOfTasks = []; // initial empty array

let sortByCompleteVal = false; // if true list gets sorted by completion

//------------------------------------------------------------------------------------
// EVENTLISTENERS

const addLocalStorage = (arr) => {
  localStorage.setItem('listOfTasks', JSON.stringify(arr));
};

window.addEventListener('load', () => {
  if (!localStorage.getItem('listOfTasks')) {
    return;
  }
  if (localStorage.getItem('listOfTasks')) {
    arrOfTasks = returnFromLocalStorage('listOfTasks');
    createListItems(arrOfTasks, list);
  }
});

// Add
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Mo');
  
  addLocalStorage(arrOfTasks);
  addFunc(input.value, arrOfTasks);

  const ret = returnFromLocalStorage('listOfTasks');
  createListItems(ret, list);
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

export default sortByCompleteVal;
