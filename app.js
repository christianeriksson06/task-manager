const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const prioSelect = document.querySelector("#task-priority");

let tasks = [];

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
  console.log("Task added:", task);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  if (!title.trim()) return;

  addTask(title, prioSelect.value);
  titleInput.value = "";
});

const listEl = document.querySelector("#task-list");

function renderTasks() {
  listEl.innerHTML = "";

  for (const task of tasks) {
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
  renderTasks();
});


    listEl.appendChild(li);
  }
}


function addTask(title, priority) {
  const task = createTask(title, priority);
  tasks.push(task);
  renderTasks();
}

