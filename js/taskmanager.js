class Task {
    constructor(name, description) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.createdDate = new Date().toLocaleString();
        this.isCompleted = false;
    }
}

class TasksManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(name, description) {
        const task = new Task(name, description);
        this.tasks.push(task);
        this.saveTasks();
    }

}
