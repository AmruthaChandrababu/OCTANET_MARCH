let tasks = [];

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const deadlineInput = document.getElementById("deadline-input");
    const deadline = deadlineInput.value;

    const priorityInput = document.getElementById("priority-input");
    const priority = priorityInput.value;

    const newTask = {
        id: tasks.length + 1,
        text: taskText,
        deadline: deadline,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "Medium";
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <span>${task.text}</span>
            <span>Deadline: ${task.deadline}</span>
            <span class="priority-${task.priority.toLowerCase()}">Priority: ${task.priority}</span>
            <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Initial rendering
renderTasks();
