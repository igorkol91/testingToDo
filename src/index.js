import './main.css';
import ToDo from './module/todo';
import Storage from './module/localStorage.js';
import { updateDom } from './module/dom';

const input = document.querySelector('#todo-entry');
let storage = [];

window.onload = updateDom();

const CreateTodo = (description) => {
    const toDo = new ToDo(description);
    if(!Storage.isEmpty()){
        storage = Storage.get();
        toDo.index = storage.length + 1;
        storage.push(toDo);
        Storage.set(storage);
    } else {
        Storage.set(storage);
}
}

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        // Validation to prevent too long inputs
        if((input.value).length > 30 || (input.value).length < 3)
        {
            const error = document.createElement('div');
            error.innerText = "To Do should be 3-30 characters!";
            error.classList += 'bg-danger error w-50 text-center';
            const body = document.querySelector('body');
            body.append(error);
            input.value = '';
            setTimeout(() => error.remove(), 3000);
            // Create new todo if input length is less that 20 characters
        } else {
          const success = document.createElement('div');
          success.innerText = "To Do created successfully!";
          success.classList += 'bg-success success w-50 text-center';
          const body = document.querySelector('body');
          body.append(success);
          setTimeout(() => success.remove(), 3000);
          CreateTodo(input.value);
          input.value = '';
          updateDom();  
        }
    }
})