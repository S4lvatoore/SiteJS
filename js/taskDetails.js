const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');
const tasksManager = new TasksManager();
const task = tasksManager.tasks.find(task => task.id == taskId);

if (!task) {
    document.body.innerHTML = '<h1>Error 404</h1>';
} else {
    const taskDetailsDiv = document.getElementById('task-details');
    const taskDetailsHTML = `
    <h2>${task.name}</h2>
    <p><strong>Details:</strong> ${task.description}</p>
    <p><strong>Date:</strong> ${task.createdDate}</p>
    <p><strong>Status:</strong> ${task.isCompleted ? 'Done' : 'UnDone'}</p>
  `;

    taskDetailsDiv.innerHTML = taskDetailsHTML;

}
