const tasksManager = new TasksManager();
document.getElementById('add-task-btn').addEventListener('click', () => {
    document.getElementById('task-form-modal').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('task-form-modal').style.display = 'none';
    document.getElementById('task-name').value = '';
    document.getElementById('task-description').value = '';
});

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('task-name').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const nameRegex = /^(?!^\d+$)(?!^\s)([A-Za-zА-Яа-я0-9]{1,16})(?:\s([A-Za-zА-Яа-я0-9]{1,16})){1,}$/;
    const descriptionRegex = /^(?!^\s*$)(?!^\s*.*\b(?:name|task|title)\b.*$).+$/;

    const cleanName = name.replace(/\s+/g, '').toLowerCase();
    const cleanDescription = description.replace(/\s+/g, '').toLowerCase();

    if (cleanName === cleanDescription) {
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

document.getElementById('submit-visible').addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('task-name-visible').value.trim();
    const description = document.getElementById('task-description-visible').value.trim();

    const nameRegex = /^(?!^\d+$)(?!^\s)([A-Za-zА-Яа-я0-9]{1,16})(?:\s([A-Za-zА-Яа-я0-9]{1,16})){1,}$/;
    const descriptionRegex = /^(?!^\s*$)(?!^\s*.*\b(?:name|task|title)\b.*$).+$/;

    const cleanName = name.replace(/\s+/g, '').toLowerCase();
    const cleanDescription = description.replace(/\s+/g, '').toLowerCase();

    if (cleanName === cleanDescription) {
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
    document.getElementById('task-name-visible').value = '';
    document.getElementById('task-description-visible').value = '';
    renderTasks();
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
function renderTasks(filter = 'all') {
    const sortBy = document.getElementById('sort-tasks').value;
    let tasks;

    if (filter === 'done') {
        tasks = tasksManager.filterDone(sortBy);
    } else if (filter === 'remained') {
        tasks = tasksManager.filterRemained(sortBy);
    } else {
        tasks = tasksManager.getAllTasks(sortBy);
    }

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onclick="tasksManager.toggleCompletion(${task.id})">
            <span class="task-name">
                <a href="task.html?id=${task.id}">${task.name}</a>
            </span>
            <button onclick="tasksManager.deleteTask(${task.id}); renderTasks();">Delete</button>
            <a href="edit.html?id=${task.id}">Edit</a>
        `;
        taskList.appendChild(taskItem);
    });
}
renderTasks();

