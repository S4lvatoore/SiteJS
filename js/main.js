
const tasksManager = new TasksManager();
document.getElementById('add-task-btn').addEventListener('click', () => {
    document.getElementById('task-form-modal').style.display = 'block';
});
document.getElementById('sort-tasks').addEventListener('change', () => {
    renderTasks();
});

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('task-name').value.trim();
    const description = document.getElementById('task-description').value.trim();

    if (name && description) {
        tasksManager.addTask(name, description);
        document.getElementById('task-name').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('task-form-modal').style.display = 'none';
        renderTasks();
    }
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
      <a href="task.html?id=${task.id}">Подробнее</a>
      <button onclick="tasksManager.deleteTask(${task.id}); renderTasks();">Удалить</button>
      <a href="edit.html?id=${task.id}">Редактировать</a>
    `;
        taskList.appendChild(taskItem);
    });
}

renderTasks();
