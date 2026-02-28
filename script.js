const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");






let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;






    if (task.completed) span.classList.add("completed");

    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.append(span, deleteBtn);
    taskList.appendChild(li);
  });

  updateProgress();
  localStorage.setItem("tasks", JSON.stringify(tasks));



}

function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({ text: taskInput.value, completed: false });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();





}

function deleteTask(index) {





  
  tasks.splice(index, 1);
  renderTasks();
}






function updateProgress() {
  if (tasks.length === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "0% completed";
    return;
  }

  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% completed`;
}

addBtn.addEventListener("click", addTask);
renderTasks();
