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

    editTask(id, newName, newDescription) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.name = newName;
            task.description = newDescription;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.isCompleted = !task.isCompleted;
            this.saveTasks();
        }
    }

    getTasks(filter = 'all', sortBy = 'date') {
        let filteredTasks = this.tasks;

        if (filter === 'done') {
            filteredTasks = filteredTasks.filter(task => task.isCompleted);
        } else if (filter === 'remained') {
            filteredTasks = filteredTasks.filter(task => !task.isCompleted);
        }

        filteredTasks = filteredTasks.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.createdDate) - new Date(a.createdDate);
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        return filteredTasks;
    }
}









