
const taskNameInput = document.getElementById("task-name");
const taskTimeInput = document.getElementById("task-time");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function addTask() {
  const taskName = taskNameInput.value.trim();
  const taskTime = taskTimeInput.value;

  if (!taskName || !taskTime) {
    alert("Please enter a task name and set a time!");
    return;
  }

  const task = {
    name: taskName,
    time: new Date(taskTime).getTime(), 
    completed: false,
    alarmTriggered: false,
  };

  tasks.push(task);
  renderTasks();
  taskNameInput.value = "";
  taskTimeInput.value = "";

  scheduleAlarm(task);
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed
      ? "completed"
      : task.alarmTriggered
      ? "alarm"
      : "";
    taskItem.innerHTML = `
      ${task.name} - ${new Date(task.time).toLocaleString()}
      <button onclick="markCompleted(${index})">Complete</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function markCompleted(index) {
  tasks[index].completed = true;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function scheduleAlarm(task) {
  const now = new Date().getTime();
  const timeDifference = task.time - now;

  if (timeDifference > 0) {
    setTimeout(() => {
      if (!task.completed) {
        playAlarmSound();
        task.alarmTriggered = true;
        alert(`Alarm: It's time for "${task.name}"!`);
        renderTasks();
      }
    }, timeDifference);
  }
}

function playAlarmSound() {
  const audio = new Audio("C:\Users\vajin\Desktop\todo-app\alarm-sound.mp3"); // Path to alarm sound file
  audio.play();
}

addTaskBtn.addEventListener("click", addTask);
