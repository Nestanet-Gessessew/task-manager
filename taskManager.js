const createTaskHtml = (name, assignedTo, description, status, dueDate, id) => {

    const html = `
       <div data-task-id='${id}' class="col-4 mb-5">
       <div class="card list-group-item" >
        <div class="card-body">
          <h5 class="card-title">Name:  ${name}</h5>
          <p class="card-text" >Assigned To: ${assignedTo}</p>
          <p class="card-text" >Description: ${description}</p>
          <p class="card-text" >Status: ${status}</p>
          <p class="card-text" >Due Date: ${dueDate}</p>
          <p class="card-text " >Id: ${id}</p>
          <a href="#" class="btn btn-primary delete-button">Delete</a>
          <button type="button" class="btn btn-primary done-button" id="done">Mark as Done</button>
        </div>
      </div>
</div> <br>
`
    return html;
};



class TaskManager {
    constructor(tasks, currentId) {
        this.tasks = [];
        this.currentId = 0;
    }


    addTask(name, assignedTo, description, status, dueDate) {
        const task = {
            id: this.currentId++,
            name: name,
            assignedTo: assignedTo,
            description: description,
            status: status,
            dueDate: dueDate
        };

        this.tasks.push(task);
        this.render();
    }

    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }

    render() {
        var tasksHtmlList = [];
        var tasksHtmlVar = tasksHtmlList;

        for (let i = 0; i < this.tasks.length; i++) {
            var currentTask = this.tasks[i];
            const newDate = new Date(currentTask.dueDate);

            const formattedDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
            var taskHtml = createTaskHtml(currentTask.name,
                currentTask.assignedTo, currentTask.description, currentTask.status, formattedDate, currentTask.id);
            tasksHtmlList.push(taskHtml);
            for (let i = 0; i < tasksHtmlList.length; i++) {
                document.getElementById("taskList").innerHTML = tasksHtmlList;
            }
        }
        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#taskList');
        tasksList.innerHTML = tasksHtml;

    }


    save() {
        var tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        var currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    load() {
        if (localStorage.getItem('tasks')) {
            var tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);

        }
        if (localStorage.getItem('currentId')) {
            var currentId = localStorage.getItem('currentId');
            this.currentId = currentId.valueOf();
        }


    }


    deleteTask(taskId) {
        const newTasks = [];
        for (let j = 0; j < this.tasks.length; j++) {
            const task = this.tasks[j];
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }
}




