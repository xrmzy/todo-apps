document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });

  const todos = [];
  const RENDER_EVENT = 'event-todo';
  //function addTodo()

  function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const genratedID = generatedId();
    const todoObject = generateTodoObject(
      genratedID,
      textTodo,
      timestamp,
      false
    );
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  //function generatedId
  function generatedId() {
    return +new Date();
  }

  //function generatedTodoObject
  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  //listener RENDER_EVENT using console.log to show array todos
  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
  });

  //makeTodo() function to showing the datas in container
  function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
  }
});
