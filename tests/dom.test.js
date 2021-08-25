import ToDo from '../src/module/todo.js';

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
});