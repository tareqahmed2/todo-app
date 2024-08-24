import { Todo } from "./classes/Todo.js";
//  find elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#input-todo");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};
// deleteTodo
const deleteTodo = (event) => {
  // console.log("delete todo");
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  // console.log(selectedTodo);
  todoLists.removeChild(selectedTodo);
  showMessage("todo is deleted", "danger");

  const todoId = selectedTodo.id;
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId != todoId);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};
// getTodoFromLocalStoarge
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};
// createTodo
const createTodo = (newTodo) => {
  const todoElement = document.createElement("li");
  todoElement.id = newTodo.todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
        <span>${newTodo.todoValue}</span>
        <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
        `;
  todoLists.appendChild(todoElement);
  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;
  const todoId = Date.now().toString(); // Define todoId here
  const newTodo = new Todo(todoId, todoValue); // Now use todoId to create newTodo
  console.log(newTodo);
  createTodo(newTodo);
  showMessage("todo is added", "success");
  // add to do on localstorage
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);
  localStorage.setItem("mytodos", JSON.stringify(todos));
  todoInput.value = "";
};

// loadTodos
const loadTodos = () => {
  // console.log("loaded");
  const todos = getTodosFromLocalStorage();
  // todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
  todos.map((todo) => createTodo(todo));
};
//addingh listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
