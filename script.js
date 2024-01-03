// ------------------------------- Global Variable
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

// ------------------------------- Method - Getting ToDos and Adding it to DOM
const getTodos = () => {
  fetch(apiUrl + "?_limit=5")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      // const todoElem = document.querySelector(".todo-list");

      data.forEach((todo) => {addTodoToDOM(todo)});
    });
};

const addTodoToDOM = (todo) => {
  const div = document.createElement("div");
  div.classList.add('todo');

  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id); // Custom attribute: while creating them should prefix it with data (-) that data-id

  if (todo.completed) {
    div.style.color = "black";
    div.classList.add("done");
  }
  document.querySelector(".todo-list").appendChild(div);
};

// ------------------------------- Method - Creating ToDo and Adding to DOM
const createTodo = (e) => {
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false
  }

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {return res.json()})
  .then((data) => {
    addTodoToDOM(data)
  })

  e.target.firstElementChild.value = ''
}

// ------------------------------- After Completion of ToDo Item Add Class ('done') and Method - Updating
const toggleCompleted = (e) => {
  if(e.target.classList.contains('todo')){
    e.target.classList.toggle('done')

    updateTodo(e.target.dataset.id, e.target.classList.contains('done'))
  }
}

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({id, completed}), // data we want to update
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    // console.log(data)
  })
}

// ------------------------------- Method - Deleting ToDo from DOM
const deleteTodo = (e) => {
  if(e.target.classList.contains('todo')){
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`,{
      method: 'DELETE',
    })
    .then((res)=>{
      return res.json()
    })
    .then(()=>{
      e.target.remove()
    })
  }
}

// ------------------------------- Executing every function
const init=()=>{
  document.addEventListener('DOMContentLoaded', getTodos());
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
  document.querySelector('.todo-list').addEventListener('click', toggleCompleted);
  document.querySelector('.todo-list').addEventListener('dblclick', deleteTodo);
};

// ------------------------------- Global Execution
init();