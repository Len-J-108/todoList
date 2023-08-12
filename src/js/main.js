// Selecting
const wrapper = document.getElementById('wrapper');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
const addButton = document.querySelector('.add-button');

let arrOfTasks = [];

window.addEventListener('load', () => {
  if (!localStorage.getItem('listOfTasks')) {
    return;
  }
  if (localStorage.getItem('listOfTasks')) {
    arrOfTasks = returnFromLocalStorage('listOfTasks');
    createListItems(arrOfTasks);
  }
});

//------------------------------------------------------------------------------------
// add loacalStorage function

const addLocalStorage = (arr) => {
  localStorage.setItem('listOfTasks', JSON.stringify(arr));
};
//------------------------------------------------------------------------------------
// return from localStorage function

const returnFromLocalStorage = (val) => {
  // return JSON.parse(localStorage.getItem(val));
  const xx = JSON.parse(localStorage.getItem(val));
  return xx;
};
//------------------------------------------------------------------------------------
// add function

const addFunc = (task) => {
  if (task !== '') {
    arrOfTasks = returnFromLocalStorage('listOfTasks');
    if (arrOfTasks !== null) {
      arrOfTasks.push({ task: task, id: Date.now(), done: false });
      console.log(arrOfTasks);
      input.value = '';
    }
  }
};
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
//create listItems Function

const createListItems = (arr) => {
  list.innerHTML = '';
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

    const delBtn = document.createElement('button');
    delBtn.textContent = 'erase';

    li.append(isDone, itemTxt, delBtn);
    // appending
    list.append(li);

    li.addEventListener('click', checkAndDeleteFunc);
  });
};
//------------------------------------------------------------------------------------

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addFunc(input.value);

  addLocalStorage(arrOfTasks);

  const ret = returnFromLocalStorage('listOfTasks');
  createListItems(ret);
});
