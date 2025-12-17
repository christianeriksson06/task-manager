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
