import { JSDOM } from 'jsdom';
import ToDo from '../src/module/todo.js';
import { createLiTodo, removeAllCompleted } from '../src/module/utilities.js';
import Storage from '../src/module/localStorage.js';

const dom = new JSDOM();
global.document = dom.window.document;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
localStorage.setItem(
  'projectList',
  JSON.stringify([
    {
      description: 'CapstoneProject',
    },
    {
      description: 'Todo Project',
    },
    {
      description: 'RestaurauntProject',
    },
  ]),
);

const newToDo = new ToDo('NewTodo');
const newArray = [newToDo];
localStorage.setItem('newProjectList', JSON.stringify(newArray));
Storage.set([
  {
    index: 0,
    description: 'CapstoneProject',
    checked: false,
  },
  {
    index: 1,
    description: 'Todo Project',
    checked: false,
  },
  {
    index: 2,
    description: 'RestaurauntProject',
    checked: false,
  },
]);

describe('Edit task description', () => {
  it('presses the button and creates new input field', () => {
    document.body.innerHTML = '<div>'
        + '  <ul id="list"></ul>'
        + '</div>';
    const list = document.getElementById('list');
    let index = -1;
    const storage = Storage.get();
    storage.forEach((elem) => {
      // Reset the indexes starting from 1
      index += 1;
      elem.index = index;
      // Create li, check box and description h5 for every Todo Object
      const newLi = createLiTodo(elem.description, index);
      list.appendChild(newLi);
    });
    const button = list.childNodes[0].childNodes[2];
    button.click();
    expect(list.childNodes[0].childNodes[4].tagName).toBe('INPUT');
  });
  it('takes the description text into the input field', () => {
    document.body.innerHTML = '<div>'
        + '  <ul id="list"></ul>'
        + '</div>';
    const list = document.getElementById('list');
    let index = -1;
    const storage = Storage.get();
    storage.forEach((elem) => {
      // Reset the indexes starting from 1
      index += 1;
      elem.index = index;
      // Create li, check box and description h5 for every Todo Object
      const newLi = createLiTodo(elem.description, index);
      list.appendChild(newLi);
    });
    const button = list.childNodes[0].childNodes[2];
    button.click();
    expect(list.childNodes[0].childNodes[4].value).toBe('CapstoneProject');
  });
});

describe('Describe press check box', () => {
  it('marks todo as completed when checkbox is pressed and update the local storage', () => {
    document.body.innerHTML = '<div>'
        + '  <ul id="list"></ul>'
        + '</div>';
    const list = document.getElementById('list');
    let index = -1;
    const storage = Storage.get();
    storage.forEach((elem) => {
      // Reset the indexes starting from 1
      index += 1;
      elem.index = index;
      // Create li, check box and description h5 for every Todo Object
      const newLi = createLiTodo(elem.description, index);
      list.appendChild(newLi);
    });
    list.childNodes[0].childNodes[0].click();
    const storage1 = Storage.get();
    expect(storage1[0].checked).toBe(true);
  });
});

describe('Desscribe clear all completed button do', () => {
  it('removes all todos checked as complete and update list', () => {
    document.body.innerHTML = '<div>'
        + '  <ul id="list"></ul>'
        + '<button id="remove-btn" class="p-2 w-50 my-3">Remove Selected</button>'
        + '</div>';
    const list = document.getElementById('list');
    let index = -1;
    const storage = Storage.get();
    storage.forEach((elem) => {
      // Reset the indexes starting from 1
      index += 1;
      elem.index = index;
      // Create li, check box and description h5 for every Todo Object
      const newLi = createLiTodo(elem.description, index);
      list.appendChild(newLi);
      storage[index].checked = true;
    });
    Storage.set(storage);
    const button = document.querySelector('#remove-btn');
    button.addEventListener('click', () => {
      removeAllCompleted();
    });
    button.click();
    expect(Storage.get().length).toBe(0);
  });
});