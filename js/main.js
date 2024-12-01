const tasksManager = new TasksManager();

document.getElementById('add-task-btn').addEventListener('click', () => {
    document.getElementById('task-form-modal').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('task-form-modal').style.display = 'none';
    document.getElementById('task-name').value = '';
    document.getElementById('task-description').value = '';
});

document.getElementById('sort-tasks').addEventListener('change', () => {
    renderTasks();
});

document.getElementById('filter-all').addEventListener('click', () => {
    renderTasks('all');
});
document.getElementById('filter-done').addEventListener('click', () => {
    renderTasks('done');
});
document.getElementById('filter-remained').addEventListener('click', () => {
    renderTasks('remained');
});

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('task-name').value.trim();
    const description = document.getElementById('task-description').value.trim();

    const nameRegex = /^(?!^\d+$)(?!^\s)([A-Za-zА-Яа-я0-9]{1,16})(?:\s([A-Za-zА-Яа-я0-9]{1,16})){1,}$/;
    const descriptionRegex = /^(?!^\s*$)(?!^\s*.*\b(?:name|task|title)\b.*$).+$/;

    if (name.toLowerCase() === description.toLowerCase()) {
        alert("Error! Description cannot match task name.");
        return;
    }

    if (!nameRegex.test(name)) {
        alert("Error! The name must contain at least two words, cannot consist only of numbers, and cannot contain spaces at the beginning or end.");
        return;
    }

    if (!descriptionRegex.test(description)) {
        alert("Error! Description must not match task name.");
        return;
    }

    tasksManager.addTask(name, description);
    document.getElementById('task-name').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-form-modal').style.display = 'none';
    renderTasks();
});

function renderTasks(filter = 'all') {
    const tasks = tasksManager.getTasks(filter, document.getElementById('sort-tasks').value);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onclick="tasksManager.toggleCompletion(${task.id})">
            <span class="task-name">${task.name}</span>
            <a href="task.html?id=${task.id}">Details</a>
            <button onclick="tasksManager.deleteTask(${task.id}); renderTasks();">Delete</button>
            <a href="edit.html?id=${task.id}">Edit</a>
        `;
        taskList.appendChild(taskItem);
    });
}

renderTasks();

window.addEventListener('beforeunload', (event) => {
    if (document.getElementById('task-name').value || document.getElementById('task-description').value) {
        event.preventDefault();
    }
});
