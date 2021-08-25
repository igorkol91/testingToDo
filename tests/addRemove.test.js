import ToDo from '../src/module/todo.js';
import {createLiTodo} from '../src/module/utilities.js';
import Storage from '../src/module/localStorage.js';

import { JSDOM } from "jsdom";
const dom = new JSDOM()
global.document = dom.window.document

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

describe('on page load', () => {
  it('it should create default projects', () => {
    const storage = JSON.parse(localStorage.getItem('projectList'));
    expect(storage[1].description).toBe('Todo Project');
  });
  it('expect projectlist length to be 3', () => {
    const storage = JSON.parse(localStorage.getItem('projectList'));
    expect(storage.length).toEqual(3);
  });
});

const newToDo = new ToDo('NewTodo');
const newArray = [newToDo];
localStorage.setItem('newProjectList', JSON.stringify(newArray));

describe('after adding new element', () => {
  it('it should add new element in a new project list', () => {
    const storage = JSON.parse(localStorage.getItem('newProjectList'));
    expect(storage[0].description).toBe('NewTodo');
  });
  it('expect projectlist length to be 1', () => {
    const storage = JSON.parse(localStorage.getItem('newProjectList'));
    expect(storage.length).toEqual(1);
  });

  test('Add one new item to the list', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul id="list"></ul>' +
    '</div>';
    Storage.set([
      {
        index: 0,
        description: 'CapstoneProject',
        checked: false
      },
      {
        index: 1,
        description: 'Todo Project',
        checked: false
      },
      {
        index: 2,
        description: 'RestaurauntProject',
        checked: false
      },
    ]);
    const list = document.getElementById('list');
    let index = -1;
    const storage = Storage.get();
    storage.forEach((elem) => {
      // Reset the indexes starting from 1
      index += 1;
      elem.index = index;
      // Create li, check box and description h5 for every Todo Object
      const newLi = createLiTodo(elem.description, index);
      list.appendChild( newLi);
    });
    expect(list.children).toHaveLength(3);
});
});