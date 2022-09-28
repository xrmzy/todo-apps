document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  //function addTodo()
  function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const genratedID = generatedId();
    const todoObject = generateTodoObject(
      genratedID,
      textTodo,
      timestamp,
      false
    );
    todos.push(todoObject);

    document.dispatchEvent(new Event(REDNDER_EVENT));
  }
});
