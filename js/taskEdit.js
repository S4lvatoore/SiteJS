const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');
const tasksManager = new TasksManager();

const task = tasksManager.tasks.find(task => task.id == taskId);

if (!task) {
    document.body.innerHTML = '<h1>Ошибка 404: Задача не найдена</h1>';
} else {
    document.getElementById('edit-task-name').value = task.name;
    document.getElementById('edit-task-description').value = task.description;

    document.getElementById('edit-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-task-name').value.trim();
        const description = document.getElementById('edit-task-description').value.trim();

        if (name && description) {
            tasksManager.editTask(task.id, name, description);
            window.location.href = 'index.html';
        }
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
