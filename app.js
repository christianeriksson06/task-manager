
const STORAGE_KEY = "task_manager_tasks";

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const prioSelect = document.querySelector("#task-priority");
document.querySelector('[data-filter="all"]')?.classList.add("is-active");


// Application state
let filter = "all";

let tasks = loadTasks();
renderTasks();

function createTask(title, priority) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    completed: false,
  };
}

function addTask(title, priority) {
  const task = createTask(title, priority);
  tasks.push(task);
  saveTasks();
  renderTasks();
}

const filterButtons = document.querySelectorAll("[data-filter]");

for (const btn of filterButtons) {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    renderTasks();
  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  if (!title.trim()) return;

  addTask(title, prioSelect.value);
  titleInput.value = "";
});

const listEl = document.querySelector("#task-list");

function getVisibleTasks() {
  if (filter === "active") return tasks.filter(t => !t.completed);
  if (filter === "completed") return tasks.filter(t => t.completed);
  return tasks;
}


function renderTasks() {
  listEl.innerHTML = "";

  for (const task of getVisibleTasks()) {
 
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
  <label>
    <input type="checkbox" ${task.completed ? "checked" : ""} />
    <span>${task.title}</span>
  </label>
  <span class="badge">${task.priority}</span>
  <button type="button">Ta bort</button>
`;

li.querySelector("button").addEventListener("click", () => {
  tasks = tasks.filter(t => t.id !== task.id);
  for (const b of filterButtons) b.classList.remove("is-active");
btn.classList.add("is-active");

  renderTasks();
});


    listEl.appendChild(li);
  }
}


function addTask(title, priority) {
  const task = createTask(title, priority);
  tasks.push(task);
  saveTasks();
  renderTasks();
}

// Persist tasks to localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

