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
    saveData(); //fungsi untuk menyimpan data secara langsung
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

  // event RENDER_EVENT
  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) {
        uncompletedTODOList.append(todoElement);
      } else {
        completedTODOList.append(todoElement);
      }
    }
  });

  //makeTodo() function to showing the datas in container
  function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
      const undoButton = document.createElement('button');
      undoButton.classList.add('undo-button');
      undoButton.addEventListener('click', function () {
        undoTaskFromCompleted(todoObject.id);
      });

      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');
      trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(todoObject.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement('button');
      checkButton.classList.add('check-button');
      checkButton.addEventListener('click', function () {
        addTaskToCompleted(todoObject.id);
      });
      container.append(checkButton);
    }

    return container;
  }

  // add task complete
  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); //fungsi untuk menyimpan data secara langsung
  }

  //findTodo the function to find todo with correct ID in array todos
  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }

  // remove task from completed in todoId
  function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); //fungsi untuk menyimpan data secara langsung
  }

  // undo task from completed in todoId
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData(); //fungsi untuk menyimpan data secara langsung
  }

  // find todo index
  function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
    return -1;
  }

  // saveData function
  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(todos);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  // STORAGE_KEY, SAVED_EVENT & isStorage_Exist
  const SAVED_EVENT = 'saved-todo';
  const STORAGE_KEY = 'TODO_APPS';

  // isStorageExist bersifat boolean
  function isStorageExist() {
    if (typeof Storage === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

  // listener event dari SAVED_EVENT lalu call getItem(KEY) untuk ambil data dari local storage
  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
    // alert('Anda berhasil mengubah todo');
  });

  // load data from storage, fungsinya untuk menampilkan data ketika halaman dimuat pertama kali
  function loadDataFromStorage() {
    const seraializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(seraializedData);

    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // panggil fungsi pada saa semua element HTML selesai dimuat menjadi DOM
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
