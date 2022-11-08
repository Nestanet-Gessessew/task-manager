const taskManager = new TaskManager();
taskManager.load();
taskManager.render();

taskform.addEventListener("submit", function () {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let assignedTo = document.getElementById('assignedTo').value;
    let description = document.getElementById('description').value;
    let status = document.getElementById('status').value;
    let dueDate = document.getElementById('dueDate').value;



    if (name.length == 0) {
        console.log("You must fill out this field");
    } else {
        taskManager.addTask(name, assignedTo, description, status, dueDate);
        taskManager.save();

    }

});
function validFormFieldInput(data) {
    const newTaskNameInput = document.querySelector('#name');
    const name = newTaskNameInput.value;
    const newTaskAssignedToInput = document.querySelector('#assignedTo');
    const assignedTo = newTaskAssignedToInput.value;
    const newTaskDescriptionInput = document.querySelector('#description');
    const description = newTaskDescriptionInput.value;
    const newTaskStatusInput = document.querySelector('#status');
    const status = newTaskStatusInput.value;
    const newTaskdueDateInput = document.querySelector('#dueDate');
    const dueDate = newTaskdueDateInput.value;
}


const tasksList = document.querySelector('#taskList');
tasksList.addEventListener('click', (event) => {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        task.status = 'DONE';
        taskManager.render();
        taskManager.save();
    }


    if (event.target.classList.contains('delete-button')) {
        const delParentTask = event.target.parentElement.parentElement.parentElement;
        console.log(delParentTask);
        const delTaskId = Number(delParentTask.dataset.taskId);
        //console.log(delTaskId);
        taskManager.deleteTask(delTaskId);
        taskManager.save();
        taskManager.render();
    } 
});















