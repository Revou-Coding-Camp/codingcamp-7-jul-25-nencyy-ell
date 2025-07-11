const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all');
const searchInput = document.getElementById('search');

let todos = [];

function renderTodos(filter = "") {
  todoList.innerHTML = "";
  todos
    .filter(todo => todo.task.toLowerCase().includes(filter.toLowerCase()))
    .forEach((todo, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td><button onclick="deleteTodo(${idx})">Hapus</button></td>
      `;
      todoList.appendChild(row);
    });
}

form.onsubmit = function(e) {
  e.preventDefault();
  if (!taskInput.value.trim() || !dateInput.value) {
    alert("Isi tugas & tanggalnya dulu yaa~");
    return;
  }
  todos.push({ task: taskInput.value, date: dateInput.value });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos(searchInput.value);
};

function deleteTodo(idx) {
  todos.splice(idx, 1);
  renderTodos(searchInput.value);
}

clearAllBtn.onclick = function() {
  todos = [];
  renderTodos(searchInput.value);
};

searchInput.oninput = function() {
  renderTodos(this.value);
};

renderTodos();
window.deleteTodo = deleteTodo;
