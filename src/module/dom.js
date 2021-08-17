import Storage from './localStorage.js';
import { createLiTodo } from './utilities.js';

const toDoContainer = document.querySelector('ul');

const updateDom = () => {
  // reset container
  toDoContainer.innerHTML = '';
  let index = 0;
  // Check if the storage exists
  if (Storage.isEmpty()) {
    Storage.set([]);
  }
  // Get Todo's from local storage
  const storage = Storage.get();
  storage.forEach((elem) => {
    // Reset the indexes starting from 1
    index += 1;
    elem.index = index;

    // Create li, check box and description h5 for every Todo Object
    const newLi = createLiTodo(elem.description);
    // Append li on the ul and add classes
    toDoContainer.classList += 'p-0 m-0';
    toDoContainer.append(newLi);
  });
};

export default updateDom;