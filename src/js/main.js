// Selecting
const wrapper = document.getElementById('wrapper');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
const addButton = document.querySelector('.add-button');

const arrOfTasks = [];

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
  console.log('XXXX', xx);
  return xx;
};
//------------------------------------------------------------------------------------
// add function
const addFunc = (task) => {
  if (task !== '') {
    arrOfTasks.push({ task: task, id: Date.now(), done: false }); //NOTE:
    console.log(arrOfTasks);
    input.value = '';
  }
};
//------------------------------------------------------------------------------------
// check and delete function
const checkAndDeleteFunc = (e) => {
  if (e.target.type == 'checkbox') {
    console.log('CHECKBOX...');
    e.target.parentElement.classList.add('completet'); //NOTE: chenge class for completed card design
    arrOfTasks.forEach((item, i, arr) => {
      console.log(item.id);
    });
  }
  if (e.target.textContent == 'erase') {
    e.target.parentElement.remove();
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

    const itemTxt = document.createElement('span');
    itemTxt.textContent = item.task;

    if (item.done) isDone.setAttribute('checked', '');

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

  const ab = returnFromLocalStorage('listOfTasks');
  createListItems(ab);
});
