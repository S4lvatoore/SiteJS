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

        tasksManager.editTask(task.id, name, description);
        window.location.href = 'index.html';
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
