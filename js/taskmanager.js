class Task {
    constructor(name, description) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.createdDate = new Date().toLocaleString();
        this.isCompleted = false;
    }
}